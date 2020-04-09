<template>
    <div   class="nodes">
        <div class="title">节点</div>
        <div class="pagina">
           <div class="li">
               <div class="item" style="border-left:3px solid #c64844">
                    <div class="value">{{totalCount}}</div>
                    <div class="name">节点</div>
               </div>
               <div class="item" style="border-left:3px solid #4fc7c6">
                    <div class="value">
                        <span v-for="n in topNode">{{n + " " +" "}}</span>
                    </div>
                    <div class="name">得票数最高</div>
               </div>
                <div class="item" style="border-left:3px solid #f7a35c">
                    <div class="value">{{top1.voted?top1.voted:0}}</div>
                    <div class="name">节点最高得票数</div>
               </div>
           </div>
           <div class="li liLeft">
               <div id="container" v-loading="loading" style="width:100%;height:290px;"></div>
           </div>
        </div>
        <div class="space" ></div>
        <!-- <div class="bar">
            <div class="tc barTitle">节点排名</div>
            <div class="tc barTip">根据国家地区划分</div>
            <div class="barChart" id="myChart" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)"></div>
        </div> -->
        <div class="table">
            <div class="barTitle">
                <div style="font-size:1.4rem">节点排名</div>
                <div class="tags">
                    <a href="javascript:;" title="选举中" class="success badge"></a>选举中
                    <a href="javascript:;" title="激活" class="warning badge"></a>激活
                    <a href="javascript:;" title="落榜" class="grey badge"></a>落榜
                    <a href="javascript:;" title="失败" class="error badge"></a>失败
                </div>
                
            </div>
            <div v-loading="loading2">
                <el-table
                    :data="nodeList"
                    style="width: 100%">
                    <el-table-column
                    width="80"
                    prop="id"
                    label="节点ID">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="名称"
                    >
                    <template  slot-scope="scope">
                        <div>
                        <div style="color:#C64844" @click="toNode(scope.row.id)"><a href="javascript:;">{{scope.row.name}}</a></div>
                        <div style="color:#999;font-size:12px">{{scope.row.domain?scope.row.domain:"未设置节点域名"}}</div>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="userId"
                    width="80"
                    label="发起人ID">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    width="80"
                    label="状态"
                    >
                    <template  slot-scope="scope">
                        <div>
                        <a v-if="scope.row.status==1" href="javascript:;" title="选举中" class="success badge"></a>
                        <a v-if="scope.row.status==2" href="javascript:;" title="激活" class="warning badge"></a>
                        <a v-if="scope.row.status==3" href="javascript:;" title="落榜" class="grey badge"></a>
                        <a v-if="scope.row.status==4" href="javascript:;" title="失败" class="error badge"></a>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="pledgedVotes"
                    label="质押票数">
                    </el-table-column>
                    <el-table-column
                    prop="nodeType"
                    label="节点类型">
                    <template  slot-scope="scope">
                        <div>
                        <span v-if="scope.row.nodeType==2" style="color:#E6A23C"><i class="el-icon-star-on"></i>超级节点</span>
                        <span v-else href="javascript:;" style="color:#909399"><i class="el-icon-star-on"></i>备选节点</span>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="voted"
                    label="得票数">
                    </el-table-column>
                    <el-table-column
                    prop="voters"
                    label="投票人数">
                    </el-table-column>
                    <el-table-column
                    prop="fullVote"
                    label="全票数">
                    </el-table-column>
                    <el-table-column
                    prop="activeDate"
                    label="激活时间">
                    <template  slot-scope="scope">
                        <div>
                        {{scope.row.activeDate | dateformat("YYYY-MM-DD")}}
                        </div>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="tr pages">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="paramsData.index"
                    background
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="paramsData.size"
                    layout="  prev, pager, next,sizes"
                    :total="totalCount">
                </el-pagination>
            </div>
            
        </div>
    </div>
</template>
<script>
import Highcharts3D from 'highcharts/highcharts-3d';
var Highcharts = require('highcharts');
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/exporting')(Highcharts);
Highcharts3D(Highcharts);
export default {
    data(){
        return{
           loading:true,
           loading2:true,
           paramsData:{
               index:1,
               size:10
           },
           nodeList:[],
           pieData:[],
           totalCount:0,
           topNode:["--"],
           top1:""

        }
    },
    created(){
      let self = this;
    },
    mounted(){
       this.getNodeAll()
        this.getNode()
    },
    methods: {
        toNode(id){
            this.$router.push("/nodeDetail?id="+id)
        },
        handleSizeChange(val) {
            this.paramsData.size=val;
            this.paramsData.index=1;
            this.getNode()
        },
        handleCurrentChange(val) {
            this.paramsData.index=val
            this.getNode()
        },
        getNodeAll(){
            let self = this;
            self.loading=true;
            self.$axios({
                url:self.$baseURL+"api/v1/Explorer/Nodes",
                method:"get",
                params:{
                    index:1,
                    size:20
                }
            }).then(res=>{
                let newList=[],rankList=[];
                let newNode=res.data[0].voted;
                self.top1=res.data[0];
                res.data.forEach(e=>{
                    let newArr=[e.name,e.voted];
                    if(newNode==e.voted){
                        rankList.push(e.name)
                    }
                    newList.push(newArr)
                })
                self.topNode=rankList
                self.pieData=newList;
                self.loading=false;
                self.getPie()
            })
        },
        getNode(){
            let self = this;
            self.loading2=true;
            self.$axios({
                url:self.$baseURL+"api/v1/Explorer/Nodes",
                method:"get",
                params:self.paramsData
            }).then(res=>{
                self.loading2=false;
                self.totalCount=res.totalCount;
                self.nodeList=res.data;
            }).catch(err=>{
                self.loading2=false;
            })
        },
        getPie(){
             // 创建图表
            Highcharts.chart('container', { 
                /*Highcharts 配置*/
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 60
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '节点投票分配',
                    margin: 0,
                    style:{
                        color:"#C64844"
                    }
                },
                subtitle: {
                    text: 'Highcharts 中的3D环形图',
                    style: {
                        display:"none"
                    }
                },
                plotOptions: {
                    pie: {
                        innerSize: 50,
                        depth: 30,
                    }
                },
                series: [{
                    name: '已投票数',
                    data: this.pieData
                }]
            });
        },
        // getData(){
        //     this.$nextTick(()=>{
        //         let myChart = this.$echarts.init(document.getElementById('myChart'));
        //         this.charts.drawNodeBar(myChart,"合作数据曲线统计",);
        //     })
        // }
    },
}
</script>
<style lang="less" scope>
.nodes{
    padding: 20px; 
    width: 100%;
    overflow-x: hidden;
    .title{
      font-size: 1.4rem
    }
    .pagina{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 0.7rem;
        margin-bottom: 10px;
        color: #999999;
        .li{
            width: 49%;
            .item{
                border-left: 3px solid red;
                height: 90px;
                text-indent: 20px;
                background: #ffffff;
                margin-bottom: 10px;
                .value{
                    font-size: 1rem;
                    color: #333333;
                    line-height: 30px;
                    padding-top: 15px;
                }
                .name{
                    color: #999999;
                }
            }
            
        }
        .liLeft{
            background: #ffffff;
            height: 290px;
            border-left: 3px solid #7cb5ec;
        }
    }
    .map{
        height: 400px;
        background: #ffffff;
    }
    .bar{
        height: 400px;
        background: #ffffff;
        .barTitle{
            // line-height: 30px;
            padding-top: 20px;
            font-size: 16px;
        }
        .barTip{
            color: #999999;
        }
        .barChart{
            height: 300px;
        }
    }
    .table{
        background: #ffffff;
        padding: 10px;
        .el-table thead tr,.el-table thead th{
            background-color: #f8f8f8!important;
        }
        .barTitle{
            padding: 10px;
            font-size: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .tags{
                display: flex;
                align-items: center;
                a{
                    margin-left: 15px;
                    margin-right: 2px;
                }
            }
        }
        .badge{
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 50%;
        }
        .success{
            background: #93c54b;
        }
        .warning{
            background: #E6A23C;
        }
        .grey{
            background: #909399;
        }
        .error{
            background: #F56C6C;
        }
    }
    
}
@media screen and (max-width: 640px) {
    .li{
        width: 100%!important;
    }
    .nodes{
      padding: 10px 0px!important;
    }
}
</style>