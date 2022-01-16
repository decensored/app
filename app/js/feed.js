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
        post_fetcher.get_post(i).then(post => {
            const blockedByUser = is_user_in_blacklist(post['author']);
            if(!blockedByUser) {
                append_post_to_feed(post);
            }
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

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('pwaworker.js').then(function(registration) {
    registration.update();
  }).catch(function(error) {
    console.log('Registration failed with ' + error);
  });
};

function update_feed_every_interval(interval_in_ms) {
    update_feed();
    setInterval( update_feed, interval_in_ms);
}