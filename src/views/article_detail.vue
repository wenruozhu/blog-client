<template>
  <div class="article_detail">
    <div class="title">
      <h1>{{article.title}}</h1>
    </div>
    <div class="meta">
      <span class="time">{{article.publishTime}}</span>
      <span class="num">字数 {{String(article.content).length}}</span>
      <!-- <span class="view">喜欢 13</span> -->
      <span class="comment">评论 {{count}}</span>
      <!-- <span class="count"></span> -->
    </div>
    <div class="content" v-html="articleContent"></div>
    <comment :articleId="articleId" @commentCount="commentCount"></comment>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
import comment from "@/components/common/comment";
import markdown from "../../plugins/marked";
export default {
  name: "article-detail",
  data() {
    return {
      articleId: "", //文章id
      article: "", //文章内容
      count: 0 //评论数
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
      this.axios
        .get(this.IP + `/api/v1/articles/${this.articleId}`)
        .then(res => {
          let article = res.data[0];
          article.publishTime = moment(article.publishTime).format(
            "YYYY.MM.DD HH:mm"
          );
          this.article = article;
        });
    },
    commentCount(count) {
      this.count = count;
    }
  },
  computed: {
    articleContent() {
      return markdown(this.article.content).html;
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
  padding-left: 0;
  margin: 1.2rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  text-indent: 0;
}
.article_detail .content p {
  line-height: 1.8rem;
  margin: 1.2rem 0;
  text-indent: 2em;
}
.article_detail .content p img {
  display: block;
  max-width: 100%;
  margin: 0 auto;
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
.article_detail .content a {
  color: #75bfd7;
}
.article_detail .content pre {
  line-height: 1.375;
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  position: relative;
  margin: 1rem 0;
  overflow: auto;
  white-space: pre-wrap;
  border-radius: 0.35rem;
  font-size: 16px;
  background: #f6f8fa;
  /* background-color: #252526; */
  color: #728fcb;
}
.article_detail .content pre::before {
  content: "";
  width: 100%;
  height: 32px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e6ebf1;
}
.article_detail .content pre::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: #ff5f56;
  width: 12px;
  height: 12px;
  top: 10px;
  left: 1.5rem;
  box-shadow: 20px 0 #ffbd2e, 40px 0 #27c93f;
}
.article_detail .content pre code {
  letter-spacing: 0.3px;
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
  font-weight: 500;
  box-sizing: border-box;
}
pre code .keyword {
  color: #c678dd;
}
pre code .number {
  color: #d19a66;
}
pre code .attr {
  color: #e06c75;
}
pre code .title {
  color: #61afef;
}
pre code .built_in {
  color: #56b6c2;
}
pre code .comment {
  color: #5c6370;
}
pre code .params {
  color: #be5046;
}
/* 文章详情移动端样式 */
@media (max-width: 852px) {
  .article_detail {
    width: auto;
    padding: 0 1rem 1rem;
    margin: 0;
  }
}
</style>