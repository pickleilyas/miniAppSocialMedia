
import { useMemo } from "react";

export function useFilteredPosts(posts, usersMap, selectedTag, searchTerm) {
    return useMemo(() => {
        return posts.filter((post) => {
            const author = usersMap[post.authorId];

            const matchesTag = selectedTag
                ? post.hashtags?.includes(selectedTag)
                : true;

            const matchesSearch = searchTerm
                ? author?.username?.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            return matchesTag && matchesSearch;
        });
    }, [posts, usersMap, selectedTag, searchTerm]);
}
