<template>
    <div class="comment-body">
        <div class="comment-title">
            <div class="title"> 评论<span class="count">{{ commentListInfo.totalCount }}</span></div>
            <div class="tab">
                <span @click="orderChange(0)" :class="['tab-item', orderType == 0 ? 'active' : '']">热榜</span>
                <el-divider direction="vertical"></el-divider>
                <span @click="orderChange(1)" :class="['tab-item', orderType == 1 ? 'active' : '']">最新</span>
            </div>
        </div>
        <!-- 发送评论 -->
        <div class="comment-form-panel">
            <PostComment :articleId="articleId" :avatarWidth="45" :userId="currentUserInfo.userId"
                :showInserImg="currentUserInfo.userId != null" :pCommentId="0" @postCommentFinish="postCommentFinish">
            </PostComment>
        </div>
        <div class="comment-list">
            <!-- 分页 -->
            <Pagination :loading="loading" :dataSource="commentListInfo" @loadData="loadComment">
                <template #default="{ data }">
                    <commentListItem :articleId="articleId" :commentData="data" :articleUserId="articleUserId"
                        :currentUserId="currentUserInfo.userId" @hiddenAllReply="hiddenAllReply"></commentListItem>
                </template>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { proxyRefs, ref, watch, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex'
import commentListItem from './commentListItem.vue'
import PostComment from './components/PostComment.vue'
const store = useStore()
const { proxy } = getCurrentInstance() as any
interface commentData {
    articleId: string,
    articleUserId: string,

}

const props = withDefaults(defineProps<commentData>(), {
})
const emit = defineEmits(['updateCommentCount'])

const api = {
    loadComment: '/comment/loadComment',
    postComment: '/comment/postComment',
    doLike: '/comment/doLike',
    changeTopType: '/comment/changeTopType'
}

//隐藏所有回复框
const hiddenAllReply = () => {
    commentListInfo.value.list.forEach((item: any) => {
        item.showReply = false

    });
}

//评论发布完成
const postCommentFinish = (resultData: any) => {
    commentListInfo.value.list.unshift(resultData)

    //更新评论数量
    const totalCount = commentListInfo.value.totalCount + 1
    commentListInfo.value.totalCount = totalCount
    emit('updateCommentCount', totalCount)
}

//当前用户信息
const currentUserInfo: any = ref({})
watch(
    () => store.state.loginUserInfo,
    (newVal, oldVal) => { currentUserInfo.value = newVal || {} },
    { immediate: true, deep: true }
)


//排序
const orderType = ref(0)
const orderChange = (type: number) => {
    orderType.value = type
    loadComment()
}


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

        .tab-item {
            cursor: pointer;
        }

        .active {
            color: rgb(55, 247, 173);
        }
    }

    .comment-form-panel {}
}
</style>