<template>
    <div class="post-comment-panel">
        <Avatar :width="45" :userId="userId"></Avatar>
        <div class="comment-form">
            <el-form :model="formData" :rules="rules" ref="dormDataRef" labe-width="80px">
                <el-form-item prop="content">
                    <el-input clearable :placeholder="placeholderInfo" type="textarea" :row="5" :maxLength="150"
                        show-word-limit v-model="formData.content" />
                    <div class="insert-img" v-if="showInserImg">
                        <div class="pre-img" v-if="commentImg">
                            <ImageComment :src="commentImg"></ImageComment>
                            <span class="iconfont icon-shanchu1" @click="removeCommentImg"></span>
                        </div>
                        <el-upload v-else name="file" :show-file-list="false" :multiple="false" :http-request="selectImg">
                            <span class="iconfont icon-image"></span>

                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="send-btn" @click="postCommentDo">
            发表
        </div>
    </div>
</template>

<script setup lang="ts">
import { affixProps } from 'element-plus';
import { ref, withDefaults, getCurrentInstance } from 'vue'
import ImageComment from './ImageComment.vue'
const { proxy } = getCurrentInstance() as any
interface postcomData {
    avatarWidth?: number,
    articleId: string,
    userId: string,
    showInserImg: boolean,
    placeholderInfo?: string,
    pCommentId: number,
    replyUserId?: string | null
}
const props = withDefaults(defineProps<postcomData>(), {
    placeholderInfo: () => { return "请文明发言，做个棒棒的程序员" }
})

const api = {
    loadComment: '/comment/loadComment',
    postComment: '/comment/postComment',
    changeTopType: '/comment/changeTopType'
}
//form信息
const checkPostComment = (rule: any, value: any, callback: Function) => {
    if (value == null && formData.value.image == null) {
        callback(new Error(rule.message))
    } else {
        callback()
    }
}


const formData: any = ref({})
const formDataRef: any = ref()
const rules = {
    content: [{ required: true, message: "请输入内容 ", validator: checkPostComment }, { min: 8, message: "评论最少8个字" }],

}

const emit = defineEmits(["postCommentFinish"])
const postCommentDo = () => {
    console.log('postCommentDo')
    formDataRef.value?.validate(async (valid: any) => {
        console.log('postCommentD里面')

        if (!valid) { return }
        let params = Object.assign({}, formData.value)
        params.articleId = props.articleId
        params.pCommentId = props.pCommentId
        params.replyUserId = props.replyUserId
        let result = await proxy.request({
            url: api.postComment,
            params
        })
        if (!result) { return }
        proxy.message.success("评论发表成功")
        formDataRef.value.resetFields()
        removeCommentImg()
        emit("postCommentFinish", result.data)

    })
}

//选择图片
const commentImg: any = ref(null)
const selectImg = (file: any) => {
    // console.log(file)
    file = file.file
    let img = new FileReader()
    img.readAsDataURL(file)
    img.onload = ({ target }) => {
        let imgData = target?.result
        commentImg.value = imgData
        formData.value.image = file
    }
}
//图片叉按钮
const removeCommentImg = () => {
    commentImg.value = null
    formData.value.image = null

}

</script>

<style scoped lang="less">
.post-comment-panel {
    display: flex;

    .comment-form {
        flex: 1;
        margin: 0 10px;

        .el-textarea__inner {
            height: 60px;
        }

        .insert-img {
            line-height: normal;

            .iconfont {
                margin-top: 3px;
                font-size: 20px;
                color: #777474;
            }

            .pre-img {
                margin-top: 10px;
                position: relative;

                .iconfont {
                    cursor: pointer;
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    color: rgb(121, 121, 121);
                }
            }
        }
    }

    .send-btn {
        cursor: pointer;
        width: 50px;
        height: 50px;
        background: rgb(88, 216, 130);
        color: #fff;
        text-align: center;
        line-height: 50px;
        border-radius: 8px;
    }
}
</style>