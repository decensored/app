
window.onerror = function myErrorHandler(error_message) {
    if(error_message.includes("View call failed: runtime error: invalid ememory address or nil pointer dereference")) {
        ask_user_to_reset_metamask();
    } else if(error_message.includes("Response has no error or result for request")) {
        inform_user_that_smart_contracts_are_not_accessible();
    } else {
        console.error(error_message);
    }
}

$(document).ready(async () => {
    $("#init-header").load("templates/header.html", function() {
        $("#header").unwrap();
    });
    $("#init-feed").load("templates/feed.html", function() {
        $("#feed").unwrap();
        var message = $("#message");
        message.css("display","none");
        autosize(message);
        message.css("display","block");
    });
    $("#init-bottombar").load("templates/bottombar.html", function() {
        $("#bottombar").unwrap();
    });
    $("#init-overlay").load("templates/overlay.html", function() {
        var overlay = $("#overlay");
        $(overlay).unwrap();
        $(overlay).load("./templates/overlay.html", async () => {
            $('#chain_id').text(CONFIG.chain_id);
            if(close_screen_metamask_if_complete()) {
                if(await close_screen_network_if_complete()) {

                    contract_accounts = new ContractAccounts(await contract_posts.get_accounts_address());

                    await set_post_fetcher();
                    update_feed();
                    setInterval( update_feed, 5000);

                    get_username().then(username => {
                        let profile_username = get_profile_username();
                        if(profile_username && username !== profile_username) {
                            $('#input').css("display", "none");
                            $('#feed > .container').prepend($("<div class='text-center text-xl font-bold mb-5'></div>").addClass("profile_title").text(profile_username));
                        }

                        $('#profile').attr('href', "?u="+username);
                    });

                    close_screen_signup_if_complete();
                }
            }

            $('body').css("opacity", "1");
        });
    });
    // $("#init-dialog").load("templates/dialog.html", function() {
    //     $("#dialog").unwrap();
    // });
});