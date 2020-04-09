<template>
    <div class="nodeDetail">
        <div class="title">
            节点详情
        </div>
        <div class="main">
            <div class="main1">
                <div class="card-body">
                    <h5 class="card-title m-0">节点ID: {{block}}</h5>
                    <div class="card-li">
                        <div class="name">节点名称：</div>
                        <div class="value status"><a href="javascript:;" >{{nodeInfo.name}}</a></div>
                    </div>
                    <div class="card-li">
                        <div class="name">发起人：</div>
                        <div class="value status">{{nodeInfo.userId}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">质押票数：</div>
                        <div class="value status">{{nodeInfo.pledgedVotes}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">节点域名：</div>
                        <div class="value status">{{nodeInfo.domain?nodeInfo.domain:'未设置节点域名'}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">节点类型：</div>
                        <div class="value status">
                            <span v-if="nodeInfo.nodeType==2" style="color:#E6A23C"><i class="el-icon-star-on"></i>超级节点</span>
                            <span v-else href="javascript:;" style="color:#909399"><i class="el-icon-star-on"></i>备选节点</span>
                        </div>
                    </div>
                    <div class="card-li">
                        <div class="name">节点状态：</div>
                        <div class="value status">
                            <el-tag v-if="nodeInfo.status==1" size="small" type="success">选举中</el-tag>
                            <el-tag v-if="nodeInfo.status==2" size="small" type="warning">已激活</el-tag>
                            <el-tag v-if="nodeInfo.status==3" size="small" type="info">落选</el-tag>
                            <el-tag v-if="nodeInfo.status==4" size="small" type="error">失败</el-tag>
                        </div>
                    </div>
                     <div class="card-li">
                        <div class="name">是否删除：</div>
                        <div class="value status">{{nodeInfo.isDelete?"是":'否'}} </div>
                    </div>
                     <div class="card-li">
                        <div class="name">激活时间：</div>
                        <div class="value status">{{nodeInfo.activeDate | dateformat("YYYY-MM-DD")}} </div>
                    </div>
                     <div class="card-li">
                        <div class="name">创建时间：</div>
                        <div class="value status">{{nodeInfo.createDate | dateformat("YYYY-MM-DD")}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">节点介绍：</div>
                        <div class="value status input">{{nodeInfo.intro}}</div>
                    </div>
                </div>
            </div>
            <div class="space"></div>
            <div class="main1" style="border-top:none">
                <div class="card-body">
                    <h5 class="card-title m-0">票数情况</h5>
                    <div class="card-li">
                        <div class="name">质押票数：</div>
                        <div class="value status">{{nodeInfo.pledgedVotes}} 票</div>
                    </div>
                    <div class="card-li">
                        <div class="name">可赎回质押票数：</div>
                        <div class="value status"> {{nodeInfo.redeemablePledgedVotes}} 票</div>
                    </div>
                    <div class="card-li">
                        <div class="name">已投票数：</div>
                        <div class="value status">{{nodeInfo.voted}} 票</div>
                    </div>
                    <div class="card-li">
                        <div class="name">总票数：</div>
                        <div class="value status">{{nodeInfo.totalVoted}} 票</div>
                    </div>
                    <div class="card-li">
                        <div class="name">全票数：</div>
                        <div class="value status">{{nodeInfo.fullVote}} 票 </div>
                    </div>
                    <div class="card-li">
                        <div class="name">投票人数：</div>
                        <div class="value status">{{nodeInfo.voters}} 票</div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            block:null,
            loading:true,
            nodeInfo:""
        }
    },
    created(){
        this.block=this.$route.query.id;

        this.getTxnDetail()
    },
    methods: {
        
      getTxnDetail(){
            this.loading=true;
            let self = this;
            self.$axios({
                url:self.$baseURL+"api/v1/Explorer/Node/"+self.block,
                method:"get",
            }).then(res=>{
                if(res.result){
                    self.nodeInfo=res.result
                }else{
                    this.$message({
                        message: res.error.msg,
                        type: 'warning'
                    });
                }
            })
        },
    },
}
</script>
<style lang="less">
    .nodeDetail{
        .title{
            padding-top: 1.5rem;
            margin-bottom: 0.5rem;
            font-size: 1.4rem;
            font-weight: 400;
        }
        .main{
            .main1{
                border-top:4px solid #c23631;
                background: #ffffff;
                padding: 0 2.6%;
                color: #666;
            }
            .card-body {
                flex: 1 1 auto;
                // padding: 1.25rem;
                .card-title{
                    font-weight: 700;
                    font-size: 1rem;
                    padding:.75rem;
                    color: #3e3f3a;
                }
                .card-li{
                    display:flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding:.75rem;
                    border-top: 1px solid #eeeeee;
                    .name{
                        width: 100px;
                        font-weight: 600;
                        font-size: 0.85rem;
                        // color: #3e3f3a;
                    }
                    .value{
                        color: #333
                    }
                }
            }
            .main2{
                // border:1px solid #d8d8d8;
                background: #f3f3f3;
                .txns-info{
                    color: #666;
                }
            }
        }

    }
</style>