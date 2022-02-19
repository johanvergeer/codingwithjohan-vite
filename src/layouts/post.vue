<template>
  <div
    class="content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen"
  >
    <div class="flex-grow">
      <site-header />
      <div v-if="isLoading">Loading ...</div>
      <div v-else>
        <h1>{{ postMeta.title }}</h1>
        <main>
          <router-view />
        </main>
        <Footer />
        <div class="mt-5 mx-auto text-center opacity-25 text-sm">
          [Post Layout]
        </div>
      </div>
      <site-footer />
    </div>
  </div>
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
