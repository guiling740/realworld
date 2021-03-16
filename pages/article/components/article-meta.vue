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
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <button
      @click="handleFollowUser"
      v-if="!isCurrentUser"
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ this.follow ? "Follow" : "Unfollow" }}
      {{ article.author.username }}
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
      @click="onFavorite"
      v-if="!isCurrentUser"
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.author.favorited,
      }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      {{ this.favorited ? `Unfavorite Article ` : `Favorite Article ` }}
      <span class="counter">{{ `(${favoritesCount})` }}</span>
    </button>
    <button
      v-else
      @click="handleDeleteArtice"
      class="btn btn-outline-danger btn-sm"
    >
      <i class="ion-trash-a"></i>
      Delete Article
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteArticle, addFavorite, deleteFavorite } from "@/api/article";
import { followUser, unFollowUser } from "@/api/profile";

export default {
  name: "ArticleMeta",
  components: {},
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  head() {
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
  data() {
    return {
      follow: false,
      favoritesCount: 0,
      favorited: false,
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    /**判断是否当前作者 */
    isCurrentUser() {
      return this.getUser.username === this.article.author.username;
    },
  },
  watch: {},
  methods: {
    /**去编辑页 */
    gotoEditor() {
      this.$router.push({
        name: "editor",
        params: {
          slug: this.article.slug,
        },
      });
    },
    /**删除文章 */
    async handleDeleteArtice() {
      const res = await deleteArticle(this.article.slug);
      if (res) {
        this.$router.push({
          name: "home",
        });
      }
    },
    /**关注 | 取消关注 */
    async handleFollowUser() {
      const fun = this.follow ? unFollowUser : followUser;
      const res = await fun(this.article.author.username);
      if (!res || !res.data) return;
      const { profile } = res.data;
      this.follow = profile.following;
    },
    async onFavorite() {
      const fun = this.favoritesCount === 0 ? addFavorite : deleteFavorite;
      const res = await fun(this.article.slug);
      if (!res || !res.data) return;
      const { article } = res.data;
      this.favoritesCount = article.favoritesCount;
      this.favorited = article.favorited;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style>
</style>