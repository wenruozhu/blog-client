<template>
  <transition-group tag="div" name="fade" class="scroll-top">
    <a class="scroll-btn" @click="scrollTop" v-if="showScroll" :key="1">
      <svg-icon id="top" icon-class="top"></svg-icon>
    </a>
  </transition-group>
</template>

<script>
export default {
  name: "scroll-top",
  data() {
    return {
      showScroll: false
    };
  },
  mounted() {
    // 滚动条在Y轴上的滚动距离
    function getScrollTop() {
      let scrollTop = 0;
      let bodyScrollTop = 0;
      let documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }
    // 浏览器视口的高度
    function getWindowHeight() {
      let windowHeight = window.innerWidth;
      return windowHeight;
    }
    window.addEventListener("scroll", () => {
      if (getScrollTop() * 2 > getWindowHeight()) {
        this.showScroll = true;
      } else this.showScroll = false;
    });
  },
  methods: {
    scrollTop() {
      let timer = null;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        let oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 150;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    }
  }
};
</script>

<style scoped>
.scroll-top {
  position: fixed;
  right: 0;
  bottom: 8rem;
}
.scroll-btn {
  display: block;
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.5rem;
  color: #5ab95c;
  background: #fff;
  text-align: center;
  line-height: 2.7rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.14);
  border-left-color: solid;
  border-bottom-color: #eee;
  border-right-color: solid;
  border-top-color: 1px;
  cursor: pointer;
}
</style>