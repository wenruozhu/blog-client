<template>
  <div class="article_detail">
    <div class="title">
      <h6>{{article.title}}</h6>
    </div>
    <div class="meta">
      <span class="time">2020.05.31 16:07</span>
      <span class="num">字数 {{String(article.content).length}}</span>
      <span class="view">喜欢 13</span>
      <span class="comment">评论 0</span>
      <span class="count"></span>
    </div>
    <div class="content">{{article.content}}</div>
    <comment :articleId="articleId"></comment>
  </div>
</template>

<script>
import comment from "@/components/common/comment";
export default {
  name: "article-detail",
  data() {
    return {
      articleId: "", //文章id
      article: "" //文章内容
    };
  },
  created() {
    this.articleId = this.$route.query.articleId;
    this.searchArticle();
  },
  components: {
    comment
  },
  methods: {
    // 查找文章内容
    searchArticle() {
      axios
        .get(`/api/v1/articles/${this.articleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.joeyToken}`
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.article = res.data[0];
          }
        });
    }
  }
};
</script>

<style scoped>
/* 文章详情PC端样式 */
.article_detail {
  width: 45rem;
  min-height: calc(100vh - 196px);
  margin: 1rem auto;
}
.article_detail .title h6 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #24292e;
}
.article_detail .meta {
  margin-top: 0.3rem;
  font-size: 0.8rem;
  color: #808080;
}
.article_detail .meta span {
  margin-right: 0.5rem;
}
.article_detail .content {
  margin: 1.5rem 0;
  color: #24292e;
}
/* 文章详情移动端样式 */
@media (max-width: 852px) {
  .article_detail {
    width: auto;
    padding: 1rem;
  }
}
</style>