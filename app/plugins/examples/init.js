// test this by posting: LOWERCASE uppercase

plugins.register({
  name: "examples",

  init: function () { 
    // console.log('examples plugin initialized');
  },

  post_transform: function (message) {
    return message.replace("LOWERCASE", "lowercase")
  },

  display_transform: function (message) {
    return message.replace("uppercase", "UPPERCASE")
  }
});
