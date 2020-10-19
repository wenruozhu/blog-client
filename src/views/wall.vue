<template>
  <div class="wall">
    <div class="head">
      <a @click="dialogState = true" href="javascript:;">我要上墙</a>
    </div>
    <div class="message-list">
      <!-- PC端 -->
      <transition-group tag="div" class="columns" name="slide-down">
        <div class="column" :key="1">
          <div class="message" v-for="(message,index) in list0" :key="index">
            <p class="time">{{message.publishTime}}</p>
            <p class="content">{{message.message}}</p>
            <span class="name">{{message.name}}</span>
          </div>
        </div>
        <div class="column" :key="2">
          <div class="message" v-for="(message,index) in list1" :key="index">
            <p class="time">{{message.publishTime}}</p>
            <p class="content">{{message.message}}</p>
            <span class="name">{{message.name}}</span>
          </div>
        </div>
        <div class="column" :key="3">
          <div class="message" v-for="(message,index) in list2" :key="index">
            <p class="time">{{message.publishTime}}</p>
            <p class="content">{{message.message}}</p>
            <span class="name">{{message.name}}</span>
          </div>
        </div>
      </transition-group>
      <!-- 移动端 -->
      <div class="mobile-columns">
        <transition name="slide-down" v-for="(message,index) in messageList" :key="index">
          <div class="column">
            <div class="message">
              <p class="time">{{message.publishTime}}</p>
              <p class="content">{{message.message}}</p>
              <span class="name">{{message.name}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="load-more" v-if="!loadState" @click="getMoreMessage">{{loading ? "加载中" : "加载更多"}}</div>
    <transition name="slide-down">
      <div class="dialog" v-show="dialogState">
        <div class="dialog-head">
          <a href="javascript:;" @click="dialogState = false">
            <svg-icon id="cancel" icon-class="cancel"></svg-icon>
          </a>
        </div>
        <div class="dialog-content">
          <form>
            <div class="dialog-item name">
              <span>名字：</span>
              <input type="text" maxlength="18" v-model="name" placeholder="称呼（非必填）" />
            </div>
            <div class="dialog-item content">
              <span>说点啥？</span>
              <textarea
                cols="30"
                rows="10"
                maxlength="200"
                v-model="message"
                placeholder="曾经有一个 BUG 摆在我的面前......（必填）"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="dialog-footer">
          <button @click="dialogState = false">取消</button>
          <button @click="leaveMessage">确定</button>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="dialogState" @click="dialogState = false"></div>
    </transition>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-CN");
export default {
  name: "wall",
  data() {
    return {
      name: "", //留言称呼
      message: "", //留言内容
      dialogState: false, //对话框状态
      pageIndex: 1, //留言页数
      messageList: [], //获取留言列表
      loading: false, //加载状态
      loadState: false //数据是否加载完
    };
  },
  created() {
    this.getMessage();
  },

  methods: {
    getMessage() {
      this.loading = true;
      axios
        .get(`/api/v1/message/${this.pageIndex}`)
        .then(res => {
          for (const message of res.data) {
            message.publishTime = moment(message.publishTime).format(
              "YYYY.MM.DD HH:MM"
            );
          }
          if (res.data.length === 0) {
            this.loadState = true;
          }
          this.messageList = this.messageList.concat(res.data);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    leaveMessage() {
      let params = {
        name: this.name,
        message: this.message
      };
      if (!this.message) {
        alert("留言内容必填");
        return;
      }
      axios
        .post(`/api/v1/message`, params)
        .then(res => {
          const data = res;
          if (res.status == 200) {
            this.getMessage();
            this.dialogState = false;
          }
        })
        .catch(err => {});
    },
    getMoreMessage() {
      if (this.loading) {
        return;
      }
      this.pageIndex += 1;
      this.getMessage();
    }
  },
  computed: {
    list0() {
      return this.messageList.filter((item, n) => n % 3 === 0);
    },
    list1() {
      return this.messageList.filter((item, n) => n % 3 === 1);
    },
    list2() {
      return this.messageList.filter((item, n) => n % 3 === 2);
    }
  }
};
</script>

<style scoped>
.wall {
  width: 45rem;
  margin: 0 auto;
}
.wall .head {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  width: 12rem;
  height: 5rem;
  font-size: 1.3rem;
  color: #eee;
  text-align: center;
}
.head a {
  padding: 0.5rem 1rem;
  background-color: skyblue;
  color: #fff;
  text-decoration: underline;
  border-radius: 0.3rem;
}

.message-list .columns {
  display: flex;
  justify-content: space-between;
}
.message-list .column {
  flex: 1;
}
.message-list .column:nth-of-type(2n) {
  margin: 0 1rem;
}
/* PC端样式 */
@media (min-width: 852px) {
  .message-list .columns {
    display: flex;
  }
  .message-list .mobile-columns {
    display: none;
  }
}

.message-list .mobile-columns {
  padding: 0 1rem;
}
.message {
  position: relative;
  left: 0;
  top: 0;
  padding: 1rem;
  min-height: 13rem;
  margin-bottom: 1rem;
  color: #24292e;
  background: #f7f7f7;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
}
.message:hover {
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.2);
  transform: translate(-4px, -4px);
}
.message .time {
  font-size: 1rem;
  font-weight: 400;
}
.message .content {
  min-height: 6rem;
  max-height: 20rem;
  line-height: 1.4rem;
  margin: 1rem 0;
  font-size: 0.85rem;
  word-break: break-all;
  overflow: hidden;
}
.message .name {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  max-width: 12rem;
  font-size: 0.85rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.load-more {
  margin-top: 1rem;
  padding: 1.2rem;
  text-align: center;
  font-size: 1rem;
  color: rgb(36, 41, 46);
  cursor: pointer;
}
.load-more:hover {
  background: rgba(158, 169, 179, 0.12);
}

.dialog {
  width: 34rem;
  padding: 1rem;
  position: absolute;
  top: 10rem;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 2;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 8px 46px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03);
}
.dialog-head {
  text-align: right;
}
.dialog-head a {
  font-size: 1.3rem;
  color: rgb(202, 92, 84);
}
.dialog-content .dialog-item {
  display: flex;
  margin: 0.8rem 1.5rem 1rem 0;
  color: rgb(102, 102, 102);
}
.dialog .dialog-item > span {
  display: inline-block;
  height: 30px;
  width: 80px;
  line-height: 30px;
  text-align: right;
}
.dialog .dialog-item:hover input,
.dialog .dialog-item:hover textarea {
  border-color: #8391a5;
}
.dialog .name > input {
  width: calc(100% - 80px);
  padding: 0.3rem 0.5rem;
  border: 1px solid #eee;
  color: #24292e;
  border-radius: 6px;
}
.dialog .content > textarea {
  width: calc(100% - 80px);
  resize: none;
  padding: 0.3rem 0.5rem;
  border: 1px solid #eee;
  color: #24292e;
  border-radius: 6px;
}
.dialog-footer {
  text-align: right;
}
.dialog-footer button {
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-right: 1.5rem;
  border: 1px solid #eee;
  border-radius: 4px;
  text-align: center;
  vertical-align: middle;
  background: transparent;
  white-space: nowrap;
  cursor: pointer;
}
.dialog-footer button:hover {
  border-color: #24292e;
}
/* 移动端样式 */
@media (max-width: 852px) {
  .wall {
    width: auto;
  }
  .message-list .columns {
    display: none;
  }
  .message-list .mobile-columns {
    display: block;
  }
  .message-list .column:nth-of-type(2n) {
    margin: 0;
  }
  .load-more {
    margin: 1rem;
  }
  .dialog {
    width: 88%;
    padding: 1rem 1rem 1rem 0;
  }
  .dialog-content .dialog-item {
    margin: 0.8rem 0;
  }
  .dialog-footer button {
    margin-left: 1.5rem;
    margin-right: 0;
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #4d4d4d;
}
</style>