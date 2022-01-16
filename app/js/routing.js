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

function active_nav_item(item) {
    $active_item = $(item);
    $active_item.removeClass('text-decensored-900 dark:text-decensored-500');
    $active_item.addClass('text-purple-800 dark:text-decensored-100 pointer-events-none');
}

function set_active_nav_item() {
    let p = get_url_param("p");
    let s = get_url_param("s");
    let u = get_url_param("u");

    if(p === "spaces_own") {
        active_nav_item('#navbar-item-spaces');
        return;
    }
    if(p === "spaces_all") {
        active_nav_item('#navbar-item-spaces');
        return;
    }
    if(s) {
        active_nav_item('#navbar-item-spaces');
        return;
    }
    if(u) {
        active_nav_item('#navbar-item-myposts');
        return;
    }

    active_nav_item('#navbar-item-feed');
    return;
}

function init_routing() {
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

function set_route(view) {
    let profile = $('#navbar-item-' + view).attr("dataProfile");

    switch (view) {
        case 'feed':
            window.location.href = '?';
            break;
        case 'spaces':
            window.location.href = '?p=spaces_own';
            break;
        case 'myposts':
            if(profile) {
                window.location.href = '?u=' + profile;
            } else {
                window.location.href = '?';
            }
            break;
        default:
            window.location.href = '?';
            break;
    }
}