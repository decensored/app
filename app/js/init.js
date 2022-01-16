window.onerror = function myErrorHandler(error_message) {
    alert("ERROR: " + error_message);
    console.error(error_message);
}

function init_header() {
    $("#init-header").load("templates/header.html", function() {
        $loaded = $("#header");
        if($loaded.parent().attr('id') === 'init-header') {
            $loaded.unwrap();
        }
    });
}

function init_feed() {
    $("#init-feed").load("templates/feed.html", function() {
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
    $("#init-spaces").load("templates/spaces.html", function() {
        $loaded = $("#spaces");
        if($loaded.parent().attr('id') === 'init-spaces') {
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

function show_profile_username(profile_username) {
    let $profile_title = $("<div class='text-center text-xl font-bold mb-5'></div>")
        .text(profile_username)

    $('#feed > .container')
        .prepend($profile_title);
}

async function customize_site_to_username() {
    let username = await get_username();
    let profile_username = get_profile_username();

    if(profile_username && username !== profile_username) {
        $('#input').css("display", "none");
        show_profile_username(profile_username);
    }

    $('#myposts').attr('href', "?u="+username);
}

async function init_contract_accounts() {
    let contract_accounts_address = await contract_posts.methods.accounts().call();
    contract_accounts = new web3.eth.Contract(CONTRACT_ACCOUNTS_ABI, contract_accounts_address);
}

function update_feed_every_interval(interval_in_ms) {
    update_feed();
    setInterval( update_feed, interval_in_ms);
}

function init_overlay() {
    $("#inits").load("./templates/inits.html", async () => {
        $loaded = $("#overlay");
        if($loaded.parent().attr('id') === 'inits') {
            $loaded.unwrap();
        }

        $('#recover').hide();

        await init_contract_accounts();
        await init_post_fetcher();
        update_feed_every_interval(3000);

        await customize_site_to_username();
        await show_or_hide_signup_screen();

        update_view_according_to_scroll();
        $(window).scroll(function(){
            update_view_according_to_scroll();
        });

        $('body').css("opacity", "1");
    });
}

function init_plugins() {
    init_block_users();
    init_private_key_recovery();
    init_settings();
    init_approve_account();
}

function get_url_param(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const ENUM_PAGES = {
    FEED: 1,
    SPACES_OWN: 2,
    PROFILE: 3,
    SPACES_ALL: 4,
    SPACE: 5,
}

function get_page() {
    let p = get_url_param("p");
    let s = get_url_param("s");
    let u = get_url_param("u");

    if(p === "spaces_own") {
        return ENUM_PAGES.SPACES_OWN;
    }
    if(p === "spaces_all") {
        return ENUM_PAGES.SPACES_ALL;
    }
    if(s) {
        return ENUM_PAGES.SPACE;
    }
    if(u) {
        return ENUM_PAGES.PROFILE;
    }
    return ENUM_PAGES.FEED;
}

function init_page_content() {
    let page = get_page();
    switch (page) {
        case ENUM_PAGES.FEED:
            init_feed();
            break;
        case ENUM_PAGES.SPACES_OWN:
            init_spaces();
            break;
        case ENUM_PAGES.SPACES_ALL:
            // TODO init spaces_all
            break;
        case ENUM_PAGES.SPACE:
            // TODO init space
            break;
        case ENUM_PAGES.PROFILE:
            // TODO init profile
            init_feed();
            break;
    }
}

$(document).ready(async () => {
    init_header();
    init_page_content();
    init_navbar();
    init_overlay();
    init_plugins();
});