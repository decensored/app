window.onerror = function myErrorHandler(error_message) {
    alert("ERROR: " + error_message);
    console.error(error_message);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('pwaworker.js').then(function(registration) {
      registration.update();
    }).catch(function(error) {
      console.log('Registration failed with ' + error);
    });
  };

function init_header() {
    $("#init-header").load("templates/header.html", function() {
        $loaded = $("#header");
        if($loaded.parent().attr('id') === 'init-header') {
            $loaded.unwrap();
        }
    });
}

function init_navbar() {
    $("#init-navbar").load("templates/navbar.html", function() {
        $loaded = $("#navbar");
        if($loaded.parent().attr('id') === 'init-navbar') {
            $loaded.unwrap();
        }
        set_active_nav_item(get_active_page_url());
    });
}

function init_feed() {
    $("#init-feed").load("pages/feed/feed.html", function() {
        $loaded = $("#feed");
        if($loaded.parent().attr('id') === 'init-feed') {
            $loaded.unwrap();
        }
        let $message = $("#message");
        $message.css("display","none");
        autosize($message);
        $message.css("display","block");
    });
}

function init_spaces() {
    $("#init-spaces").load("pages/spaces/spaces.html", function() {
        $loaded = $("#spaces");
        if($loaded.parent().attr('id') === 'init-spaces') {
            $loaded.unwrap();
        }
    });
}

function init_plugins() {
    init_block_users();
    init_private_key_recovery();
    init_settings();
}

async function init_app() {
    $('#recover').hide();

    await init_contract_accounts();
    await init_post_fetcher();
    update_feed_every_interval(3000);

    await set_profile_title();
    await show_or_hide_signup_screen();

    update_view_according_to_scroll();
    $(window).scroll(function(){
        update_view_according_to_scroll();
    });

    $('body').css("opacity", "1");
}

$(document).ready(async () => {
    init_header();
    init_navbar();

    init_plugins()

    init_routing();
    init_app();
});