<template>
  <footer class="bg-blue-700 text-white">
    <div
      class="container mx-auto flex flex-col lg:flex-row items-center justify-between py-8"
    >
      <ul class="flex items-center text-xl space-x-4">
        <li class="text-white hover:text-gray-400 font-light">
          Copyright {{ new Date().getFullYear() }}. All rights reserved
        </li>
        <li class="font-black">&middot;</li>
        <li>
          <router-link
            to="/PrivacyPolicy"
            class="text-white hover:text-gray-400 font-light"
          >
            Privacy Policy
          </router-link>
        </li>
      </ul>

      <ul class="flex items-center space-x-8">
        <footer-icon href="mailto:johanvergeer@gmail.com">
          <carbon-email></carbon-email>
        </footer-icon>
        <footer-icon
          href="https://www.youtube.com/channel/UC9YXmkTSfE7A2lCs-ndrmxw"
        >
          <carbon-logo-youtube></carbon-logo-youtube>
        </footer-icon>
        <footer-icon href="https://github.com/johanvergeer">
          <carbon-logo-github></carbon-logo-github>
        </footer-icon>
        <footer-icon href="https://twitter.com/johan_vergeer">
          <carbon-logo-twitter></carbon-logo-twitter>
        </footer-icon>
        <footer-icon href="https://linkedin.com/in/johanvergeer">
          <carbon-logo-linkedin></carbon-logo-linkedin>
        </footer-icon>
      </ul>
    </div>
  </footer>
</template>
