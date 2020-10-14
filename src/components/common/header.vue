<template>
  <div class="header">
    <div class="pc-header">
      <nav>
        <div class="nav-item" v-for="(item,index) in nav" :key="index">
          <router-link :to="item.path">{{item.name}}</router-link>
        </div>
      </nav>
    </div>
    <div class="mobile-header">
      <span class="menu">
        <svg-icon id="menu" icon-class="menu"></svg-icon>
      </span>
      <h6>文若</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-header",
  data() {
    return {
      keyword: "",
      nav: [
        { path: "/", name: "文章" },
        { path: "/about", name: "关于我" },
        { path: "/wall", name: "留言墙" }
      ]
    };
  }
};
</script>

<style>
/* PC端样式 */
.pc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  line-height: 4rem;
  padding: 0 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.pc-header nav {
  display: flex;
}
.nav-item {
  padding: 0 1.5rem;
}
.nav-item a {
  font-size: 15px;
  color: rgb(179, 179, 179);
}
.nav-item a.router-link-exact-active {
  color: rgb(36, 41, 46);
}
@media (min-width: 852px) {
  .pc-header {
    display: block;
  }
}
/* 移动端样式 */
.mobile-header {
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
}
.mobile-header .menu{
  position: absolute;
  top: 0;
  left: 1rem;
  bottom: 0;
  margin: auto;
  font-size: 1.2rem;
}
.mobile-header h6{
  font-size: 1.3rem;
}
@media (max-width: 852px) {
  .pc-header {
    display: none;
  }
  .mobile-header {
    display: block;
  }
}
</style>