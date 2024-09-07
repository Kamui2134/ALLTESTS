import { defineStore } from 'pinia'
import { Post } from '~/components/posts/post'

export const usePostsStore = defineStore('postsStore', {
	state: () => ({
		posts: <Array<Post>>[]
	}),
	actions: {
		addNewPost(newPost: Post) {
			this.posts.push(newPost)
		},
	},
})