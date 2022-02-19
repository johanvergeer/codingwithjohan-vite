import { defineStore } from "pinia"
import type { Ref } from "@vue/reactivity"
import type { PostMetaDataFinal } from "~/types"

export const usePostsIndexStore = defineStore("postsIndex", {
  getters: {
    async allPosts(): Promise<Ref<PostMetaDataFinal[]>> {
      const { data } = await useFetch("/blogIndex.json").json()

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
