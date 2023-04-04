<template>
    <!-- 二次封装弹框组件 -->


    <div>
        <el-dialog :model-value="show" :title="title" :width="width" class="custom-dialog" :close-on-click-modal="false"
            :draggable="true" :show-close="showClose" :top="top" @close="close">
            <!-- 弹框的主体部分 -->
            <div class="dialog-body">
                <slot></slot>
            </div>
            <template v-if="(buttons && buttons.length > 0 || showCancel)">
                <div class="dialog-footer">
                    <el-button @click="close" type="info" :close-on-click-modal="showCancel">取消</el-button>
                    <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">{{ btn.text }}</el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { fa } from 'element-plus/es/locale';
import { ref, reactive } from 'vue'

interface propsType {
    show: Boolean
    title?: String
    showClose?: Boolean
    width?: String
    top?: String
    buttons?: Array<{ type: String, click: Function, text: String }>,
    showCancel?: Boolean
}
const props = withDefaults(defineProps<propsType>(), {
    show: () => { return false },
    title: () => { return "标题" },
    showClose: () => { return true },
    width: () => { return "40%" },
    top: () => { return '70px' },
    showCancel: () => { return false }
})

enum EventName {
    CLOSE = 'close'
}
const emit = defineEmits<{
    (event: EventName.CLOSE): void
}>()
const close = () => {
    emit(EventName.CLOSE)

}


</script>

<style scoped lang="less">
.custom-dialog {

    .dialog-body {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        min-height: 120px;
        max-height: calc(100vh - 300px);
        overflow: auto;
        padding: 15px;
    }

    .dialog-footer {
        text-align: right;
        padding: 10px 20px;
    }
}
</style>