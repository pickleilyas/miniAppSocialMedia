export function getAllHashtags(posts) {
    return Array.from(new Set(posts.flatMap(post => post.hashtags || [])));
}
