<template>
    <div class="txnDetail">
        <div class="title">
            交易详情
        </div>
        <div class="main">
            <div class="main1">
                <div class="card-body">
                    <h5 class="card-title m-0">Transaction Hash: {{block}}</h5>
                    <div class="card-li">
                        <div class="name">Block Height：</div>
                        <div class="value status"><a href="javascript:;" @click="toBlock(txnInfo.block)">{{txnInfo.block}}</a></div>
                    </div>
                    <div class="card-li">
                        <div class="name">TimeStamp：</div>
                        <div class="value status">{{txnInfo.createDate | dateFromNow}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Gas：</div>
                        <div class="value status">{{txnInfo.gas}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Gas Price：</div>
                        <div class="value status">{{txnInfo.gasPrice}} WMM</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Nonce：</div>
                        <div class="value status">{{txnInfo.nonce}}</div>
                    </div>
                    <div class="card-li">
                        <div class="name">Input Data：</div>
                        <div class="value status input">{{txnInfo.input}}</div>
                    </div>
                </div>
            </div>
            <div class="space"></div>
            <div class="main1" style="border-top:none">
                <div class="card-body">
                    <h5 class="card-title m-0">TRC10转账</h5>
                    <div class="card-li">
                        <div class="name">From：</div>
                        <div class="value status"><a href="javascript:;" @click="toAddress(txnInfo.form)">{{txnInfo.form}}</a></div>
                    </div>
                    <div class="card-li">
                        <div class="name">To：</div>
                        <div class="value status"><a href="javascript:;" @click="toAddress(txnInfo.to)">{{txnInfo.to}}</a></div>
                    </div>
                    <div class="card-li">
                        <div class="name">Value：</div>
                        <div class="value status"><span style="color:#C64844" >{{txnInfo.value}} WMM</span> </div>
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
            txnInfo:""
        }
    },
    created(){
        this.block=this.$route.params.id;
        this.getTxnDetail()
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
      getTxnDetail(){
            this.loading=true;
            let self = this;
            self.$axios({
                url:self.$baseURL+"api/v1/Explorer/Tx/"+self.block,
                method:"get",
            }).then(res=>{
                if(res.result){
                    self.txnInfo=res.result;
                    self.txnInfo.gas=new BigNumber(self.txnInfo.gas).toFixed()
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
    .txnDetail{
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
                        width: 80px;
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