<template>
    <div class="comment-item">
        <Avatar :userId="commentData.userId" :width="45"></Avatar>
        <div class="comment-info">
            <div class="nickname">
                <span class="name">{{ commentData.nickName }}</span>
                <span v-if="commentData.userId == articleUserId" class="tag-author">作者</span>

            </div>
            <div class="comment-content">
                <span v-html="commentData.content"></span>
            </div>
            <div class="op-panel">
                <div class="time">
                    <span>{{ commentData.postTime }}</span>
                    <span class="address">
                        &nbsp; &nbsp; {{ commentData.userIpAddress }}
                    </span>
                </div>
                <div class="iconfont icon-dianzan">{{ commentData.goodCount > 0 ? commentData.goodCount : '点赞' }}</div>
                <div class="iconfont icon-duihuaxinxi">回复</div>
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
        </div>

    </div>
</template>

<script setup lang="ts">
import { getOffsetTop } from 'element-plus/es/utils';
import { ref } from 'vue'

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
    commentData: any,
    articleUserId: string,
    currentUserId: string
}
const props = withDefaults(defineProps<commentdata>(), {
})

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
            }

            .iconfont::before {
                margin-right: 3px;
            }

        }
    }
}
</style>