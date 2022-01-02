let contract_address = "0x725fCCe5ff4b248879fEa9663DDd1033695064Dd";

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
                "internalType": "int256",
                "name": "index",
                "type": "int256"
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

const SEND_MESSAGE_FEE = 1e15;
let latest_fetched_post_index = -1;

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

async function send_post(message)  {
    return call_contract("send_message", SEND_MESSAGE_FEE, {message: message})
}

async function get_latest_post_index()  {
    return call_contract("get_latest_message_index").then(latest_message_index_string => {
        return parseInt(latest_message_index_string)
    });
}

async function get_post(index)  {
    return call_contract("get_message", 0, {index: index});
}

async function load_posts_within_index_range(index_from, index_to) {
    for(let i = index_from; i <= index_to; i++) {
        get_post(i).then(post => {
            append_post_to_feed(post);
        });
    }
}

function readable_date_time_from_unix_timestamp(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        +" " +date.toTimeString().substr(0,5);
}

function generate_identicon_image(hash) {
    let data = new Identicon(hash, { background: [255, 255, 255, 255], size: 40}).toString();
    return $("<img/>").attr("src", "data:image/png;base64," + data);
}

function append_post_to_feed(post) {
    let readable_date_time = readable_date_time_from_unix_timestamp(post['timestamp']);
    let $identicon = generate_identicon_image(post['author']);

    let $post = $div_with_class("post")
        .css("order", -post['timestamp']);
    $post.append($div_with_class("message").text(post['message']))
    $post.append($div_with_class("meta")
        .append($identicon.addClass("identicon"))
        .append($div_with_class("author").text(post['author']))
        .append($div_with_class("time").text(readable_date_time))
    );
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
    get_latest_post_index().then(latest_post_index => {
        if (latest_post_index > latest_fetched_post_index) {
            load_posts_within_index_range(latest_fetched_post_index + 1, latest_post_index);
            latest_fetched_post_index = latest_post_index;
        }
    })
}

$(document).ready(() => {
    update_feed();
    setInterval( update_feed, 5000);
})