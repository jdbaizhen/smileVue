<template>
<div>
<div class="search-bar">
    <van-row>
      <van-col span="3">
        <img :src="locationIcon" class="location-icon" alt="location"/>
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input"/>
      </van-col>
      <van-col span="5">
        <van-button size="mini" class="search-btn">查找</van-button>
      </van-col>
    </van-row>
  </div>
  <div class="swiper-area">
    <van-swipe :autoplay="5000">
      <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index"  v-lazy="banner.imgUrl">
        <img :src="banner.image" alt="swiperPic">
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="type-bar">
    <div v-for="(cate, index) in category" :key="index">
      <img v-lazy="cate.image" alt="caidan"/>
      <span>{{cate.mallCategoryName}}</span>
    </div>
  </div>
  <div class="ad-banner">
    <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" alt="adbanner">
  </div>
  <div class="recommend-area">
    <div class="recommend-title">
      商品推荐
    </div>
    <div class="recommend-body">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
          <div class="recommend-item">
            <img :src="item.image" alt="recommendimage">
            <div>{{item.goodName}}</div>
            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
  <floor-component :floorData="floor1" :floorName="floorName.floor1"></floor-component>
  <floor-component :floorData="floor2" :floorName="floorName.floor2"></floor-component>
  <floor-component :floorData="floor3" :floorName="floorName.floor3"></floor-component>
  <!--Hot area-->
  <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
      <van-list>
        <van-row gutter="20">
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
            <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goods-info>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import floorComponent from "../component/floorComponent.vue";
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serverAPI.config.js'
import { toMoney } from "@/filter/moneyFilter.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      locationIcon: require("../../assets/image/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: "auto",
        freeMode: "true",
        mousewheel: "true",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response)
        if (response.data.code == 200) {
          console.log(response.data.message)
          this.bannerPicArray = response.data.message.data.slides;
          this.category = response.data.message.data.category;
          this.adBanner = response.data.message.data.advertesPicture;
          this.recommendGoods = response.data.message.data.recommend;
          this.floor1 = response.data.message.data.floor1;
          this.floor2 = response.data.message.data.floor2;
          this.floor3 = response.data.message.data.floor3;
          this.floorName = response.data.message.data.floorName;
          this.hotGoods = response.data.message.data.hotGoods;
        }
      })
      .catch(error => {
        console.log("error");
      });
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.location-icon {
  width: 70%;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.search-input {
  width: 95%;
  height: 1.3rem;
  padding-left: 0.3rem;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid #ccc;
  border-left: 0px;
  background-color: #e5017d;
  color: #fff;
}
.search-btn {
  margin-left: 0.3rem;
}
.swiper-area {
  width: 20rem;
  overflow: hidden;
  clear: both;
}
.swiper-area img {
  width: 100%;
}
.type-bar {
  background: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  width: 20%;
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.type-bar div img {
  width: 90%;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.recommend-item img {
  width: 80%;
}
.hot-area{
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-title{
    height: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
    color: goldenrod;
    font-size: 20px;
}
</style>
