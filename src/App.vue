<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: "Vitesse",
  meta: [{ name: "description", content: "Opinionated Vite Starter Template" }],
})
</script>

<template>
  <div
    class="content-wrapper bg-background-primary font-sans text-copy-primary leading-normal flex flex-col min-h-screen"
  >
  <router-view />
  </div>
</template>
