plugins.register({ name: "private_key_recovery", init: init_private_key_recovery });

function init_private_key_recovery() {
    append_element_with_html_on_load('#signup_or_recover_form', "./plugins/private_key_recovery/recover.html")
    append_element_with_html_on_load('#settings_account_recovery', "./plugins/private_key_recovery/copy.html");
    append_element_with_html_on_load('#screen_signup_inner', "./plugins/private_key_recovery/toggle.html")
}

async function on_recover_account_button_pressed() {
    const privateKey = $("#credentials").val();
    check_for_invalid_input(privateKey, /[^A-Za-z0-9_]/, 66, 66).then(function(result) {
        if($.isEmptyObject(result)) {
            set_private_key(privateKey);
            location.reload();
        } else {
            invalid_input_message(
                result.pattern,
                result.minLength,
                result.maxLength
            ).then(function(message) {
                alert(message)
            });
        };
    })
}

async function on_copy_credentials_button_pressed() {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(get_private_key());
    } else {
        console.log('Copy to clipboard function requires a secure origin');
    }
}