<template>
  <site-header />
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <div class="container-inner mx-auto my-16">
      <div>
        <h1 class="text-3xl font-bold leading-tight">
          {{ postMeta.title }}
        </h1>
        <div class="flex justify-between mt-5">
          <article-meta :post="postMeta" />
          <div class="flex mb-8 text-xl">
            <!--                <article-tags :article="article" />-->
          </div>
        </div>
        <!--            <feature-image :article="article" class="mb-4" />-->
        <!--            <article-series :document="article" />-->
        <div class="markdown-body mb-8">
          <main>
            <router-view />
          </main>
          <!--              <nuxt-content :document="article" />-->
        </div>
        <!--            <article-series-prev-next :document="article" />-->
        <!--            <article-sources :article="article" />-->
      </div>
    </div>
  </div>
  <site-footer />
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

<style>
.container-inner {
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 640px) {
    max-width: 640px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 800px;
  }
}
</style>
