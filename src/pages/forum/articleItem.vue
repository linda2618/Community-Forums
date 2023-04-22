<template>
    <div class="article-item">
        <div class="article-inner">
            <div class="article-body">
                <div class="user-info">
                    <Avatar :userId="data.userId" :width="45" />
                    <router-link :to="'/user' + data.userId" class="a-link">{{ data.nickName }}</router-link>
                    <el-divider direction="vertical" />
                    <div class="post-time">{{ data.postTime }}</div>
                    <div class="address">{{ data.userIpAddress }}</div>
                    <el-divider direction="vertical" />
                    <router-link :to="`/forum/${data.pBoardId}`" class="a-link">{{ data.pBoardName }}</router-link>
                    <template v-if="data.boardName">
                        <el-divider direction="vertical" />
                        <router-link :to="`/forum/${data.pBoardId}/${data.boardId}`" class="a-link">{{ data.boardName
                        }}</router-link>
                    </template>

                </div>
                <router-link :to="`/post/${data.articleId}`" class="title">{{ data.title }}</router-link>
                <div class="summary">{{ data.summary }}</div>
                <div class="article-info">
                    <span class="iconfont icon-yanjing2">
                        {{ data.readCount == 0 ? "阅读" : data.readCount }}
                    </span>
                    <span class="iconfont icon-dianzan">
                        {{ data.goodCount == 0 ? "点赞" : data.goodCount }}
                    </span>
                    <span class="iconfont icon-duihuaxinxi">
                        {{ data.commentCount == 0 ? "评论" : data.commentCount }}
                    </span>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { dataType } from '../../type/article'
interface propsType {
    data: dataType

}
const props = withDefaults(defineProps<propsType>(), {
    data: () => { return {} }
})

</script>

<style scoped lang="less">
.article-item {
    padding: 5px 10px 0 10px;
    margin-bottom: 20px;

    .article-inner {
        border-bottom: 1px solid #ddd;
        padding: 20px;

        .article-body {
            .user-info {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: #494949;

                .a-link {
                    margin-left: 6px;
                    color: #696666;
                    text-decoration: none;

                }

                .a-link:hover {
                    color: rgb(76, 221, 141);
                }

                .post-time {
                    font-style: 13px;
                    color: #494949;
                }
            }

            .title {
                font-weight: bold;
                text-decoration: none;
                color: #5f5b5b;
                font-size: 16px;
                margin: 10px 0px;
                display: inline-block;

            }

            .summary {
                font-size: 14px;
                color: #858383;
            }

            .article-info {
                margin-top: 10px;
                display: flex;
                align-items: center;
                font-size: 13px;

                .iconfont {
                    color: #858383;
                    margin-right: 26px;
                    font-size: 14px;
                }

                .iconfont::before {
                    padding-right: 4px;
                }
            }
        }

        .article-item:hover {
            background-color: #fafafa;
        }
    }
}
</style>