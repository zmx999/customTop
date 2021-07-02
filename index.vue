<template>
	<view class="content">
		<Nav title="评分" background="white"></Nav>
		<!-- <view class="topbar" :style="{paddingTop:height+'px'}">评分</view> -->
		<view class="header" :style="{marginTop:height+'px'}">
			<image class="topimg" src="../../static/img/bb.png" mode=""></image>
			<view class="topinfo">
				<image class="photo" :src="avatar==''?'../../static/img/mr.png':avatar" mode=""></image>
				<view class="topinfoRight">
					<view class="topxinxi">
						<view class="topname">{{username}}</view>
						<view class="grade" @click="torule">
							<image src="../../static/img/pingfenguize.png" mode=""></image>
							<text>评分规则</text>
							<image src="../../static/img/youjiantou.png" mode=""></image>
						</view>
					</view>
					<view class="topbranch">{{branchname}}</view>
				</view>
			</view>
		</view>
		<view class="dateName">
			<picker mode="multiSelector" :range="range" :value="[0]" @change="onChange">
				<view>{{ site }}</view>
			</picker>
			<image src="../../static/img/heijiantou.png" mode=""></image>
		</view>
		<view v-if="gradeData==[]" class="nodata">
			<image src="../../static/img/xueshengye.png" mode=""></image>
			<view class="notit">暂无数据，每月15-20号可以提交 评分考核哦！</view>
		</view>
		<image class="gradeIcon" v-if="issh"  src="../../static/img/pingfen.png" @click="tograde()" mode=""></image>
		<view class="havedata">
			<scroll-view scroll-y="true" :style="{ height: top - 400 + 'upx' }">
				<view class="dataTit" v-for="(item,index) in gradeData" @click="toScoring(item)" :key='index'>
					<text>{{item.year}}-{{item.month}}</text>
					<view class="dataTitRight" v-if="item.auditStatus == 4">
						<image src="../../static/img/jifen_03.png" mode=""></image>
						<text>{{item.evaluationScore}}分</text>
					</view>
					<view class="dataTitRight" v-if="item.auditStatus == 0" style="color: #499DF8;">
						<text>待审核</text>
					</view>
					<view class="dataTitRight" v-if="item.auditStatus == 1" style="color: #E31313;">
						<text>审核未通过</text>
					</view>
					<view class="dataTitRight" v-if="item.auditStatus == 2" style="color: #FF8D1A;">
						<text>审核通过/待终审</text>
					</view>
					<view class="dataTitRight" v-if="item.auditStatus == 3" style="color: #E31313;">
						<text>终审未通过</text>
					</view>
				</view>
				<view class="over">
					---已经到底了！---		
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import request from '../../service/service.js';
	import Nav from '../../components/top.vue'
	export default {
		data() {
			return {
				top: this.windowHeight,
				range: [[],[]],
				site: '',
				gradeData: [],
				year:'',
				issh:false,
				avatar:'',
				branchname:'',
				username:'',
				height:0
			};
		},
		onLoad() {

		},
		components:{
			Nav
		},
		mounted() {
			this.getTime();
			this.isSubmit();
			this.height = (this.nav.top - this.statusBarHeight) * 2 + this.nav.height + this.statusBarHeight;
			let data = JSON.parse(uni.getStorageSync('info'));
			this.avatar = data.avatar;
			this.username = data.nickName;
			this.branchname = data.branchName
		},
		methods: {
			tograde(){
				uni.navigateTo({
					url:'../../pagesA/grade'
				})
			},
			//初始化获取数据
			getGradeList(){
				let data = {
					year:this.year
				}
				request.getGradeList(data).then(res=>{
					console.log(res)
					if(res.code == 200){
						this.gradeData = res.data
					}
				})
			},
			//是否可以评分
			isSubmit(){
				request.isSubmit().then(res=>{
					if(res.code == 200){
						this.issh = res.data
					}
				})
			},
			//前往评分详情
			toScoring(item){
				uni.navigateTo({
					url:'../../pagesA/scoring?id='+item.id
				})
			},
			onChange(e) {				
				let arr = e.detail.value;
				this.site = this.range[0][arr[0]]
				this.year = this.range[0][arr[0]].substr(0,4)
				this.getGradeList()
			},
			//前往规则页面
			torule(){
				uni.navigateTo({
					url:'../../pagesA/rule'
				})
			},
			// 初始化picker数据
			getTime() {
				const date = new Date()
				const years = []
				const year = date.getFullYear()
				this.site = year + '年'
				this.year = year;
				for (let i = 2020; i <= date.getFullYear(); i++) {
					years.push(i + '年')
				}
				this.range = [years];
				this.getGradeList()
			},
			//跳转到评分规则
			goRule(){
				uni.navigateTo({
					url:'../../pagesA/index'
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.content {
		.topbar{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 45px;
			line-height: 45px;
			text-align: center;
			font-size: 36upx;
			font-family: PingFang SC;
			font-weight: bold;
			background: #fff;
			z-index: 9999;
			color: #222222;
		}
		.header {
			margin-top: 130upx;
			position: relative;
			.topimg{
				width: 100%;
				height: 329upx;
			}
			.topinfo{
				display: flex;
				width: 100%;
				align-items: center;
				position: absolute;
				top: 74upx;
				left: 0;
				.photo{
					width: 108upx;
					height: 108upx;
					border-radius: 50%;
					margin:0 40upx;
				}
				.topinfoRight{
					width: 75%;
					.topxinxi{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.topname{
							font-size: 42upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
						}
						.grade{
							display: flex;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FFFFFF;
							width: 192upx;
							height: 48upx;
							background: rgba(0,0,0,.15);
							justify-content: space-around;
							align-items: center;
							border-top-left-radius: 24upx;
							border-bottom-left-radius: 24upx;
							image{
								width: 20upx;
								height: 24upx;
							}
						}
					}
					.topbranch{
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						margin-top: 29upx;
					}
				}
			}
		}
		.nodata{
			image{
				width: 100%;
				padding: 157upx 0 0;
			}
			.notit{
				width: 55%;
				text-align: center;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #CCCCD6;
				margin: auto;
			}
		}
		.gradeIcon{
			width: 120upx;
			height: 120upx;
			position: fixed;
			bottom: 10vh;
			right: 30upx;
			z-index: 999;
		}
		.dateName{
			padding:27upx 39upx;
			display: flex;
			align-items: center;
			image{
				width: 36upx;
				height: 24upx;
			}
		}
		.havedata{
			padding: 39upx 39upx 0;
			.dataTit{
				display: flex;
				justify-content: space-between;
				padding: 39upx 0;
				border-top: 1px solid #EAEAEA;
				.dataTitRight{
					display: flex;
					image{
						width: 37upx;
						height: 40upx;
					}
				}
			}
			.over{
				text-align: center;
				border-top: 1px dotted #333;
				padding: 30upx 0;
			}
		}
	}
</style>
