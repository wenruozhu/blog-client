<template>
  <div class="article">
    <ul>
      <li v-for="(article,index) in articleList" :key="index">
        <span class="date">{{article.publishTime}}</span>
        <!-- <span class="tag">{{article.tags}}</span> -->
        <span class="title">{{article.title}}</span>
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
    }
  }
};
</script>
<style scoped>
.article{
  width: 60%;
  margin: 20px auto;
}
.article ul li{
  line-height: 48px;
  font-size: 18px;
}
</style>