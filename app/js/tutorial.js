
function is_metamask_installed() {
    const ethereum = window.ethereum;
    return !(!ethereum || !ethereum.on);
}

async function get_balance(address) {
    await init_web3();
    return web3.eth.getBalance(address).then((balance_string) => {
        return parseFloat(balance_string)*1e-18;
    });
}

async function get_network() {
    await init_web3();
    return web3.eth.net.getId();
}

async function get_address() {
    let address = window.ethereum.selectedAddress;
    if(address !== undefined && address !== null) {
        return address;
    } else {
        await init_web3();
        return web3.eth.getAccounts().then(accounts => accounts[0]);
    }
}

function close_screen_metamask_if_complete(do_alert = false) {
    if(is_metamask_installed()) {
        $('#screen_metamask').css('display', 'none');
        return true;
    } else if(do_alert) {
        alert("It doesn't look like you have Metamask installed yet.");
    }
    return false;
}

async function close_screen_polygon_if_complete(do_alert = false) {
    let network = await get_network();
    if(network === 137) {
        $('#screen_polygon').css('display', 'none');
        return true;
    } else if(do_alert) {
        alert("It doesn't look like you are on the polygon network yet.");
    }
    return false;
}

async function close_screen_matic_if_complete(do_alert = false) {
    let balance = await get_balance(await get_address());
    if(balance > 0) {
        $('#screen_matic').css('display', 'none');
    } else if(do_alert) {
        alert("It doesn't look like you have any Matic yet.");
    }
}
async function load_tutorial() {
    close_screen_metamask_if_complete();
    if(close_screen_metamask_if_complete()) {
        if(await close_screen_polygon_if_complete()) {
            await close_screen_matic_if_complete()
        }
    }
    $('body').css("opacity", "1");
}

$(document).ready(() => {
    load_tutorial();
});