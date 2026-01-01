<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    figSrc: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "fig title"
    },
    imgClass: {
        type: String,
        default: "h-40 w-40"
    },
    titleClass: {
        type: String,
        default: "text"
    },
    price: {
        type: Number,
        required: true,
    },
    viewWidth: {
        type: String,
        default: "w-40"
    },
    viewHeight: {
        type: String,
        default: "h-50"
    },
});

const emits = defineEmits([
    'addToCart'
]);

const isShowFullScreenFigure = ref(false);
const changeFullScreenStatus = () => {
    isShowFullScreenFigure.value = !isShowFullScreenFigure.value;
    isShowFullScreenFigure.value = false;
}

const containerClass = ref("")
watch (() => props, () => {
    containerClass.value = `${props.viewHeight} ${props.viewWidth}`
})
</script>

<template>
    <div class=""
         :class="containerClass"
        >

        <div class="mx-auto hover:bg-slate-200 dark:hover:bg-slate-600" 
             @click="changeFullScreenStatus">
            <img :src="props.figSrc" 
                class="object-cover"
            />
        </div>
        <div class="bg-amber-400 my-2 text-lg
                    text-center cursor-pointer flex flex-col justify-center
                    hover:bg-amber-800 hover:text-white
                    dark:hover:bg-slate-600"
            @click="$emit('addToCart')"
        >
            加入購物清單
        </div>
        <div class="font-mono font-medium "
              type="button"
              :class="props.titleClass"
              @click="changeFullScreenStatus">
            {{ props.title }}
        </div>
        <div>價格: ${{ props.price }}</div>

        <!-- make image cover the screen -->
        <div v-if="isShowFullScreenFigure"
            class="fixed top-0 left-0 mx-auto w-full h-screen bg-white/70 z-10
                    flex justify-center items-center"
             @click.self="changeFullScreenStatus"
        >
            <img :src="props.figSrc" 
                    class="rounded shadow shadow-black mx-auto h-5/6"
                />
            <i class="fa-regular fa-circle-xmark fa-2x absolute top-5 left-<50>"
                @click="changeFullScreenStatus"></i>
        </div>
    </div>
</template>

<style scoped>
</style>