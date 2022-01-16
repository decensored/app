register_plugin({ name: "pm", init: init_pm });

function init_pm() {
  append_element_with_html_on_load("#overlay", "./plugins/pm/pm.html");
}

/*
  during sign_up:
    const signature = EthCrypto.sign(get_private_key(), EthCrypto.hash.keccak256(""));
    Brave  account 1
      privateKey: 0x308e8e170faa394ffc5a27a91108461f4e028c45cf50913ac4a9b4b2743aa59b
      signature : 0x609581ef6b407187fbb3659ddbf99990e40b95ba4867a5d89e6ffcb5c493c45c326bba4e60f4c2f99e7b831cad662f7c1f22839a50b13c064078d951f731a9751b
      publicKey : d15e67e909677a8d4f710aaae3f1040adb8a07bc08720ac0650a439c4f5e7f778959bbb685d8ab796cdba85f6096eb2c89bf61fa1f55819bd6172263fbb36db4
    Chrome account 2
      privateKey: 0xa779ad5969e5b4f3a01266f52c55bd72dd25260fd86124180eb0b81cde55d41b
      signature : 0xe7d0db5d1c6816ec51c1c564d3327697f87f94b5f0a866462b051b4d97cdec060b81be144c0fb56310a1c5f51b4e5ca1108d5c16a4de3668f2a64553a90fbe831c
      publicKey : 8df5cde616a0f9266078c570df7e8983269cf51c50732141005e3807bf0840aa7c41ba9f836c23ddf0c3c96596622d587ecdd85b8a7fbf4bc3af05e4e46ddb57

  get recipient publicKey before sending private message:
    const publicKey = EthCrypto.recoverPublicKey(signature, EthCrypto.hash.keccak256(""));

  await encryptForPublicKey('some secret message', publicKey)
*/

// const encryptForUsername = async (secretMessage, username, fromPrivateKey) => {
//   const publicKey = await contract_accounts.methods
//     .id_by_username(username)
//     .call();
//   return encryptForId(secretMessage, publicKey, fromPrivateKey);
// };

// this should get the signature instead of address so we can compute the publicKey
// const encryptForId = async (secretMessage, id, fromPrivateKey) => {
//   const publicKey = await contract_accounts.methods.address_by_id(id).call();
//   return encryptForPublicKey(secretMessage, publicKey, fromPrivateKey);
// };

const encryptForPublicKey = async (
  secretMessage,
  toPublicKey,
  fromPrivateKey
) => {
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
};

const decrypt = async (encryptedString, recieverPrivateKey) => {
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
};

//
