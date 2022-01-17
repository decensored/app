
async function set_profile_title() {
    let username = await get_username();
    let profile_username = get_profile_username();

    if(profile_username && username !== profile_username) {
        show_profile_username(profile_username);
    }
}

function show_profile_username(profile_username) {
    let $profile_title = $("<div class='text-center text-xl font-bold mb-5'></div>").text(profile_username)

    $('#feed > .container').prepend($profile_title);
}