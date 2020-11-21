<template>
  <div class="article">
    <ul class="article-pc">
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
    <ul class="article-mobile">
      <li v-for="(article,index) in articleList" :key="index">
        <router-link :to="{name: 'article_detail',query: { articleId: article.id }}">
          <article>
            <h6 class="title">{{article.title}}</h6>
            <p class="descript" v-if="article.descript">{{article.descript}}</p>
            <div class="meta">
              <span class="date">{{article.publishTime}}</span>
              <span class="tag">{{article.category|category}}</span>
            </div>
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
/* PC端样式 */
@media (min-width: 852px) {
  .article .article-pc {
    display: block;
  }
  .article .article-mobile {
    display: none;
  }
}
.article {
  padding-bottom: 390px;
}
.article .article-pc {
  width: 45rem;
  margin: 0 auto;
}
.article ul li {
  padding: 0.5rem 2rem;
  position: relative;
}
.article .article-pc article {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
}
.article .article-pc article:before {
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
.article .article-pc article span.date {
  font-size: 1rem;
  color: #ccc;
}
.article article span.tag {
  padding: 0.1em 0.4em;
  margin: 0 0.8rem;
  font-size: 10px;
  color: #457e86;
  background: rgba(158, 169, 179, 0.12);
  border-radius: 2px;
  cursor: pointer;
}
.article .article-pc article h6 {
  width: 70%;
  text-decoration: underline;
  font-size: 16px;
  color: #24292e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 移动端样式 */
@media (max-width: 852px) {
  .article .article-pc {
    display: none;
  }
  .article .article-mobile {
    display: block;
    width: auto;
  }
}
.article .article-mobile article .title {
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(36, 41, 46);
  overflow: hidden;
  text-overflow: ellipsis;
}
.article .article-mobile article .descript {
  margin: 2rem 0;
  min-height: 4rem;
  line-height: 1.8rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
}
.article .article-mobile article .meta {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-top: 0.5rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.85rem;
  color: #4d4d4d;
}
</style>