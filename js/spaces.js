function create_space(name) {
    return execute_contract_function(web3, contract_spaces.methods.create(name));
}

function set_space_membership(space_id, user_id, membership) {
    return execute_contract_function(web3, contract_spaces.methods.set_membership(space_id, user_id, membership));
}

async function get_space(space_id) {
    let name = await contract_spaces.methods.name_by_id(space_id).call();
    let owner = await contract_spaces.methods.owner_by_id(space_id).call();
    return Promise.all([name, owner]).then((values) => {
        return {
            id: space_id,
            name: values[0],
            owner: values[1],
        };
    });
}

async function get_latest_space_index() {
    return contract_spaces.methods.get_latest_space_index().call().then(parseInt);
}
