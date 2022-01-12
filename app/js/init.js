
window.onerror = function myErrorHandler(error_message) {
    alert("ERROR: " + error_message);
    console.error(error_message);
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
    $("#init-overlay").load("./templates/overlay.html", async () => {
        $("#overlay").unwrap();
        $('#chain_id').text(CONFIG.chain_id);

        let contract_accounts_address = await contract_posts.methods.accounts().call();
        contract_accounts = new web3.eth.Contract(CONTRACT_ACCOUNTS_ABI, contract_accounts_address);

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

        $('body').css("opacity", "1");
    });
});