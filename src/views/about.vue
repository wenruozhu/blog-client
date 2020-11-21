<template>
  <div class="about">
    <h6>关于我</h6>
    <p>欢迎你来！我是文若。以下是我个人的一些简单信息：</p>
    <ul>
      <li>
        <span>工作：</span>
        <p>保持对技术的热情，保持学习的动力。相信遇到的问题多花点时间总能解决。</p>
      </li>
      <li>
        <span>技能：</span>
        <p>主职业为前端，会用NodeJs写点简单的后端接口，比如说本站。</p>
      </li>
      <li>
        <span>娱乐：</span>
        <p>喜欢小说，电影，小说最喜欢的作者是路遥，《平凡的世界》这部小说给我的人生带来了很大的影响。</p>
      </li>
      <li>
        <span>心态：</span>
        <p>爱阅读、爱编程、爱大自然。</p>
      </li>
      <li>
        <span>原则：</span>
        <p>只做自己认为对的事。</p>
      </li>
    </ul>
    <h6>关于本站</h6>
    <p>很早就想建立一个个人的网站，一来可以作为平时练手的项目，二来可以记录一下自己平时学习或是工作项目上遇到的一些问题。</p>
    <p>本站所用的技术栈：</p>
    <ul>
      <li>
        <span>语言：</span> JavaScript
      </li>
      <li>
        <span>框架：</span> Vue2、Koa2
      </li>
      <li>
        <span>构建工具：</span> Webpack
      </li>
      <li>
        <span>版本控制：</span> Git
      </li>
      <li>
        <span>数据库：</span> Mysql
      </li>
      <li>
        <span>服务器：</span> Nginx
      </li>
      <li>
        <span>Linux发行版：</span> CentOs
      </li>
    </ul>
    <comment :articleId="articleId"></comment>
  </div>
</template>

<script>
import comment from "@/components/common/comment";
export default {
  name: "about",
  data() {
    return {
      articleId: 0 //关于我页面默认文章id为0
    };
  },
  components: {
    comment
  }
};
</script>

<style>
/* PC端样式 */
.about {
  width: 45rem;
  margin: 0 auto;
}

.about > h6 {
  font-size: 1.2rem;
  color: #000;
}
.about > p {
  margin: 1rem 0;
}
.about > ul > li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  color: #666;
}
.about ul > li > span {
  white-space: nowrap;
  font-weight: bold;
  color: #000;
}
@media (max-width: 852px) {
  .about {
    width: auto;
    padding: 1rem;
  }
}
</style>