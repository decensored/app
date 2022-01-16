register_plugin({ name: "approve_account", init: init_approve_account });

function init_approve_account() {
    append_element_with_html_on_load('#overlay', "./plugins/approve_account/approve_dialog.html");
    let interval = setInterval(async function(){
        if(contract_accounts){
            clearInterval(interval);
            if(await is_signed_up()) {
                return;
            } else {
                toggle_account_approval_dialog();
            }
        }
    }, 20);
}

function toggle_account_approval_dialog() {
    $("#address").val(get_address());
    let $dialog = $('#approve_account_dialog')
    let is_becoming_visible = $dialog.hasClass('hidden');
    set_body_scrolling(is_becoming_visible)
    $dialog.animate({ opacity: is_becoming_visible ? 1 : 0 }, 'fast');
    $dialog.toggleClass("hidden");
}

async function on_copy_address_button_pressed() {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(get_address());
    } else {
        console.log('Copy to clipboard function requires a secure origin');
    }
}

async function on_close_approval_dialog_clicked() {
    toggle_account_approval_dialog();
}