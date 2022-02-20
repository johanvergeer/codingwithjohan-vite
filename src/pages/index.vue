<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { usePostsIndexStore } from "~/stores/postsIndex"
import type { PostMetaDataFinal } from "~/types"

const user = useUserStore()
const postsStore = usePostsIndexStore()
const name = ref(user.savedName)
const allPosts = ref<PostMetaDataFinal[]>([])

postsStore.allPosts.then((posts) => {
  allPosts.value = posts.value
})
</script>

<template>
  <div>
    <ul>
      <li v-for="post in allPosts" :key="post.slug">
        <router-link :to="{ path: `${post.url}` }">{{
          post.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>
