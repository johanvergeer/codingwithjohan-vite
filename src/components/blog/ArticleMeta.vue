<template>
  <div class="flex items-center text-copy-secondary mb-4 text-xl">
    <gravatar-image class="rounded-full" :author="props.post.author" />
    <span class="ml-2">{{ props.post.author.name }}</span>
    <span class="middot-before">{{ createdAt }}</span>
    <span class="middot-before">{{ props.post.readingTime }} min read</span>
  </div>
</template>

<script setup lang="ts">
import type { PostMetaDataFinal } from "~/types"
import { formatDate } from "~/utils/formatDate"

const props = defineProps({
  post: {
    type: Object as () => PostMetaDataFinal,
    required: true,
  },
})

const createdAt = formatDate(props.post.createdAt)
</script>

<style>
.middot-before::before {
  content: "\b7";
  padding: 0.3em;
}
</style>
