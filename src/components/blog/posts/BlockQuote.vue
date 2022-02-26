<template>
  <blockquote>
    <slot />
    <footer v-if="props.author || props.title || props.url">
      <span v-if="props.author" class="author">{{ props.author }}</span>
      <cite v-if="props.url || props.title" :class="[author ? 'hyphen-before' : '']">
        <a v-if="props.url" :href="props.url" target="_blank">
          {{ props.title !== "" ? props.title : props.url }}
        </a>
        <span v-else>{{ props.title }}</span>
      </cite>
    </footer>
  </blockquote>
</template>

<script setup lang="ts">
const props = defineProps({
  author: { required: false, default: "", type: String },
  title: { required: false, default: "", type: String },
  url: { required: false, default: "", type: String },
})
</script>

<style scoped>
a {
  font-weight: 400;
}

footer {
  @apply mt-10;
}

.hyphen-before::before {
  content: "—";
  padding: 0.3em;
}

.author {
  font-weight: 700;
}
</style>
