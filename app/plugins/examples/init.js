// test this by posting "LOWERCASE uppercase" or "FILTER ME!"

plugins.register({
  name: "examples",

  init: function () { 
    // console.log('examples plugin initialized');
  },

  filter_post: function (post) {
    if (post.message === "FILTER ME!") return { ...post, message: "" }; // delete message to indicate message has been filtered out
    return post;
  },

  post_transform: function (message) {
    return message.replace("LOWERCASE", "lowercase")
  },

  display_transform: function (message) {
    return message.replace("uppercase", "UPPERCASE")
  }
});
