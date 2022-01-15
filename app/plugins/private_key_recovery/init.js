function append_element_with_html($element, path_html) {
    $.get(path_html, function(data) {
        $element.append(data);
    });
}

function append_element_with_html_on_load(element_identifier, path_html) {
    execute_once_element_exists(element_identifier, $el => (
        append_element_with_html($el, path_html)
    ))
}

function execute_once_element_exists(element_identifier, callback) {
    let interval = setInterval(function(){
        if($(element_identifier).length > 0){
            clearInterval(interval);
            callback($(element_identifier));
        }
    }, 20);
}

function init_private_key_recovery() {
    append_element_with_html_on_load('#signup_or_recover_form', "./plugins/private_key_recovery/recover.html")
    append_element_with_html_on_load( '#settings_dialog_inner', "./plugins/private_key_recovery/copy.html");
    append_element_with_html_on_load( '#screen_signup_inner', "./plugins/private_key_recovery/toggle.html")
}

async function on_recover_account_button_pressed() {
    const privateKey = $("#credentials").val();
    set_private_key(privateKey);
    location.reload();
}

async function on_copy_credentials_button_pressed() {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(get_private_key());
    } else {
        console.log('Copy to clipboard function requires a secure origin');
    }
}