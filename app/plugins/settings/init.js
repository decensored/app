plugins.register({ name: "settings", init: init_settings });

function init_settings() {
    append_element_with_html_on_load('body', "./plugins/settings/settings.html");
    execute_once_element_exists("#settings_input", $el => {
        $el.text(JSON.stringify(get_config(), null, 4));
    })
}

function toggle_settings_dialog() {
    let $dialog = $('#settings_dialog')
    let is_becoming_visible = $dialog.hasClass('hidden');
    if(is_becoming_visible) {
        $("#blocked-user-tags").html('');
        append_blocked_users_to_div();
    } 
    set_body_scrolling(is_becoming_visible)
    $dialog.animate({ opacity: is_becoming_visible ? 1 : 0 }, 'fast');
    $dialog.toggleClass("hidden");
}


function save_settings_dialog() {
    let config_string = $('#settings_input').val().replaceAll("\n", "");
    let config = JSON.parse(config_string);
    set_config(config);
    set_body_scrolling(true)
    toggle_settings_dialog()
}
