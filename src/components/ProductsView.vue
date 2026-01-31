<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useProductsStore } from '../stores/useProductsStore';
import SimpleProductView from './SimpleProductView.vue';
import { ElNotification } from 'element-plus';

const productsStore = useProductsStore();

const addThisToCart = (item) => {
    ElNotification({
        title: 'Success',
        message: `已將 ${item} 加入購物車`,
        type: 'success',
        duration: 3000,
    });
}

const productLists = reactive([]);
const productListCount = computed(() => productLists.length);
const categoryLists = reactive([]);
const isLoading = ref(false);
const currentCategoryName = ref("");

const updateProductLists = () => {
    productLists.splice(0, productLists.length,
            ...productsStore.dataSet);
}
const updateCategoryLists = () => {
    categoryLists.splice(0, categoryLists.length,
        ...productsStore.categoryNameList
    );
}

const fetchDataSet = async (forceUpdate = false) => {
    try {
        isLoading.value = true;
        await productsStore.fetchData(forceUpdate);
        updateCategoryLists();
        if (productsStore.categoryNameList.length > 0) {
            console.log(`Load default category: ${productsStore.categoryNameList[0]}`);
            await changeProductList(productsStore.categoryNameList[0]);
        }
    } catch (error) {
        //console.log (`Error while fetching data: ${error.message}`);
        ElNotification({
            title: 'Error',
            message: `無法取得商品資料: ${error.message}`,
            type: 'error',
            duration: 3000,
        });
    } finally {
        isLoading.value = false;
    }
}

const refreshDataSet = (forceUpdate = false) => {
    fetchDataSet (forceUpdate);
}

const changeProductList = async (categoryName) => {
    console.log (`Change to category: ${categoryName}`);
    try {
        isLoading.value = true;
        await productsStore.getCertainProducts(categoryName);
        updateProductLists();
        currentCategoryName.value = categoryName;
    } catch (error) {
        ElNotification({
            title: 'Error',
            message: `無法切換至 ${categoryName}: ${error.message}`,
            type: 'error',
            duration: 3000,
        });
    } finally {
        isLoading.value = false;
    }
}

onMounted (() => {
    refreshDataSet();
})

</script>
<template>
    <div class="products-page">
        <el-row justify="space-between" align="middle">
            <el-col :span="24">
                <el-text tag="h1" size="large" class="page-title">
                    商品列表
                </el-text>
            </el-col>
        </el-row>

        <el-row class="product-count-row">
            <el-col :span="24">
                <el-text size="large"> 共 {{ productListCount }} 項商品 </el-text>
            </el-col>
        </el-row>

        <!-- 主要內容區 -->
        <el-row :gutter="30">
            <!-- 分類選單 -->
            <el-col :xs="24" :sm="8" :md="6" :lg="5">
                <el-card shadow="hover" class="category-card">
                    <template #header>
                        <el-text size="large" tag="b">商品分類</el-text>
                    </template>

                    <el-menu
                        :default-active="currentCategoryName"
                        class="category-menu"
                    >
                        <el-menu-item
                            v-for="name in categoryLists"
                            :key="name"
                            :index="name"
                            @click="changeProductList(name)"
                        >
                            <el-text>{{ name }}</el-text>
                        </el-menu-item>
                    </el-menu>
                </el-card>
            </el-col>

            <!-- 商品列表 -->
            <el-col :xs="24" :sm="16" :md="18" :lg="19">
                <!-- 載入中 -->
                <el-skeleton v-if="isLoading" :rows="6" animated />

                <!-- 商品網格 -->
                <el-row v-else :gutter="10">
                    <el-col
                        v-for="item in productLists"
                        :key="item.id || item.title"
                        :xs="24" :sm="12" :md="8" :lg="6"
                        class="product-item"
                    >
                        <SimpleProductView
                            :title="item.title"
                            :fig-src="item.images[0]"
                            :price="item.price"
                            @add-to-cart="() => addThisToCart(item.title)"
                        />
                    </el-col>
                </el-row>

                <!-- 空狀態 -->
                <el-empty 
                    v-if="!isLoading && productLists.length === 0"
                    description="目前沒有商品"
                />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.products-page {
    max-width: 1800px;
    width: 90%;
    margin: 1.5rem auto;
    padding: 1rem;
    background-color: transparent;
}

.page-title {
    font-weight: 700;
    font-size: 2.2rem;
    color: var(--el-text-color-primary);
}

.category-card {
    border-color: var(--el-bg-color);
    border: 2px solid var(--el-border-color);
}

.category-card :deep(.el-card__body) {
    padding: 0;
}
.dark .category-card {
    border-color: var(--el-border-color-darker);
}

.product-count-row {
    margin-bottom: 1.5rem;
    margin-top: 0.75rem
}

.product-item {
    margin-bottom: 1.5rem;
}

.category-menu {
    border-right: none;
    border-radius: 0;
    background-color: var(--el-bg-color);
}

.category-menu .el-menu-item {
    min-height: 56px;
    padding: 12px 20px;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.5;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    color: var(--el-text-color-primary);
}


.category-menu .el-menu-item:hover {
    background-color: var(--el-menu-hover-bg-color);
}
.dark .category-menu .el-menu-item:hover {
    background-color: var(--el-fill-color-dark);
}

.category-menu .el-menu-item.is-active {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 600;
    border-left-color: var(--el-color-primary);
}
.dark .category-menu .el-menu-item.is-active {
    background-color: rgba(64, 158, 255, 0.2);
    color: var(--el-color-primary-light-3);
    border-left-color: var(--el-color-primary-light-3);
}

/* 響應式調整 */
@media (max-width: 768px) {
    .products-page {
        width: 95%;
        padding: 1rem;
        margin: 1rem auto;
    }
    
    .page-title {
        font-size: 1.5rem;
    }
}
</style>
