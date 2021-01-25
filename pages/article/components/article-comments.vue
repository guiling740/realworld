<template>
  <div class>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ command.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        <nuxt-link
          class="comment-author"
          :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }"
        >{{ command.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from '@/api/article'

export default {
  name: 'ArticleComments',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [] // 文章列表
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created () { },
  // 只会在客户端渲染
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
}
</script>
<style>
</style>