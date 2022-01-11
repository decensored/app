async function get_balance(address) {
    await init_web3();
    return web3.eth.getBalance(address).then((balance_string) => {
        return parseFloat(balance_string)*1e-18;
    });
}

async function close_screen_signup_if_complete(action) {
    if(await is_signed_up()) {
        get_username().then(username => {
            message = $('#message');
            placeholder = " your story starts here..."
            message.attr("placeholder", username + ", " + placeholder);
            $('#message').fadeTo( "fast" , 1);
        });
        $('#screen_sign_up').fadeOut();
        $('.hideForLoggedOutUser').show();
    } else if (action == 'loadCredentials') {
        $("#error").html("Error: couldnt find a user with these credentials!");
    } else {
        setTimeout(function() {
            $('#screen_sign_up').fadeIn();
        }, 500);
        $('#nav').css("display", "none");
    }
}

function scroll_to_top() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
}

$(document).ready(function() {
    isScrolled();
    $(window).scroll(function(){
        isScrolled();
    });
});

function isScrolled() {
    if ($(window).scrollTop() > 0){
        $('#submit').addClass('hidden');
        $('#to-top').removeClass('hidden');
    } else if ($(window).scrollTop() < 500){
        $('#submit').removeClass('hidden');
        $('#to-top').addClass('hidden');
    }
}

function textareaCharCount() {
    value = $('#message').val();
    length = value.length;
    $('#message-count').text(280 - length + ' of 280');
}

function ask_user_to_reset_metamask() {
    const message = "Please reset your metamask!";
    console.log(message)
    alert(message)
}

function inform_user_that_smart_contracts_are_not_accessible() {
    const message = "The smart contract instances cannot be found. This is not your fault. Check back in a few minutes. If nothing changes, please inform whoever is responsible for deploying the smart contracts.";
    console.log(message)
    alert(message)
}