<template>
  <header class="border-t-14 border-blue-700">
    <nav
      class="container mx-auto flex flex-wrap justify-between items-center py-8"
    >
      <div>
        <router-link to="/">
          <img
            id="logo"
            src="/assets/img/logo-100.png"
            class="inline w-24"
            alt="Coding with Johan logo"
          />
          <p id="site-header" class="inline text-copy-primary text-4xl ml-4">
            Coding with Johan
          </p>
        </router-link>
      </div>
      <div class="block lg:hidden">
        <!--          <button @click="toggle"-->
        <!--                  class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600">-->
        <!--            <svg class="current-color h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">-->
        <!--              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="gray" />-->
        <!--            </svg>-->
        <!--          </button>-->
      </div>
      <ul
        class="top-menu uppercase tracking-wide font-bold w-full block flex-grow lg:space-x-8 space-y-6 lg:space-y-0 lg:flex lg:flex-initial lg:w-auto items-center mt-8 lg:mt-0"
      >
        <li class="mb-6 lg:mb-0">
          <!-- TODO: search box -->
          <!--            <search-input />-->
        </li>
        <li>
          <!-- TODO: theme switcher-->
          <!--            <theme-switcher :theme="theme" @themeChanged="updateTheme" />-->
        </li>
        <li>
          <!--            <g-link to="/blog" class="text-copy-primary hover:text-gray-600">Blog</g-link>-->
        </li>
      </ul>
    </nav>
  </header>
</template>
