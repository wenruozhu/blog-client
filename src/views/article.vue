<template>
  <div class="article">
    <ul>
      <li v-for="(article,index) in articleList" :key="index">
        <router-link :to="{name: 'article_detail',query: { articleId: article.id }}">
          <h6 class="title">{{article.title}}</h6>
          <span class="date">{{article.publishTime}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
export default {
  name: "index",
  data() {
    return {
      articleList: []
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      axios
        .get(`/api/v1/articles/getAllArticle`)
        .then(res => {
          for (const article of res.data) {
            article.publishTime = moment(article.publishTime).format(
              "YYYY.MM.DD"
            );
          }
          this.articleList = res.data;
        })
        .catch(err => {});
    },
    /* readArticle(articleId) {
      this.$router.push({
        name: "article_detail",
        query: { articleId: articleId }
      });
    } */
  }
};
</script>
<style scoped>
.article {
  width: 60%;
  margin: 20px auto;
}
.article ul li {
  font-size: 16px;
}
.article ul li h6 {
  height: 35px;
  line-height: 35px;
  color: rgb(33, 33, 33);
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  letter-spacing: 2px;
}
.article ul li .date {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  color: rgb(11, 122, 122);
  margin-right: 15px;
  font-size: 16px;
  font-family: "Iowan Old Style", Palatino, Georgia, "Times New Roman", Times,
    serif;
}
</style>