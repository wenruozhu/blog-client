<template>
  <div class="article">
    <ul>
      <li v-for="(article,index) in articleList" :key="index">
        <router-link :to="{name: 'article_detail',query: { articleId: article.id }}">
          <article>
            <span class="date">{{article.publishTime}}</span>
            <span class="tag">{{article.category|category}}</span>
            <h6 class="title">{{article.title}}</h6>
          </article>
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
  filters: {
    category(val) {
      switch (val) {
        case 1:
          return "Code";
          break;
        case 2:
          return "Life";
          break;
        default:
          break;
      }
    }
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
.article {
  width: 60%;
  margin: 20px auto;
}
.article ul li {
  padding: 0.5rem 2rem;
  position: relative;
}
article {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
}
article:before {
  content: " ";
  width: 6px;
  height: 6px;
  position: absolute;
  top: 0;
  left: 12px;
  bottom: 0;
  margin: auto;
  background: #ccc;
  border-radius: 50%;
}
article span.date {
  font-size: 1rem;
  color: #ccc;
}
article span.tag {
  padding: 0.1em 0.4em;
  margin: 0 0.8rem;
  font-size: 10px;
  color: #457e86;
  background: rgba(158, 169, 179, 0.12);
  border-radius: 2px;
  cursor: pointer;
}
article h6 {
  width: 70%;
  text-decoration: underline;
  font-size: 16px;
  color: #24292e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>