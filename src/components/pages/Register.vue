<template>
    <div>
        <van-nav-bar
         title="用户注册"
         left-text="返回"
         left-arrow
         @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username=''"
                :error-message="usernameErrMsg"
            />
            <van-field
                v-model="password"
                label="密码"
                type="password"
                placeholder="请输入密码"
                required
                :error-message="passwordErrMsg"
            />
             <van-field
                v-model="confirmPassword"
                label="确认密码"
                type="password"
                placeholder="请输入密码"
                required
                :error-message="passwordErrMsg"
            />
            <div class="register-button">
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import {Toast} from 'vant'
export default {
    data () {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            openLoading: false,
            usernameErrMsg: '',
            passwordErrMsg: ''
        }
    },
    methods: {
        goBack () {
            this.$router.go(-1)
        },
        axiosRegisterUser () {
            this.openLoading = true
            if ( this.password == this.confirmPassword ) {
                axios ({
                    url: url.registerUser,
                    method: 'post',
                    data: {
                        username: this.username,
                        password: this.password
                    }
                })
                .then(response => {
                    if (response.data.code === 200) {
                        Toast.success('注册成功')
                        this.$router.push('/login')
                    } else {
                        Toast.fail(response.data.message)
                        this.openLoading = false
                    }
                })
                .catch((error) => {
                    console.log(error)
                    Toast.fail('注册失败')
                    this.openLoading = false
                })
            } else {
                Toast.fail('两次密码输入不一致')
                this.openLoading = false
            }
            
        },
        checkForm () {
            let isOk = true
            if (this.username.length < 2) {
                this.usernameErrMsg = '用户名长度不能小于2'
                isOk= false
            } else {
                this.usernameErrMsg = ''
            }
            if (this.password.length < 6) {
                this.passwordErrMsg = '密码长度必须大于6位'
                isOk = false
            } else {
                this.passwordErrMsg = ''
            }
            return isOk
        },
        registerAction () {
            this.checkForm() && this.axiosRegisterUser()
        }
    }
}
</script>
<style scoped>
.register-panel{
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px
}
.register-button{
    padding-top: 10px;
}
</style>
