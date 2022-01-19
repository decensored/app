function create_space(name) {
    return execute_contract_function(web3, contract_spaces.methods.create(name));
}

function set_space_membership(space_id, user_id, membership) {
    return execute_contract_function(web3, contract_spaces.methods.set_membership(space_id, user_id, membership));
}

async function get_space_id(space_name) {
    const space_id = await contract_spaces.methods.id_by_name(space_name).call();
    const space = get_space(space_id);
    return space;
}

async function get_space(space_id) {

    let promise_name = contract_spaces.methods.name_by_id(space_id).call();
    let promise_owner = contract_spaces.methods.owner_by_id(space_id).call();

    return Promise.all([promise_name, promise_owner]).then((values) => {
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