<template>
  <div class="app-aside" :class="{open: mobileSideState}">
    <div class="user-header">
      <img src="../../assets/img/avatar.jpg" alt />
      <h6>文若</h6>
    </div>
    <nav>
      <ul>
        <li @click="openSidebar">
          <router-link to="/">文章</router-link>
        </li>
        <li @click="openSidebar">
          <router-link to="/about">关于我</router-link>
        </li>
        <li @click="openSidebar">
          <router-link to="/wall">留言墙</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "app-aside",
  props: {
    mobileSideState: {
      default: false
    }
  },
  watch: {
    mobileSideState() {
      console.log(this.mobileSideState);
    }
  },
  methods: {
    openSidebar() {
      this.$emit("sideState", false);
    }
  }
};
</script>
<style scoped>
@media (min-width: 852px) {
  .app-aside {
    display: none;
  }
}
@media (max-width: 852px) {
  .app-aside {
    display: block;
  }
}
.app-aside {
  width: 60%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.02);
  transform: translateX(-100%);
  transition: all 0.3s ease-out;
}
.app-aside.open {
  transform: translateX(0);
}
.user-header {
  padding: 3.5rem 1rem 1rem;
  text-align: center;
}
.user-header > img {
  border-radius: 50%;
  width: 8rem;
}
.user-header > h6 {
  margin-top: 2rem;
  color: #24292e;
  font-size: 1.6rem;
}
nav {
  margin-top: 2rem;
}
nav ul li {
  text-align: center;
}
nav ul li a {
  display: block;
  padding: 1rem;
  font-size: 1.1rem;
  color: #808080;
}
</style>