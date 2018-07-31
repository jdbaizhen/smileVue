<template>
    <div class="login">
        <van-nav-bar
         title="登陆"
         left-text="返回"
         right-text="注册"
         left-arrow
         @click-right="goRegister"
         @click-left="goBack"
         class="login-header"
        />
        <div class="login-panel">
            <van-field
                v-model="username"
                input-align="center"
                placeholder="账户"
                :error-message="usernameErrMsg"
                class="login-input"
            />
            <van-field
                v-model="password"
                type="password"
                input-align="center"
                placeholder="密码"
                :error-message="passwordErrMsg"
                class="login-input"
            />
            <div class="login-button">
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">登陆</van-button>
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
            openLoading: false,
            usernameErrMsg: '',
            passwordErrMsg: ''
        }
    },
    created () {
        if(localStorage.userInfo){
            Toast.success('您已经登陆')
            this.$router.push('/')
        }
    },
    methods: {
        goBack () {
            this.$router.go(-1)
        },
        goRegister () {
            this.$router.push('/register')
        },
        axiosLoginUser () {
            this.openLoading = true
            axios ({
                url: url.loginUser,
                method: 'post',
                data: {
                    username: this.username,
                    password: this.password
                }
            })
            .then(response => {
                if (response.data.code === 200) {
                    new Promise( (resolve, reject) => {
                        localStorage.setItem('userInfo', this.username)
                        setTimeout( () => {
                            resolve()
                        },500)
                    })
                    .then( () => {
                        Toast.success('登陆成功')
                        this.$router.push('/')
                    })
                    .catch( (error) => {
                        Toast.error('登陆状态保存失败')
                        console.log(error)
                    })
                } else {
                    response.data.message
                    Toast.fail(response.data.message)
                    this.openLoading = false
                }
            })
            .catch((error) => {
                console.log(error)
                Toast.fail('系统异常')
                this.openLoading = false
            })
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
            this.checkForm() && this.axiosLoginUser()
        }
    }
}
</script>
<style scoped>
.login{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url('../../assets/image/register.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.login-header{
    color: #fff;
    background: none;
}
.login-panel{
    position: absolute;
    top: 50%;
    left: 2%;
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px
}
.login-input{
    background: none;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    margin-bottom: 12px;
    padding: 0 15px;
}
.login-input input{
    color: #fff;
}
.login-button{
    padding-top: 10px;
}
input::-webkit-input-placeholder{
            color: rgb(0, 183, 255) !important;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:rgb(0, 183, 255) !important;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:rgb(0, 183, 255) !important;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:rgb(0, 183, 255) !important;
        }
</style>
