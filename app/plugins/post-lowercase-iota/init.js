register_plugin({
  name: "post-lowercase-iota",
  post_transform: postLowercaseIOTA,
});

function postLowercaseIOTA(message) {
  const transformedMessage = message
    .replace("IOTA", "iota")
    .replace("Iota", "iota");

  console.log("postLowercaseIOTA", message, "->", transformedMessage);

  return transformedMessage;
}
