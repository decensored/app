// https://github.com/pubkey/eth-crypto
// https://github.com/pubkey/eth-crypto/blob/master/tutorials/encrypted-message.md

const EthCrypto = require("eth-crypto");

const encrypt = async (from, to, secretMessage) => {
  /*
First we create two identities, Alice and Bob. In our case Alice want to send the message My name is Satoshi Buterin to Bob.
*/

  /*
Encrypt and sign the message
Before we send the message from Alice to Bob, we want to ensure that

Only Bob can read the message
Bob can be sure that the message really comes from Alice
To do this, we first sign the message with alice's privateKey and then encrypt the message and the signature with bob's publicKey.
*/
  const signature = EthCrypto.sign(
    alice.privateKey,
    EthCrypto.hash.keccak256(secretMessage)
  );
  const payload = {
    message: secretMessage,
    signature,
  };
  const encrypted = await EthCrypto.encryptWithPublicKey(
    bob.publicKey, // by encryping with bobs publicKey, only bob can decrypt the payload with his privateKey
    JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
  );
  // console.log(encrypted);
  /* {
    iv: 'c66fbc24cc7ef520a7...',
    ephemPublicKey: '048e34ce5cca0b69d4e1f5...',
    ciphertext: '27b91fe986e3ab030...',
    mac: 'dd7b78c16e462c42876745c7...'
    } */

  // we convert the object into a smaller string-representation
  const encryptedString = EthCrypto.cipher.stringify(encrypted);
  // > '812ee676cf06ba72316862fd3dabe7e403c7395bda62243b7b0eea5eb..'

  return encryptedString; // now we send the encrypted string to bob over the internet.. *bieb, bieb, blob*};
};

/*
    When bob receives the message, he starts with decrypting it with his privateKey and then verifies the signature.
*/
const decrypt = async (encryptedString, recipient) => {
  // we parse the string into the object again
  const encryptedObject = EthCrypto.cipher.parse(encryptedString);

  const decrypted = await EthCrypto.decryptWithPrivateKey(
    recipient.privateKey,
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

encrypt(alice, bob, secretMessage)
  .then((encrypted) => {
    console.log("encrypted by alice for bob:", encrypted);

    decrypt(encrypted, bob)
      .then((decrypted) => {
        console.log("decrypted by bob:", decrypted);
      })
      .catch((e) => console.error("decrypt (bob) error:", e));

    decrypt(encrypted, satoshi)
      .then((decrypted) => {
        console.log("decrypted by satoshi:", decrypted);
      })
      .catch((e) => console.error("decrypt (satashi) error:", e));
  })
  .catch((e) => console.error("encrypt error:", e));

//
