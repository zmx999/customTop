import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import uView from "uview-ui";
Vue.use(uView);
App.mpType = 'app'
// Vue.prototype.imgUrl = 'http://192.168.1.3:10044/base/feign/file/oss/imgOssupload'
Vue.prototype.upUrl = 'http://172.22.1.33:16000/common/upload'

const app = new Vue({
    ...App
})
//获取设备信息
	    uni.getSystemInfo().then(res => {
	      console.log(res[1].windowWidth)
	      Vue.prototype.statusBarHeight = res[1].statusBarHeight
	      Vue.prototype.safeNav = res[1].statusBarHeight + 44
	      Vue.prototype.screenWidth = res[1].screenWidth
	      Vue.prototype.screenHeight = res[1].screenHeight
	      Vue.prototype.windowWidth = res[1].windowWidth
	     Vue.prototype.windowHeight = res[1].windowHeight
	      if(res[1].model.search("iPhone X") !=-1){
	        Vue.prototype.tabBarHeight = 84
	        Vue.prototype.tabBarSafe = 34
	      }else{
	        Vue.prototype.tabBarHeight = 50
	      }
	    })
		  Vue.prototype.nav = uni.getMenuButtonBoundingClientRect()
app.$mount()
