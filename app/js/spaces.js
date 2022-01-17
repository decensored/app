function create_space(name) {
    return execute_contract_function(web3, contract_spaces.methods.create(name));
}

function set_space_membership(space, user_id, membership) {
    return execute_contract_function(web3, contract_spaces.methods.set_membership(space, user_id, membership));
}