<template>
  <div id="app">
    <mobileAside @sideState="changeSideState" :mobileSideState="mobileSideState"></mobileAside>
    <div class="app-main" :class="{'open': mobileSideState}">
      <my-header @sideState="changeSideState"></my-header>
      <div class="app-container">
        <router-view />
      </div>
      <my-footer></my-footer>
    </div>
    <div class="mask" v-if="mobileSideState" @click="mobileSideState=false"></div>
  </div>
</template>

<script>
import myHeader from "@/components/common/header";
import myFooter from "@/components/common/footer";
import mobileAside from "@/components/layout/aside";
export default {
  name: "App",
  data() {
    return {
      mobileSideState: false
    };
  },
  components: {
    myHeader,
    myFooter,
    mobileAside
  },
  methods: {
    changeSideState(boolean) {
      this.mobileSideState = boolean;
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
.mask {
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
.mask.active {
  opacity: 1;
}
</style>
