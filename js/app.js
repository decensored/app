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

async function observe_login_status() {
    if(await is_signed_up()) {
        hide_sign_up_screen();
        show_create_space_form();
        customize_app_for_loggedin_user();
    } else {
        show_sign_up_screen();
        hide_create_space_form();
    }
}

async function init_app() {
    $('#recover').hide();

    await init_contract_accounts();
    await init_post_fetcher();
    await set_profile_title();
    await observe_login_status();

    /* TODO: Place it where it belongs, right now it gets loaded even you are on the wrong page */
    update_feed_every_interval(3000); 
    load_all_spaces_to_view(); 

    update_view_according_to_scroll();
    
    $(window).scroll(function(){
        update_view_according_to_scroll();
    });

    set_active_nav_item(get_active_page_url());
    $('body').css("opacity", "1");
}

$(document).ready(async () => {
    init_routing();
    init_header();
    init_navbar();

    plugins.call("init")

    init_app();
});
