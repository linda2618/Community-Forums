<template>
    <!-- 二次封装弹框组件 -->


    <div>
        <el-dialog :model-value="show" :title="title" :width="width" class="custom-dialog" :close-on-click-modal="false"
            :draggable="true" :show-close="showClose" :top="top" @close="close">
            <!-- 弹框的主体部分 -->
            <div class="dialog-body">
                <slot></slot>
            </div>
            <template v-if="(buttons && buttons.length > 0) || showCancel">
                <div class="dialog-footer">
                    <el-button @click="close" v-if="showCancel" type="info">取消</el-button>
                    <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">{{ btn.text }}</el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { fa } from 'element-plus/es/locale';
import { ref, reactive } from 'vue'

// interface props {
//     show?: Boolean
//     title?: String
//     showClose: Boolean
//     width: String
//     top: String
//     buttons: Array<{ type: String, click: Function, text: String }>
//     showCancel: Boolean

// }
// const props = withDefaults(defineProps<props>(), {
//     // show: false,
//     // title: "标题",

// })



const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: "标题"
    },
    showClose: {
        type: Boolean,
        default: false
    },
    width: {
        type: String,
        default: "30%"
    },
    top: {
        type: String,
        default: "70px"
    },
    buttons: {
        type: Array,

    },
    showCancel: {
        type: Boolean,
        default: true
    },
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
        min-height: 150px;
        max-height: calc(100vh - 500px);
        overflow: auto;
        padding: 15px;
    }

    .dialog-footer {
        text-align: right;
        padding: 10px 20px;
    }
}
</style>