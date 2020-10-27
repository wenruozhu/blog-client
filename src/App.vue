<template>
  <div id="app">
    <mobileAside @sideState="changeSideState" :mobileSideState="mobileSideState"></mobileAside>
    <div class="app-main" :class="{'open': mobileSideState}">
      <my-header @sideState="changeSideState" @languageState="getLanguageState"></my-header>
      <div class="app-container">
        <router-view />
      </div>
      <my-footer></my-footer>
      <scroll-top></scroll-top>
    </div>
    <div class="language-list" :class="{'active': languageState}">
      <ul>
        <li @click="changeLanguage('zh')">中文简体</li>
        <li @click="changeLanguage('hk')">中文繁体</li>
        <li @click="changeLanguage('en')">English</li>
        <li @click="languageState=false">{{i18nT("取消")}}</li>
      </ul>
    </div>
    <div v-show="languageState" class="language-mask" @click="languageState=false"></div>
    <div class="aside-mask" v-if="mobileSideState" @click="mobileSideState=false"></div>
  </div>
</template>

<script>
import myHeader from "@/components/common/header";
import myFooter from "@/components/common/footer";
import mobileAside from "@/components/layout/aside";
import scrollTop from "@/components/layout/scrollTop";
export default {
  name: "App",
  data() {
    return {
      mobileSideState: false, //移动端侧边栏以外蒙版
      languageState: false
    };
  },
  components: {
    myHeader,
    myFooter,
    mobileAside,
    scrollTop
  },
  methods: {
    changeSideState(boolean) {
      this.mobileSideState = boolean;
    },
    getLanguageState(boolean) {
      this.languageState = boolean;
    },
    changeLanguage(language) {
      switch (language) {
        case "zh":
          this.setLanguage("zh");
          break;
        case "hk":
          this.setLanguage("hk");
          break;
        case "en":
          this.setLanguage("en");
          break;
      }
      this.languageState = false;
    }
  }
};
</script>
<style scoped>
#app {
  overflow-x: hidden;
}
.app-main {
  overflow: hidden;
}
.app-main.open {
  transform: translateX(60%);
}
.app-container {
  width: 100%;
  padding-top: 4.5rem;
}
.language-list {
  width: 100%;
  background-color: #fff;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  font-size: 1rem;
  transform: translateY(100%);
  transition: all 0.3s ease-out;
}
.language-list.active {
  transform: translateY(0);
}
.language-list ul li {
  line-height: 3rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.language-list ul li:last-of-type {
  border-top: 0.5rem solid #eee;
}
.language-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.2);
}
.aside-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  opacity: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-out;
}
.aside-mask.active {
  opacity: 1;
}
</style>
