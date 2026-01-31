<script setup>
import { ref } from 'vue'
const currentYear = ref(new Date().getFullYear());
const author = ref("perry");
const github = ref("https://github.com/voldemort92205");
const facebook = ref ("https://facebook.com/");
const mail = ref ("");

const socialLinks = [
    {
        icon: 'fa-brands fa-github fa-xl',
        url: github.value,
        tooltip: 'GitHub'
    },
    {
        icon: 'fa-brands fa-facebook fa-xl',
        url: facebook.value,
        tooltip: 'Facebook'
    },
    {
        icon: 'fa-solid fa-envelope fa-xl',
        url: 'mailto:' + mail.value,
        tooltip: 'Email'
    }
]


</script>

<template>
    <el-footer
        height="auto"
        class="footer-container"
    >
        <el-divider class="footer-divider"></el-divider>

        <el-row
            :gutter="10"
            justify="space-between"
            align="middle"
            class="footer-content"
        >
            <el-col
                :xs="24"
                :sm="12"
                class="copyright-section"
            >
                <el-text
                    size="default"
                    class="copyright-text"
                >
                    &copy; {{ currentYear }} {{ author }}™
                </el-text>
                <br />
                <el-text type="info" size="small">
                    All Rights Reserved.
                </el-text>
            </el-col>

            <!-- social icons -->
            <el-col :xs="24" :sm="12"
                    class="social-section"
            >
                <el-space :size="15">
                <el-link
                    v-for="(link, index) in socialLinks"
                    :key="index"
                    :href="link.url"
                    target="_blank"
                    underline="never"
                    :title="link.tooltip"
                    class="social-link"
                >
                    <i :class="link.icon"></i>
                </el-link>
                </el-space>
            </el-col>
        </el-row>

        <!-- disclarimer -->
        <el-row
            justify="center"
            class="disclaimer-section"
        >
            <el-col
                :span="24"
                class="text-center"
            >
                <el-text
                    type="warning"
                    size="large"
                    tag="b"
                >
                    僅供自我練習使用，並無商業用途
                </el-text>
            </el-col>
        </el-row>
    </el-footer>
</template>

<style scoped>
.footer-container {
    width: 100%;
    background-color: var(--el-bg-color);
    border-top: 1px solid var(--el-border-color-lighter);
    margin-top: 3rem;
}

.footer-divider {
    margin: 0.5rem 0 1rem 0;
    border-color: var(--el-border-color-lighter);
}

.footer-content {
    padding: 0 1rem 0.5rem 1rem
}

.copyright-section {
    margin: auto 0;
}

.copyright-text {
    font-weight: 500;
    font-size: 1rem;
    color: var(--el-text-color-primary);
}

.social-section {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: auto 0;
}
.social-link {
    color: var(--el-text-color-regular);
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--el-fill-color-light);
}

.social-link:hover {
    color: var(--el-color-primary);
    background-color: var(--el-fill-color);
    transform: scale(1.2);
}

.disclaimer-section {
    margin-top: 1rem;
    padding: 1rem 1rem 0.5rem 1rem;
}

@media (max-width: 768px) {
    .copyright-section {
        text-align: center;
        margin-bottom: 1rem;
    }

    .social-section {
        justify-content: center;
    }

    .footer-content {
        padding: 0 0.5rem 0.5rem 0.5rem;
    }

    .disclaimer-section {
        padding: 1rem 0.5rem 2rem 0.5rem;
    }
}
</style>
