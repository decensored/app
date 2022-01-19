let post_fetcher;

async function init_post_fetcher() {
    const profile_username = get_profile_username();
    if(profile_username) {
        let profile_userid = await contract_accounts.methods.id_by_username(profile_username).call();
        post_fetcher = new PostFetcherProfile(profile_userid);
    } else {
        post_fetcher = new PostFetcher();
    }
}

async function load_posts_within_index_range(index_from, index_to) {
    for(let i = index_from; i <= index_to; i++) {
        post_fetcher.get_post(i).then(async (post) => {
            post = await plugins.call("filter_post", post)
            if (!post.message) return; // entire message content deleted means don't show

            post = {
                author: post.author,
                timestamp: post.timestamp,
                message: await plugins.call("display_transform", post.message)
            }
            if (!post.message) return; // entire message content deleted means don't show

            append_post_to_feed(post);
        });
    }
}

function append_post_to_feed(post) {
    generate_$post(post).then($post => $('#feed #posts').append($post));
}

function update_feed() {
    post_fetcher.get_index_of_latest_post().then(latest_post_index => {
        let index_of_latest_post_fetched = post_fetcher.get_index_of_last_post_fetched();
        if (latest_post_index > index_of_latest_post_fetched) {
            load_posts_within_index_range(index_of_latest_post_fetched + 1, latest_post_index);
        }
    })
}

function update_feed_every_interval(interval_in_ms) {
    update_feed();
    setInterval( update_feed, interval_in_ms);
}