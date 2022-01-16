register_plugin({
  name: "display-uppercase-iota",
  display_transform: displayUppercaseIOTA,
});

function displayUppercaseIOTA(message) {
  const transformedMessage = message
    .replace("iota", "IOTA")
    .replace("Iota", "IOTA");

  // if (message != transformedMessage) {
  //   console.log("displayUppercaseIOTA", message, "->", transformedMessage);
  // }

  return transformedMessage;
}
