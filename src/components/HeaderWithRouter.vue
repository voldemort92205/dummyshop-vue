<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';
import { Menu as MenuIcon } from '@element-plus/icons-vue';

const props = defineProps ({
    headerMessage: {
        type: String,
        default: "hello",
    },
    routerInfo: {
        type: Array,
        default: [{name: "home", linkUrl: "/"}],
    }
})

const showMenu = ref(false);
const menuBarChange = () => {
    showMenu.value = !showMenu.value;
}

// highlight current page
const route = useRoute();
const currentPath = computed(() => route.path);

// handle window size
const {width} = useWindowSize();
const isLargeSize = computed(() => width.value >= 800);

const activeColor = ref("#409eff");
</script>

<template>
    <el-affix :offset="0">
    <el-header
        height="64px"
        class="header-container"
    >
        <el-row align="middle" justify="center" class="h-full">
            <el-col :span="12">
                <!-- logo and brand -->
                <router-link to="/" key="home-button"
                        class="brand-link"
                >
                    <el-text
                        size="large"
                        class="brand-text">
                        {{ props.headerMessage }}
                    </el-text>
                </router-link>
            </el-col>

            <!-- large window format -->
            <el-col v-if="isLargeSize"
                    :span="12"
                    class="flex justify-end">
                <el-menu
                    mode="horizontal"
                    class="header-menu"
                    :ellipsis="false"
                    :active-text-color="activeColor"
                    :default-active="currentPath"
                    router
                >
                    <el-menu-item
                        v-for="item in props.routerInfo"
                        :key="item.linkUrl"
                        :index="item.linkUrl"
                    >
                        <el-text>{{ item.name }}</el-text>
                    </el-menu-item>            
                </el-menu>
            </el-col>
            <el-col v-else :span="12" class="flex justify-end">
                <el-button
                    circle
                    @click="menuBarChange"
                    size="large"
                    :icon="MenuIcon"
                >
                </el-button>
            </el-col>
        </el-row>
    </el-header>

    <el-drawer
        v-model="showMenu"
        direction="ltr"
        size="50%"
        :with-header="true"
    >
        <template #header>
            <el-text size="large" tag="b">
                {{ props.headerMessage }}
            </el-text>
        </template>
        <el-menu
            :default-active="currentPath"
            router
            :active-text-color="activeColor"
            @select="menuBarChange"
            class="drawer-menu"
        >
            <el-menu-item
                v-for="item in props.routerInfo"
                :key="item.linkUrl"
                :index="item.linkUrl"
            >
                <el-text>{{ item.name }}</el-text>
            </el-menu-item>
        </el-menu>
    </el-drawer>    
    </el-affix>
</template>

<style scoped>
.el-header {
    --el-header-padding: 0 20px;
    --el-header-height: 64px;
}
.header-container {
    width: 100%;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color-lighter);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    opacity: 0.95;
}
.dark .header-container {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    opacity: 0.98;
}

.brand-link {
    font-weight: 700;
    margin: auto 0;
    padding: 0 1rem;
    text-decoration: none;
    color: var(--el-text-color-primary);
    transition: color 0.3s ease;
}
.brand-link:hover {
    color: var(--el-color-primary);
}

.brand-text {
    font-weight: 700;
    font-size: 1.875rem; /* 3xl */
    color: var(--el-text-color-primary);
}

.header-menu {
    justify-content: center;
    border: none;
    background-color: transparent;
}
.header-menu.el-menu--horizontal {
    border-bottom: none;
}
.header-menu :deep(.el-menu-item) {
    font-size: 1rem;
    margin: 0 10px;
    transition: all 0.3s ease;
}
.header-menu :deep(.el-menu-item:hover) {
    background-color: var(--el-menu-hover-bg-color);
}
.header-menu :deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary-light-9);
    border-bottom-color: var(--el-color-primary);
    font-weight: 600;
}
.dark .header-menu :deep(.el-menu-item.is-active) {
    background-color: rgba(64, 158, 255, 0.2);
}

.dark .el-button.is-circle {
    background-color: var(--el-fill-color-light);
    border-color: var(--el-border-color);
}

/* drawer menu style */
.drawer-menu {
    border-right: none;
    background-color: transparent;
}
.drawer-menu :deep(.el-menu-item) {
    
    margin: 0;
    transition: all 0.3s ease;
}

/* 項目之間有邊框 */
.drawer-menu :deep(.el-menu-item:not(:last-child)) {
    border-bottom: 1px solid var(--el-border-color-lighter);
}
.drawer-menu :deep(.el-menu-item:hover) {
    background-color: var(--el-menu-hover-bg-color);
}
.drawer-menu :deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 600;
}
.dark .drawer-menu :deep(.el-menu-item.is-active) {
    background-color: rgba(64, 158, 255, 0.2);
}

@media (max-width: 768px) {
    .brand-text {
        font-size: 1.5rem;
    }

    .brand-link {
        padding: 0 0.5rem;
    }
}
</style> 
