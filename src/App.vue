<script setup>
import Header from './components/HeaderWithRouter.vue';
import Footer from './components/Footer.vue';

import { onMounted, reactive, ref } from 'vue';

import {Moon, Sunny} from '@element-plus/icons-vue';

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

const isDark = ref(false);


const toggleDarkMode = () => {
    console.log(`Dark mode: ${isDark.value}`);  // ✅ 只讀取，不修改
    
    if (isDark.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('isDarkMode', isDark.value ? 'true' : 'false');
};

onMounted(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode === 'true') {
        isDark.value = true;
        document.documentElement.classList.add('dark');
    }
  });
</script>

<template>
  <div>
    <!-- ligth/ dark mode button -->
    <div class="dark-mode-switch">
      <el-switch
        v-model="isDark"
        @change="toggleDarkMode"
        size="large"
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        inline-prompt
        style="
          --el-switch-on-color: #2c3e50;
          --el-switch-off-color: #409eff;
        "
      />
    </div>

    <Header
      headerMessage="Dummy Shop"
      :routerInfo="navLists"
    />
    <div class="w-5/6 mx-auto mt-3">
      <RouterView />
    </div>
    <Footer />
</div>
</template>

<style scoped>
.dark-mode-switch {
  position: fixed;
  top: 15px;
  right: 25px;
  z-index: 1000;
  background-color: var(--el-bg-color);
  padding: 2px 2px;
  border-radius: 2px;
  
}

.dark .dark-mode-switch {
  background-color: var(--el-bg-color-overlay);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.dark-mode-switch :deep(.el-switch__action) {
  background-color: white;
}

.dark .dark-mode-switch :deep(.el-switch__action) {
  background-color: #f0f0f0;
}
</style>
