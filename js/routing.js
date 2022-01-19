const ENUM_PAGES = {
    FEED: 1,
    PROFILE: 2,
    SPACES: 3,
    SPACE: 4,
}

function get_page() {
    let p = get_url_param("p");
    let s = get_url_param("s");
    let u = get_url_param("u");

    if(p === "spaces") {
        return ENUM_PAGES.SPACES;
    }
    if(s) {
        return ENUM_PAGES.SPACE;
    }
    if(u) {
        return ENUM_PAGES.PROFILE;
    }

    return ENUM_PAGES.FEED;
}

function init_routing() {
    let page = get_page();
    switch (page) {
        case ENUM_PAGES.FEED:
            init_feed();
            break;
        case ENUM_PAGES.PROFILE:
            init_feed();
            break;
        case ENUM_PAGES.SPACES:
            init_spaces();
            break;
        case ENUM_PAGES.SPACE:
            init_space();
            break;
    }
}

function get_active_page_url() {
    let p = get_url_param("p");
    let s = get_url_param("s");
    let u = get_url_param("u");

    if(p === "spaces") {
        return 'spaces';
    }
    if(s) {
        return 'space';
    }
    if(u) {
        return 'myposts';
    }

    return 'feed';
}

function set_route_feed() {
    window.location.href = '/';
}

function set_route_spaces() {
    window.location.href = '?p=spaces';
}

function set_route_myposts() {
    let profile = $('#navbar-item-myposts').attr("dataProfile");

    if(profile) {
        window.location.href = '?u=' + profile;
    } else {
        window.location.href = '?';
    }
}