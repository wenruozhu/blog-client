<template>
  <div class="footer">
    <ul>
      <li>©2020</li>
      <li>
        <a href="mailto:769917560@qq.com" _target="_blank">邮箱</a>
      </li>
      <li>
        <a target="_blank" href="https://github.com/wenruozhu">Github</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  margin-top: 1rem;
  border-top: 1px solid #eee;
  color: #666;
  /* position: fixed;
  left: 0;
  bottom: 0; */
}
.footer ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.footer ul li {
  padding: 0 1rem;
  position: relative;
}
.footer ul li::after {
  content: " ";
  width: 3px;
  height: 3px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #ccc;
  border-radius: 50%;
}
.footer ul li:last-of-type::after {
  background-color: #fff;
}
.footer ul li a {
  color: #666;
}
</style>