<template>
  <img :src="gravatarImgUrl()" alt="User profile image" />
</template>

<script setup lang="ts">
import md5 from "md5"
import type { Author } from "~/types"

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

const gravatarImgUrl = (): string => {
  const hash = md5(props.author.email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?default=mp&size=${props.size}`
}
</script>
