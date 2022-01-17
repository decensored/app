plugins.register({ name: "settings", init: init_settings });

function init_settings() {
    append_element_with_html_on_load('body', "./plugins/settings/settings.html");
    execute_once_element_exists("#evm_node", $el => {
        $el.val(get_node_url());
    })
    execute_once_element_exists("#chain_id", $el => {
        $el.val(get_chain_id());
    })
}

function toggle_settings_dialog() {
    let $dialog = $('#settings_dialog')
    let is_becoming_visible = $dialog.hasClass('hidden');
    if(is_becoming_visible) {
        toggle_account_settings();
        $("#blocked-user-tags").html('');
        append_blocked_users_to_div();
    } 
    set_body_scrolling(is_becoming_visible)
    $dialog.animate({ opacity: is_becoming_visible ? 1 : 0 }, 'fast');
    $dialog.toggleClass("hidden");
}

function toggle_account_settings() {
    $("#settings_node").hide();
    $("#save_node_settings_button").hide();
    $("#settings_node_button").removeClass('bg-gray-300').addClass('bg-gray-100');
    $("#settings_account").show();
    $("#logout_button").show();
    $("#settings_account_button").removeClass('bg-gray-100').addClass('bg-gray-300');
}

function toggle_node_settings() {
    $("#settings_account").hide();
    $("#settings_account_button").removeClass('bg-gray-300').addClass('bg-gray-100');
    $("#logout_button").hide();
    $("#settings_node").show();
    $("#save_node_settings_button").show();
    $("#save_node_settings").show();
    $("#settings_node_button").removeClass('bg-gray-100').addClass('bg-gray-300');
}

function save_settings_dialog() {
    //let config_string = $('#settings_input').val().replaceAll("\n", "");
    let evm_node = $("#evm_node").val();
    let chain_id = $("#chain_id").val()
    if(evm_node && chain_id) {
        let config = get_config();
        config.evm_node = evm_node;
        config.chain_id = chain_id;
        set_config(config);
        set_body_scrolling(true)
        toggle_settings_dialog()
    }
}

function get_node_url() {
    const config = get_config();
    const node_url = config.evm_node;
    return node_url;
}

function get_chain_id() {
    const config = get_config();
    const chain_id = config.chain_id;
    return chain_id;
}
