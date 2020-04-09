<template>
    <div 
      class="blockPage"
      style="background:#fff"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 1)"
    >
        <div class="title">区块</div>
        <div class="pagina">
            <div class="txns-info tl">当前共 {{totalCount}} 块区块</div>
            <div class="tr pages">
              <el-pagination
                  small
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="params.index"
                  background
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="params.size"
                  layout="  prev, pager, next,sizes"
                  :total="totalCount">
              </el-pagination>
            </div>
             
        </div>
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                prop="height"
                label="Block"
                >
                  <template  slot-scope="scope">
                    <div>
                      <a href="javascript:;" @click="toBlock(scope.row.height)">{{scope.row.height}}</a>
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
                prop="reward"
                label="Reward">
                </el-table-column>
                <el-table-column
                prop="transactionCount"
                label="Txn">
                </el-table-column>
                <el-table-column
                prop="miner"
                label="Miner"
                width="320">
                  <template  slot-scope="scope">
                    <div>
                      <a @click="toAddress(scope.row.miner)" href="javascript:;">{{scope.row.miner}}</a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                prop="extraData"
                label="ExtraData"
                width="300">
                  <template  slot-scope="scope">
                    <div>
                      {{scope.row.extraData}}
                    </div>
                  </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="tr pages">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.index"
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="params.size"
                layout="  prev, pager, next,sizes"
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
      self.getBlockList()
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
        this.getBlockList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.index=val;
        this.getBlockList()
      },
      getBlockList(){
        this.loading=true;
        let self = this;
        self.$axios({
            url:self.$baseURL+"api/v1/Explorer/Blocks",
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
.blockPage{
    padding: 20px; 
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        background: #ffffff;
    }
    .title{
      font-size: 1.4rem
    }
    .pagina{
        margin-top: 10px;
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        // font-size: 0.7rem;
        margin-bottom: 10px;
        color: #999999;
    }
    .el-table thead tr,.el-table thead th{
        background-color: #f8f8f8!important;
    }
}
@media screen and (max-width: 640px) {
    .blockPage{
      padding: 10px 0px!important;
    }
}
</style>