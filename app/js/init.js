window.onerror = function myErrorHandler(error_message) {
  alert("ERROR: " + error_message);
  console.error(error_message);
};

function init_header() {
  $("#init-header").load("templates/header.html", function () {
    $("#header").unwrap();
  });
}

function init_feed() {
  $("#init-feed").load("templates/feed.html", function () {
    $("#feed").unwrap();
    let $message = $("#message");
    $message.css("display", "none");
    autosize($message);
    $message.css("display", "block");
  });
}

function init_navbar() {
  $("#init-navbar").load("templates/navbar.html", function () {
    $("#navbar").unwrap();
  });
}

function show_profile_username(profile_username) {
  let $profile_title = $(
    "<div class='text-center text-xl font-bold mb-5'></div>"
  ).text(profile_username);

  $("#feed > .container").prepend($profile_title);
}

async function customize_site_to_username() {
  let username = await get_username();
  let profile_username = get_profile_username();

  if (profile_username && username !== profile_username) {
    $("#input").css("display", "none");
    show_profile_username(profile_username);
  }

  $("#profile").attr("href", "?u=" + username);
}

async function init_contract_accounts() {
  let contract_accounts_address = await contract_posts.methods
    .accounts()
    .call();
  contract_accounts = new web3.eth.Contract(
    CONTRACT_ACCOUNTS_ABI,
    contract_accounts_address
  );
}

function update_feed_every_interval(interval_in_ms) {
  update_feed();
  setInterval(update_feed, interval_in_ms);
}

function init_overlay() {
  $("#inits").load("./templates/inits.html", async () => {
    $("#overlay").unwrap();
    $("#recover").hide();

    await init_contract_accounts();
    await init_post_fetcher();
    update_feed_every_interval(3000);

    await customize_site_to_username();
    await show_or_hide_signup_screen();
    $("body").css("opacity", "1");
  });
}

//
let plugins = {
  debug: false,
  registered: [],
  disabled: {},
};

function register_plugin(plugin) {
  if (plugins.debug) console.log("register_plugin", plugin);
  plugins.registered.push(plugin);
}

function disable_plugin(name, isDisabled = true) {
  if (plugins.debug) console.log("disable_plugin", name, isDisabled);
  plugins.disabled[name] = isDisabled;
}

function call_plugins(functionName, functionParam) {
  if (plugins.debug) console.log("call_plugins", functionName, functionParam);

  for (const plugin of plugins.registered) {
    if (plugins.disabled[plugin.name] || !plugin[functionName]) continue;
    if (plugins.debug)
      console.log("call_plugins", plugin.name, functionName, functionParam);
    functionParam = plugin[functionName](functionParam);
  }

  return functionParam;
}

//
$(document).ready(async () => {
  init_header();
  init_feed();
  init_navbar();
  init_overlay();
  call_plugins("init");
});
