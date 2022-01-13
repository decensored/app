let post_fetcher;

async function init_post_fetcher() {
    const profile_username = get_profile_username();
    if(profile_username) {
        let profile_userid = await contract_accounts.methods.id_by_username(profile_username).call();
        post_fetcher = new PostFetcherProfile(profile_userid);
    } else {
        post_fetcher = new PostFetcher();
    }

    let whitelist = await load_list_from_file(CONFIG.whitelist);
    if(whitelist.length > 0) {
        post_fetcher = new PostFetcherWhitelist(post_fetcher, whitelist)
    } else {

        let blacklist = await load_list_from_file(CONFIG.blacklist);
        if(blacklist.length > 0) {
            post_fetcher = new PostFetcherBlacklist(post_fetcher, blacklist)
        }
    }
}

async function load_list_from_file(path_to_file) {
    let file_contents = await fetch(path_to_file);
    let text = await file_contents.text();
    if(text === "") return [];
    return text.split(",");
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

    return $div_with_class("meta flex justify-between")
       // .append($identicon.addClass("identicon"))
        .append($('<a></a>').attr("href","?u="+author_username).addClass("author font-bold text-gray-900 dark:text-gray-300").text(author_username))
        .append($div_with_class("time text-sm").text(readable_date_time))
        // .append($div_with_class("options").append(
        //    /* $div_with_class("mint").on("click", () => {
        //         $('#dialog').css("display", "block")
        //     })*/
        // ));
}

async function generate_$post(post) {
    let $post = $div_with_class("post bg-white dark:bg-gray-900 p-5 rounded shadow-sm")
        .css("order", -post['timestamp']);
    let author_username = await contract_accounts.methods.username_by_id(post['author']).call();
    let $post_meta = generate_$post_meta(author_username, post['timestamp']);
    $post.append($post_meta);
    $post.append($div_with_class("message break-words mt-2").text(post['message'].substr(0, 280)))
    return $post;
}

function append_post_to_feed(post) {
    generate_$post(post).then($post => $('#feed #posts').append($post));
}

function $div_with_class(class_name) {
    return $('<div></div>').addClass(class_name);
}

function submit_post_input() {
    let $message = $('#message');
    let message = $message.val();
    $message.val("");
    set_post_input_char_count();
    return execute_contract_function(web3, contract_posts.methods.submit_post(message));
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
    console.log("remove init_web3()")
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

function get_address() {
    let private_key = get_private_key();
    return web3.eth.accounts.privateKeyToAccount(private_key).address;
}

function get_private_key() {
    return localStorage.getItem('account_private_key');
}

function create_new_private_key() {
    let account = web3.eth.accounts.create();
    localStorage.setItem('account_private_key', account['privateKey']);
}

const web3 = new Web3(CONFIG.evm_node);

if(!get_private_key()) {
    create_new_private_key();
}

let contract_posts = new web3.eth.Contract(CONTRACT_POSTS_ABI, CONFIG.contract_posts_address);
let contract_accounts;

async function get_username() {
    let address = get_address();

    return contract_accounts.methods.id_by_address(address).call().then(id => {
        return contract_accounts.methods.username_by_id(id).call()
    })
}