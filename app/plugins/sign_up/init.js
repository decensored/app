plugins.register({ name: "sign_up" });

async function on_sign_up_button_pressed() {
    let username = $('#username').val();
    execute_contract_function(web3, contract_accounts.methods.sign_up(username))
        .then(async _ => { await observe_login_status() })
        .catch(error => { alert(error) })
}

function signup_or_recover_toggle() {
    let $signup_form = $('#signup_form');
    let $recover_form = $('#recover_form');
    let $signup_toggle = $('#signup_toggle');
    let $recover_toggle = $('#recover_toggle');

    const duration = '500';
    const fadeOut = { opacity: 0, transition: 'opacity ' + duration + 'ms' };
    const fadeIn = { opacity: 1, transition: 'opacity ' + duration + 'ms' };

    if($recover_form.css('display') === 'none') {
        $signup_form.css(fadeOut).slideUp(duration);
        $recover_form.css(fadeIn).slideDown(duration);
        $signup_toggle.addClass('hidden');
        $recover_toggle.removeClass('hidden');
    } else {
        $signup_form.css(fadeIn).slideDown(duration);
        $recover_form.css(fadeOut).slideUp(duration);
        $signup_toggle.removeClass('hidden');
        $recover_toggle.addClass('hidden');
    }
}

function show_sign_up_screen() {
    let $sign_up_form = $new_el_with_attr("div", null, "signup-init");
    $("body").append($sign_up_form);

    $sign_up_form.load("plugins/sign_up/sign_up.html", function() {
        $loaded = $("#screen_sign_up");
        if($loaded.parent().attr('id') === 'signup-init') {
            $loaded.unwrap();
        }
        $sign_up_form = $('#screen_sign_up');
        $sign_up_form.detach().appendTo($('#header'));
        $sign_up_form.show();
    });
}

function hide_sign_up_screen() {
    toggle_header_logo('logotype', 0);
    $('#screen_sign_up').slideUp();
    $('#input').slideDown();
}