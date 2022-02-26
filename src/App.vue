<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: "Coding with Johan",
  meta: [
    { name: "description", content: "A blog about code and coding" },
    { property: "og:type", content: "website" },
    {
      property: "og:site_name",
      content: "Coding with Johan",
    },
  ],
})
</script>

<template>
  <div
    class="content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen"
  >
    <router-view />
  </div>
</template>
