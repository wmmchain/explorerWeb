<template>
  <div class="home">
      <!-- <div v-if="!loading"> -->
    <div class="part-one flex">
      <div class="item">
        <p class="name">线上节点</p>
        <p class="value">{{explorerInfo.nodes?explorerInfo.nodes:0}}</p>
      </div>
      <div class="item">
        <p class="name">区块高度</p>
        <p class="value">#{{explorerInfo.height?explorerInfo.height:0}}</p>
      </div>
      <div class="item">
        <p class="name">出块时间</p>
        <p class="value">{{explorerInfo.brustTime?explorerInfo.brustTime:0}} s</p>
      </div>
      <div class="item">
        <p class="name">总交易数</p>
        <p class="value">{{explorerInfo.txs?explorerInfo.txs:0}}</p>
      </div>
      <div class="item">
        <p class="name">总地址数</p>
        <p class="value">{{explorerInfo.address?explorerInfo.address:0}}</p>
      </div>
    </div>
    <div class="space"></div>
    <!-- <div class="part-two">
      <div class=" chart" >
        <div class="chartBox" id="myChart1" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)"></div>
      </div>
      <div class=" chart" >
        <div class="chartBox" id="myChart2"  v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)"></div>
      </div>
    </div> -->
    <!-- <div class="space"></div> -->
    <div class="part-three">
      <div class=" list">
        <div class="listWrap">
          <div class="title">
              <div class="titleLi"><i class="el-icon-menu"></i>已确认区块</div>
              <div class="seeAll"  @click="$router.push('/block')">查看全部</div>
          </div>
          <ul v-loading="loading1" element-loading-background="rgba(255, 255, 255, 1)">
            <li class="blockLi" v-for="n in blockData">
              <div class="blockLiL">
                <div class="block colorLight" @click="toBlock(n.height)"><i class="el-icon-s-grid"></i> #{{n.height}}</div>
                <div class="trans"><i class="el-icon-s-operation"></i> {{n.transactionCount}}笔交易</div>
                <div class="miner">出块者：<span class="colorLight" @click="toAddress(n.miner)">{{n.miner | stringslice(12,-10)}}</span></div>
              </div>
              <div  class="blockLiR">
                <div class="blockIncome">区块收益：{{n.reward}} WMM</div>
                <div class="time">{{n.createDate | dateFromNow}}</div>
              </div>
            </li>
            <p class="noCount" v-if="blockData.length==0">暂无数据！</p>
          </ul>
           <div class="white"></div>
        </div>
      </div>
      <div class=" list">
        <div class="listWrap">
          <div class="title">
              <div class="titleLi"><i class="el-icon-coin"></i>交易</div>
              <div class="seeAll" @click="$router.push('/transactions')">查看全部</div>
          </div>
          <ul v-loading="loading2" element-loading-background="rgba(255, 255, 255, 1)">
            <li class="blockLi" v-for="n in txnData">
              <div class="blockLiL">
                <div class="block colorLight" @click="toTxn(n.hash)"><i class="el-icon-s-unfold"></i>TX {{n.hash | stringslice(12,-10)}}</div>
                <div class="miner">From：<span class="colorLight" @click="toAddress(n.form)">{{n.form | stringslice(6,-4)}}</span> To：<span @click="toAddress(n.to)" class="colorLight">{{n.to | stringslice(6,-4)}}</span></div>
              </div>
              <div  class="blockLiR">
                <div class="blockIncome">{{n.value}} WMM</div>
                <div class="time">{{n.createDate | dateFromNow}}</div>
              </div>
            </li>
            <p class="noCount" v-if="txnData.length==0">暂无数据！</p>
          </ul>
          <div class="white"></div>
        </div>
      </div>
    </div>
      <!-- </div> -->
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      loading:true,
      loading1:true,
      loading2:true,
      explorerInfo:"",
      blockData:[],
      txnData:[]
    }
  },
  created(){
    this.getExplorer()
    this.getBlockList()
    this.getTxnsList()
      let self = this;
      setTimeout(function(){
        self.loading=false;
        self.getData()
      },2000)
    },
  mounted(){
    
  },
  methods:{
    toBlock(id){
      this.$router.push({
          path: `/block/${id}`,
        })
    },
    toTxn(id){
      this.$router.push({
          path: `/transactions/${id}`,
        })
    },
    toAddress(id){
      this.$router.push({
          path: `/address/${id}`,
        })
    },
    getExplorer(){
        let self = this;
        self.$axios({
            url:self.$baseURL+"api/v1/Explorer",
            method:"get",
        }).then(res=>{
            if(res){
              self.explorerInfo=res
            }
        })
    },
    getBlockList(){
      let self = this;
      self.loading1=true
      self.$axios({
          url:self.$baseURL+"api/v1/Explorer/Blocks",
          method:"get",
          params:{
            index:1,
            size:20
          }
      }).then(res=>{
        self.loading1=false
          if(res.data){
            self.blockData=res.data
          }
      }).catch(err=>{
        self.loading1=false
      })
    },
    getTxnsList(){
      let self = this;
      self.loading2=true
      self.$axios({
          url:self.$baseURL+"api/v1/Explorer/Txs",
          method:"get",
          params:{
            index:1,
            size:20
          }
      }).then(res=>{
        self.loading2=false
          if(res.data){
            self.txnData=res.data
          }
      }).catch(err=>{
        self.loading2=false
      })
    },
    getData(){
      this.$nextTick(()=>{
          let myChart = this.$echarts.init(document.getElementById('myChart1'));
          let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
          this.charts.drawLine(myChart,"合作数据曲线统计",);
          this.charts.drawLine(myChart2,"合作数据曲线统计",);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home{
  .noCount{
    padding-top: 2rem;
    text-align: center;
  }
  .loading{
    height: 400px;
  }
  .titleLi{
    font-size: 1rem;
  }
  .part-one{
    justify-content: center;
    background: #ffffff;
    
  }
  .item{
    padding: 1rem 30px;
    text-align: center;
    .name{
      font-size: 1rem;
      color: #999999;
    }
    .value{
      font-size: 1.4rem;
      line-height: 30px;
    }
  }
  .part-two,.part-three{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list{
      width: 49%;
      margin-bottom: 0.6rem;
      .listWrap{
        background: #ffffff;
        // height: 500px;
        overflow: hidden;
        padding-bottom: 10px;
        ul{
          // height: 99%;
          height: 450px;
          overflow: hidden;
          overflow-y: auto; 
          background: #ffffff;         
        }
        li{
          padding: 10px;
          font-size: 0.8rem;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .title{
          padding: 10px;
          font-size: 1rem;
          border-bottom: 1px solid #eeeeee;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .seeAll{
            cursor: pointer;
            color: #C64844;
            border: 1px solid #C64844;
            border-radius: 2px;
            padding: 2px 5px;
          }
        }
        .blockLi{
          font-size: 0.7rem;
          line-height: 1.2rem;
          padding: 5px 10px;
          .miner,.time{
            color: #999999;
            font-size: 0.6rem;
          }
          .trans{
            font-size: 0.75rem;
          }
          .time{
            text-align: right;
          }
        }
      }
    }
    .chart{
      width: 49%;
      margin-bottom: 0.6rem;
    }
    .paddingR{
      padding-right: 10px;
    }
    .paddingL{
      padding-left: 10px;
    }
    .chartBox{
      background: #ffffff;
      height: 300px;
    }
    .colorLight{
      color: #C64844;
      cursor: pointer;
      font-size: 0.85rem;
    }
    
  }
  @media screen and (max-width: 640px) {
    .part-one,.part-two,.part-three{
      flex-wrap: wrap!important;
    }
    
    .chart,.list {
      width: 100%!important;
    }
  }

}
</style>
