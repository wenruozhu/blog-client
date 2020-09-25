<template>
  <div class="article_detail">
    <div class="title">
      <h6>{{article.title}}</h6>
    </div>
    <div class="meta">
      <span class="time">2020.05.31 16:07</span>
      <span class="num">字数 {{article.content.length}}</span>
      <span class="view">喜欢 13</span>
      <span class="comment">评论 0</span>
      <span class="count"></span>
    </div>
    <div class="content">
      <p>{{article.content}}</p>
    </div>
    <!-- 评论模块 -->
    <div class="comment">
      <form class="post-box">
        <div class="count">
          <span class="num">0</span>&nbsp;
          评论
        </div>
        <div class="edit-box">
          <div class="avatar" key="2">
            <img src="../assets/img/avatar.jpg" alt="匿名用户" />
          </div>
          <div class="editor">
            <transition-group tag="div" name="list">
              <div class="will-reply" key="1">
                <div class="reply-user">
                  <p>
                    <span>回复</span>
                    <a href>
                      <strong>熊大</strong>
                    </a>
                  </p>
                  <a href>
                    <svg-icon id="cancel" icon-class="cancel"></svg-icon>
                  </a>
                </div>
                <div class="reply-preview">如果你总是这样轻言放弃的话，无论过多久都只会原地踏步。</div>
              </div>
              <div class="comment-box" key="3">
                <textarea name="comment" placeholder="记得留下您的昵称和邮箱,可以快速收到回复..." cols="3" rows="5"></textarea>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="user-info">
          <div class="name">
            <input type="text" name="username" placeholder="昵称 （必填）" maxlength="10" />
          </div>
          <div class="email">
            <input type="text" name="email" placeholder="邮箱 （必填，不会公开）" maxlength="20" />
          </div>
          <div class="site">
            <input type="text" name="site" placeholder="网站 （https://非必填）" maxlength="20" />
          </div>
        </div>
        <div class="submit">
          <span>发布</span>
          <svg-icon id="release" icon-class="release"></svg-icon>
        </div>
      </form>
      <div class="list-box">
        <ul>
          <li class="comment-item">
            <div class="comment-avatar">
              <a target="_blank" href="#">
                <img src="../assets/img/avatar.jpg" alt />
              </a>
            </div>
            <div class="comment-body">
              <div class="comment-header">
                <a target="_blank" class="user-name" href="#">
                  <span>熊大</span>
                </a>
                <span class="time">2020.08.08 08:28</span>
              </div>
              <div class="comment-content">
                <div class="reply-box">
                  <div class="reply-name">
                    <a href>熊二</a>
                  </div>
                  <div class="reply-content">
                    <p>技术比人情更可靠，你所学习的技术知识，积累的那些细节和经验，百分之一百日后可以给你带来令你欣喜的价值，而且这个价值连绵不绝，持续不断，越筑越高。因为技术不像人，技术不会欺骗你，而且越基础的技术越忠诚。</p>
                  </div>
                </div>
                <p>永远年轻，永远热泪盈眶。</p>
              </div>
              <div class="comment-footer">
                <a href="#" class="like">
                  <svg-icon id="like" icon-class="like"></svg-icon>
                  <span>顶 (0)</span>
                </a>
                <a href="#" class="reply">
                  <svg-icon id="reply" icon-class="reply"></svg-icon>
                  <span>回复</span>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
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
.comment .count {
  padding: 12px 0;
  font-size: 16px;
  color: #555;
}
/* 评论模块样式 */
.comment .avatar {
  width: 36px;
  height: 36px;
  margin-right: 1em;
}
.comment .avatar img {
  width: 100%;
  border-radius: 6px;
}
.comment .edit-box {
  display: flex;
  justify-content: space-between;
}

.comment .edit-box .comment-box {
  min-height: 6em;
  max-height: 30em;
  line-height: 1.8em;
  position: relative;
  overflow: auto;
}
.comment .edit-box .comment-box textarea {
  width: 100%;
  resize: none;
  outline: none;
  padding: 0.5em;
  cursor: auto;
  font-size: 0.95em;
  border: 1px solid #eee;
  border-radius: 6px;
  box-sizing: border-box;
}
.comment .edit-box .comment-box textarea:hover {
  border-color: #333;
}
.comment .edit-box .comment-box textarea:focus {
  border-color: #555;
}
.comment .editor {
  flex-grow: 1;
  max-width: calc(100% - 56px);
}
.will-reply {
  margin-bottom: 1em;
  font-size: 0.95em;
  color: rgb(102, 102, 102);
}
.will-reply .reply-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
  height: 2.6em;
  line-height: 2.6em;
  border: 1px solid #eee;
  border-radius: 6px;
}
.will-reply .reply-user a {
  color: rgb(102, 102, 102);
}
.will-reply .reply-preview {
  max-height: 10em;
  overflow: auto;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
}
.comment .user-info {
  display: flex;
  padding-left: 62px;
}
.comment .user-info > div {
  flex: 1;
}
.comment .user-info > div:nth-of-type(2n) {
  margin: 0 10px;
}
.comment .user-info > div > input {
  width: 100%;
  padding: 6px;
  background: transparent;
  border: 1px solid #eee;
  border-radius: 6px;
  box-sizing: border-box;
  transform: all 1s;
}
.comment .user-info > div > input:hover {
  border-color: #333;
}
.comment .user-info > div > input:focus {
  border-color: orange;
}
.comment .submit {
  width: 56px;
  position: relative;
  padding: 3px 6px;
  margin-top: 10px;
  margin-left: auto;
  font-size: 16px;
  color: rgb(102, 102, 102);
  border-radius: 3px;
  vertical-align: middle;
  background: transparent;
  white-space: nowrap;
  cursor: pointer;
}
.comment .submit:hover {
  color: rgb(102, 102, 102);
  background: rgba(0, 0, 0, 0.12);
}
.comment .submit svg {
  width: 18px;
  position: absolute;
  top: 0;
  right: 6px;
  bottom: 0;
  margin: auto;
  margin-left: 8px;
}
.comment .list-box {
  margin-top: 20px;
}
.list-box ul li {
  padding: 10px 0 10px 60px;
}
.comment-item {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.comment-item .comment-avatar {
  width: 36px;
  height: 36px;
  position: absolute;
  top: 12px;
  left: 12px;
}
.comment-item .comment-avatar img {
  width: 100%;
  border-radius: 6px;
}
.comment-item .comment-body {
  width: 100%;
  /* padding: 8px; */
}
.comment-body .comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.comment-body .comment-header a {
  color: #4d4d4d;
}
.comment-body .comment-header a:hover {
  text-decoration: underline;
}
.comment-body .comment-header .time {
  font-size: 12px;
  font-family: Arial;
  color: #b3b3b3;
}
.comment-body .comment-content {
  line-height: 32px;
  font-size: 16px;
  color: #24292e;
  margin: 10px 0;
}
/* 回复评论样式 */
.reply-box {
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border: 1px solid #eee;
  border-radius: 4px;
}
.reply-box .reply-name a {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #4d4d4d;
}
.comment-body .comment-footer {
  display: flex;
  justify-content: flex-start;
}
.comment-body .comment-footer > a {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgb(102, 102, 102);
}
.comment-body .comment-footer > a span {
  margin-left: 6px;
}
.comment-body .comment-footer > a.like {
  margin-right: 12px;
}
.comment-body .comment-footer > a.like:hover {
  color: #d06f67;
}
.comment-body .comment-footer > a.reply {
  opacity: 0;
}
.comment-body .comment-footer > a.reply:hover {
  color: #73b769;
}
.comment-item:hover .comment-footer > a.reply {
  opacity: 1;
}
</style>