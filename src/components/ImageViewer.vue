<template>
    <div class="image-viewer">
        <el-image-viewer hide-on-click-modal :initial-index="previewImgIndex" :url-list="imageList" @close="closeImgViewer"
            fit="cover" v-if="previewImgIndex != null">
        </el-image-viewer>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
interface imageData {
    imageList: Array<any>
}
const props = withDefaults(defineProps<imageData>(), {
})


const previewImgIndex = ref(null)

const show = (index: any) => {
    stopScroll()
    previewImgIndex.value = index
}

defineExpose({ show })
const closeImgViewer = () => {
    startScroll()
    previewImgIndex.value = null
}

//禁止滚动
const stopScroll = () => {
    document.body.style.overflow = "hidden"
}

const startScroll = () => {
    document.body.style.overflow = "auto"
}
</script>

<style scoped lang="less"></style>