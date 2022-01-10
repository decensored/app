async function get_balance(address) {
    await init_web3();
    return web3.eth.getBalance(address).then((balance_string) => {
        return parseFloat(balance_string)*1e-18;
    });
}

async function close_screen_signup_if_complete() {
    if(await is_signed_up()) {
        $('#screen_sign_up').fadeOut();
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

function countChar(val) {
    var len = val.value.length;
    if (len >= 281) {
        val.value = val.value.substring(0, 280);
    } else {
        $('#message-count').text(280 - len + ' of 280');
    }
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