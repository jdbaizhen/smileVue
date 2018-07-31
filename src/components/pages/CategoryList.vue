<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">导航</div>
                </van-col>    
                <van-col span="18">列表</van-col>            
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
export default {
    data() {
        return {

        }
    },
    created() {
        this.getCategory()
    },
    methods: {
        getCategory() {
            axios({
                url: url.getCategoryList,
                method: 'get'
            }).then( res => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>
