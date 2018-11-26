<template>
  <div id="app">
    <header>
      <musicsearch v-on:musicsearch="showsong" v-on:openmusicsong="showsong"></musicsearch>
      <ul>
        <!-- <li class="head-li" @click="move('/')">个性推荐</li>
        <li class="head-li" @click="move('/music')">歌单</li>
        <li class="head-li" @click="move('/station')">主播电台</li>
        <li class="head-li" @click="move('/rank')">排行榜</li> -->
        <router-link class="head-li" tag="li" @click.native="move('/home')" to="/home">个性推荐</router-link>
        <router-link class="head-li" tag="li" @click.native="move('/music')" to="/music">歌单</router-link>
        <router-link class="head-li" tag="li" @click.native="move('/station')" to="/station">主播电台</router-link>
        <router-link class="head-li" tag="li" @click.native="move('/rank')" to="/rank">排行榜</router-link>
      </ul>
      <div class="bar" :class="Classmove"></div>
    </header>
    <router-view ref="menu"></router-view>
    <!-- <musicsong ref="musicsong"></musicsong> -->
  </div>
</template>

<script>
import musicsearch from './components/musicsearch/musicsearch';
import musicsong from './components/Musicsong/Musicsong';
export default {
  data() {
    return {
      Classmove: 'classmove0',
      show: true
    };
  },
  methods: {
    showsong(item) {
      // console.log(11);
      this.$refs.menu.show(item);
      this.$refs.musicsong.show(item);

    },
    move(val){
      if (val === '/home') {
        this.Classmove = 'classmove0';
      } else if (val === '/music') {
        this.Classmove = 'classmove1';
      } else if (val === '/station') {
        this.Classmove = 'classmove2';
      } else {
        this.Classmove = 'classmove3';
      }
    }
  },
  components: {
    musicsearch,
    musicsong
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  header
    ul
      display: flex
      .head-li
        flex:1
        display: inline-block
        box-sizing: border-box
        width: 100px
        height:40px
        font-size: 14px
        text-align: center
        line-height: 40px
        background: #f8f8f9
        color: #333
        &.active
          color:#FF0200
      .head-li:nth-child(4)
        border-right:0
    .bar
      width: 25%
      height: 2px
      // background: #FF0200
      background-image: linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);
      transition: all 0.375s linear 
      &.classmove0
        transform: translate3d(0,0,0)
        background-image: linear-gradient(-20deg, #d558c8 0%, #24d292 100%);
      &.classmove1
        transform: translate3d(100%,0,0)
        background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);
      &.classmove2
        transform: translate3d(200%,0,0)
        background-image: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);
      &.classmove3
        transform: translate3d(300%,0,0)
        background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%);

</style>
