import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductsStore = defineStore("getProducts", () => {
    const productsSrcPrefix = import.meta.env.VITE_PRODUCTS_SRC;

    const isDownloading = ref(false);
    const totalProducts = ref(-1);
    const refreshTime = ref(null);
    const dataSet = reactive([]);
    const categorySet = reactive([]);
    const categoryNameList = reactive([]);
    const lastCategoryName = ref("");

    async function getProductCategory () {
        const categoryUrl = `${productsSrcPrefix}/categories`;
        try {
            const response = await axios.get(categoryUrl);
            categorySet.splice(0, categorySet.length);
            categoryNameList.splice(0, categoryNameList.length);
            response.data.forEach((item) => {
                categorySet.push(item);
                categoryNameList.push(item.name);
            })
            console.log (`Loaded ${categorySet.length} category.`);
        } catch (error) {
            console.log (`Error while downloading category: ${error.message}`);
            throw error;
        }
    }

    async function getProductListFromUrl (forceUpdate = false, url) {
        if (!forceUpdate && refreshTime.value !== null) {
            console.log(`Data already loaded at ${refreshTime.value}, skip this time...`);
            return;
        }
        if (isDownloading.value) {
            console.log ("Download is in progress, skip this time...");
            return;
        }

        try {
            isDownloading.value = true;
            const response = await axios.get(url);

            // update product list
            dataSet.splice(0, dataSet.length);
            response.data.products.forEach((item) => {
                dataSet.push(item)
            })
            totalProducts.value = response.data.total;
            refreshTime.value = new Date().toLocaleString();
            console.log(`Downloaded: ${dataSet.length}/${totalProducts.value} products`);
        } catch (error) {
            console.log (`Error while downloading products: ${error.message}`);
            throw error;
        } finally {
            isDownloading.value = false;
        }
    }

    async function getCertainProducts (categoryName) {        
        if (categoryName === lastCategoryName.value) {
            // no need to refresh it again
            console.log (`Category ${categoryName} is already loaded!!`);
            return;
        }

        // check category is available
        const category = categorySet.find((item) => item.name === categoryName);
        if (!category) {
            console.log (`Category ${categoryName} is not found!!`);
            throw new Error(`Category ${categoryName} is not available!!`);
        }
        await getProductListFromUrl (true, category.url);
        lastCategoryName.value = categoryName;
    }

    async function fetchData (forceUpdate = false) {
        await getProductCategory ();

        if (categorySet.length > 0) {
            // load the first category by default
            const firstCategory = categorySet[0];
            await getProductListFromUrl (forceUpdate, firstCategory.url);
            lastCategoryName.value = firstCategory.name;
        }
    }
    return {
        // State
        dataSet,
        refreshTime,
        totalProducts,
        categoryNameList,

        // Actions
        fetchData,
        getCertainProducts
    };
})
