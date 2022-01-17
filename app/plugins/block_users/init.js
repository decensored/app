plugins.register({ 
    name: "block_users", 
    init: init_block_users,
    filter_post: is_user_in_blacklist
});

function init_block_users() {
    append_element_with_html_on_load('#settings_account_blacklist', "./plugins/block_users/blocked_user_tags.html");
}

function create_blocked_user_tag(user) {
    let div = $new_el_with_attr("div", "flex gap-x-1 items-center uppercase bg-decensored-100 text-gray-600 text-xs tracking-wide font-semibold px-2 py-1 rounded-md").attr("id", "blocked-user-"+user.id);
    let span = $new_el_with_attr("span", "flex-none uppercase bg-decensored-100 text-gray-600 text-xs tracking-wide font-semibold px-2 py-1 rounded-md pointer-events-none").text(user.name);
    let xIcon = $new_el_with_attr("i", "fas fa-times text-xs opacity-50 hover:opacity-100 cursor-pointer pr-1").attr("onClick", 'remove_user_from_blacklist('+ user.id +');'); ;    xIcon.attr("onClick", 'remove_user_from_blacklist('+ user.id +');');  
    return div.append(span).append(xIcon);
}

async function append_blocked_users_to_div() {
    const users = get_user_blacklist();
    if(users && users.length > 0) {
        users.forEach(user => {
            $('#blocked-user-tags').append(create_blocked_user_tag(user));
        });
    } else {
        $('#blocked-user-tags').html('You have no blocked users in your list!');
    }
}

function on_block_user_pressed(author, username) {
    add_user_to_blacklist(author, username);
}

function get_user_blacklist() {
    return JSON.parse(localStorage.getItem('blacklist'));
}

function is_user_in_blacklist(post) {
    const { author } = post;
    const blacklist = get_user_blacklist() || [];
    if (blacklist.find(user => user.id === author)) {
        return { ...post, message: "" }; // delete message to indicate message has been filtered out
    }

    return post;
}

function add_user_to_blacklist(author, username) {
    const blacklist = get_user_blacklist() || [];
    if (blacklist.find(user => user.id === author)) {
        return;
    }

    blacklist.push({'id': author, 'name': username});
    update_user_blacklist(blacklist)
}

function remove_user_from_blacklist(author) {
    let blacklist = get_user_blacklist();
    if(blacklist) {
        var newBlacklist = blacklist.filter(function(user) { return user.id != author });
        update_user_blacklist(newBlacklist);
        $("#blocked-user-"+author).hide();
        if(newBlacklist.length == 0) {
            $("#blocked-user-tags").html("You have no blocked users in your list!");
        }
    }
}

function update_user_blacklist(blacklist) {
    localStorage.setItem('blacklist', JSON.stringify(blacklist));
}

function remove_user_blacklist() {
    return localStorage.removeItem('blacklist');
}