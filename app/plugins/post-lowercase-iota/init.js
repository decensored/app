register_plugin({
  name: "post-lowercase-iota",
  post_transform: postLowercaseIOTA,
});

function postLowercaseIOTA(message) {
  const transformedMessage = message
    .replace("IOTA", "iota")
    .replace("Iota", "iota");

  // if (message != transformedMessage) {
  //   console.log("postLowercaseIOTA", message, "->", transformedMessage);
  // }

  return transformedMessage;
}
