append_element_with_html_on_load('body', "pages/spaces/create_space_dialog.html");

function on_create_space_button_clicked() {
    toggle_space_dialog();
}

async function on_create_space_submit_button_pressed() {
    if(await is_signed_up()) {
        const name = $('#create_space_name_input').val()
        create_space(name).then(() => {
            window.location.href = BASE_URL + '?s=' + name
        });
    }
}

function show_create_space_form() {
    $("#create_space").fadeIn();
}

function hide_create_space_form() {
    $("#create_space").hide();
}

function toggle_space_dialog() {
    let $dialog = $('#create_space_dialog')
    let is_becoming_visible = $dialog.hasClass('hidden');
    set_body_scrolling(is_becoming_visible)
    $dialog.animate({ opacity: is_becoming_visible ? 1 : 0 }, 'fast');
    $dialog.toggleClass("hidden");
}

async function load_all_spaces_to_view() {
    const latest = await get_latest_space_index();
    for(let i = latest; i > 0; i--) {
        get_space(i).then(space => {
            if (!space.name) return; 
            append_space_to_view(space);
        });
    }
}

async function append_space_to_view(space) {
    $('#spaces_container').append(create_one_space_element(space));
}

function create_one_space_element(space) {
    const count = Math.floor(Math.random() * 200);
    const dummyDescription = 'Bacon ipsum dolor amet fatback cupim drumstick flank, salami cow sirloin prosciutto shoulder pork chop beef sausage ham hock spare ribs.';
    var spaceTemplate = [
        '<div class="test bg-white dark:bg-gray-900 rounded shadow-sm" data-name="' + space.name + '">',
        /*'<img src="' + img +'" class="w-full h-60"></img>',*/
            '<div class="rounded-t p-5">',
                '<div class="meta flex justify-between">',
                    '<a href="?s=' + space.name + '" class="font-bold text-gray-900 dark:text-gray-300">',
                        '<i class="fas fa-satellite mr-2"></i>' +space.name,
                    '</a>',
                    '<div class="members flex justify-end items-center gap-x-2 pointer-events-none">',
                        '<i class="fas fa-user-astronaut text-md text-gray-900 dark:text-gray-300" title="Members"></i>',
                        '<span class="flex-none uppercase bg-decensored-100 text-gray-600 text-xs tracking-wide font-semibold px-2 py-1 rounded-md">' + count + '</span>',
                    '</div>',
                '</div>',
                '<div class="message break-words mt-2">' + dummyDescription + '</div>',
            '</div>',
        '</div>'
    ];
    return $(spaceTemplate.join(''));
}
