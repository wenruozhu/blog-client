<template>
  <div class="header">
    <nav>
      <div class="nav-item" v-for="(item,index) in nav" :key="index">
        <router-link :to="item.path">{{item.name}}</router-link>
      </div>
    </nav>
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  line-height: 4rem;
  padding: 0 1.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
nav {
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
  color:rgb(36, 41, 46);
}
</style>