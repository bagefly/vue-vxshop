<template>
  <div id="app">
    <NavHead/>
    <BreadCrumb>商品列表</BreadCrumb>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/app.css'
import NavHead from '@/components/NavHead'
import BreadCrumb from '@/components/BreadCrumb'
export default {
  name: 'app',
  components: {
    NavHead,
    BreadCrumb
  }
}
</script>

<style>

</style>
