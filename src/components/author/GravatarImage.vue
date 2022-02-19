<template>
  <img :src="gravatarImgUrl()" alt="User profile image" />
</template>

<script setup lang="ts">
import type { Author } from "~/types"
import { createGravatarImgUrl } from "~/utils/gravatar"

const props = defineProps({
  author: {
    type: Object as () => Author,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
  },
})

const gravatarImgUrl = (): string =>
  createGravatarImgUrl(props.author.email, props.size)
</script>
