<template>
    <div class="post-comment-panel">
        <Avatar :width="45" :userId="currentUserInfo.userId"></Avatar>
        <div class="comment-form">
            <el-form :model="formData" :rules="rules" ref="dormDataRef" labe-width="80px">
                <el-form-item prop="content">
                    <el-input clearable placeholder="请文明发言做一个棒棒的程序员" type="textarea" :row="5" :maxLength="150"
                        show-word-limit v-model="formData.content" />
                    <div class="insert-img" v-if="currentUserInfo.userId">
                        <el-upload name="file" :show-file-list="false" :multiple="false" :http-request="selectImg">
                            <span class="iconfont icon-image"></span>

                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="send-btn">
            发表
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.post-comment-panel {
    display: flex;

    .comment-form {
        flex: 1;
        margin: 0 10px;

        .el-textarea__inner {
            height: 60px;
        }
    }

    .send-btn {
        width: 50px;
        height: 50px;
        background: rgb(88, 216, 130);
        color: #fff;
        text-align: center;
        line-height: 50px;
        border-radius: 8px;
    }
}
</style>