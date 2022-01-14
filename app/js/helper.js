function init_input_placeholder() {
    get_username().then(username => {
        let $message = $('#message');
        $message.attr("placeholder", username + ", your story starts here...");
        $message.fadeTo( "fast" , 1);
    });
}

function show_sign_up_screen() {
    $('#screen_sign_up').removeClass('hidden');
    $('#nav').css("display", "none");
}

function hide_sign_up_screen() {
    init_input_placeholder();
    $('#screen_sign_up').fadeOut();

}

async function show_or_hide_signup_screen() {
    if(await is_signed_up()) {
        hide_sign_up_screen();
        $("#privateKey").val(get_private_key());
    } else {
        show_sign_up_screen();
    }
}

function scroll_to_top() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

$(document).ready(function() {
    update_view_according_to_scroll();
    $(window).scroll(function(){
        update_view_according_to_scroll();
    });
});

function update_view_according_to_scroll() {
    if ($(window).scrollTop() > 0){
        $('#submit').addClass('hidden');
        $('#to-top').removeClass('hidden');
    } else if ($(window).scrollTop() < 500){
        $('#submit').removeClass('hidden');
        $('#to-top').addClass('hidden');
    }
}

function set_post_input_char_count() {
    value = $('#message').val();
    length = value.length;
    $('#message-count').text(280 - length + ' of 280');
}

function set_body_scrolling(enabled) {
    if(enabled) {
        $('body').addClass('overflow-hidden')
    } else {
        $('body').removeClass('overflow-hidden')
    }
}

function toggle_settings_dialog() {
    let $dialog = $('#settings_dialog')
    let is_becoming_visible = $dialog.hasClass('hidden');
    set_body_scrolling(is_becoming_visible)
    $dialog.animate({ opacity: is_becoming_visible ? 1 : 0 }, 'fast');
    $dialog.toggleClass("hidden");
}

function save_settings_dialog() {
    set_body_scrolling(true)
    toggle_settings_dialog()
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
    };
}
