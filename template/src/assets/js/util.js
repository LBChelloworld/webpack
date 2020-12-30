export default{
  // 判断安卓还是IOS
  isAndroid_ios: function(){
    const u = navigator.userAgent
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 == true ? true : false;
  },

  // 判断是在app内还是在浏览器中
  appOrBrowser: function() {
    //获取 UA信息 判断是否含有和app端约定好的标识
    return navigator.userAgent.toLowerCase().indexOf("cjkt") != -1 ? true : false;
  },

  // 判断是否分享
  ifShare: function(bool) {
    // 调用安卓的方法给安卓发送数据 传给安卓的数据能是对象和null，不然安卓拿不到数据
    // 调用ios的方法给ios发送数据，如果不需要传数据，那就传null，千万不能不传，不然ios收不到值
    this.isAndroid_ios() ? window.android.ifShare(bool) : window.webkit.messageHandlers.ifShare.postMessage(bool);
  }
}
