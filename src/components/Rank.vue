<template>
<div class="rank">
	<div class="rank-wrapper" ref="rankWrapper">
		<ul>
			<li class="item" v-for="(item, index) in SingerList" @click="singerInfo(item.id)" :key="index">
				<div class="left">
					<img v-lazy="item.picUrl" width="80" height="80" alt="">
				</div>
				<div class="right">
					{{item.name}}
				</div>
			</li>
		</ul>
	</div>
	<Singermenu ref="singermenu" v-on:openmusicsong="show"></Singermenu>
	<Musicsong ref="musicsong"></Musicsong>
</div>
</template>

<script>
import axios from 'axios';
import api from '../api';
import BScroll from 'better-scroll';
import Musicmenu from './Musicmenu/Musicmenu.vue';
import Musicsong from './Musicsong/Musicsong.vue';
import Singermenu from './Singermenu/Singermenu.vue';
export default{
	data(){
		return{
			SingerList:[],
			Singer:null,
			SingermenuFlag:false
		}
	},
	created(){
    this.initData();
	},
	methods:{
		initData(){
			axios.get(api.getSinger()).then((res)=>{
	      //console.log(res.data);
	      this.SingerList = res.data.list.artists;
	      console.log(this.SingerList);
	      this.$nextTick(()=>{
	      	this._initScroll();
	      })
    	})
		},
		_initScroll(){
			if (!this.rankScroll) {
          this.rankScroll = new BScroll(this.$refs.rankWrapper, {
            click: true
          });
        } else {
          this.rankScroll.refresh();
        }
		},
		singerInfo(index){
			console.log(index);
			axios.get(api.getSongs(index)).then((data) =>{
				console.log(data);
				this.Singer = data.data;
			}).then(() => {
				this.$refs.singermenu.show();
				this.$refs.singermenu.setmusiclist(this.Singer);
			})
			
			// this.SingermenuFlag = true;
		},
		show(item) {
        this.$refs.musicsong.show(item);
    }
	},
	components:{
		Musicmenu,
		Musicsong,
		Singermenu
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .rank-wrapper{
  	width: 100%
    position: absolute
    top:87px
    bottom:0
  	overflow:hidden
  	.item{
			display: flex
			.left{
				flex: 0 0 120px
				margin:10px
			}
			.right{
				flex:1
			}
  	}
  }
</style>
