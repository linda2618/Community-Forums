<template>
    <div class="w">
        <div class="article-list-body" v-if="Object.keys(articleInfo).length > 0">
            <div class="board-info">
                <router-link :to="`/fourm/${articleInfo.pBoardId}`">{{ articleInfo.pBoardName }}</router-link>
                <span class="iconfont icon-jiantouyou"></span>
                <template v-if="articleInfo.boardId">
                    <router-link :to="`/fourm/${articleInfo.pBoardId}${articleInfo.boardId}`">{{
                        articleInfo.boardId }}</router-link>
                    <span class="iconfont icon-jiantouyou"></span>
                </template>

                <span>{{ articleInfo.title }}</span>

            </div>
            <div class="detail-container">
                <div class="article-detail">
                    <!-- 标题 -->
                    <div class="title"> {{ articleInfo.title }}</div>
                    <!-- 用户信息 -->
                    <div class="user-info">
                        <Avatar :userId="articleInfo.userId" :width="45"> </Avatar>
                        <div class="user-info-detail">
                            <router-link :to="`/user/${articleInfo.userId}`" class="nick-name">{{ articleInfo.nickName
                            }}</router-link>
                            <div class="time-info">
                                <span> {{ articleInfo.postTime }}</span>
                                <span> &nbsp;&nbsp;{{ articleInfo.postTime }}</span>
                                <span class="address"> {{ articleInfo.userIpAddress }}</span>
                                <span class="iconfont icon-yanjing2">
                                    {{ articleInfo.readCount == 0 ? "阅读" : articleInfo.readCount }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- 文章详情 -->
                    <div id="detail" v-html="articleInfo.content"></div>
                </div>
            </div>
            <!-- 评论 -->
            <div class="comment-panel" id="view-comment">
                <CommentList v-if="articleInfo.articleId" :articleId="articleInfo.articleId"
                    :article-user-id="articleInfo.userId" @updateCommentCount="updateCommentCount"></CommentList>
            </div>

        </div>

    </div>

    <!-- 左侧快捷键操作 -->
    <div class="quick-panel" :style="{ left: quickPanelLeft + 'px' }" v-if="quickPanelLeft >= 0">
        <!-- 点赞 -->
        <el-badge :value="articleInfo.goodCount" type="info" :hidden="articleInfo.goodCount <= 0">
            <div class="quick-item" @click="addLikeHander">
                <span :class="['iconfont icon-dianzan', haveLike ? 'havelike' : '']"></span>
            </div>
        </el-badge>
        <!-- 评论 -->
        <el-badge :value="articleInfo.commentCount" type="info" :hidden="articleInfo.commentCount <= 0">
            <div class="quick-item" @click="gotoPostion('view-comment')">
                <span class="iconfont icon-duihuaxinxi"></span>
            </div>
        </el-badge>
        <!-- 图片预览 -->
        <ImageViewer ref="imageViewRef" :imageList="previewImgList"></ImageViewer>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue'
//引入评论组件
import CommentList from './commentList.vue'
import { useRoute, useRouter } from 'vue-router';
import ArticleItem from './articleItem.vue';
import { useStore } from 'vuex'
const { proxy } = getCurrentInstance() as any
// import { articaleDetailType } from '../../type/article'

const store = useStore()

const route = useRoute()

const api = {
    getArticleDetail: '/forum/getArticleDetail',
    addLike: '/forum/doLike'
}
//文章详情
const articleInfo: any = ref({})
const getArticleDetail = async (articleId: string | string[]) => {
    let result = await proxy.request({
        url: api.getArticleDetail,
        params: {
            articleId: articleId
        }
    })
    if (!result) { return }
    articleInfo.value = result.data.forumArticle
    haveLike.value = result.haveLike


    store.commit("setActivePBoardId", result.data.forumArticle.pBoardId)
    store.commit("setActiveBoardId", result.data.forumArticle.boardId)

    //图片预览
    imagePreview()
}

onMounted(() => {
    getArticleDetail(route.params.articleId)
})


//快捷操作
const quickPanelLeft = ref(
    (window.innerWidth - 1280) / 2 - 110
);
//监听页面大小
const listenResize = () => {
    quickPanelLeft.value =
        (window.innerWidth - 1280) / 2 - 110;
};
//mounted中增加 页面大小改变监听，Unmounted中取消监听
onMounted(() => {
    window.addEventListener("resize", listenResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", listenResize);
});

const gotoPostion = (domId: string) => {
    document.querySelector('#' + domId)?.scrollIntoView()
}
//是否已点赞
const haveLike = ref(false)
//点赞事件
const addLikeHander = async () => {
    let result = await proxy.request({
        url: api.addLike,
        params: {
            articleId: articleInfo.value.articleId
        }

    })
    if (!result) { return }
    haveLike.value = !haveLike.value
    let goodCount = 1

    if (!haveLike.value) {
        goodCount = -1
    }
    articleInfo.value.goodCount = articleInfo.value.goodCount + goodCount

}

//文章图片预览
const imageViewRef = ref(null)
const previewImgList: any = ref([])
const imagePreview = () => {
    nextTick(() => {
        console.log(',,,', imageViewRef.value)

        const imageNodeList = document.querySelector("#detail")?.querySelectorAll('img')
        const imageList: any = []

        imageNodeList?.forEach((item, index) => {
            const src = item.getAttribute("src")
            imageList.push(src)
            item.addEventListener("click", () => {
                //未完成！！！
                // imageViewRef.value.show(index)
            })
        })

        previewImgList.value = imageList
    })
}

//更新评论数量
const updateCommentCount = (commentCount: number) => {
    articleInfo.value.commentCount = commentCount

}
</script>

<style scoped lang="less">
.article-list-body {
    min-height: 300px;
    width: 900px;

    .board-info {
        font-size: 14px;
        line-height: 30px;

        .icon-jiantouyou {
            margin: 0 10px;
        }
    }

    .detail-container {


        .article-detail {
            background-color: #fff;
            padding: 10px;
            margin-bottom: 10px;

            .title {
                font-weight: bolder;
            }

            .user-info {
                margin-top: 15px;
                display: flex;
                padding-bottom: 10px;
                border-bottom: 1px solid #ccc;

                .user-info-detail {
                    margin-left: 10px;

                    .nick-name {
                        font-size: 14px;
                        text-decoration: none;
                        color: #627087;
                    }

                    .nick-name:hover {
                        color: rgb(129, 216, 187);
                    }

                    .time-info {
                        margin-top: 5px;
                        font-size: 12px;
                        color: #999797;

                        .iconfont {
                            margin-left: 10px;
                            font-size: 12px;
                        }

                        .iconfont::before {
                            padding-right: 3px;
                        }
                    }
                }
            }

            #detail {
                margin-top: 10px;
                letter-spacing: 1px;
                line-height: 20px;

                /deep/ a {
                    text-decoration: none;
                    color: rgb(93, 233, 151);
                }

                // /deep/ img 
                ::v-deep img {
                    max-width: 80%;
                    cursor: pointer;
                }
            }
        }


    }

    .comment-panel {
        margin-top: 20px;
        background: #fff;
        padding: 10px;
    }


}


.quick-panel {
    position: absolute;
    top: 200px;
    width: 50px;
    text-align: center;

    .quick-item {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50%;
        background: #fff;
        margin-bottom: 30px;
    }

    .iconfont {
        font-size: 23px;
    }

    .havelike {
        color: rgb(72, 231, 152);

    }
}
</style>