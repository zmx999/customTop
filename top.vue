<template>
	<view class="navbar" :style="{background:background,height:navbarHeight+'px'}">
	 <!-- <view style="height:{{capsuleHeight}}px;top:{{capsuleTop}}px;" class="arrow-content">
	    <view class="arrow" wx:if="{{isSowArrow}}" bindtap="handleGoToBack"></view>
	  </view> -->
	  <view class="text" :style="{height:capsuleHeight+'px',top:capsuleTop+'px'}">{{title}}</view>
	  <!-- <view class="text" :style="{height:capsuleHeight+'px',top:capsuleTop+'px'}">评分</view> -->
	</view>
</template>

<script>
	export default{
		 props: {
		  title:{
		    type: String,
		    value: '相信A任务'
		  },
		  background:{
		    type: String,
		    value: 'linear-gradient(to right,#FF3413,#FF924D)'
		  }
		},
		data(){
			return{
				capsuleTop: '', //胶囊距离屏幕顶部的距离
				capsuleHeight: '', //胶囊高度
				navbarHeight: '' //导航栏高度
			}
		},
		mounted() {
			this.capsuleTop = this.nav.top;
			this.capsuleHeight = this.nav.height;
			this.navbarHeight = (this.nav.top - this.statusBarHeight) * 2 + this.nav.height + this.statusBarHeight;
		}
	}
</script>

<style scoped>
	.navbar{
	  width: 100%;
	  //设置导航栏固定在顶部
	  position: fixed;
	  top: 0;
	  z-index: 99;
	}
	.arrow-content{
	  position: absolute;
	  left: 40rpx;
	  z-index: 999;
	  display: flex;
	  align-items: center;
	}
	.arrow{
	  width: 20rpx;
	  height: 20rpx;
	  border: 5rpx solid #FFFFFF;
	  border-right-color:transparent;
	  border-bottom-color:transparent;
	  transform: rotate(-45deg);
	}
	.text{
	  position: absolute;
	  left: 0;
	  right: 0;
	  font-size: 28rpx;
	  color: #000;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
</style>
