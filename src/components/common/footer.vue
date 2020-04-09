<template>
    <div class="footer">
        <div class="foot1">
            <div class="item itemLeft color2">
                <img src="/static/img/logo1.png" alt=""> 
                <p> ©2020 WMM Insight.</p>
            </div>
            <div class="item itemRight color2" >
                <p>WMM 是一个使用区块链技术构建去中心化平台，以安全地存储和共享健康数据。 WMM 为了解决医疗健康产业的发展瓶颈，研发团队以数字健康产业为核心的基于 区块链的医美养护数据共享平台，充分利用了区块链的高可信度，低成本安全性， 分布式账本和去中心化的共识，采用了新的智能合约架构设计，整合先进的物联网技术，实现医疗行业服务体系的全面改革，重构医疗生态链，促进人类医疗服 务的转型。</p>
               
            </div>
        </div>
        <div class="foot2">
            ©2020 WMM Insight.
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scope>
.footer{
    background: rgb(51, 51, 51);
    font-size: 12px;
    .foot1{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        .title{
            color: #ffffff;
            font-size: 13px;
        }
    }
    .foot2{
        border-top: 1px solid #999999;
        padding: 10px 0px;
        text-align: center;
        color: #666666;
    }
    
    .color1{
        color: #ffffff;
    }
    .color2{
        color: #999999;
    }
    .itemLeft{
        // flex: 1;
        // display: flex;
        // flex-flow: row wrap;
        // justify-content: flex-start;
        // align-items: flex-start;
        img{
            width: 100px;
        }
    }
    .itemRight{
        flex: 1;
        padding-left: 80px;
        text-align: left;
        p{
            line-height: 2rem;
        }
    }

}  
@media screen and (max-width: 640px) {
    .item{
     width: 100%!important;
    }
    .foot1{
        justify-content: center!important;
        flex-direction: column!important;
    }
    .itemLeft{
        text-align: center;
        margin-bottom: 10px;
    }
    .itemRight{
        padding-left: 0px!important;
    }
}
</style>