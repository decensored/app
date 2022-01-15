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