<template>
    <div class="image-viewer">
        <el-image hide-on-click-modal :initial-index="previewImgIndex" url-list="imageList" @close="closeImgViewer"
            v-if="previewImgIndex != 0" />

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
interface imageData {
    imageList: []
}
const props = withDefaults(defineProps<imageData>(), {
    imageList: () => { return [] }
})


const previewImgIndex = ref(0)

const show = (index: number) => {
    previewImgIndex.value = index
}

defineExpose({ show })
const closeImgViewer = () => { }
</script>

<style scoped lang="less"></style>