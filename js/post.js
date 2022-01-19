function generate_$post_meta(author_username, timestamp) {
    let readable_date_time = readable_date_time_from_unix_timestamp(timestamp);

    return $new_el_with_attr("div", "meta flex justify-between")
        .append($('<a></a>').attr("href","?u="+author_username).addClass("author font-bold text-gray-900 dark:text-gray-300").text(author_username))
        .append($new_el_with_attr("div", "time text-sm text-right").text(readable_date_time))
}

function generate_post_interaction_icon(icon, title, action) {
    let $post_interaction_icon = $new_el_with_attr("i", "fas cursor-pointer text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300");
    $post_interaction_icon.addClass(icon);
    $post_interaction_icon.attr('title', title);
    $post_interaction_icon.attr('onClick', action);

    return $post_interaction_icon;
}

function generate_post_interactions(author, username) {
    let $wrapper = $new_el_with_attr("div", "px-5 py-3 rounded-b flex justify-between");
    let $left = $new_el_with_attr("div", "flex gap-x-3 items-center");
    let $right = $new_el_with_attr("div", "flex gap-x-3 items-center");

    let $block_user = generate_post_interaction_icon('fa-shield-alt', 'block user', `on_block_user_pressed('${author}', '${username}')`);
    let $share_post = generate_post_interaction_icon('fa-share', 'share post');
    let $comment = generate_post_interaction_icon('fa-comment', 'comment');

    $left.append($block_user);
    $right.append($share_post);
    $right.append($comment);

    $wrapper.append($left);
    $wrapper.append($right);

    return $wrapper
}

function generate_post_interactions(author, username) {
    let $wrapper = $new_el_with_attr("div", "px-5 py-3 rounded-b flex justify-between");
    let $left = $new_el_with_attr("div", "flex gap-x-3 items-center");
    let $right = $new_el_with_attr("div", "flex gap-x-3 items-center");

    let $block_user = generate_post_interaction_icon('fa-shield-alt', 'block user', `on_block_user_pressed('${author}', '${username}')`);
    let $share_post = generate_post_interaction_icon('fa-share', 'share post');
    let $comment = generate_post_interaction_icon('fa-comment', 'comment');

    $left.append($block_user);
    $right.append($share_post);
    $right.append($comment);

    $wrapper.append($left);
    $wrapper.append($right);

    return $wrapper
}

async function generate_$post(post) {
    let $post = $new_el_with_attr("div", "post bg-white dark:bg-gray-900 rounded divide-y divide-solid divide-gray-200 dark:divide-gray-800 shadow-sm").css("order", -post['timestamp']);
    $post.attr("data-author", post['author']);
    let author_username = await contract_accounts.methods.username_by_id(post['author']).call();
    let $post_meta = generate_$post_meta(author_username, post['timestamp']);
    let $post_content = $new_el_with_attr("div", "rounded-t p-5");
    $post_content.append($post_meta);
    $post_content.append($new_el_with_attr("div", "message break-words mt-2").text(post['message'].substr(0, 280)));
    $post.append($post_content);
    $post.append(generate_post_interactions(post['author'], author_username));

    return $post;
}

function submit_post_input(space) {
    let $message = $('#message');
    let message = plugins.call("post_transform", $message.val());
    $message.val("");
    set_post_input_char_count();
    if(message.length > 0) {
        return execute_contract_function(web3, contract_posts.methods.submit_post(space, message));
    } else {
        alert("You cant send an empty message!");
    }
}