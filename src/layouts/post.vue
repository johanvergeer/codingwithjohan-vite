<template>
  <site-header />
  <div v-if="isLoading">Loading ...</div>
  <div v-else>
    <div class="container-inner mx-auto my-16">
      <div>
        <h1 class="text-3xl font-bold leading-tight">
          {{ postMeta.title }} {{ baseUrl }}
        </h1>
        <div class="flex justify-between mt-5">
          <article-meta :post="postMeta" />
          <div class="flex mb-8 text-xl">
            <!--                <article-tags :article="article" />-->
          </div>
        </div>
        <!--            <feature-image :article="article" class="mb-4" />-->
        <!--            <article-series :document="article" />-->
        <div class="markdown-body mb-8">
          <main>
            <router-view />
          </main>
          <!--              <nuxt-content :document="article" />-->
        </div>
        <!--            <article-series-prev-next :document="article" />-->
        <!--            <article-sources :article="article" />-->
      </div>
    </div>
  </div>
  <site-footer />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { usePostsIndexStore } from "~/stores/postsIndex"
import type { PostMetaDataFinal } from "~/types"
import { useEnvironmentInfo } from "~/stores/environmentInfo"

const slug = useRoute().path.split("/").slice(-1)[0]

const isLoading = ref(true)

const postsStore = usePostsIndexStore()
const environmentInfoStore = useEnvironmentInfo()

const { baseUrl } = storeToRefs(environmentInfoStore)

const postMeta = ref<PostMetaDataFinal>()

const head = ref({})

useHead(head)

postsStore
  .getPost(slug)
  .then((post) => {
    postMeta.value = post
    head.value = configureHead(postMeta.value!, baseUrl.value)
    isLoading.value = false
  })
  .catch((e) => console.error(e))

function configureHead(postMeta: PostMetaDataFinal, baseUrl: string) {
  return {
    meta: [
      {
        name: "author",
        content: postMeta.author.name,
      },
      {
        name: "description",
        content: postMeta.description,
      },
      { property: "og:type", content: "article" },
      { property: "og:title", content: postMeta.title },
      {
        property: "og:description",
        content: postMeta.description,
      },
      {
        property: "og:url",
        content: new URL(postMeta.url, baseUrl),
      },
      ..._timesMeta(),
      ..._twitterMeta(),
      ..._tagsMeta(),
    ],
  }

  function _timesMeta() {
    return [
      {
        name: "article:published_time",
        content: computed(() => postMeta.createdAt),
      },
      {
        name: "article:modified_time",
        content: computed(() => {
          if (postMeta.createdAt > postMeta.updatedAt) {
            return postMeta.createdAt
          }
          return postMeta.updatedAt
        }),
      },
    ]
  }

  function _twitterMeta() {
    return [
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "@johan_vergeer",
      },
      {
        name: "twitter:creator",
        content: "@johan_vergeer",
      },
      {
        name: "twitter:label1",
        content: "Reading time",
      },
      {
        name: "twitter:data1",
        content: `${postMeta.readingTime} min read`,
      },
      {
        name: "twitter:title",
        content: postMeta.title,
      },
      {
        name: "twitter:description",
        content: postMeta.description,
      },
    ]
  }

  function _tagsMeta() {
    return postMeta.tags
      ? postMeta.tags.map((tag) => ({
          name: "article:tag",
          content: tag,
          id: tag.toLowerCase(),
        }))
      : []
  }

  function _imageMeta() {
    if (postMeta.featureImage) {
      return [
        // {
        //   name: "og:image",
        //   content: this._featureImageUrl,
        // },
        // {
        //   name: "og:image:secure_url",
        //   content: this._featureImageUrl,
        // },
        {
          name: "og:image:type",
          content: "image/png",
        },
        {
          name: "og:image:alt",
          content: postMeta.title,
        },
        // {
        //   name: "twitter:image",
        //   content: this._featureImageUrl,
        // },
        // {
        //   name: "twitter:image:alt",
        //   content: this.article.title,
        // },
      ]
    } else return []
  }
}
</script>
