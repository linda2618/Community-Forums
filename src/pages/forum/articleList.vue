<template>
    <div class="w article-contain">
        <div class="top-tab">
            <div>热榜</div>
            <el-divider direction="vertical" />
            <div>发布时间</div>
            <el-divider direction="vertical" />
            <div>最新</div>
        </div>
        <hr />
        <div class="article-list">
            <Pagination :loading="loading" :dataSource="articleInfo" @loadData="loadArticle">
                <template #default="{ data }">
                    <ArticleItem :data="data"></ArticleItem>
                </template>
            </Pagination>

        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import ArticleItem from './articleItem.vue'

const { proxy } = getCurrentInstance() as any
const api = {
    getArticle: '/forum/loadArticle'
}

const loading = ref(false)
//文章列表
const articleInfo: any = ref({})
const loadArticle = async () => {
    loading.value = true
    let params = {
        pageNo: articleInfo.value.pageNo,
        boardId: 0
    }


    let result = await proxy.request({
        url: api.getArticle,
        params: params
    })
    loading.value = false

    if (!result) { return }
    articleInfo.value = result.data
    articleInfo.value.list = []
}
loadArticle()

</script>

<style scoped lang="less">
.article-contain {
    margin-top: 25px;
    background-color: #fff;

    .top-tab {
        display: flex;
        padding: 10px 30px;
    }
}
</style>