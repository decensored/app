function create_space(name) {
    return execute_contract_function(web3, contract_spaces.methods.create(name));
}

function set_space_membership(space_id, user_id, membership) {
    return execute_contract_function(web3, contract_spaces.methods.set_membership(space_id, user_id, membership));
}

async function get_space(space_id) {
    let name = await contract_spaces.methods.name_by_id(space_id).call();
    let owner = await contract_spaces.methods.owner_by_id(space_id).call();
    return {
        id: space_id,
        name: name,
        owner: owner,
    };
}

/*
Response: Array[{ id, name, creator, created_at, count}]
*/
async function get_all_spaces() {
    let spaces = [];
    let space_id = 1;
    while(space_id < 100) {
        let space = await get_space(space_id);
        space_id++;

        if(space.name === "") {
            break;
        } else {
            spaces.push(space);
        }
    }
    return spaces;
}