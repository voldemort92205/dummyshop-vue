<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { ShoppingCart, Van, CircleCheck } from '@element-plus/icons-vue';

const router = useRouter();

const goToProducts = () => {
    router.push('/products');
};

const features = ref([
    {
        icon: ShoppingCart,
        title: '商品豐富',
        description: '提供多種商品類別'
    },
    {
        icon: Van,
        title: '快速配送',
        description: '全台快速配送'
    },
    {
        icon: CircleCheck,
        title: '品質保證',
        description: '嚴選優質商品'
    }
]);
</script>

<template>
    <div class="home-container">
        <div class="hero-section">
            <h1 class="hero-title">歡迎來到 Dummy Shop</h1>
            <p class="hero-subtitle">Vue 3 + Element Plus 練習專案</p>
            <el-button 
                type="primary" 
                size="large"
                @click="goToProducts"
                :icon="ShoppingCart"
            >
                開始購物
            </el-button>
        </div>

        <div class="features-section">
            <h2 class="section-title">特色介紹</h2>

            <el-row :gutter="20">
                <el-col 
                    v-for="(feature, index) in features"
                    :key="index"
                    :xs="24" :sm="8"
                >
                    <div class="feature-card">
                        <el-icon class="feature-icon" :size="60">
                            <component :is="feature.icon" />
                        </el-icon>
                        <h3 class="feature-title">{{ feature.title }}</h3>
                        <p class="feature-description">{{ feature.description }}</p>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-alert
            title="此專案僅供練習使用"
            type="warning"
            :closable="false"
            show-icon
            center
        />
    </div>
</template>

<style scoped>

.home-container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 1rem;
}

.hero-section {
    text-align: center;
    padding: 3rem 1rem;
    margin-bottom: 2rem;
}

.hero-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--el-text-color-primary);
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: var(--el-text-color-regular);
    margin-bottom: 2rem;
}


.features-section {
    margin-bottom: 3rem;
}

.section-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--el-text-color-primary);
    text-align: center;
    margin-bottom: 2rem;
}

.feature-card {
    text-align: center;
    padding: 2rem 1rem;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 8px;
    background-color: var(--el-bg-color);
    margin-bottom: 1rem;
}

.dark .feature-card {
    border-color: var(--el-border-color-darker);
    background-color: var(--el-bg-color-overlay);
}

.feature-icon {
    color: var(--el-color-primary);
    margin-bottom: 1rem;
}

.feature-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--el-text-color-primary);
    margin-bottom: 0.5rem;
}

.feature-description {
    font-size: 1rem;
    color: var(--el-text-color-regular);
    margin: 0;
}

.notice {
    text-align: center;
    padding: 1rem;
    background-color: var(--el-color-warning-light-9);
    border: 1px solid var(--el-color-warning-light-5);
    border-radius: 8px;
    color: var(--el-color-warning-dark-2);
    font-size: 1rem;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .hero-section {
        padding: 2rem 0.5rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .feature-icon {
        font-size: 2.5rem;
    }
}
</style>
