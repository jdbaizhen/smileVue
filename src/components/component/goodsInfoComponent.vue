<template>
    <div class="goods-info" @click="goGoodsPage()">
        <div class="goods-image">
            <img v-lazy="goodsImage" alt="goodsimage"/>
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice}}</div>
    </div>      
</template>
<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  props: ["goodsImage", "goodsName", "goodsPrice", "goodsId"],
  filters: {
    moneyFilter(money) {
      toMoney(money);
    }
  },
  methods: {
      goGoodsPage () {
          this.$router.push({name: 'Goods', query:{goodsId: this.goodsId}})
      }
  }
};
</script>
<style scoped>
.goods-image img{
    width: 90%;
}
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
