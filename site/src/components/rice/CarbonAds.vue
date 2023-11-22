<template>
  <div id="carbon-ads" :class="isMobile ? 'carbon-mobile' : ''" />
</template>
<script>
const carbonUrls = {
  'www.antdv.com': '//cdn.carbonads.com/carbon.js?serve=CK7DL2JW&placement=antdvcom',
  // 'tangjinzhou.gitee.io':
  //   '//cdn.carbonads.com/carbon.js?serve=CK7DL2JN&placement=tangjinzhougiteeio',
  // 'ant-design-vue.gitee.io':
  //   '//cdn.carbonads.com/carbon.js?serve=CK7DL2JN&placement=antdesignvuegiteeio',
  'vue.ant.design': '//cdn.carbonads.com/carbon.js?serve=CK7DL2JW&placement=vueantdesign',
};
const carbonUrl =
  carbonUrls[location.host] ||
  '//cdn.carbonads.com/carbon.js?serve=CK7DL2JW&placement=vueantdesign';
export default {
  props: {
    isMobile: Boolean,
  },
  watch: {
    $route(e, t) {
      let adId = '#carbonads';
      // if(isGitee) {
      //   adId = '#cf';
      // }
      if (e.path !== t.path && this.$el.querySelector(adId)) {
        this.$el.innerHTML = '';
        this.load();
      }
      this.adInterval && clearInterval(this.adInterval);
      this.adInterval = setInterval(() => {
        if (!this.$el.querySelector(adId)) {
          this.$el.innerHTML = '';
          this.load();
        }
      }, 20000);
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      // if(isGitee) {
      //   axios.get('https://api.codefund.app/properties/162/funder.html?template=horizontal')
      //   .then(function (response) {
      //     document.getElementById("codefund-ads").innerHTML = response.data;
      //   });
      // } else
      if (carbonUrl) {
        const e = document.createElement('script');
        e.id = '_carbonads_js';
        e.src = carbonUrl;
        this.$el.appendChild(e);
      }
    },
  },
};
</script>

<style scoped></style>
