<template>
    <!-- 底部模块 -->
    <div class="footer">
        <div class="w">
            <div class="footer-help">
                <ul>
                    <li><a><i class="iconfont icon-shouji"></i>移动端</a></li>
                    <li><a href="#">关于我们</a></li>
                    <li><a href="#">加入我们</a></li>
                    <li><a href="#">意见反馈</a></li>
                    <li><a href="#">企业服务</a></li>
                    <li><a href="#">校企合作</a></li>
                    <li><a href="#">联系我们</a></li>
                    <li><a href="#">免责声明</a></li>
                    <li><a href="#">友情链接</a></li>
                    <li><a href="#">资源导航</a></li>
                    <li><a href="#"></a></li>
                </ul>
                <div class="footer-a">
                    <a href="#"><i class="iconfont icon-QQ"></i></a>
                    <a href="#"><i class="iconfont icon-weixin"></i></a>
                    <a href="#"><i class="iconfont icon-weibo2"></i></a>
                    <a href="#"><i class="iconfont icon-github-fill"></i></a>

                </div>
            </div>


            <div class="copyright">
                <a><i class="iconfont icon-policeman-full"></i> 林大壮有限公司</a> | <a>
                    江西农业大学东区10栋号616寝室-1234567890ll号</a>
                | <a>JXAU, ICP证lmm·j1213243434 </a> | <i class="iconfont icon-a-dashujushujutongji-09"></i> 快乐代码证照中心 |
                <a><i class="iconfont icon-haoyou"></i>江西农业大学软件学院</a> | <a>互联网违法和不良信息举报中心中国互联网违法和不良信息举报中心<i
                        class="iconfont icon-email1"></i></a><br />
                <span><i class="iconfont icon-31dianzan"></i> 林大壮有限公司</span>
                江西农业大学东区10栋号616寝室-1234567890ll号 JXAU, ICP证lmm·j1213243434 快乐代码证照中心 |
                江西农业大学软件学院 | 互联网违法和不良信息举报中心中国互联网违法和不良信息举报中心
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped  lang="less">
.footer {
    font-size: 10px;
    height: 250px;
    background-color: rgb(40, 40, 40);

    a {
        font-size: 15px;
        text-decoration: none;
        color: #878181;
    }

    a:hover {
        color: #c6c2c2
    }

    .footer-help {
        display: flex;
        height: 60px;
        padding-top: 30px;
        color: #d2d1d1;
        border-bottom: 1px solid #ccc;

        ul {
            width: 1050px;
            display: flex;
        }

        li {
            flex: 10;
            margin-left: 15px;

            a {
                font-size: 13px;
            }

            a:hover {
                color: rgb(99, 208, 171);
                ;
            }
        }

        .footer-a {
            display: flex;

            a {
                flex: 4;
                margin-right: 20px;

                .iconfont {
                    font-size: 26px;
                }
            }
        }
    }
}


.copyright {

    color: #878181;
    line-height: 20px;
    padding-top: 50px;

    a {
        font-size: 13px;
        margin: 0 30px;
    }

    a:first-child {
        margin-left: 0;
    }

}
</style>