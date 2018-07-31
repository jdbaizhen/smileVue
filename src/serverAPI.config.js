const BASEURL = 'https://www.easy-mock.com/mock/5b3c8e2cd01ef9676380bc59/example/'
const LOCALURL = 'http://localhost:3333'
const URL = {
  getShoppingMallInfo: LOCALURL + '/goods/init',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + '/user/register',
  loginUser: LOCALURL + '/user/login',
  getDetailGoodsInfo: LOCALURL + '/goods/getDetailGoodsInfo',
  getCategoryList: LOCALURL+ '/goods/getCategoryLsit',
}

module.exports = URL
