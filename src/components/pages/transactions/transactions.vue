<template>
    <div class="transaPage" style="background:#fff" v-loading="loading"  element-loading-background="rgba(255, 255, 255, 1)">
        <div class="title">交易</div>
        <div class="pagina">
            <div class="txns-info tl">当前共 {{totalCount}} 个交易</div>
            <div class="tr pages">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  background
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="100"
                  layout="  prev, pager, next,sizes "
                  :total="totalCount">
              </el-pagination>
            </div>
        </div>
        <div class="table" >
            <el-table
                :data="tableData"
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
                      <a @click="toAddress(scope.row.form)" href="javascript:;">{{scope.row.form}}</a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                prop="to"
                width="180"
                label="To">
                  <template  slot-scope="scope">
                    <div>
                      <a @click="toAddress(scope.row.to)" href="javascript:;">{{scope.row.to}}</a>
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
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="  prev, pager, next,sizes "
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          loading:true,
          currentPage:1,
          params:{
            index:1,
            size:10
          },
          tableData: [],
          totalCount:0
 
        }
    },
    created(){
      let self = this;
      this.getTxnList()
      // setTimeout(function(){
      //   self.loading=false
      // },2000)
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
        this.params.size=val;
        this.params.index=1;
        this.getTxnList()
      },
      handleCurrentChange(val) {
        this.params.index=val;
        this.getTxnList()
      },
      getTxnList(){
        this.loading=true;
        let self = this;
        self.$axios({
            url:self.$baseURL+"api/v1/Explorer/Txs",
            method:"get",
            params:self.params
        }).then(res=>{
            self.loading=false;
            self.totalCount=res.totalCount;
            if(res.data){
              self.tableData=res.data
            }
        }).catch(err=>{
          self.loading=false
        })
      },
    },
}
</script>
<style lang="less" scope>
.transaPage{
    padding: 20px; 
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        background: #ffffff;
    }
    .title{
      font-size: 1.4rem
    }
    .pagina{
        margin-top: 10px;
        font-size: 0.7rem;
        margin-bottom: 10px;
        color: #999999;
    }
    .el-table thead tr,.el-table thead th{
        background-color: #f8f8f8!important;
    }
}
@media screen and (max-width: 640px) {
    .transaPage{
      padding: 10px 0px!important;
    }
}
</style>