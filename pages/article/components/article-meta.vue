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
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }}
      <span class="counter">{{ `(${article.author.following || 0})` }}</span>
    </button>
    <button
      v-if="isCurrent"
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
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.author.favorited,
      }"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">{{ `(${article.favoritesCount})` }}</span>
    </button>
    <button v-if="isCurrent" class="btn btn-outline-danger btn-sm">
      <i class="ion-trash-a"></i>
      Delete Article
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    return {};
  },
  computed: {
    ...mapGetters(["getUser"]),
    isCurrent() {
      console.log(this.getUser);
      return true;
    },
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style>
</style>