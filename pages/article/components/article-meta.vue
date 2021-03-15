<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <button
      v-if="!isCurrentUser"
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }}
      <span
        class="counter"
      >{{ `(${article.author.following || 0})` }}</span>
    </button>
    <button
      v-else
      @click="gotoEditor"
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
    >
      <i class="ion-edit"></i>
      Edit Article
    </button>
    &nbsp;
    <button
      v-if="!isCurrentUser"
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.author.favorited,
      }"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">{{ `(${article.favoritesCount})` }}</span>
    </button>
    <button v-else @click="handleDeleteArtice" class="btn btn-outline-danger btn-sm">
      <i class="ion-trash-a"></i>
      Delete Article
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { deleteArticle } from '@/api/article'

export default {
  name: "ArticleMeta",
  components: {},
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  data () {
    return {};
  },
  computed: {
    ...mapGetters(["getUser"]),
    /**判断是否当前作者 */
    isCurrentUser () {
      return this.getUser.username === this.article.author.username
    },
  },
  watch: {},
  methods: {
    /**去编辑页 */
    gotoEditor () {
      this.$router.push({
        name: 'editor',
        params: {
          slug: this.article.slug
        }
      })
    },
    /**删除文章 */
    async handleDeleteArtice () {
      const res = await deleteArticle(this.article.slug)
      if (res) {

      }
    }
  },
  created () { },
  mounted () { },
};
</script>
<style>
</style>