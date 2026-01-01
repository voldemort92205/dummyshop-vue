<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useProductsStore } from '../stores/useProductsStore';
import SimpleProductView from './SimpleProductView.vue';

const productsStore = useProductsStore();

const showNotification = ref (false);
const notificationMessage = ref ("");
let notificationTimer = null;
const addThisToCart = (item) => {
    if (notificationTimer) {
        clearTimeout (notificationTimer);
    }

    notificationMessage.value = `已將 ${item} 加入購物車`;
    showNotification.value = true;

    notificationTimer = setTimeout (() => {
        showNotification.value = false;
        notificationTimer = null;
    }, 3000);
}

const productLists = reactive([]);
const productListCount = ref(0);
const categoryLists = reactive([]);

const updateProductLists = () => {
    productLists.splice(0, productLists.length);
    productsStore.dataSet.forEach((item) => {
        productLists.push(item)
    })
    productListCount.value = productLists.length;
}
const updateCategoryLists = async () => {
    categoryLists.splice(0, categoryLists.length);
    productsStore.categoryNameList.forEach((name) => {
        categoryLists.push(name);
    })
}

const fetchDataSet = async (forceUpdate = false) => {
    await productsStore.fetchData(forceUpdate);
    updateCategoryLists();

    if (productsStore.categoryNameList.length > 0) {
        console.log(`Load default category: ${productsStore.categoryNameList[0]}`);
        await changeProductList (productsStore.categoryNameList[0]);
    }
}

const refreshDataSet = (forceUpdate = false) => {
    fetchDataSet (forceUpdate);
}

const currentCategoryName = ref("");
const changeProductList = async (cateogryName) => {
    console.log (`Change to category: ${cateogryName}`);
    await productsStore.getCertainProducts(cateogryName);
    updateProductLists();
    currentCategoryName.value = cateogryName;
}

onMounted (() => {
    refreshDataSet();
})

</script>
<template>
    <div class="w-full mx-auto my-6 rounded py-10">
        <h1 class="mb-6 justify-center">商品列表</h1>
        <Transition name="sliade-fade">
            <div v-if="showNotification"
                class="fixed top-10 left-1/2 transform -translate-x-1/2
                        bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
                {{ notificationMessage }}
            </div>
        </Transition>
        <div class="justify-right mb-3">
            <div class="text-xl"> 共 {{ productListCount }} 項商品 </div>
        </div>
        <div class="flex gap-10 justify-center">
        <div>
            <div class="rounded border">
                <div v-for="name in categoryLists" :key="name"
                    class="py-3 px-2 bg-gray-500 hover:bg-gray-700 text-white "
                    :class="[currentCategoryName === name ? 'border-l-4 border-amber-500' : '']"
                    style="cursor: pointer;"
                    @click="() => changeProductList(name)">
                    {{ name }}
                </div>
            </div>
        </div>
        <div class="product-container">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 max-w-2xl">
                <div v-for="item in productLists" :key="item.title"
                    class="rounded-lg shadow flex flex-col border">
                    <SimpleProductView
                        :key="item.title"
                        :title="item.title"
                        :fig-src="item.images[0]"
                        :price="item.price"
                        @addToCart="() => addThisToCart(item.title)"
                    />
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
</style>