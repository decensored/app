function toggle_header_logo(variant, time) {
    const duration = time;

    if(variant === 'signet') {
        $('#logo #signet').animate({opacity: 1}, duration);
        $('#logo #logotype').animate({opacity: 0}, duration);
    } else if(variant === 'logotype') {
        $('#logo #logotype').animate({opacity: 1}, duration);
    }
}

async function observe_login_status() {
    if(await is_signed_up()) {
        hide_sign_up_screen();
        show_create_space_form();
        customize_app_for_loggedin_user();
    } else {
        show_sign_up_screen();
        hide_create_space_form();
    }
}

function scroll_to_top() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

function update_view_according_to_scroll() {
    $spread_bar = $('#spread-bar');
    $input = $('#input');

    if($spread_bar.length && $input.is(":visible")) {
        elementOffset = $spread_bar.offset().top;
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

function $new_el_with_attr(el, attr_class, attr_id) {
    $newEl = $('<'+ el +'></'+ el +'>');
    if (attr_class) {
        $newEl.attr('class', attr_class);
    }
    if (attr_id) {
        $newEl.attr('id', attr_id);
    }
    return $newEl
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

function readable_date_time_from_unix_timestamp(unix_timestamp) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = new Date(unix_timestamp * 1000);
    return months[date.getMonth()] + "/" + date.getDate() + " " + date.getFullYear()
        +", " +date.toTimeString().substr(0,5);
}

function get_url_param(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function set_active_nav_item(item) {
    $active_item = $('#navbar-item-' + item);
    $active_item.removeClass('text-decensored-900 dark:text-decensored-500');
    $active_item.addClass('text-purple-800 dark:text-decensored-100 pointer-events-none');
}

function get_config() {
    let config = localStorage.getItem('config');
    if(config) {
        return JSON.parse(config);
    } else {
        return CONFIG;
    }
}

function set_config(config) {
    localStorage.setItem('config', JSON.stringify(config))
}

function check_for_invalid_input(value, pattern, minLength, maxLength) {
    let validation_result = {};
    const charcount = value.length;

    if (pattern.exec(value)) {
        validation_result['pattern'] = pattern;
    }

    if (charcount < minLength) {
        validation_result['minLength'] = minLength;
    }

    if (charcount > maxLength) {
        validation_result['maxLength'] = maxLength;
    }

    return new Promise(function(result) {
        result(validation_result);
    });
}


function invalid_input_message(pattern, minLength, maxLength) {
    const allowed_characters = 'Allowed characters are: ';
    const min_character_count = 'Min character count is: ';
    const max_character_count = 'Max character count is: ';
    const newLine = '\r\n';

    let message = 'You have entered invalid data.';
    message += newLine;
    message += newLine;

    if(pattern) {
        message += allowed_characters + pattern + newLine;
    }
    if(minLength) {
        message += min_character_count + minLength + newLine;
    }
    if(maxLength) {
        message += max_character_count + maxLength + newLine;
    }

    return new Promise(function(msg) {
        msg(message);
    });
}

function user_alert(message) {
    alert(message);
}