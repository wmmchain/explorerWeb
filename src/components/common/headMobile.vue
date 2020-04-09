<template>
  <div class="headMobile">
    <!-- el-icon-s-unfold -->
    
    <el-drawer
  title="我是标题"
  :visible.sync="drawer"
  :with-header="false">
  <span>我来啦!</span>
</el-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        drawer: false,
      };
    },
    created(){
      console.log(this.$route)
      console.log(this.$route.path)
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="less" scope>
  .headMobile{
    padding: 10px;
    text-align: right;
    
  }
</style>