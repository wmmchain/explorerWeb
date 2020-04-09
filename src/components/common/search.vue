<template>
    <div class="search-part">
        <el-input placeholder="Search by Address / Txhash / BlockNum" v-model="input2">
            <template style="background: #C64844;" slot="append"><span class="searchBtn" @click="toSeach">搜索</span> </template>
        </el-input>
    </div>
</template>
<script>
export default {
    data(){
        return{
            input2:""
        }
    },
    methods:{
        toSeach(){
            if(this.$utill.isTransaction(this.input2)){
                this.$router.push({
                    path: `/transactions/${this.input2}`,
                })
            }else if(this.$utill.isAddress(this.input2)){
                 this.$router.push({
                    path: `/address/${this.input2}`,
                })
            }else if(!isNaN(this.input2)){
                this.$router.push({
                    path: `/block/${this.input2}`,
                })
            }else{

            }
        }
    }
}
</script>
<style lang="less" scope>

.search-part{
    .searchBtn{
        background: #C64844;
        color: #ffffff;
        display: inline-block;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .el-input-group__append{
        background: #C64844;
    }
    .el-input-group--append .el-input__inner{
        // background: rgb(233, 233, 233)
    }
}
    
</style>