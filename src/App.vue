<template>
  <div id="app">
    <my-header></my-header>
		<router-view/>
  </div>
</template>

<script>
import myHeader from "@/components/common/header";
export default {
  name: 'App',
  components:{
    myHeader
  }
}
</script>

<style>

</style>
