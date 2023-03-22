<template>
    <div>
        <!-- 右边搜索 / 留言 区域 -->
        <div class="main-right">
            <!-- 搜索区域 -->
            <div class="search">
                <i class="iconfont icon-fangdajing1"></i>
                <input class="iSe" placeholder="搜索题目199.图中是否存在已知的那些。。" />
            </div>

            <!-- 轮播图区域 -->
            <!-- <div class="slideshow">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="item in images" :key="item.id">
                        <img :src="getImage(item.path)" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div> -->

            <!-- 竞赛图片连接 -->
            <div ref="#" class="competition">
                <img src="/src/assets/images/西门子.jpg" alt="">
            </div>

            <!-- 发起挑战/随即面试 -->
            <div class="circle">
                <div class="talk">
                    <a href="#"><i class="iconfont icon-kaoshi"></i><span>发起讨论</span></a>
                </div>
                <div class="interview">
                    <a href="#"><i class="iconfont icon-suiji"></i><span>随机面试</span></a>
                </div>
            </div>

            <!-- 热门讨论 -->
            <div class="share">
                <div class="title">热门讨论</div>
                <div class="trip">
                    <div class="every">
                        <div>1 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            新人的一些提问</div>
                        <div>我是本硕双985的学历 2024毕业 明年秋招找工作 专业是数学系计算数学 最近在学数据结构做题 但是学起来很困难</div>
                    </div>
                    <div class="every">
                        <div>2 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            应届生的焦虑</div>
                        <div>之前没找到好工作焦虑,后来找到了各个方面自己都很满意的工作,发现一起拿offer的一堆C9的本硕，自己非科...
                        </div>
                    </div>
                    <div class="every">
                        <div>3 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            年前刷完题库所有题</div>
                        <div>花点巨款冲个会员刷完来拔</div>
                    </div>
                    <div class="every">
                        <div>4 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            新人的一些提问</div>
                        <div>我专业是数学系计算数学 最近在学数据结构做题 但是学起来很困难</div>
                    </div>
                    <div class="every">
                        <div>5 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            新人的一些提问</div>
                        <div>学起来很困难</div>
                    </div>
                    <div class="every">
                        <div>6 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            新人的一些提问</div>
                        <div>明年秋招找工作 专业是数学系计算数学 最近在学数据结构做题 但是学起来很困难</div>
                    </div>
                </div>

            </div>

            <!-- 双周预赛 -->
            <div ref="#" class="dianzi">
                <img src="/src/assets/images/电子.jpg" alt="">
            </div>

            <!-- 热门讨论 -->
            <div class="share">
                <div class="title">热门题解</div>
                <div class="trip">
                    <div class="every">
                        <div>1 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            袋子里最少数目的球</div>
                        <div>袋子里最少数目的球·官方算法实践后动的。。</div>
                    </div>
                    <div class="every">
                        <div>2 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            [JAVA/C++]二分查找</div>
                        <div>寻找图中是否存在路径·官方算法实践后动的。。</div>
                    </div>
                    <div class="every">
                        <div>3 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            [PYTHON3/JAVA/C++/GO/C#/...]</div>
                        <div>袋子里最少数目的球·官方算法实践后动额日哦就</div>
                    </div>
                    <div class="every">
                        <div>4 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            [PYTHON3/JAVA/C++/GO/C#/...]</div>
                        <div>寻找图中是否存在路径·官方算法实践后践后动额日哦就</div>
                    </div>
                    <div class="every">
                        <div>5 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            袋子里最少数目的球</div>
                        <div>袋子里最少数目的球·官方算法实践后动的。。</div>
                    </div>
                    <div class="every">
                        <div>6 &nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-my"></i>
                            [JAVA/C++]二分查找</div>
                        <div>寻找图中是否存在路径·官方算法实践后动的。。</div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getImage } from './images'


const images = reactive([{
    id: 1,
    path: "电子"
},
{
    id: 2,
    path: "技术"
},
{
    id: 3,
    path: "模型"
},
{
    id: 4,
    path: "算法"
},
{
    id: 5,
    path: "题库"
},])

</script>

<style scoped lang="less">
//主体右侧
.main-right {
    float: right;
    width: 200px;

    // 搜索区域
    .search {
        box-shadow: 1px 5px 5px rgb(228, 226, 226);
        width: 200px;
        height: 58px;
        background-color: #fff;

        i {
            float: left;
            top: 10px;
            font-size: 25px;
            line-height: 60px;
            margin-left: 20px;
        }

        .iSe {
            float: right;
            width: 200px;
            height: 35px;
            font-size: 20px;
            border-radius: 10px;
            border: 0;
            outline: none;
        }
    }

    // 轮播图区域
    .slideshow {
        box-shadow: 1px 5px 5px rgb(228, 226, 226);
        width: 400px;
        height: 210px;
        margin-top: 20px;
    }

    // @keyframes moveXiMenZi {
    //     0% {
    //         transform: translateY(0px);
    //     }
    //     100% {
    //         transform: translateY(-5px);

    //     }
    // }

    .competition {
        box-shadow: 1px 5px 5px rgb(228, 226, 226);
        width: 200px;
        height: 100px;
        margin: 20px 0;

        img {
            border-radius: 20px;
            width: 100%;
            height: 100%;
            // background: url("../../西门子.jpg");
            cursor: pointer;
            transition: transform 1s;
            -webkit-transition: transform 1s;
        }

        img:hover {
            box-shadow: 0 10px 10px 0 rgba(48, 55, 66, 0.15);
            // 鼠标悬浮时盒子上移5px
            transform: translate(0, -5px);
            //动画上移
            // animation: name duration timing-function delay iteration-count direction fill-mode;
            // animation: moveXiMenZi 1s;
        }
    }

    // 发起挑战/随即面试
    .circle {
        display: flex;
        justify-content: space-around;
        width: 200px;
        height: 50px;
        background-color: #fff;

        box-shadow: 1px 5px 5px rgb(228, 226, 226);

        .talk {
            margin-top: 25px;
            font-size: 22px;
            //   margin: 0 20px;
            //   padding-top: 25px;

            span {
                margin-left: 10px;
                color: rgb(73, 168, 73);
            }

            i {
                font-size: 28px;
                line-height: 50px;
                color: rgb(73, 168, 73);
            }
        }

        .interview {
            margin-top: 25px;
            font-size: 22px;
            //   margin: 0 20px;
            //   padding-top: 25px;

            span {
                margin-left: 10px;
                color: rgb(162, 73, 168);
            }

            i {
                font-size: 28px;
                line-height: 50px;
                color: rgb(162, 73, 168);
            }
        }
    }

    // 热门讨论
    .share {
        width: 200px;
        margin-top: 20px;
        background-color: #fff;
        overflow: hidden;

        .title {
            font-size: 22px;
            padding: 20px;
        }

        .trip {

            .every {
                width: 200px;
                height: 50px;
            }

            .every>div:first-child {
                margin-left: 20px;
                font-size: 21px;

                i {
                    border-radius: 40px;
                }

            }

            .every>div:last-child {
                //多行文本溢出省略
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color: #ccc;
                margin: 10px 0px 5px 55px;
                font-size: 19px;

            }

            .every:hover {
                background-color: rgba(164, 159, 159, 0.2);
            }
        }

    }

    //双周预赛
    .dianzi {
        box-shadow: 1px 5px 5px rgb(228, 226, 226);
        width: 200px;
        height: 200px;
        margin: 20px 0;

        img {
            border-radius: 20px;
            width: 100%;
            height: 100%;
            cursor: pointer;
            transition: transform 1s;
            -webkit-transition: transform 1s;
        }

        img:hover {
            box-shadow: 0 10px 10px 0 rgba(48, 55, 66, 0.15);
            // 鼠标悬浮时盒子上移5px
            transform: translate(0, -5px);
            //动画上移
            // animation: name duration timing-function delay iteration-count direction fill-mode;
            // animation: moveXiMenZi 1s;
        }
    }

    // 热门题解
    .share {
        width: 400px;
        margin-top: 20px;
        background-color: #fff;
        overflow: hidden;

        .title {
            font-size: 22px;
            padding: 20px;
        }

        .trip {

            .every {
                width: 400px;
                height: 90px;
            }

            .every>div:first-child {
                //单行文本 溢出文字省略
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: 20px;
                font-size: 21px;

            }

            .every>div:last-child {
                //单行文本 溢出文字省略
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #ccc;
                margin: 10px 0px 0px 55px;
                font-size: 19px;

            }

            .every:hover {
                background-color: rgba(164, 159, 159, 0.2);
            }
        }

    }
}
</style>