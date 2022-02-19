<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { usePostsIndexStore } from "~/stores/postsIndex"
import type { PostMetaDataFinal } from "~/types"

const user = useUserStore()
const postsStore = usePostsIndexStore()
// const allPosts = posts.allPosts
const name = ref(user.savedName)
const allPosts = ref<PostMetaDataFinal[]>([])

postsStore.allPosts.then((posts) => {
  allPosts.value = posts.value
})

const router = useRouter()
const go = () => {
  if (name.value) router.push(`/hi/${encodeURIComponent(name.value)}`)
}
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
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
      >
        Vitesse
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">Description</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      aria-label="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">What's your name</label>

    <div>
      <button class="m-3 text-sm btn" :disabled="!name" @click="go">Go</button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
