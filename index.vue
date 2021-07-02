<template>
	<view class="content">
		<Nav title="评分" background="white"></Nav>
	</view>
</template>

<script>
	import Nav from '../../components/top.vue'
	export default {
		data() {
			return {
				height:0
			};
		},
		onLoad() {

		},
		components:{
			Nav
		},
		mounted() {
			this.height = (this.nav.top - this.statusBarHeight) * 2 + this.nav.height + this.statusBarHeight;
		},
	};
</script>

<style scoped lang="scss">
	.content {
	}
</style>
