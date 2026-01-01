<script setup>
import Header from './components/HeaderWithRouter.vue';
import Footer from './components/Footer.vue';

import { reactive } from 'vue';

const navLists = reactive([
  {
    name: "首頁",
    linkUrl: "/"
  },
  {
    name: "商品列表",
    linkUrl: "/products"
  },
])
</script>

<template>
  <Header
    headerMessage="Dummy Shop"
    :routerInfo="navLists"
  />
  <div class="w-5/6 mx-auto mt-3">
    <RouterView />
  </div>
  <Footer />

</template>

<style scoped>
</style>
