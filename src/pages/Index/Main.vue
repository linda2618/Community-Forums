<template>
    <div class="index_body w">
        <!-- 居中主体 -->
        <div class="container">
            <!-- 左边区域 -->
            <div class="main-left">
                <!-- 热议区域 -->
                <div class="hotDis">
                    <div class="h_l">
                        <div class="title">方面的算法描述。发么为了的建生命，方面的算法描述。发么为了的建立独立网卡极为苛刻</div>
                        <div class="content">封口费我看见丹参滴丸可完全的身份即可解决尾气克拉克你重新每次你到家咯贷记卡为了难度，漫反射的，发哪里看净流入金额方面，方面，打发打发看见了看完
                        </div>
                        <div class="audience">
                            <a href="#">xxx万 用户正在围观</a>
                            <a href="#">进入讨论>> </a>
                        </div>
                    </div>
                    <div class="h_l">
                        <div class="title">方面的算法描述。发么为了的建生命，方面的算法描述。发么为了的建立独立网卡极为苛刻</div>
                        <div class="content">封口费我看见丹参滴丸可完全的身份即可解决尾气克拉克你重新每次你到家咯贷记卡为了难度，漫反射的，发哪里看净流入金额方面，方面，打发打发看见了看完
                        </div>
                        <div class="audience">
                            <a href="#">xxx万 用户正在围观</a>
                            <a href="#">进入讨论>> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import RightTab from '../../components/RightTab.vue'


</script>

<style scoped lang="less">
div {
    border-radius: 10px;
}

.index_body {
    background-color: rgb(247, 248, 250);
    box-shadow: 1px 5px 5px rgb(228, 226, 226);

    .container {
        margin: 30px auto;
        overflow: hidden;
        // background-color: #fff;

        // 主体左侧
        .main-left {
            width: 800px;
            float: left;

            //热议部分
            .hotDis {
                .h_l {
                    box-shadow: 1px 5px 5px rgb(228, 226, 226);
                    position: relative;
                    float: left;
                    margin: 0 8px;
                    width: 300px;
                    height: 140px;
                    background-color: #fff;

                    .title {
                        margin: 30px 25px 28px;
                        font-size: 22px;
                        //溢出文字省略
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .content {
                        font-size: 20px;
                        margin: 0 25px;
                        //多行文本溢出省略
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }

                    .audience {
                        font-size: 18px;
                        margin: 20px 25px;
                        display: flex;
                        justify-content: space-between;

                        a:first-child {
                            color: rgb(151, 145, 145);
                        }

                        a:last-child {
                            font-size: 20px;
                            color: rgb(0, 204, 255);
                        }
                    }
                }
            }
        }

    }
}
</style>