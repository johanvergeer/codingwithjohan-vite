import { defineStore } from "pinia"
import type { PostMetaDataFinal } from "~/types"

export const usePostsIndexStore = defineStore("postsIndex", {
  state: () => {
    return {
      _allPostsMeta: [] as PostMetaDataFinal[],
    }
  },
  getters: {
    async allPosts(): Promise<PostMetaDataFinal[]> {
      if (this._allPostsMeta.length > 0) {
        // No need to load the posts when they are already loaded
        return this._allPostsMeta
      }
      this._allPostsMeta = await getAllPosts()

      return this._allPostsMeta
    },

    getPost() {
      return async (slug: string): Promise<PostMetaDataFinal | undefined> =>
        await this.allPosts.then((posts) =>
          posts.find((p: PostMetaDataFinal) => p.slug === slug)
        )
    },
  },
})

async function getAllPosts(): Promise<PostMetaDataFinal[]> {
  const { data } = await useFetch("/blogIndex.json").json()

  return data.value
}
