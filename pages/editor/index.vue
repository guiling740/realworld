<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle, createArticle, updateArticle } from "@/api/article";

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "Editor",
  async asyncData({ params }) {
    const { slug } = params;
    if (!slug)
      return {
        article: {
          title: "",
          description: "",
          body: "",
          tagList: "",
        },
      };
    const { data } = await getArticle(params.slug);
    return {
      slug: params.slug,
      article: data.article,
    };
  },
  methods: {
    async onSubmit() {
      const params = { ...this.article };
      if (this.article && this.article.tagList) {
        Object.assign(params, {
          tagList: this.article.tagList.split(",") || "",
        });
      }
      const fun = this.slug ? updateArticle : createArticle;
      const {
        data: { article },
      } = await fun(params, this.slug);
      const { slug } = article;
      if (slug) {
        this.$router.push({
          name: "article",
          params: {
            slug: slug,
          },
        });
      }
    },
  },
};
</script>

<style>
</style>