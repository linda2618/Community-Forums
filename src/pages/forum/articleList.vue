<template>
    <div class="w ">
        <!-- 二级模板展示 -->
        <div class="sub-board" v-if="pBoardId">
            <span>全部</span>
            <span v-for="item in subBoardList">
                {{ item.boardName }}</span>
        </div>
        <div class="article-contain">
            <div class="top-tab">
                <div :class="orderType == 0 ? 'active' : ''" @click="changeOrderType(0)">热榜</div>
                <el-divider direction="vertical" />
                <div :class="orderType == 1 ? 'active' : ''" @click="changeOrderType(1)">发布时间</div>
                <el-divider direction="vertical" />
                <div :class="orderType == 2 ? 'active' : ''" @click="changeOrderType(2)">最新</div>
            </div>
            <hr />
            <div class="article-list">
                <Pagination :loading="loading" :dataSource="articleInfo" @loadData="loadArticle" noDataMsg="还没有帖子，发布一个吧">
                    <template #default="{ data }">
                        <ArticleItem :data="data"></ArticleItem>
                    </template>
                </Pagination>

            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticleItem from './articleItem.vue'
import { useStore } from 'vuex'
const store = useStore()



const route = useRoute()


const { proxy } = getCurrentInstance() as any
const api = {
    getArticle: '/forum/loadArticle'
}

const loading = ref(false)
//文章列表
//一级
const pBoardId = ref(0)
//二级
const boardId = ref(0)
//0:热门1:发布时间2:最新发布
let orderType = ref(0)

const articleInfo: any = ref({})
const loadArticle = async () => {
    loading.value = true
    let params = {
        pageNo: articleInfo.value.pageNo,
        boardId: boardId.value,
        pBoardId: pBoardId.value,
        orderType: orderType.value
    }


    let result = await proxy.request({
        url: api.getArticle,
        params: params
    })
    loading.value = false

    if (!result) { return }
    articleInfo.value = result.data
}
loadArticle()
const changeOrderType = (x: number) => {
    orderType.value = x
    loadArticle()
}

//二级板块
const subBoardList: any = ref([])
const setSubBoard = () => {
    subBoardList.value = store.getters.getSubBoardList(pBoardId.value)
}
//监听路由变化
watch(() => route.params,
    (newVal: any, oldVal: any) => {
        pBoardId.value = newVal.pBoardId
        boardId.value = newVal.boardId
        loadArticle()
        setSubBoard()
    }, { immediate: true, deep: true }
)

</script>

<style scoped lang="less">
.sub-board {
    margin-top: 10px;

    span {
        background: #d4d0d0;
        border-radius: 15px;
        padding: 2px 10px;
        margin-right: 10px;
        color: #fffdfd;
        cursor: pointer;
        font-size: 14px;
    }
}

.article-contain {
    margin-top: 10px;
    background-color: #fff;

    .top-tab {
        display: flex;
        padding: 10px 30px;
        align-items: center;
        font-size: 15px;
        cursor: pointer;

        .active {
            color: rgb(81, 216, 142);

        }
    }
}
</style>