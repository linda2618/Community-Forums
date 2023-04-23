<template>
    <div class="avatar" :style="{ width: width + 'px', height: width + 'px', borderRadius: width / 2 + 'px' }">

        <el-image v-if="userId" :style="{
                width: width + 'px', height: width + 'px', borderRadius: width / 2 + 'px'
            }" :src="proxy.globalInfo.avatarUrl + userId" fit="scale-down" loading="lazy" @click="goToRouter">

        </el-image>
        <div v-else class="no-login">未登录</div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance() as any
const router = useRouter()

interface propsType {
    userId: string,
    width?: number,
    addLink?: Boolean
}
const props = withDefaults(defineProps<propsType>(), {
    width: () => { return 54 },
    addLink: () => { return true }
})

const goToRouter = () => {
    if (props.addLink) {
        router.push('/user/' + proxy.userId)
    }
}

</script>

<style scoped lang="less">
.no-login {
    width: 45px;
    height: 45px;
    line-height: 45px;
    border-radius: 50%;
    font-size: 13px;
    background-color: #ccc;
}
</style>