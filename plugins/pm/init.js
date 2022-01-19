plugins.register({ 
  name: "pm",

  init: function () {
    append_element_with_html_on_load("body", "plugins/pm/pm.html");
  },

  post_transform: async function (message) {
    const words = message.trim().split(' ')
    if (words.length <= 2 || words[0] !== 'PM' || words[1][0] !== '@') return message; // normal non-PM message simply pass through

    words.shift() // drop the word "PM"
    const toUsername = words.shift()
      .replace('@', '')
      .replace(',', '')
      .replace(':', '')
      .replace('/', '') // @username, => username
    
    message = words.join(' ') // restore the actual message

    // XXX hack for working around the issue of being able to sign up with different upper/lowercase combinations. Will be simplified soon.
    const toId = toUsername === 'ericvrp' ? 7 : await contract_accounts.methods.id_by_username(toUsername).call();
    if (toId === "0") {
      alert(`Unknown username: ${toUsername}`);
      return ""; // don't post
    }

    const toPublicKey = await contract_accounts.methods.public_key_by_id(toId).call();
    // console.log('toPublicKey', toPublicKey, toPublicKey.length, typeof toPublicKey);
    if (!toPublicKey) {
      alert(`User ${toUsername} has not enabled private messaging! (no public key set)`);
      return ""; // don't post
    }

    const encryptedMessage = await pm.encrypt(message, toPublicKey);
    console.log(`Encrypted private message "${encryptedMessage}" to ${toUsername} (${toId}) with publicKey ${toPublicKey}`);
    
    const decryptedMessage = pm.decrypt(encryptedMessage);
    console.log(`When I try to decrypt this myself I get: ${await pm.decrypt(encryptedMessage)}`)

    return ""; // don't post for now
  },
});

const pm = {
  // private
  _test: async function () {
    const message = "Greetings from Alice to Bob!";
    
    const privateKey = {
      alice: "0x308e8e170faa394ffc5a27a91108461f4e028c45cf50913ac4a9b4b2743aa59b",
      bob: "0xa779ad5969e5b4f3a01266f52c55bd72dd25260fd86124180eb0b81cde55d41b"
    }

    const publicKey = {
      alice: EthCrypto.publicKeyByPrivateKey(privateKey.alice),
      bob: EthCrypto.publicKeyByPrivateKey(privateKey.bob),
    }

    const encryptedStringFromAliceToBob = await this.encrypt(message, publicKey.bob, privateKey.alice);
    console.log("encryptedStringFromAliceToBob:", encryptedStringFromAliceToBob);

    const decryptedByAlice = await this.decrypt(encryptedStringFromAliceToBob, privateKey.alice);
    console.log("decryptedByAlice:", decryptedByAlice);

    const decryptedByBob = await this.decrypt(encryptedStringFromAliceToBob, privateKey.bob);
    console.log("decryptedByBob:", decryptedByBob);    
  }, // end of _test()

  // public
  setPublicKey: async function () {
    const publicKey = EthCrypto.publicKeyByPrivateKey( get_private_key() );
    // console.log('setPublicKey', publicKey);
    /*await*/ execute_contract_function(web3, contract_accounts.methods.set_public_key(publicKey));
  },

  // const encryptForUsername = async (secretMessage, username, fromPrivateKey) => {
  //   const publicKey = await contract_accounts.methods
  //     .id_by_username(username)
  //     .call();
  //   return encryptForId(secretMessage, publicKey, fromPrivateKey);
  // }

  // this should get the signature instead of address so we can compute the publicKey
  // const encryptForId = async (secretMessage, id, fromPrivateKey) => {
  //   const publicKey = await contract_accounts.methods.address_by_id(id).call();
  //   return encrypt(secretMessage, publicKey, fromPrivateKey);
  // }

  encrypt: async function (
    secretMessage,
    toPublicKey,
    fromPrivateKey = undefined
  ) {
    const signature = EthCrypto.sign(
      fromPrivateKey || get_private_key(),
      EthCrypto.hash.keccak256(secretMessage)
    );
    // console.log("signature:", signature);
  
    const payload = {
      message: secretMessage,
      signature,
    };
    // console.log("payload", payload);
  
    // console.log("toPublicKey:", toPublicKey);
    const encrypted = await EthCrypto.encryptWithPublicKey(
      toPublicKey,
      JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
    );
    // console.log("encrypted:", encrypted);
  
    const encryptedString = EthCrypto.cipher.stringify(encrypted);
    // console.log("encryptedString:", encryptedString);
  
    return encryptedString;
  }, // end of encrypt(...)
  
  //
  decrypt: async function (
    encryptedString,
    recieverPrivateKey
  ) {
    try {
      const encryptedObject = EthCrypto.cipher.parse(encryptedString); // we parse the string into the object again
    
      const decrypted = await EthCrypto.decryptWithPrivateKey(
        recieverPrivateKey || get_private_key(),
        encryptedObject
      );
      const decryptedPayload = JSON.parse(decrypted);
      // console.log("decryptedPayload:", decryptedPayload);
    
      // check signature
      const senderAddress = EthCrypto.recover(
        decryptedPayload.signature,
        EthCrypto.hash.keccak256(decryptedPayload.message)
      );
      // console.log("senderAddress:", senderAddress);
    
      return decryptedPayload.message;
    } catch (e) {
      return undefined;
    }
  }, // end of decrypt(...)

} // end of pm 'namespace'
