import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductsStore = defineStore("getProducts", () => {
    const prodcutsSrcPrefix = import.meta.env.VITE_PRODUCTS_SRC;

    const isDownloading = ref(false);
    const totalProducts = ref(-1);

    const refreshTime = ref("Null");
    const dataSet = reactive([]);
    const categorySet = reactive([]);
    const categoryNameList = reactive([]);

    const lastCategoryName = ref("");

    async function getProductCategory () {
        const categoryUrl = prodcutsSrcPrefix + "/categories";
        await axios.get(categoryUrl)
            .then ((response) => {
                categorySet.splice(0, categoryUrl.length);
                categoryNameList.splice(0, categoryNameList.length);
                response.data.forEach((item) => {
                    categorySet.push(item);
                    categoryNameList.push(item.name);
                })
            })
            .catch (error => {
                console.log (`Error while downloading category: ${error.message}`);
            })
    }

    async function getProductListFomUrl (forceUpdate = false, url) {
        if (!forceUpdate && refreshTime.value !== "Null") {
            console.log ("Last refreshTime: ", refreshTime.value);
            return;
        }
        if (isDownloading.value) {
            console.log ("There is a download process, skip this time...");
            return;
        }
        isDownloading.value = true;
        await axios.get(url)
            .then((response) => {
                dataSet.splice(0, dataSet.length);

                // update product list
                response.data.products.forEach((item) => {
                    dataSet.push(item)
                })
                totalProducts.value = response.data.total;

                refreshTime.value = new Date().toLocaleString();
                console.log ("Download Complete!!");
            })
            .catch(error => {
                console.log ("error: ", error.message);
            })
        isDownloading.value = false;
    }

    async function getCertainProducts (categoryName) {        
        if (categoryName === lastCategoryName.value) {
            // no need to refresh it again
            console.log (`Category ${categoryName} is already loaded!!`);
            return;
        }

        // check category is available
        const item = categorySet.find((item) => item.name === categoryName);
        if (item === undefined) {
            console.log (`Cateogor ${categoryName} is not available!!`);
            return;
        }
        await getProductListFomUrl (true, item.url);
    }

    /*
    async function getAllProducts (forceUpdate = false) {
        const productsUrl = prodcutsSrcPrefix;
        await getProductListFomUrl (forceUpdate, productsUrl);
    }
    */

    async function fetchData (forceUpdate = false) {
        await getProductCategory ();
    }
    return {fetchData, refreshTime, dataSet, totalProducts,
            categoryNameList, getCertainProducts};
})
