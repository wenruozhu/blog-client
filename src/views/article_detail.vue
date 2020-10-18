<template>
  <div class="article_detail">
    <div class="title">
      <h1>{{article.title}}</h1>
    </div>
    <div class="meta">
      <span class="time">{{article.publishTime}}</span>
      <span class="num">字数 {{String(article.content).length}}</span>
      <span class="view">喜欢 13</span>
      <span class="comment">评论 0</span>
      <span class="count"></span>
    </div>
    <div class="content" v-html="article.content"></div>
    <comment :articleId="articleId"></comment>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
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
            let article = res.data[0];
            article.publishTime = moment(article.publishTime).format(
              "YYYY.MM.DD HH:mm"
            );
            this.article = article;
          }
        });
    }
  }
};
</script>

<style>
/* 文章详情PC端样式 */
.article_detail {
  width: 45rem;
  min-height: calc(100vh - 196px);
  margin: 1rem auto;
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
.article_detail .title h1 {
  font-size: 1.8rem;
}
.article_detail .title h2 {
  font-size: 1.7rem;
}
.article_detail .title h3 {
  font-size: 1.6rem;
}
.article_detail .title h4 {
  font-size: 1.5rem;
}
.article_detail .title h5 {
  font-size: 1.4rem;
}
.article_detail .title h6 {
  font-size: 1.3rem;
}
.article_detail h1,
.article_detail h2,
.article_detail h3,
.article_detail h4,
.article_detail h5,
.article_detail h6 {
  line-height: 1.8rem;
  padding-left: 0;
  margin: 1.2rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  text-indent: 0;
}
.article_detail .content p {
  line-height: 1.8rem;
  margin: 1.2rem 0;
}
.article_detail .content ul {
  padding-left: 2rem;
  margin: 1.2rem 0;
  list-style: disc;
}
.article_detail .content ul li {
  line-height: 1.5rem;
  padding: 0.5rem;
  list-style-type: disc;
}
.article_detail .content a{
  color: #75bfd7;
}
/* 文章详情移动端样式 */
@media (max-width: 852px) {
  .article_detail {
    width: auto;
    padding: 1rem;
  }
}
</style>