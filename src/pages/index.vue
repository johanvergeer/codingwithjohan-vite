<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { usePostsIndexStore } from "~/stores/postsIndex"
import type { PostMetaDataFinal } from "~/types"

const user = useUserStore()
const postsStore = usePostsIndexStore()
const name = ref(user.savedName)
const allPosts = ref<PostMetaDataFinal[]>([])

postsStore.allPosts.then((posts) => {
  allPosts.value = posts
})
</script>

<template>
  <div class="flex-grow">
    <div>
      <div
        class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between py-16"
      >
        <div
          class="text-6xl font-bold w-full sm:w-5/5 text-center sm:text-left"
        >
          <div class="leading-tight">Coding with Johan</div>
          <div class="text-blue-700 leading-tight">Passion for Code</div>
        </div>
        <div class="mt-8 sm:mt-0 w-full">
          <img
            src="/assets/img/illustrations/programming.png"
            alt="programming"
            class="mx-auto sm:mx-0"
          />
        </div>
      </div>

      <div class="container-inner mx-auto py-16 border-gray-300 border-t mb-12">
        <h1 class="font-bold">Latest Posts:</h1>
        <articles-list :posts="allPosts" />
      </div>
    </div>
  </div>
</template>
