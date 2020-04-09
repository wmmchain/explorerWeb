<template>
    <div class="blockDetail">
        <div class="title">
            区块
        </div>
        <div class="main">
            <div class="main1">
                <div class="card-body">
                    <h5 class="card-title m-0"><i class="el-icon-pie-chart mr-2"></i>区块 #{{blockInfo.height}}</h5>
                    <div class="card-li">
                        <div class="name">Hash：</div>
                        <div class="value status">{{blockInfo.blockHash}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Parent Hash：</div>
                        <div class="value status"><a @click="toBlock(blockInfo.parentHash)" href="javascript:;">{{blockInfo.parentHash}}</a></div>
                    </div>
                    <div class="card-li">
                        <div class="name">Sha3Uncles：</div>
                        <div class="value status">{{blockInfo.sha3Uncles}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Mined by：</div>
                        <div class="value status"><a @click="toAddress(blockInfo.miner)" href="javascript:;">{{blockInfo.miner}}</a></div>
                    </div>
                    <div class="card-li">
                        <div class="name">Reward：</div>
                        <div class="value status"><span style="color:#C64844">{{blockInfo.reward}} WMM</span> </div>
                    </div>
                    <div class="card-li">
                        <div class="name">Gas：</div>
                        <div class="value status">{{blockInfo.gas}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Gas Used：</div>
                        <div class="value status">{{blockInfo.gasUsed}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Size：</div>
                        <div class="value status">{{blockInfo.size}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">时间：</div>
                        <div class="value status">{{blockInfo.createDate | dateFromNow}}</div>
                    </div>
                    
                    <div class="card-li">
                        <div class="name">交易：</div>
                        <div class="value status">{{blockInfo.transactionCount}} Txns</div>
                    </div>
                     <div class="card-li">
                        <div class="name">ExtraData：</div>
                        <div class="value status">{{blockInfo.extraData}}</div>
                    </div>
                </div>
                
            </div>
            <div class="space"></div>
            <div class="main2" v-if="false">
                <el-tabs type="border-card">
                    <el-tab-pane label="交易">
                        <div class="txns-info">共 28 个交易<br>当前时间范围内有28条记录</div>
                        <div class="table">
                            <div class="tr pages">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    background
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="  prev, pager, next,sizes "
                                    :total="400">
                                </el-pagination>
                            </div>
                            <div class="table-data">
                                <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                    <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="tr pages">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    background
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="  prev, pager, next,sizes "
                                    :total="400">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="转账">
                        <div class="txns-info">共 28 个交易<br>当前时间范围内有28条记录</div>
                        <div class="table">
                            <div class="tr pages">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    background
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="  prev, pager, next,sizes "
                                    :total="400">
                                </el-pagination>
                            </div>
                            <div class="table-data">
                                <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                    <el-table-column
                                    prop="date"
                                    label="日期"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址">
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="tr pages">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    background
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="100"
                                    layout="  prev, pager, next,sizes "
                                    :total="400">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import BigNumber from 'bignumber.js'
export default {
    data(){
        return{
            block:null,
            currentPage:1,
            blockInfo:"",
            tableData: []
 
        }
    },
    created(){
        this.block=this.$route.params.id
        console.log(new BigNumber('5.816439e-12').toFixed()  )
        this.getBlockDetail()
    },
    watch:{
        $route(){
            this.block=this.$route.params.id
            this.getBlockDetail()
        }
    },
    methods: {
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        getBlockDetail(){
            this.loading=true;
            let self = this;
            self.$axios({
                url:self.$baseURL+"api/v1/Explorer/Block/"+self.block,
                method:"get",
            }).then(res=>{
                if(res.result){
                    self.blockInfo=res.result;
                    self.blockInfo.gas=new BigNumber(self.blockInfo.gas).toFixed()
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
    .blockDetail{
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
                        width: 110px;
                        font-weight: 600;
                        font-size: 0.85rem;
                        
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