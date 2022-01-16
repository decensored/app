function toggle_header_logo(variant, time) {
    const duration = time;

    if(variant === 'signet') {
        $('#logo #signet').animate({opacity: 1}, duration);
        $('#logo #logotype').animate({opacity: 0}, duration);
    } else if(variant === 'logotype') {
        $('#logo #logotype').animate({opacity: 1}, duration);
    }
}

function init_input_placeholder() {
    get_username().then(username => {
        let $message = $('#message');
        $message.attr("placeholder", username + ", your story starts here...");
        $message.fadeTo( "fast" , 1);
    });
}

function show_sign_up_screen() {
    $('#screen_sign_up').detach().appendTo($('#header'));
    $('#screen_sign_up').show();
}

function hide_sign_up_screen() {
    toggle_header_logo('logotype', 0);
    init_input_placeholder();
    $('#screen_sign_up').slideUp();
    $('#input').slideDown();
    $('#logout-button').show();
}

async function show_or_hide_signup_screen() {
    if(await is_signed_up()) {
        hide_sign_up_screen();
        $('#myposts').show();
        $("#privateKey").val(get_private_key());
    } else {
        show_sign_up_screen();
    }
}

function scroll_to_top() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

function update_view_according_to_scroll() {
    elementOffset = $('#spread-bar').offset().top;
    windowOffset = $(window).scrollTop();
    scrollOffset = elementOffset - windowOffset;

    if (scrollOffset > 0){
        $('#submit').removeClass('hidden');
        $('#to-top').addClass('hidden');
    } else {
        $('#submit').addClass('hidden');
        $('#to-top').removeClass('hidden');
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