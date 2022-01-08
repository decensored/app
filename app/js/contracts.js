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

    id_by_username(username) {
        return call_contract(this, "id_by_username", 0, {'': username})
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

    get_nth_post_index_by_author(author, n)  {
        return call_contract(this, "get_nth_post_index_by_author", 0, {author: author, n: n});
    }

    get_amount_of_posts_by_author(author) {
        return call_contract(this, "get_amount_of_posts_by_author", 0, {author: author});
    }

    get_accounts_address() {
        return call_contract(this, "accounts", 0, {});
    }
}