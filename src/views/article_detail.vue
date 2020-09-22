<template>
  <div class="article_detail">
    <div class="title">
      <h6>{{article.title}}</h6>
    </div>
    <div class="content">
      <p>{{article.content}}</p>
    </div>
  </div>
</template>

<script>
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
  methods: {
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

<style>
.article_detail{
  max-width: 768px;
  margin: 0 auto;
}
.article_detail .title h6{
  font-size: 20px;
}
.article_detail .content {
  
}
</style>