let post_fetcher;

async function set_post_fetcher() {

    const profile_username = get_profile_username();
    if(profile_username) {
        let profile_userid = await contract_accounts.id_by_username(profile_username);
        post_fetcher = new PostFetcherProfile(profile_userid);
    } else {
        post_fetcher = new PostFetcher();
    }
}

function get_profile_username() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('u');
}

async function load_posts_within_index_range(index_from, index_to) {
    for(let i = index_from; i <= index_to; i++) {
        post_fetcher.get_post(i).then(post => {
            append_post_to_feed(post);
        });
    }
}

function readable_date_time_from_unix_timestamp(unix_timestamp) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = new Date(unix_timestamp * 1000);
    return months[date.getMonth()] + "/" + date.getDate() + " " + date.getFullYear()
        +", " +date.toTimeString().substr(0,5);
}

function generate_identicon_image(hash) {
    let data = new Identicon(hash, { background: [255, 255, 255, 255], size: 40}).toString();
    return $("<img/>").attr("src", "data:image/png;base64," + data);
}

function generate_$post_meta(author_username, timestamp) {
    let readable_date_time = readable_date_time_from_unix_timestamp(timestamp);
   //let $identicon = generate_identicon_image(author_username);

    return $div_with_class("meta")
       // .append($identicon.addClass("identicon"))
        .append($('<a></a>').attr("href","?u="+author_username).addClass("author").text(author_username))
        .append($div_with_class("time").text(readable_date_time))
        .append($div_with_class("options").append(
           /* $div_with_class("mint").on("click", () => {
                $('#dialog_auction').css("display", "block")
            })*/
        ));
}

async function generate_$post(post) {
    let $post = $div_with_class("post")
        .css("order", -post['timestamp']);
    let author_username = await contract_accounts.username_by_id(post['author'])
    let $post_meta = generate_$post_meta(author_username, post['timestamp']);
    $post.append($post_meta);
    $post.append($div_with_class("message").text(post['message'].substr(0, 280)))
    return $post;
}

function append_post_to_feed(post) {
    generate_$post(post).then($post => $('#feed').prepend($post));
}

function $div_with_class(class_name) {
    return $('<div></div>').addClass(class_name);
}

function submit_post_input() {
    let $message = $('#message');
    let message = $message.val();
    $message.val("");
    return contract_posts.submit_post(message);
}

function update_feed() {
    post_fetcher.get_index_of_latest_post().then(latest_post_index => {
        let index_of_latest_post_fetched = post_fetcher.get_index_of_last_post_fetched();
        if (latest_post_index > index_of_latest_post_fetched) {
            load_posts_within_index_range(index_of_latest_post_fetched + 1, latest_post_index);
        }
    })
}

async function init_web3() {
    if(!window.web3_initialized) {
        window.web3 = await Moralis.enableWeb3();
        window.web3_initialized = true;
    }
}

async function is_signed_up() {
    let address = await get_address();
    return contract_accounts.id_by_address(address).then(
        id => { return parseInt(id) > 0 }
    );
}

let contract_accounts;
let contract_posts = new ContractPosts(CONFIG.contract_posts_address);

async function get_username() {
    return get_address().then(address => {
        return contract_accounts.id_by_address(address).then(id => {
            return contract_accounts.username_by_id(id)
        })
    });
}

$(document).ready(async () => {
    $('#tutorial').load("./templates/tutorial.html", async () => {
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
                        $('#feed').prepend($("<div></div>").addClass("profile_title").text(profile_username));
                    }

                    $('#profile').attr('href', "?u="+username);
                });

                close_screen_signup_if_complete();
            }
        }

        $('#feed').append($('#screen_sign_up'))
        $('body').css("opacity", "1");
    });
})