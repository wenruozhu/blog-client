<template>
  <div id="app">
    <my-header></my-header>
		<router-view/>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myHeader from "@/components/common/header";
import myFooter from "@/components/common/footer";
export default {
  name: 'App',
  components:{
    myHeader,
    myFooter
  }
}
</script>

<style>

</style>
