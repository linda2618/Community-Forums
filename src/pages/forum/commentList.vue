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
            <PostComment></PostComment>
        </div>
        <div class="comment-list">
            <!-- 分页 -->
            <Pagination :loading="loading" :dataSource="commentListInfo" @loadData="loadComment">
                <template #default="{ data }">
                    <commentListItem :commentData="data" :articleUserId="articleUserId"
                        :currentUserId="currentUserInfo.userId"></commentListItem>
                </template>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { proxyRefs, ref, watch, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex'
import commentListItem from './commentListItem.vue'
import PostComment from '../../components/PostComment.vue'
const store = useStore()
const { proxy } = getCurrentInstance() as any
interface commentData {
    articleId: string,
    articleUserId: string
}

const props = withDefaults(defineProps<commentData>(), {
})

const api = {
    loadComment: '/comment/loadComment',
    postComment: '/comment/postComment',
    doLike: '/comment/doLike',
    changeTopType: '/comment/changeTopType'
}
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

//选择图片
const selectImg = () => {

}
//排序
const orderType = ref(0)
//评论列表
const loading = ref(false)
const commentListInfo: any = ref({})
const loadComment = async () => {
    let params = {
        pageNo: commentListInfo.value.pageNo,
        articleId: props.articleId,
        orderType: orderType.value
    }
    loading.value = true
    let result = await proxy.request({
        url: api.loadComment,
        params,
    })
    loading.value = false
    if (!result) { return }

    commentListInfo.value = result.data
}
loadComment()

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