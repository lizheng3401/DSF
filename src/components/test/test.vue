<template>
    <div class="accept-container">
      <ul>
          <li v-for="(item,i) in webAddress" :key="i">
            <a :href="item.link" target="showHere" @click="showIframe">{{item.name}}</a>
          </li>
          <a href="https://www.baidu.com" @click.native="test">click</a>
          <button @test="shout"></button>
      </ul>
      <iframe v-show="iframeState" id="show-iframe"  
              width="600px" height="400px"
              frameborder=0 name="showHere" 
              scrolling=no src=""></iframe>
    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      iframeState:false,
      goBackState:false,
      webAddress: [
        {
            name:'segmentFault',
            link:'https://segmentfault.com/a/1190000004502619'
        },
        {
          name:'博客',
          link:'http://vuex.vuejs.org/'
        },
        {
          name:'特效',
          link:'http://www.yyyweb.com/377.html'
        },
        {
          name: '验证码',
          link: 'http://localhost:9527/static/captcha.html'
        }
      ]
    }
  },
  methods:{
    goBack(){
      this.goBackState = false;
      this.iframeState = false;
    },
    showIframe(){
      this.goBackState = true;
      this.iframeState = true;
    },
    test(){
      console.log("OK");
      this.$emit('test');
    },
    shout(){
      console.log('我触发了它');
    }
  }
}
</script>
<style scoped>

</style>