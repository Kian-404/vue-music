// const _baseUrl = 'http://localhost:3000';
// ?limit=10&order=hot
const _baseUrl2 = 'https://api.imjad.cn/cloudmusic/';
const _baseUrl = 'http://118.89.227.245:3000';
export default {
  //获取推荐歌单
  getPlayListByWhere ( order, limit) {
    return _baseUrl +'/top/playlist'+ '?type=topPlayList' + '&order=' + order + '&limit=' + limit;
  },
  //获取banner
  getBanner(){
    return _baseUrl + '/banner';
  },
  //获取歌曲Url
  getUrl(id){
    return _baseUrl+'/music/url?id='+id;
  },
  //获取歌词
  getLrc (id) {
    return _baseUrl2 + '?type=lyric&id=' + id;
  },
  //获取歌曲
  getSong (id) {
    return _baseUrl+'/music/url?id='+id;
  },
  //获取歌单中的歌曲信息
  getPlayListDetail (id) {
    return _baseUrl + '/playlist/detail?id=' + id;
  },
  //获取mv
  getMv (id) {
    return _baseUrl + '?type=mv&id=' + id;
  },
  //搜索
  search (words) {
    return _baseUrl + '/search?keywords= ' + words;
  },

  //Rank
  //获取歌手
  getSinger(){
    return _baseUrl + '/toplist/artist';
  },
  //获取歌手单曲
  getSongs(id){
    return _baseUrl +'/artists?id=' + id;
  }
};