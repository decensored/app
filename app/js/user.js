function get_profile_username() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('u');
}

function customize_app_for_loggedin_user() {
    get_username().then(username => {
        // init textarea placeholder
        let $message = $('#message');
        $message.attr("placeholder", username + ", your story starts here...");
        $message.fadeTo( "fast" , 1);

        // add myposts navbar item
        $('#navbar-item-myposts').attr('dataProfile', username);

        let $link = $new_el_with_attr('a', 'grow flex flex-col items-center justify-center cursor-pointer text-decensored-900 hover:text-purple-800 dark:text-decensored-500 dark:hover:text-decensored-100', 'navbar-item-myposts');
        let $linkIcon = $new_el_with_attr('i', 'fa fa-user-astronaut text-3xl');
        let $linkTextWrapper = $new_el_with_attr('span', 'text-xs mt-2');
        let $linkText = 'My posts';

        $link.attr('dataProfile', username);
        $link.append($linkIcon);
        $linkTextWrapper.append($linkText);
        $link.append($linkTextWrapper);

        $link.click(function() {
            set_route('myposts');
        });

        $('#navbar > .container').append($link);
    });
}

async function on_sign_out_button_pressed() {
    remove_private_key();
    remove_user_blacklist();
    location.reload();
}

function get_private_key() {
    return localStorage.getItem('account_private_key');
}

function remove_private_key() {
    return localStorage.removeItem('account_private_key');
}

function set_private_key(key) {
    localStorage.setItem('account_private_key', key);
}

function create_new_private_key() {
    let account = web3.eth.accounts.create();
    localStorage.setItem('account_private_key', account['privateKey']);
}

if(!get_private_key()) {
    create_new_private_key();
}