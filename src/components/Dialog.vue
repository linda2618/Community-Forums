<template>
    <div>
        <el-dialog v-model="show" :title="title" :width="width" class="custom-dialog" :close-on-click-modal="false"
            :draggable="true" :show-close="showClose" :top="top">
            <!-- 弹框的主体部分 -->
            <div class="dialog-body">
                <slot></slot>
            </div>
            <template v-if="(buttons && buttons.length > 0) || showCancel">
                <span class="dialog-footer">
                    <el-button link @click="close" v-if="showCancel">取消</el-button>
                    <!-- <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">{{ btn.text }}</el-button>
                    Confirm
                    </el-button> -->
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const props = defineProps({
    show: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: ""
    },
    showClose: {
        type: Boolean,
        default: true
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

const close = () => { }

</script>

<style scoped></style>