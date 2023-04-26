<template>
    <div class="comment-item">
        <Avatar :userId="commentData.userId" :width="45"></Avatar>
        <div class="comment-info">
            <div class="nickname">
                <span class="name" @click="gotoUserConter(commentData.userId)">{{ commentData.nickName }}</span>
                <span v-if="commentData.userId == articleUserId" class="tag-author">作者</span>
            </div>

            <div class="comment-content">
                <div v-html="commentData.content"></div>
                <ImageComment v-if="commentData.imgPath" :style="{ 'marginTop': '8px' }"
                    :src="proxy.global.imageUrl + commentData.imgPath.replace('.', '_.')"
                    :imgList="[proxy.global.imageUrl + commentData.imgPath]"></ImageComment>
            </div>
            <div class="op-panel">
                <div class="time">
                    <span>{{ commentData.postTime }}</span>
                    <span class="address">
                        &nbsp; &nbsp; {{ commentData.userIpAddress }}
                    </span>
                </div>
                <div :class="['iconfont icon-dianzan', commentData.likeType == 0 ? 'active' : '']"
                    @click="doLike(commentData)">{{
                        commentData.goodCount > 0 ?
                        commentData.goodCount : '点赞' }}</div>
                <div class="iconfont icon-duihuaxinxi" @click="showReplyPanel(commentData, 0)">回复</div>
                <el-dropdown v-if="articleUserId == currentUserId">
                    <div class="iconfont"></div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                {{ commentData.topType == 0 ? "设为置顶" : "取消置顶" }}
                            </el-dropdown-item>
                        </el-dropdown-menu>

                    </template>
                </el-dropdown>
            </div>
            <div class="comment-sub-list" v-if="commentData.children">
                <div class="comment-sub-item" v-for="sub in commentData.children">
                    <Avatar :userId="sub.userId" :width="25"></Avatar>
                    <div class="comment-sub-info">
                        <div class="nickname">
                            <span class="name" @click="gotoUserConter(sub.userId)">{{ sub.nickName }}</span>
                            <span class="tag-author" v-if="sub.userId == articleUserId">作者</span>
                            <span class="reply-name">回复</span>
                            <span @click="gotoUserConter(sub.userId)">@{{ sub.replyNickName }}</span>
                            <span>:</span>
                            <span class="sub-content" v-html="sub.content"></span>
                        </div>
                        <div class="op-panel">
                            <div class="time">
                                <span>{{ sub.postTime }}</span>
                                <span class="address">
                                    &nbsp; &nbsp; {{ sub.userIpAddress }}
                                </span>
                            </div>
                            <div :class="['iconfont icon-dianzan', sub.likeType == 1 ? 'active' : '']" @click="doLike(sub)">
                                {{ sub.goodCount > 0 ? sub.goodCount :
                                    '点赞'
                                }}</div>
                            <div class="iconfont icon-duihuaxinxi" @click="showReplyPanel(sub, 1)">回复</div>

                        </div>

                    </div>
                </div>
                <div class="reply-info" v-if="commentData.showReply">
                    <PostComment :articleId="articleId" :avatarWidth="30" :userId="currentUserId" :showInserImg="false"
                        :pCommentId="pCommentId" :replyUserId="replyUserId" @postCommentFinish="postCommentFinish"
                        :placeholderInfo="placeholderInfo">
                    </PostComment>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import PostComment from './components/PostComment.vue';
import { affixProps } from 'element-plus';
import ImageComment from './components/ImageComment.vue';
const router = useRouter()
const { proxy } = getCurrentInstance() as any

interface comobject {
    userId: string,//用户ID
    nickName: string,//昵称
    sex: number,//性别  0:女 1:男
    personDescription: string,//个人描述
    joinTime: string,//加入日期
    lastLoginTime: string,//最后登录日期
    postCount: number,//发帖数
    likeCount: number,//收到的点赞数
}
interface commentdata {
    articleId: string,
    commentData: any,
    articleUserId: string,
    currentUserId: string
}
const props = withDefaults(defineProps<commentdata>(), {
})
const api = {

    doLike: '/comment/doLike',
}

const emit = defineEmits(["hiddenAllReply"])
//显示评框
const pCommentId = ref(0)
const replyUserId = ref(null)
const placeholderInfo = ref('')

const showReplyPanel = (curData: any, type: number) => {
    const haveShow = props.commentData.showReply == undefined ? false : props.commentData.showReply
    emit("hiddenAllReply")
    if (type == 0) {
        props.commentData.showReply = !haveShow
    } else {
        props.commentData.showReply = true
    }

    pCommentId.value = props.commentData.commentId
    replyUserId.value = curData.userId
    placeholderInfo.value = "回复 @" + curData.nickName
}

const postCommentFinish = (resultData: any) => {
    const children = props.commentData.children || []
    children.unshift(resultData)
    placeholderInfo.value = ''

}

const gotoUserConter = (userId: string) => {
    router.push(`/user/${userId}`)

}
//点赞
const doLike = async (data: any) => {
    let result = await proxy.request({
        url: api.doLike,
        params: {
            commentId: data.commentId
        }
    })
    if (!result) { return }
    data.goodCount = result.data.goodCount
    data.likeType = result.data.likeType

}

</script>

<style scoped lang="less">
.comment-item {
    display: flex;
    padding-top: 15px;

    .comment-info {
        flex: 1;
        margin-left: 10px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 15px;

        .nickname {
            .name {
                font-size: 14px;
                color: #a09a9a;
                margin-right: 10px;
                cursor: pointer;
            }


            .tag-author {
                background-color: pink;
                color: #fff;
                font-size: 12px;
                border-radius: 2px;

            }
        }

        .comment-content {
            margin-top: 5px;
            font-size: 15px;
            line-height: 22px;
        }

        .op-panel {
            display: flex;
            margin-top: 5px;
            font-size: 13px;
            color: #7a7676;

            .time {
                margin-right: 20px;
            }

            .iconfont {
                margin-right: 15px;
                font-size: 13px;
                cursor: pointer;
            }

            .iconfont::before {
                margin-right: 3px;
            }

            .active {
                color: rgb(93, 243, 168);
            }

        }

        .comment-sub-list {
            margin-top: 20px;

            .comment-sub-item {
                display: flex;
                margin: 8px 10px;
                font-size: 12px;

                .comment-sub-info {
                    margin-left: 5px;

                    .nickname {
                        .reply-name {
                            margin: 0 5px;
                        }

                        .sub-content {
                            font-size: 14px;

                        }
                    }
                }

            }
        }

        .reply-info {
            margin-top: 20px;
        }
    }
}
</style>