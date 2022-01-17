const web3 = new Web3(get_config().evm_node);

let contract_posts = new web3.eth.Contract(CONTRACT_POSTS_ABI, get_config().contract_posts_address);
let contract_spaces;
let contract_accounts;
let contract_rate_control;

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

function get_address() {
    let private_key = get_private_key();
    return web3.eth.accounts.privateKeyToAccount(private_key).address;
}

async function get_username() {
    let address = get_address();

    return contract_accounts.methods.id_by_address(address).call().then(id => {
        return contract_accounts.methods.username_by_id(id).call()
    })
}

async function is_signed_up() {
    let address = get_address();
    return contract_accounts.methods.id_by_address(address).call().then(
        id => { return parseInt(id) > 0 }
    );
}

async function init_contract_accounts() {
    let contract_spaces_address = await contract_posts.methods.spaces().call();
    contract_spaces = new web3.eth.Contract(CONTRACT_SPACES_ABI, contract_spaces_address);
    let contract_accounts_address = await contract_spaces.methods.accounts().call();
    contract_accounts = new web3.eth.Contract(CONTRACT_ACCOUNTS_ABI, contract_accounts_address);
    let contract_rate_control_address = await contract_accounts.methods.rate_control().call();
    contract_rate_control = new web3.eth.Contract(CONTRACT_RATE_CONTROL_ABI, contract_rate_control_address);
}
