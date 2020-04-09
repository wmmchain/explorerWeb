<template>
    <div class="AddrDetail">
        <div class="title">
            账户
        </div>
        <div class="main">
            <div class="main1">
                <!-- <div class="title">区块 #{{block}}</div> -->
                <div class="card-body">
                    <!-- <h5 class="card-title m-0"><i class="el-icon-pie-chart mr-2"></i>区块 #{{block}}</h5> -->
                    <div class="card-li">
                        <div class="name">Miner：</div>
                        <div class="value status">{{block}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Balance ：</div>
                        <div class="value status" style="color:#C64844">{{AddrInfo.balance}} WMM</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Transactions：</div>
                        <div class="value status">{{AddrInfo.txs}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Update Time：</div>
                        <div class="value status">{{AddrInfo.updateDate | dateFromNow}}</div>
                    </div>
                </div>
                
            </div>
            <div class="space"></div>
            <div class="main2" >
                <el-tabs type="border-card">
                    <el-tab-pane label="交易">
                        <div class="txns-info">当前用户共 {{totalCount}} 个交易</div>
                        <div class="table">
                            <div class="tr pages">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="paramsData.index"
                                    background
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="paramsData.size"
                                    layout="  prev, pager, next,sizes "
                                    :total="totalCount">
                                </el-pagination>
                            </div>
                            <div class="table-data">
                                <el-table
                                    :data="txnList"
                                    style="width: 100%">
                                    <el-table-column
                                    prop="hash"
                                    label="Txn Hash"
                                    width="280"
                                    >
                                    <template  slot-scope="scope">
                                        <div>
                                        <a @click="toTxn(scope.row.hash)" href="javascript:;">{{scope.row.hash}}</a>
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="block"
                                    label="Block"
                                    >
                                    <template  slot-scope="scope">
                                        <div>
                                        <a @click="toBlock(scope.row.block)" href="javascript:;">{{scope.row.block}}</a>
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="createDate"
                                    label="Age"
                                    >
                                    <template  slot-scope="scope">
                                        <div>
                                        {{scope.row.createDate | dateFromNow}}
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="form"
                                    width="180"
                                    label="From">
                                    <template  slot-scope="scope">
                                        <div>
                                            <span v-if="scope.row.form==block">{{scope.row.form}}</span>
                                            <a v-else @click="toAddress(scope.row.form)" href="javascript:;">{{scope.row.form}}</a>
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="to"
                                    width="180"
                                    label="To">
                                    <template  slot-scope="scope">
                                        <div>
                                            <span v-if="scope.row.to==block">{{scope.row.to}}</span>
                                            <a v-else @click="toAddress(scope.row.to)" href="javascript:;">{{scope.row.to}}</a>
                                        </div>
                                    </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="value"
                                    label="Value">
                                    <template  slot-scope="scope">
                                        <div>
                                        {{scope.row.value}} WMM
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
                                    layout="  prev, pager, next,sizes "
                                    :total="totalCount">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="转账">
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
                    </el-tab-pane> -->
                    
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:true,
            block:null,
            currentPage:1,
            AddrInfo:"",
            tableData: [],
            paramsData:{
                address:"",
                indx:1,
                size:10
            },
            txnList:[],
            totalCount:0
 
        }
    },
    watch:{
        $route(){
            this.block=this.$route.params.id;
            this.paramsData.address=this.$route.params.id;
            this.getAddrDetail()
        }
    },
    created(){
        this.block=this.$route.params.id;
        this.paramsData.address=this.$route.params.id;
        this.getAddrDetail()
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
            this.paramsData.size=val;
            this.paramsData.index=1;
            this.getAddrTxns()
        },
        handleCurrentChange(val) {
            this.paramsData.index=val;
            this.getAddrTxns()
        },
        getAddrDetail(){
            this.loading=true;
            let self = this;
            self.$axios({
                url:self.$baseURL+"api/v1/Explorer/Address/"+self.block,
                method:"get",
            }).then(res=>{
                if(res.result){
                   self.AddrInfo=res.result;
                }else{
                    this.$message({
                        message: res.error.msg,
                        type: 'warning'
                    });
                }
                self.getAddrTxns()
            })
        },
        getAddrTxns(){
            let self = this;
            self.$axios({
                url:self.$baseURL+"api/v1/Explorer/Address/"+self.block+"/Txs",
                method:"get",
                params:self.paramsData
            }).then(res=>{
                self.loading=false;
                self.totalCount=res.totalCount
                self.txnList=res.data
                // self.AddrInfo=res.result
            })
        }
    },
}
</script>
<style lang="less">
    .AddrDetail{
        .el-table thead tr,.el-table thead th{
            background-color: #f8f8f8!important;
        }
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