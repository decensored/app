# Decensored plugins documentation

Plugins should register themselves and provide functions that will be called by the Decensored core.
Supported (optionally async) functions and their intended no-operation are as follows:

- init() { }
- filter_post(post) { return post; }             // return post with empty message string when this post should not be shown
- display_transform(message) { return message; } // return empty string to hide this post
- post_transform(message) { return message; }    // return empty string to cancel posting

(see also: plugins/example/init.js)
