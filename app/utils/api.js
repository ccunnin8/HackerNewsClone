const uri = "https://hacker-news.firebaseio.com/v0/";
const newURI = `${uri}newstories.json?print=pretty`;
const topURI = `${uri}topstories.json?print=pretty`;
const itemURI = `${uri}item/`

function fetchStories(type) {
    const uri = type === "new" ? newURI : topURI;
    return fetch(uri)
        .then(res => res.json())
        .catch(error => error);
}

export function getItem(id) {
    return fetch(`${uri}item/${id}.json`)
        .then(res => res.json())
        .catch(err => err);
}

export function getUser(id) {
    return fetch(`${uri}user/${id}.json`)
        .then(res => res.json())
        .catch(err => err);
}

export function getPosts(posts) {
    const postRequests = posts.map(post => {
        return fetch(`${uri}item/${post}.json`)
            .then(res => res.json())
            .catch(err => err);
    })
    return Promise.all(postRequests)
        .then(data => data)
        .catch(err => err);
}


export function getNews(type){
    let stories = [];
    return fetchStories(type)
        .then(data => {
            stories = data.map((item) => fetch(`${itemURI}${item}.json`).then(d => d.json()).catch(e => e))
            return Promise.all(stories).then(stories => stories).catch(err => err);
        })
        .catch(err => err);
}

