<template>
  <div class>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="submitComment">Post Comment</button>
      </div>
    </form>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
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
        >{{ comment.author.username }}</nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
        <span class="mod-options" @click="handleDeleteComment(comment.id)">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComment } from '@/api/article'

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
      comments: [], // 文章列表
      comment: {
        body: ''
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**提交评论 */
    async submitComment () {
      const { data } = await addComments(this.article.slug, this.comment)
      if (data) {
        this.handleGetComments()
      }
    },
    /**获取文章评论 */
    async handleGetComments () {
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    },
    /**删除评论 */
    async handleDeleteComment (id) {
      await deleteComment(this.article.slug, id)
      this.handleGetComments()
    }
  },
  created () { },
  /**只会在客户端渲染评论 */
  mounted () {
    this.handleGetComments()
  },
}
</script>
<style>
</style>