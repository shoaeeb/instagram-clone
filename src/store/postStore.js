import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPosts: (posts) => set((state) => ({ posts: [posts, ...state.posts] })),
  setPosts: (posts) => set({ posts }),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      }),
    })),
  //setPosts
}));

export default usePostStore;
