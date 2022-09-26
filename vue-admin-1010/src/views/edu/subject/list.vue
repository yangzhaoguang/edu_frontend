<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

<!-- 
    data : 遍历的数据
    props： 配置信息，子节点、节点名
    filter-node-method ：搜索的方法
 -->
    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subjectApi from '@/api/edu/subject'

export default {

  data() {
    return {
      filterText: '',
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.getSubjectList()
  },
  methods: {
    //  显示课程分类列表
    getSubjectList() {
        subjectApi.getAllSubject().then((response) => {
            this.data2 = response.data.list
        })
    },

    // 搜索课程分类
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>

