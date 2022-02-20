<template>
  <nav class="text-xl mt-6">
    <router-link class="icon-btn mx-2" to="/" title="Home">
      <carbon-campsite />
    </router-link>

    <router-link class="icon-btn mx-2" to="/about" title="About">
      <carbon-dicom-overlay />
    </router-link>

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>
  </nav>
</template>
