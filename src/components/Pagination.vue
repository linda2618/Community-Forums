<template>
    <div v-if="!loading && dataSource.list != null && dataSource.list.length == 0">
        <Nodata :msg="noDataMsg"></Nodata>
    </div>
    <!-- 骨架 -->
    <div class="skeleton" v-if="loading">
        <el-skeleton :row="3" animated></el-skeleton>
    </div>
    <!-- 文章展示 -->
    <div v-for="item in dataSource.list" v-if="!loading">
        <slot :data="item"></slot>
    </div>
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination v-if="dataSource.pageTotal as number > 1" :current-page="dataSource.pageNo"
            :total="dataSource.totalCount" layout=" prev, pager, next" @current-change="handleCurrentChange"
            style="text-align: right;" background />
    </div>
</template>

<script setup lang="ts">
import { Loading } from 'element-plus/es/components/loading/src/service';
import { pa } from 'element-plus/es/locale';
import { ref } from 'vue'
// const background = ref('#1ef087')
interface pageType {
    totalCount?: number
    pageSize?: number
    pageNo?: number
    pageTotal?: number
    list?: any
}
interface pageDataType {
    dataSource: pageType
    loading: Boolean
    noDataMsg: string
}
//分页列表数据
const props = withDefaults(defineProps<pageDataType>(), {
    dataSource: () => { return {} },
    loading: () => { return false },
    noDataMsg: () => { return '空空如也' }
})

const emits = defineEmits(['loadData'])
const handleCurrentChange = (pageNo: number) => {
    props.dataSource.pageNo = pageNo
    emits("loadData")
}
</script>

<style scoped>
.skeleton {
    padding: 15px;
}

.pagination {
    padding-bottom: 10px;
    margin-bottom: 20px;
}
</style>