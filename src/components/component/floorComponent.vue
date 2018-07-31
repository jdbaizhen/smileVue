<template>
<!--floor one area-->
  <div class="floor">
    <div class="floor-title">{{floorName}}</div>
    <div class="floor-anomaly">
      <div class="floor-one">
        <img :src="floorData0.image" alt="floor1">
      </div>
      <div>
        <div class="floor-two">
            <img :src="floorData1.image" alt="floor2">
        </div>
        <div class="floor-three">
            <img :src="floorData2.image" alt="floor3">
        </div>
      </div>
      <div class="floor-rule">
          <div v-for="(item,index) in floorData.slice(3)" :key="index">
              <img :src="item.image" alt="floorrule">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ['floorData','floorName'],
    data () {
        return {
            floorData0: {},
            floorData1: {},
            floorData2: {}
        }
    },
    created () {

    },
    watch: {
        floorData: function (val) {
            this.floorData0 = this.floorData[0]
            this.floorData1 = this.floorData[1]
            this.floorData2 = this.floorData[2]
        }
    }
}
</script>
<style scoped>
.floor-title{
    height: 1.8rem;
    text-align: center;
    line-height: 1.8rem;
    color: goldenrod;
    font-size: 20px;
}
.floor-anomaly{
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-anomaly div{
  width: 10rem;
  box-sizing: border-box;
}
.floor-anomaly div img{
  width: 100%;
}
.floor-one{
  border-right: 1px solid #ddd;
}
.floor-two{
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
}
.floor-rule div{
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
}
</style>
