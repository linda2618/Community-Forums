<template>
    <el-image class="comment-img" :src="src" :zoom-rate="1.2" :preview-src-list="imgList ? imgList : [src]"
        :initial-index="0" fit="scale-down" loading="lazy" hide-on-click-modal>

    </el-image>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'
interface imgData {
    src: string,
    imgList?: Array<any>
}
const porps = withDefaults(defineProps<imgData>(), {

})

</script>

<style scoped lang="less">
.comment-img {
    width: 80px;
    height: 80px;
    background: #eee;
}
</style>