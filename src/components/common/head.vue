<template>
  <div class="headWeb">
    <el-menu :default-active="$route.path!='/'?$route.path:'/home'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/home">
        <img src="/static/img/logo1.png" style="height:50px" alt="">
      </el-menu-item>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/block" >区块</el-menu-item>
      <el-menu-item index="/transactions" >交易</el-menu-item>
      <el-menu-item index="/nodes" >节点</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    created(){
     
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log( key);
        this.$router.push({
           path:key
         })
      }
    }
  }
</script>
<style lang="less" scope>
  .headWeb{
    // padding: 0px 20px;
    // padding-top: 25px;
    .navbar{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      max-width: 1200px;
      margin: auto;
      li{
        font-size: 0.9rem;
        color: #333;
        line-height: 30px;
        padding: 0px 20px;
        // border-bottom: 2px solid #ffffff;
        a{
          color: #333333;
          font-size: 0.85rem;
        }
      }
      li.active{
        color: #C64844;
        // border-bottom: 2px solid #C64844;
        a{
          color: #C64844;
        }
      }
    }
  }
</style>