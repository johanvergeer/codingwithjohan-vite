<template>
  <div>
    <div
      v-for="post in props.posts"
      :key="post.slug"
      class="post border-gray-400 border-b mb-12"
    >
      <h2 class="font-bold">
        <router-link
          :to="{ path: post.url}"
          class="text-copy-primary"
        >
          {{ post.title }}
        </router-link>
      </h2>
      <article-meta :post="post" />

      <div class="mb-4">
        {{ post.description }}
      </div>

      <div class="mb-8">
        <router-link
          :to="{ path: post.url}"
          class="font-bold uppercase"
        >
          Read More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostMetaDataFinal } from "~/types"

const props = defineProps({
  posts: {
    type: Object as () => PostMetaDataFinal[],
    required: true,
  },
})
</script>
