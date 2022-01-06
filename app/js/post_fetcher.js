
class PostFetcher {
    index_of_last_post_fetched = -1;

    async get_index_of_latest_post()  {
        return contract_posts.get_index_of_latest_post();
    }

    async get_post(index)  {
        this.index_of_last_post_fetched = index;
        return contract_posts.get_post(index)
    }

    get_index_of_last_post_fetched() {
        return this.index_of_last_post_fetched;
    }
}

class PostFetcherProfile {
    index_of_last_post_fetched = -1;

    constructor(author) {
        this.author = author;
    }

    async get_index_of_latest_post()  {
        return await contract_posts.get_amount_of_posts_by_author(this.author)-1
    }

    async get_post(index)  {
        this.index_of_last_post_fetched = index;
        let post_index = await contract_posts.get_nth_post_index_by_author(this.author, index)
        return contract_posts.get_post(post_index);
    }

    get_index_of_last_post_fetched() {
        return this.index_of_last_post_fetched;
    }
}

class PostFetcherMock extends PostFetcher {

    max_post_index;

    constructor(max_post_index) {
        super();
        this.max_post_index = max_post_index;
    }

    async get_index_of_latest_post()  {
        return this.max_post_index;
    }

    async get_post(index)  {
        if(index < 0 || index > this.max_post_index) {
            throw new Error("post for index " + index + " does not exist");
        }
        this.index_of_last_post_fetched = index;
        return {
            "author": "0x0000000000000000000000000000000000000000",
            "timestamp": +(new Date()),
            "message": "Lorem ipsum"
        }
    }
}