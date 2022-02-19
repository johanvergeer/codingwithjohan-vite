<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <div v-if="isLoading">Loading ...</div>
    <div v-else>
      <h1>{{ postMeta.title }}</h1>
      <router-view />
      <Footer />
      <div class="mt-5 mx-auto text-center opacity-25 text-sm">
        [Post Layout]
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { usePostsIndexStore } from "~/stores/postsIndex"
import type { PostMetaDataFinal } from "~/types"

const slug = useRoute().path.split("/").slice(-1)[0]

const isLoading = ref(true)

const postsStore = usePostsIndexStore()
const postMeta = ref<PostMetaDataFinal>()

onMounted(async () => {
  postMeta.value = await postsStore.getPost(slug)
  isLoading.value = false
})
</script>
