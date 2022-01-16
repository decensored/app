function init_block_users() {
    append_element_with_html_on_load( '#settings_dialog_inner', "./plugins/block_users/blocked_user_tags.html");
}

function create_blocked_user_tag(user) {
    console.log(user);
    let div = $new_el_with_attr("div", "flex gap-x-1 items-center uppercase bg-decensored-100 text-gray-600 text-xs tracking-wide font-semibold px-2 py-1 rounded-md");
    div.attr("id", "blocked-user-#"+user.id);
    let span = $new_el_with_attr("span", "flex-none uppercase bg-decensored-100 text-gray-600 text-xs tracking-wide font-semibold px-2 py-1 rounded-md pointer-events-none").text(user.name);
    let xIcon = $new_el_with_attr("i", "fas fa-times text-xs opacity-50 hover:opacity-100 cursor-pointer pr-1");
    xIcon.attr("onClick", 'remove_user_from_blacklist('+ user.id +');');  
    return div.append(span).append(xIcon);
}

async function append_blocked_users_to_div() {
    const users = get_user_blacklist();
    console.log("test");
    users.forEach(user => {
        $('#blocked-user-tags').append(create_blocked_user_tag(user));
    });
}

function on_block_user_pressed(author, username) {
    add_user_to_blacklist(author, username);
}

function get_user_blacklist() {
    return JSON.parse(localStorage.getItem('blacklist'));
}

function is_user_in_blacklist(author) {
    const blacklist = get_user_blacklist();
    if(blacklist) {
        const check = blacklist.find(user => user.id === author);
        if(check) {
            return true;
        } else {
            return false;
        }
    }
}

function add_user_to_blacklist(author, username) {
    let blacklist = get_user_blacklist();
    if(!blacklist) {
        blacklist = [{'id': author, 'name': username}];
        update_user_blacklist(blacklist)
    } else {
        const userExistsAlready = is_user_in_blacklist(author);
        if(!userExistsAlready) {
            blacklist.push({'id': author, 'name': username});
            update_user_blacklist(blacklist)
        }
     }
}

function remove_user_from_blacklist(author) {
    let blacklist = get_user_blacklist();
    if(blacklist) {
        var newBlacklist = blacklist.filter(function(user) { return user.id != author }); 
        update_user_blacklist(newBlacklist);
        console.log("#blocked-user-#"+author);
        $("#blocked-user-#"+author).hide();
    } 
}

function update_user_blacklist(blacklist) {
    localStorage.setItem('blacklist', JSON.stringify(blacklist));
}

function remove_user_blacklist() {
    return localStorage.removeItem('blacklist');
}