let contract_address = "0xDcFD1087B3c550EdCa92D4152b91d05dfb7b0Fc1";

let abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "MessageSent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawal",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "get_fee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_latest_message_index",
        "outputs": [
            {
                "internalType": "int256",
                "name": "",
                "type": "int256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "get_message",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "author",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Tweet",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "send_message",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "fee_new",
                "type": "uint256"
            }
        ],
        "name": "set_fee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let post_fee;
async function get_post_fee() {
    if(post_fee === undefined) {
        post_fee = parseInt(await fetch_fee());
    }
    return post_fee;
}

let post_fetcher = new PostFetcher();

async function init_web3() {
    if(!window.web3_initialized) {
        window.web3 = await Moralis.enableWeb3();
        window.web3_initialized = true;
    }
}

async function call_contract(function_name, value = 0, params = {}) {
    return init_web3().then(() => {
        const options = {
            contractAddress: contract_address,
            functionName: function_name,
            abi: abi,
            msgValue: Moralis.Units.Token(value, 0),
            params: params,
        };
        return Moralis.executeFunction(options);
    });
}

async function fetch_fee()  {
    return call_contract("get_fee")
}

async function send_post(message)  {
    return call_contract("send_message", await get_post_fee(), {message: message})
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

function generate_$post_meta(author, timestamp) {
    let readable_date_time = readable_date_time_from_unix_timestamp(timestamp);
    let $identicon = generate_identicon_image(author);

    return $div_with_class("meta")
        .append($identicon.addClass("identicon"))
        .append($div_with_class("author").text(author))
        .append($div_with_class("time").text(readable_date_time));
}

function generate_$post(post) {
    let $post = $div_with_class("post")
        .css("order", -post['timestamp']);
    let $post_meta = generate_$post_meta(post['author'], post['timestamp']);
    $post.append($post_meta);
    $post.append($div_with_class("message").text(post['message']))
    return $post;
}

function append_post_to_feed(post) {
    let $post = generate_$post(post);
    $('#feed').prepend($post);
}

function $div_with_class(class_name) {
    return $('<div></div>').addClass(class_name);
}

function submit_post_input() {
    let $message = $('#message');
    let message = $message.val();
    $message.val("");
    return send_post(message);
}

function update_feed() {
    post_fetcher.get_index_of_latest_post().then(latest_post_index => {
        let index_of_latest_post_fetched = post_fetcher.get_index_of_last_post_fetched();
        if (latest_post_index > index_of_latest_post_fetched) {
            load_posts_within_index_range(index_of_latest_post_fetched + 1, latest_post_index);
        }
    })
}

$(document).ready(() => {
    if(is_metamask_installed()) {
        update_feed();
        setInterval( update_feed, 5000);
    }
})