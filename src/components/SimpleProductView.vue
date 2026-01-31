<script setup>
import { computed } from 'vue';
import {Loading, Picture, ShoppingCart} from '@element-plus/icons-vue';

const props = defineProps({
    figSrc: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "fig title"
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    inStock: {
        type: Boolean,
        default: true
    },
});

const emits = defineEmits(['addToCart']);

// 價格格式化
const formattedPrice = computed(() => {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
    }).format(props.price);
});

// 處理加入購物車
const handleAddToCart = () => {
    emits('addToCart');
};
</script>

<template>
    <el-card 
        shadow="hover" 
        class="product-card h-full flex flex-col"
        :body-style="{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }"
    >
        <!-- 商品圖片 -->
        <div class="image-container mb-4">
            <el-image 
                :src="props.figSrc" 
                :preview-src-list="[props.figSrc]"
                :initial-index="0"
                fit="cover"
                class="product-image"
                lazy
            >
                <template #placeholder>
                    <div class="image-slot">
                        <el-icon class="is-loading">
                            <Loading />
                        </el-icon>
                    </div>
                </template>
                <template #error>
                    <div class="image-slot">
                        <el-icon>
                            <Picture />
                        </el-icon>
                    </div>
                </template>
            </el-image>

            <!-- 缺貨標籤 -->
            <el-tag 
                v-if="!props.inStock" 
                type="danger" 
                class="stock-tag"
                effect="dark"
            >
                缺貨中
            </el-tag>
        </div>

        <!-- 商品資訊 -->
        <div class="flex-1 flex flex-col">
            <!-- 商品標題 -->
            <el-tooltip 
                :content="props.title" 
                placement="top"
                :disabled="props.title.length < 30"
            >
                <el-text 
                    size="large" 
                    class="product-title mb-2 font-medium"
                    truncated
                    line-clamp="2"
                >
                    {{ props.title }}
                </el-text>
            </el-tooltip>

            <!-- 商品描述（如果有） -->
            <el-text 
                v-if="props.description" 
                type="info" 
                size="small"
                class="mb-3"
                truncated
            >
                {{ props.description }}
            </el-text>

            <!-- 價格 -->
            <div class="mt-auto">
                <el-divider class="my-3" />
                
                <div class="flex items-center justify-between mb-3">
                    <el-text size="small" type="info">價格</el-text>
                    <el-text 
                        size="large" 
                        class="price-text font-bold"
                        type="primary"
                    >
                        {{ formattedPrice }}
                    </el-text>
                </div>

                <!-- 加入購物車按鈕 -->
                <el-button 
                    type="primary" 
                    :icon="ShoppingCart"
                    @click="handleAddToCart"
                    class="w-full"
                    :disabled="!props.inStock"
                    size="large"
                >
                    {{ props.inStock ? '加入購物車' : '已售完' }}
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
/* 卡片樣式 */
.product-card {
    transition: all 0.3s ease;
    height: 100%;
}

.product-card:hover {
    transform: translateY(-4px);
}

/* 圖片容器 */
.image-container {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--el-fill-color-light);
}

.product-image {
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.product-image:hover {
    transform: scale(1.05);
}

/* 圖片載入中/錯誤 */
.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
}

/* 缺貨標籤 */
.stock-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
}

/* 標題樣式 */
.product-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
    min-height: 3em;
}

/* 價格樣式 */
.price-text {
    font-size: 1.25rem;
}

/* 響應式調整 */
@media (max-width: 768px) {
    .image-container {
        height: 180px;
    }
    
    .price-text {
        font-size: 1.125rem;
    }
}
</style>
