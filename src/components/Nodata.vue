<template>
    <div class="no-data">
        <div class="iconfont icon-empty-status "></div>
        <div class="msg">{{ msg }}</div>

    </div>
</template>

<script setup lang="ts">
interface dataType {
    msg: string
}
const props = withDefaults(defineProps<dataType>(), {
    msg: () => { return '暂无数据' }
})

</script>

<style scoped lang="less">
.no-data {
    text-align: center;
    padding: 10px 0px;

    .iconfont {
        font-size: 50px;
        padding-bottom: 20px;
        color: #bbb;
    }

    .msg {
        font-size: 14px;
        color: #909399;
    }
}
</style>