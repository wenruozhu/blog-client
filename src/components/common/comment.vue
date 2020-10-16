<template>
  <!-- 评论模块 -->
  <div class="comment">
    <form id="post-box" class="post-box">
      <div class="count">
        <span class="num">{{commentList.length}}</span>&nbsp;
        条评论
      </div>
      <div class="edit-box">
        <div class="avatar" key="2">
          <img src="../../assets/img/avatar.jpg" alt="匿名用户" />
        </div>
        <div class="editor">
          <transition-group tag="div" name="list">
            <!-- 回复预览 -->
            <div class="will-reply" v-if="!!replyId" key="1">
              <div class="reply-user">
                <p>
                  <span>回复</span>
                  <a href>
                    <strong>{{replyCommentSelf.nickname}}</strong>
                  </a>
                </p>
                <a href="javascript:;" @click="cancelReply">
                  <svg-icon id="cancel" icon-class="cancel"></svg-icon>
                </a>
              </div>
              <div class="reply-preview">{{replyCommentSelf.content}}</div>
            </div>
            <!-- <div class="comment-box" key="2">
                <textarea
                  name="comment"
                  placeholder="记得留下您的昵称和邮箱,可以快速收到回复..."
                  cols="3"
                  rows="5"
                  ref="markdown"
                  maxlength="200"
                  v-model="content"
                ></textarea>
            </div>-->
            <div class="markdown" key="2">
              <div
                class="markdown-editor"
                ref="markdown"
                contenteditable="true"
                placeholder="记得留下您的昵称和邮箱,可以快速收到回复..."
                @keyup="commentContentChange($event)"
              ></div>
            </div>
          </transition-group>
        </div>
      </div>
      <transition-group tag="div" name="list">
        <div class="user-info" :key="1">
          <div class="name">
            <input
              type="text"
              name="nickname"
              placeholder="昵称 （必填）"
              v-model="nickname"
              maxlength="10"
            />
          </div>
          <div class="email">
            <input
              type="text"
              name="email"
              placeholder="邮箱 （必填，不会公开）"
              v-model="email"
              maxlength="20"
            />
          </div>
          <div class="site">
            <input
              type="text"
              name="site"
              placeholder="网站 （https://非必填）"
              v-model="site"
              maxlength="20"
            />
          </div>
        </div>
        <div class="submit" :key="2" @click="submitComment">
          <span>发布</span>
          <svg-icon id="release" icon-class="release"></svg-icon>
        </div>
      </transition-group>
    </form>
    <div class="list-box">
      <ul>
        <li
          v-for="(comment,index) in commentList"
          :key="index"
          class="comment-item"
          :id="`comment-item-${comment.id}`"
          :class="{
            'comment-item': true,
            'active': `comment-item-${comment.id}` === activeComment
          }"
        >
          <div class="comment-body">
            <div class="comment-header">
              <a target="_blank" class="comment-user-info" :href="comment.site">
                <img src="../../assets/img/avatar.jpg" alt />
                <span>{{comment.nickname}}</span>
              </a>
              <span class="time">{{comment.publishTime}}</span>
            </div>
            <div class="comment-content">
              <!-- 引用回复 -->
              <div class="reply-box" v-if="!!comment.replyId">
                <div class="reply-name">
                  <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.replyId}`)">
                    <strong
                      v-if="foundReplyParent(comment.replyId)"
                    >{{foundReplyParent(comment.replyId)}}</strong>
                  </a>
                </div>
                <div class="reply-content">
                  <p>{{foundReplyContent(comment.replyId)}}</p>
                </div>
              </div>
              <p>{{comment.content}}</p>
            </div>
            <div class="comment-footer">
              <a
                href
                class="like"
                :class="{liked:commentLinked(comment.id)}"
                @click.stop.prevent="likeComment(comment)"
              >
                <svg-icon id="like" icon-class="like"></svg-icon>
                <span>顶 ({{comment.likes}})</span>
              </a>
              <a href class="reply" @click.stop.prevent="replyComment(comment)">
                <svg-icon id="reply" icon-class="reply"></svg-icon>
                <span>回复</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
import { scrollTo } from "../../../utils/scroll";
export default {
  name: "comment",
  props: ["articleId"],
  data() {
    return {
      commentList: [], //文章评论列表
      // 文章评论参数
      nickname: "",
      email: "",
      site: "",
      // 评论相关
      replyId: 0, //引用回复评论id
      activeComment: 0, //找到原始评论
      // 编辑器相关
      comentContentHtml: "",
      comentContentText: "",
      previewContent: "",
      previewMode: false,
      // 用户历史数据
      likeComments: []
    };
  },
  created() {
    console.log(this.articleId)
    this.getComment();
  },
  mounted() {
    this.initUser();
  },
  methods: {
    // 初始化本地用户数据即点赞历史
    initUser() {
      let likeComments = localStorage.getItem("like_comments");
      if (likeComments) {
        this.likeComments = JSON.parse(likeComments);
      }
    },
    // 清空输入表单
    initComment() {
      this.replyId = 0;
      this.nickname = "";
      this.email = "";
      this.site = "";
      this.comentContentHtml = "";
      this.$refs.markdown.innerHTML = this.comentContentHtml;
    },

    // 获取评论列表
    getComment() {
      axios.get(`/api/v1/comment/${this.articleId}`).then(res => {
        if (res.status == 200) {
          for (const comment of res.data) {
            comment.publishTime = moment(comment.publishTime).format(
              "YYYY.MM.DD HH:mm"
            );
          }
          this.commentList = res.data;
        }
      });
    },
    // 提交评论
    submitComment() {
      if (!this.comentContentText) {
        return;
      }
      if (!this.nickname) {
        return;
      }
      if (!this.email) {
        return;
      }
      let params = {
        articleId: this.articleId,
        replyId: this.replyId,
        // 评论参数
        content: this.comentContentText,
        nickname: this.nickname,
        email: this.email,
        site: this.site
      };
      axios
        .post(`/api/v1/comment`, params)
        .then(res => {
          const data = res;
          if (res.status == 200) {
            this.getComment();
            this.initComment();
          }
        })
        .catch(err => {});
    },
    // 跳转到某条指定的id位置
    toSomeAnchorById(id) {
      const targetDom = document.getElementById(id);
      if (targetDom) {
        let isToEditor = Object.is(id, "post-box");
        let isCommentBox = Object.is(id, "comment-box");
        scrollTo(targetDom, 500, {
          offset: isToEditor ? 0 : isCommentBox ? -70 : 0
        });
        if (isToEditor) {
          let p = this.$refs.markdown;
          let s = window.getSelection();
          let r = document.createRange();
          r.setStart(p, p.childElementCount);
          r.setEnd(p, p.childElementCount);
          s.removeAllRanges();
          s.addRange(r);
        } else {
          this.activeComment = id;
        }
      }
    },
    // 回复评论
    replyComment(comment) {
      this.replyId = comment.id;
      this.toSomeAnchorById("post-box");
    },
    cancelReply() {
      this.replyId = 0;
    },
    // 找到回复来源
    // 查找回复来源昵称
    foundReplyParent(replyId) {
      let parent = this.commentList.find(comment =>
        Object.is(comment.id, replyId)
      );
      return parent ? parent.nickname : null;
    },
    // 查找回复来源内容
    foundReplyContent(replyId) {
      let comment = this.commentList.find(comment =>
        Object.is(comment.id, replyId)
      );
      return comment ? comment.content : null;
    },
    // 点赞评论
    likeComment(comment) {
      if (this.commentLinked(comment.id)) return false;
      let params = {
        commentId: comment.id
      };
      axios
        .post(`/api/v1/comment/likeComment`, params)
        .then(res => {
          const data = res;
          if (res.status == 200) {
            this.likeComments.push(comment.id);
            localStorage.setItem(
              "like_comments",
              JSON.stringify(this.likeComments)
            );
            this.getComment();
          }
        })
        .catch(err => {});
    },
    // 获取某条评论是否被点赞
    commentLinked(commentId) {
      return this.likeComments.includes(commentId);
    },
    // 编辑器相关
    commentContentChange() {
      const html = this.$refs.markdown.innerHTML;
      const text = this.$refs.markdown.innerText;
      if (!Object.is(html, this.comentContentHtml)) {
        this.comentContentHtml = html;
      }
      if (!Object.is(text, this.comentContentText)) {
        this.comentContentText = text;
      }
    }
  },
  computed: {
    // 获取引用回复评论
    replyCommentSelf() {
      let replyComment = this.commentList.find(comment =>
        Object.is(comment.id, this.replyId)
      );
      return replyComment;
    }
  }
};
</script>

<style scoped>
.comment .count {
  padding: 12px 0;
  font-size: 16px;
  color: #555;
}
.comment .count .num {
  font-weight: bold;
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
  margin-bottom: 1em;
}
.comment .edit-box .markdown .markdown-editor {
  min-height: 6em;
  max-height: 30em;
  line-height: 1.8em;
  position: relative;
  overflow: auto;
}
.comment .edit-box .markdown .markdown-editor {
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
.comment .edit-box .markdown .markdown-editor:hover {
  border-color: #333;
}
.comment .edit-box .markdown .markdown-editor:focus {
  border-color: #555;
}
.comment .edit-box .markdown .markdown-editor:empty::before {
  content: attr(placeholder);
  color: rgb(179, 179, 179);
}
.comment .editor {
  flex-grow: 1;
  max-width: calc(100% - 56px);
}
/* 评论区移动端样式 */
@media (max-width: 852px) {
  .comment .avatar {
    display: none;
  }
  .edit-box {
    width: auto;
  }
  .comment .editor {
    max-width: 100%;
  }
  .comment div .user-info {
    display: block;
    padding-left: 0;
  }
  .comment div .user-info div:nth-of-type(2n) {
    margin: 0.8rem 0;
  }

  .comment .list-box ul li {
    padding: 0.1rem 0;
  }
  .comment .comment-body .comment-header a img {
    width: 36px;
    height: 36px;
    position: static;
    margin-right: 1rem;
    border-radius: 6px;
  }
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
.will-reply .reply-user a:hover {
  color: #d06f67;
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
  border-color: #d06f67;
}
.comment .user-info > div:last-of-type > input:hover {
  border-color: #8391a5;
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
.comment-item.active {
  border: 1px dashed #ca5c54;
}
.comment-item .comment-body {
  width: 100%;
  padding: 8px;
}
.comment-body .comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}
.comment-body .comment-header a img {
  width: 36px;
  height: 36px;
  position: absolute;
  top: 12px;
  left: 12px;
  border-radius: 6px;
}
.comment-body .comment-header a {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  margin: 0 6px;
}
.comment-body .comment-footer > a.like:hover {
  color: #d06f67;
}
.comment-body .comment-footer > a.like.liked {
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