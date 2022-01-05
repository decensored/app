async function call_contract(contract, function_name, value = 0, params = {}) {
    return init_web3().then(() => {
        const options = {
            contractAddress: contract.address,
            functionName: function_name,
            abi: contract.abi,
            msgValue: Moralis.Units.Token(value, 0),
            params: params,
        };
        return Moralis.executeFunction(options);
    });
}

class ContractAccounts {

    abi = CONTRACT_ACCOUNTS_ABI;

    constructor(address) {
        this.address = address;
    }

    sign_up(username) {
        return call_contract(this, "sign_up", 0, {username: username})
    }

    id_by_address(address) {
        return call_contract(this, "id_by_address", 0, {'': address})
    }

    username_by_id(id) {
        return call_contract(this, "username_by_id", 0, {'': id})
    }
}

class ContractPosts {

    abi = CONTRACT_POSTS_ABI;

    constructor(address) {
        this.address = address;
    }

    submit_post(message)  {
        return call_contract(this, "submit_post", 0, {message: message})
    }

    get_index_of_latest_post()  {
        return call_contract(this, "get_latest_message_index").then(latest_message_index_string => {
            return parseInt(latest_message_index_string)
        });
    }

    get_post(index)  {
        return call_contract(this, "get_post", 0, {index: index});
    }
}

let contract_accounts = new ContractAccounts("0x7601a4D116e564DBABe22F3749955A9167b9bd5e");
let contract_posts = new ContractPosts("0x1E41f418e97af96ee37c905e3e01D1e966E3A6C3");


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