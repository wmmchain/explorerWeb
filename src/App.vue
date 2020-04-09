<template>
  <div id="app">
    <div class="layout">
      <div class="header">
        <headWeb  v-if="!isMobile" ></headWeb>
        <div class="headMobile" v-else>
          <el-button type="primary" size="mini" icon="el-icon-s-fold" @click="drawer=true"></el-button>
        </div>
      </div>
      <el-drawer
        title=""
        :visible.sync="drawer"
        :with-header="false">
            <div class="tl" style="padding:0px 10px;padding-top:10px">
              <i class="el-icon-back"  @click="drawer=false"  style="font-size:20px;color:rgb(209, 109, 105)"></i>
            </div>
            <div class="tc" style="margin-top:10px">
              <img src="/static/img/logo2.png" style="width:90%" alt="">
            </div>
            <el-menu
              :default-active="activeNum"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @select="handleSelect"
              @close="handleClose">
              <el-menu-item index="/home" >
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="/block">
                <i class="el-icon-coin"></i>
                <span slot="title">区块</span>
              </el-menu-item>
              <el-menu-item index="/transactions" >
                <i class="el-icon-document"></i>
                <span slot="title">交易</span>
              </el-menu-item>
              <el-menu-item index="/nodes" >
                <i class="el-icon-s-help"></i>
                <span slot="title">节点</span>
              </el-menu-item>
            </el-menu>
      </el-drawer>
      <div class="" style="background:#f2f2f2;padding-top:50px">
         <div class="searchBox" >
            <searchInp></searchInp>
          </div>
      </div>
      <div class="main">
        <div class="mainContain">
          <div class="mainBox">
            <router-view/>
          </div>
        </div>
      </div>
      <div class="footPart">
          <div class="footBox">
            <Foot></Foot>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import headWeb from "@/components/common/head.vue"
import headMobile from "@/components/common/headMobile.vue"
import searchInp from "@/components/common/search.vue"
import Foot from "@/components/common/footer.vue"
export default {
  name: 'App',
  data(){
    return{
      screenWidth: document.documentElement.clientWidth,//屏幕宽度
      isMobile:false,
      isLogo:true,
      drawer:false,
      activeNum:"/home"
    }
  },
  watch:{
     'screenWidth':function(val){ //监听屏幕宽度变化
          var oIframe = document.getElementById("app");
          if(val<614){
            this.isMobile=true
          }else{
            this.isMobile=false
          }
      },
      // 方法1
		'$route' (to, from) { //监听路由是否变化
        this.activeNum=to.path=='/'?'/home':to.path;
        // if(to.path == "/"){ //跳转到哪个页面
        //   location.reload()
        // }
      },
  },
  mounted() {
      var _this = this;
      window.onresize = function(){ // 定义窗口大小变更通知事件
          _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
          _this.screenHeight = document.documentElement.clientHeight; //窗口高度
      };
      if(_this.screenWidth<614){
        this.isMobile=true
      }else{
        this.isMobile=false
      }
  },
  activated(){
    console.log(this.$route.path)
  },
  components:{
    headWeb,searchInp,Foot,headMobile
  },
  methods:{
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key,keyPath){
         this.drawer=false;
         this.$router.push({
           path:key
         })
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  font-size: 1.2rem;
}
body{
  margin: 0px!important;
}
a{
  color: #C64844!important;
}
.layout{
  background: #f8f8f8;
}
.header{
  background: #ffffff;
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 1500;
}
.headWeb{
  max-width: 1100px;
  margin: auto;
}
.footPart{
   background: rgb(51, 51, 51);
}
.footBox{
    max-width: 1100px;
    margin: auto;
    padding: 20px;
    /* padding-top: 10px; */
  }
.searchBox,.main{
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}
.space{
  height: 0.8rem;
}
.headMobile{
  padding: 10px;
    text-align: right;
    background: #C64844
}

@media screen and (max-width: 1024px) {
  .app_content {
    width: 96%;
  }
  /* .home{
    padding: 10px 10px!important;
  } */
  .searchBox,.main{
    padding:  10px 0px!important;
  }
  .footBox{
    padding: 10px!important;
  }
  
}
/* .el-main{
  background: #f8f8f8;
}
.footPart{
  background: #333333;
  padding: 20px;
}
.footBox{
  max-width: 1100px;
  margin: auto;
}
.searchBox{
  background: #f2f2f2;
} */
.flex{
  display: flex;
  align-items: center;
}
ul,li{
  list-style: none;
  padding: 0px;
  margin: 0px;
}
a{
  text-decoration: none;
}

ul::-webkit-scrollbar {
  width: 5px;
}
ul::-webkit-scrollbar-track {
  background-color: #c7c7c7;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.tl{
  text-align: left;
}
.tr{
  text-align: right;
}
.tc{
  text-align: center
}
.pages{
  margin: 10px 0px;
}
div,a,li,span,p{
  font-size: 0.9rem;
}
.el-loading-spinner .circular{
  width: 42px!important;
  height: 42px!important;
  animation: loading-rotate 2s linear infinite!important;
  display: none!important;
}
.el-loading-spinner{
  width: 280px!important;
  height: 200px!important;
  background: url(../static/img/timg.gif) center no-repeat !important;
  background-size: 100%;
  
  position: relative!important;
  margin: auto!important;
  top: 50%!important;
  transform: translateY(-50%)!important;
}
h1,h2,h3,h4,h5{
  padding: 0px;
  margin: 0px;
}
div, a, li, span, p{
  margin: 0px;
  padding: 0px;
}
.mr-2{
  margin-right: .5rem!important;
}
.el-tabs__item{
  padding: 0px 30px 8px!important;
  border-top: 4px solid transparent!important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  border-top: 4px solid #C64844!important;
}
.el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
  font-size: 0.7rem!important;
}
.el-pager li{
  height: 24px!important;
  line-height: 24px!important;
  font-size: 0.8rem!important;
  margin: 0px 3px!important;
  min-width:24px!important;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  height: 24px!important;
  line-height: 24px!important;
  font-size: 0.7rem!important;
  margin: 0px 2px!important;
  min-width:22px!important;
}
.el-pagination__sizes .el-input .el-input__inner{
  font-size: 0.7rem!important;
   height: 24px!important;
  line-height: 24px!important;
}
.el-pagination button, .el-pagination span:not([class*=suffix]){
  font-size: 0.7rem!important;
   height: 24px!important;
  line-height: 24px!important;
}
.el-pagination .el-select .el-input{
  width: 90px!important;
}
.el-submenu .el-menu-item{
      height: 35px;
    line-height: 35px;
}
.el-menu-item{
  height: 40px;
    line-height: 40px;
}
.el-menu--horizontal>.el-menu-item{
border: 0px!important;
}
.el-menu--horizontal>.el-menu-item.is-active{
  color: #C64844!important;
}
.headMobile .el-button--primary{
  color: #C64844!important;
  background-color: #ffffff!important;
    border-color: #ffffff!important;
}
.headMobile .el-button--primary:active {
    background: rgb(178, 65, 61)!important;
    border-color: rgb(178, 65, 61)!important;
    color: #FFF!important;
}
.headMobile .el-button--primary:hover {
    background: rgb(209, 109, 105)!important;
    border-color: rgb(209, 109, 105)!important;
    color: #FFF!important;
}
/* .headMobile .el-button:focus{
    color: #C64844!important;
    border-color: rgb(238, 200, 199)!important;
    background-color: rgb(249, 237, 236)!important;
} */


</style>
