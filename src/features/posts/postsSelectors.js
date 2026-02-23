
export const selectAllPosts = (state) => state.posts.list;

export const selectPostById = (postId) => (state) =>
    state.posts.list.find((post) => post.id === postId);
