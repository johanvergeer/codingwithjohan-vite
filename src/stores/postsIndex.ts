import { defineStore } from "pinia"

export const usePostsIndexStore = defineStore("postsIndex", {
  getters: {
    async allPosts() {
      const { data } = await useFetch("blogIndex.json").json()

      return data
    },
  },
})
