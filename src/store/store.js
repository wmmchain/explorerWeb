/**
 * Created by hai on 18/9/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
// import * as types from './types'

Vue.use(Vuex);
const state = {
    uid: window.localStorage.getItem('uid'),
    user: window.localStorage.getItem('user'),
    token: window.localStorage.getItem('token'),
    account:window.localStorage.getItem('account'),
}
const mutations = {
    
    //将token保存到localStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
      state.token = data
      window.localStorage.setItem('token', data) 
    },
    //获取用户名
    GET_USER: (state, data) => {
      // 把用户名存起来
      state.user = data
      window.localStorage.setItem('user', data)
    },
    //获取手机号
    GET_ACCOUNT: (state, data) => {
      // 把用户名存起来
      state.account = data
      window.localStorage.setItem('account', data)
    },
    //获取用户id
    GET_UID: (state, data) => {
      // 把用户名存起来
      state.uid = data
      window.localStorage.setItem('uid', data)
    },
    //登出
    LOGOUT: (state) => {
      // 登出的时候要清除token
      state.token = null
      state.account = null
      state.uid = null
      state.user = null
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('account')
      window.localStorage.removeItem('uid')
      window.localStorage.removeItem('user')
    },
   
}
  
const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})