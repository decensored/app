// https://github.com/pubkey/eth-crypto
// https://github.com/pubkey/eth-crypto/blob/master/tutorials/encrypted-message.md

const EthCrypto = require("eth-crypto");

const encrypt = async (fromPrivateKey, toPublicKey, secretMessage) => {
  /*
    First we create two identities, Alice and Bob. In our case Alice want to send the message My name is Satoshi Buterin to Bob.
  */

  /*
    Encrypt and sign the message.
    
    Before we send the message from Alice to Bob, we want to ensure that Only Bob can read the message.
    Bob can be sure that the message really comes from Alice.
    To do this, we first sign the message with alice's privateKey and then encrypt the message and the signature with bob's publicKey.
  */
  const signature = EthCrypto.sign(
    fromPrivateKey,
    EthCrypto.hash.keccak256(secretMessage)
  );
  const payload = {
    message: secretMessage,
    signature,
  };
  const encrypted = await EthCrypto.encryptWithPublicKey(
    toPublicKey, // by encryping with 'to' publicKey, only 'to' can decrypt the payload with his privateKey
    JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
  );
  // console.log(encrypted);
  /* {
    iv: 'c66fbc24cc7ef520a7...',
    ephemPublicKey: '048e34ce5cca0b69d4e1f5...',
    ciphertext: '27b91fe986e3ab030...',
    mac: 'dd7b78c16e462c42876745c7...'
    } */

  return EthCrypto.cipher.stringify(encrypted); // we convert the object into a smaller string-representation
};

/*
    When bob receives the message, he starts with decrypting it with his privateKey and then verifies the signature.
*/
const decrypt = async (encryptedString, recipientPrivateKey) => {
  // we parse the string into the object again
  const encryptedObject = EthCrypto.cipher.parse(encryptedString);

  const decrypted = await EthCrypto.decryptWithPrivateKey(
    recipientPrivateKey,
    encryptedObject
  );
  const decryptedPayload = JSON.parse(decrypted);

  // check signature
  const senderAddress = EthCrypto.recover(
    decryptedPayload.signature,
    EthCrypto.hash.keccak256(decryptedPayload.message)
  );

  return { senderAddress, payload: decryptedPayload };
};

//
const alice = EthCrypto.createIdentity();
const bob = EthCrypto.createIdentity();
const satoshi = EthCrypto.createIdentity();

const secretMessage = "My name is Satoshi Buterin";

encrypt(alice.privateKey, bob.publicKey, secretMessage)
  .then((encrypted) => {
    // console.log("Encrypted by Alice for Bob:", encrypted);

    decrypt(encrypted, bob.privateKey)
      .then((decrypted) => {
        console.log("Decrypted by Bob:", decrypted);
      })
      .catch((e) => {
        console.error("Bob can't decrypt Alice' encrypted message");
      });

    decrypt(encrypted, satoshi.privateKey)
      .then((decrypted) => {
        console.log("Decrypted by Satoshi:", decrypted);
      })
      .catch((e) => {
        console.error(
          "It is correct that Satoshi can't decrypt Alice' encrypted message"
        );
      });
  })
  .catch((e) => console.error("Encryption error:", e));

//
