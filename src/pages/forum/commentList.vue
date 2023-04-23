<template>
    <div class="comment-body">
        <div class="comment-title">
            <div class="title"> 评论<span class="count">0</span></div>
            <div class="tab">
                <span>热榜</span>
                <el-divider direction="vertical"></el-divider>
                <span>最新</span>
            </div>
        </div>

        <div class="comment-form-panel">
            <Avatar :width="45" :userId="currentUserInfo.userId"></Avatar>
            <div class="comment-form">
                <el-form :model="formData" :rules="rules" ref="dormDataRef" labe-width="80px">
                    <el-form-item prop="content">
                        <el-input clearable placeholder="请文明发言做一个棒棒的程序员" type="textarea" :row="5" :maxLength="150"
                            show-word-limit v-model="formData.content" />
                        <div class="insert-img" v-if="currentUserInfo.userId">
                            <el-upload name="file" :show-file-list="false">
                                <span class="iconfont icon-image"></span>

                            </el-upload>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="send-btn">
                发表
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
interface commentData {
    articleId: string,
    articleUserId: string
}

const props = withDefaults(defineProps<commentData>(), {
})

//form信息
const formData: any = ref({})
const formDataRef = ref()
const rules = {
    content: [{ required: true, message: "请输入内容 " }]
}


//当前用户信息
const currentUserInfo: any = ref({})
watch(
    () => store.state.loginUserInfo,
    (newVal, oldVal) => { currentUserInfo.value = newVal || {} },
    { immediate: true, deep: true }
)

</script>

<style scoped lang="less">
.comment-body {
    .comment-title {
        display: flex;
        align-items: center;

        .title {
            font-size: 18px;

            .count {
                font-size: 14px;
                padding: 0 10px;
            }
        }
    }

    .comment-form-panel {
        display: flex;

        .comment-form {
            flex: 1;
            margin: 0 10px;

            .el-textarea__inner {
                height: 60px;
            }
        }

        .send-btn {
            width: 50px;
            height: 50px;
            background: rgb(88, 216, 130);
            color: #fff;
            text-align: center;
            line-height: 50px;
            border-radius: 8px;
        }
    }
}
</style>