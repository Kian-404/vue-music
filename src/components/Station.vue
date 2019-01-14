<template>
<div class="station">
  <div class="mvlist-wrapper" ref="mvlistWrapper">
    <ul>
      <li v-for="(item, index) in mvlist" :key="index" class="mvitem" @click="getmvUrl(item)">  
        <div class="left">
          <img v-lazy="item.cover" class="cover"  :alt="item.name">
        </div>
        <div class="right">
          <p class="mvname">{{item.name}}</p>
          <p class="avatorname">{{item.artistName}}</p>
          <p class="countnum">播放次数:{{item.playCount}}次</p>
        </div>
      </li>
    </ul>
  </div>
  <transition name="bounce">
  <div class="mvvideo" v-if="mvUrl !== '' && mvFlag">
    <video :src="mvUrl" class="video" controls="controls"></video>
  </div>
  </transition>
  <transition name="bounce">
  <div class="mark" v-if="mvFlag" @click="hiddenmv()"></div>
  </transition>

</div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import api from '../api';
import BScroll from 'better-scroll';
export default{
  data(){
    return {
      mvlist:[],
      mvUrl:'',
      mvFlag: false
    }
  },
  created(){
    this._initMVlist();
  },
  methods:{
    hiddenmv(){
      this.mvFlag = false;
    },
    getmvUrl(item){
      console.log(item);
      this.mvFlag = true;
      axios.get(api.getMvUrl(item.id)).then((res) => {
        if(res.data.data.brs[720]){
          this.mvUrl = res.data.data.brs[720];
        }else if(res.data.data.brs[480]){
          this.mvUrl = res.data.data.brs[480];
        }else if(res.data.data.brs[240]){
          this.mvUrl = res.data.data.brs[240];
        }
        
        // console.log(res.data.data.brs[720]);
      })
    },
    _initMVlist(){
      console.log(api.getMvhot(10));
      axios.get(api.getMvhot(10)).then((res)=>{
	      //console.log(res.data);
	      this.mvlist = res.data.data;
	      console.log(this.mvlist);
	      this.$nextTick(()=>{
	       this._initScroll();
	      })
    	})
    },
    _initScroll(){
      console.log('emit');
			if (!this.mvScroll) {
          this.mvScroll = new BScroll(this.$refs.mvlistWrapper, {
            click: true,
            pullUpLoad: {
              threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
            }
          });
        } else {
          this.mvScroll.refresh();
        }
      let pagenum = 10;
      this.mvScroll.on('pullingUp', () => {
        console.log('uping');
        pagenum = pagenum+10;
        axios.get(api.getMvhot(pagenum)).then((res)=>{
          //console.log(res.data);
          this.mvlist  = [];
          // thid.mvlist = res.data.data;
          res.data.data.map((item, index) => {
            this.mvlist.push(item);
          })
          
          // console.log(this.mvlist);
          
          // this.mvScroll.refresh();
        })
        this.mvScroll.finishPullUp();
        // this._initScroll();

      })
    }
  }
};
</script>
 
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .station{
    overflow hidden
    .mvlist-wrapper{
      width: 100%
      position: absolute
      top:87px
      bottom:0
      overflow:hidden
      .mvitem{
        height: 100px
        width: 100%
        margin 10px 10px 5px 5px
        .left{
          width:30%
          height:100%
          display inline-block
          img{
            width: 100%
            height: 100%
          }
        }
        .right{
          width: 70%
          height: 100%
          display inline-block
          float right
          box-sizing border-box
          padding 10px 10px 10px 10px
          .mvname{
            margin-bottom 10px
            font-weight bold
            font-size 18px
          }
          .avatorname{
            margin-bottom 10px
            color #ffcccc
            font-size 14px
          }
        }
      }
    }
    .mvvideo{
      z-index 10
      position absolute
      width 100%
      height:40%
      top 87px
      background-color #000
      .video{
        width 100%
        height 100%
        z-index 10
      }
    }
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
    .mark{
        position absolute
        margin-top 87px
        width 100%
        height 100%
        background-color #000
        z-index 2
        top 0px
        left 0px
        right 0px
        opacity 0.7
      }
  }
</style>
