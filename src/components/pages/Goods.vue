<template>
    <div class='navbar-div'>
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        ></van-nav-bar>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" alt=""/>
        </div>
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
        <div>
            <van-tabs>
                <van-tab title="商品详情" swipeable sticky>
                    <div class="detail" v-html="goodsInfo.DETAIL">

                    </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中...
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary">加入购物车</van-button>
            </div>
             <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { toMoney } from '@/filter/moneyFilter.js'
import {Toast} from 'vant'
export default {
    data () {
        return {
            goodsId: undefined,
            goodsInfo: {}
        }
    },
    created () {
        this.goodsId = this.$route.query.goodsId
        this.getInfo()
    },
    filters: {
        moneyFilter (money) {
            return toMoney(money)
        }
    },
    methods: {
        getInfo () {
            axios({
                url: url.getDetailGoodsInfo,
                method: 'post',
                data: {goodsId: this.goodsId}
            })
            .then( response => {
                console.log(response.data.message)
                if(response.data.code == 200 && response.data.message){
                    this.goodsInfo = response.data.message
                }else{
                    Toast('服务器错误，数据获取失败')
                }
            })
            .catch( error => {
                console.log(error)
            })
        },
        onClickLeft () {
            this.$router.go(-1)
        }
    }     

}
</script>
<style scoped>
.topimage-div img{
    width: 100%
}
.detail{
    font-size: 0px;
}
.goods-name{
    background: #fff;
    text-align: center;
}
.goods-price{
    background-color: #fff;
    text-align: center;
    margin-bottom: 10px;
}
.goods-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom div{
    flex: 1;
}
</style>
