let post_fetcher;

async function init_post_fetcher() {
    const profile_username = get_profile_username();
    if(profile_username) {
        let profile_userid = await contract_accounts.methods.id_by_username(profile_username).call();
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
            post = call_plugins("filter_post", post)
            if (!post.message) return; // entire message content deleted means don't show

            post = {
                author: post.author,
                timestamp: post.timestamp,
                message: call_plugins('display_transform', post.message)
            }
            if (!post.message) return; // entire message content deleted means don't show

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

function generate_$post_meta(author_username, timestamp) {
    let readable_date_time = readable_date_time_from_unix_timestamp(timestamp);
   //let $identicon = generate_identicon_image(author_username);

    return $new_el_with_attr("div", "meta flex justify-between")
       // .append($identicon.addClass("identicon"))
        .append($('<a></a>').attr("href","?u="+author_username).addClass("author font-bold text-gray-900 dark:text-gray-300").text(author_username))
        .append($new_el_with_attr("div", "time text-sm text-right").text(readable_date_time))
        // .append($new_el_with_attr("div", "options").append(
        //    /* $new_el_with_attr("div", "mint").on("click", () => {
        //         $('#dialog').css("display", "block")
        //     })*/
        // ));
}

function generate_post_interaction_icon(icon, title, action) {
    let $post_interaction_icon = $new_el_with_attr("i", "fas cursor-pointer text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300");
    $post_interaction_icon.addClass(icon);
    $post_interaction_icon.attr('title', title);
    $post_interaction_icon.attr('onClick', action);

    return $post_interaction_icon;
}

function generate_post_interactions(author, username) {
    let $wrapper = $new_el_with_attr("div", "px-5 py-3 rounded-b flex justify-between");
    let $left = $new_el_with_attr("div", "flex gap-x-3 items-center");
    let $right = $new_el_with_attr("div", "flex gap-x-3 items-center");

    let $block_user = generate_post_interaction_icon('fa-shield-alt', 'block user', `on_block_user_pressed('${author}', '${username}')`);
    let $share_post = generate_post_interaction_icon('fa-share', 'share post');
    let $comment = generate_post_interaction_icon('fa-comment', 'comment');

    $left.append($block_user);
    $right.append($share_post);
    $right.append($comment);

    $wrapper.append($left);
    $wrapper.append($right);

    return $wrapper
}

async function generate_$post(post) {
    let $post = $new_el_with_attr("div", "post bg-white dark:bg-gray-900 rounded divide-y divide-solid divide-gray-200 dark:divide-gray-800 shadow-sm").css("order", -post['timestamp']);
    let author_username = await contract_accounts.methods.username_by_id(post['author']).call();
    let $post_meta = generate_$post_meta(author_username, post['timestamp']);
    let $post_content = $new_el_with_attr("div", "rounded-t p-5");
    $post_content.append($post_meta);
    $post_content.append($new_el_with_attr("div", "message break-words mt-2").text(post['message'].substr(0, 280)));
    $post.append($post_content);
    $post.append(generate_post_interactions(post['author'], author_username));

    return $post;
}

function append_post_to_feed(post) {
    generate_$post(post).then($post => $('#feed #posts').append($post));
}

function $new_el_with_attr(el, attr_class, attr_id) {
    $newEl = $('<'+ el +'></'+ el +'>');
    if (attr_class) {
        $newEl.addClass(attr_class);
    }
    if (attr_id) {
        $newEl.addId(attr_id);
    }
    return $newEl
}

function submit_post_input() {
    let $message = $('#message');
    let message = call_plugins("post_transform", $message.val());
    $message.val("");
    set_post_input_char_count();
    if(message.length > 0) {
        return execute_contract_function(web3, contract_posts.methods.submit_post(message));
    } else {
        alert("You cant send an empty message!");
    }
}

function update_feed() {
    post_fetcher.get_index_of_latest_post().then(latest_post_index => {
        let index_of_latest_post_fetched = post_fetcher.get_index_of_last_post_fetched();
        if (latest_post_index > index_of_latest_post_fetched) {
            load_posts_within_index_range(index_of_latest_post_fetched + 1, latest_post_index);
        }
    })
}

async function is_signed_up() {
    let address = get_address();
    return contract_accounts.methods.id_by_address(address).call().then(
        id => { return parseInt(id) > 0 }
    );
}

async function execute_contract_function(web3, function_call) {
    let privateKey = get_private_key();
    const account_address = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    const options = {
        to      : function_call._parent._address,
        data    : function_call.encodeABI(),
        gas     : await function_call.estimateGas({from: account_address}),
        gasPrice: 0
    };
    const signed  = await web3.eth.accounts.signTransaction(options, privateKey);
    return web3.eth.sendSignedTransaction(signed.rawTransaction);
}

async function test() {
    let contract_accounts_address = await contract_posts.methods.accounts().call();
    let contract_accounts = new web3.eth.Contract(CONTRACT_ACCOUNTS_ABI, contract_accounts_address);
    await execute_contract_function(web3, contract_accounts.methods.sign_up("micro2"))
    await execute_contract_function(web3, contract_posts.methods.submit_post("This message is sent without metamask... Probably nothing (eyes emoji)"))
}

async function on_sign_up_button_pressed() {
    let username = $('#username').val();
    execute_contract_function(web3, contract_accounts.methods.sign_up(username))
        .then(async _ => { await show_or_hide_signup_screen() })
        .catch(error => { alert(error) })
}

async function on_sign_out_button_pressed() {
    remove_private_key();
    remove_user_blacklist();
    location.reload();
}

function get_address() {
    let private_key = get_private_key();
    return web3.eth.accounts.privateKeyToAccount(private_key).address;
}

function get_private_key() {
    return localStorage.getItem('account_private_key');
}

function remove_private_key() {
    return localStorage.removeItem('account_private_key');
}

function set_private_key(key) {
    localStorage.setItem('account_private_key', key);
}

function create_new_private_key() {
    let account = web3.eth.accounts.create();
    localStorage.setItem('account_private_key', account['privateKey']);
}

function get_config() {
    let config = localStorage.getItem('config');
    if(config) {
        return JSON.parse(config);
    } else {
        return CONFIG;
    }
}

const web3 = new Web3(get_config().evm_node);

if(!get_private_key()) {
    create_new_private_key();
}

let contract_posts = new web3.eth.Contract(CONTRACT_POSTS_ABI, get_config().contract_posts_address);
let contract_accounts;

async function get_username() {
    let address = get_address();

    return contract_accounts.methods.id_by_address(address).call().then(id => {
        return contract_accounts.methods.username_by_id(id).call()
    })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('pwaworker.js').then(function(registration) {
    registration.update();
  }).catch(function(error) {
    console.log('Registration failed with ' + error);
  });
};