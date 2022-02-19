import { defineStore } from "pinia"
import type { Ref } from "@vue/reactivity"
import type { PostMetaDataFinal } from "~/types"

export const usePostsIndexStore = defineStore("postsIndex", {
  getters: {
    async allPosts(): Promise<Ref<PostMetaDataFinal[]>> {
      const { data } = await useFetch("/blogIndex.json").json()

      // TODO return the correct types for the blog meta attributes
      return data
    },

    getPost() {
      return async (slug: string): Promise<PostMetaDataFinal | undefined> =>
        await this.allPosts.then((posts) =>
          posts.value.find((p: PostMetaDataFinal) => p.slug === slug)
        )
    },
  },
})
