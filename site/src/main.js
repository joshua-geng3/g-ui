/* eslint-disable no-console */
import '../../components/style';
import 'docsearch.js/dist/cdn/docsearch.css';
import './index.less';
import 'nprogress/nprogress.css';
import { createApp, Transition, TransitionGroup, version as vueVersion } from 'vue';
import i18n from './i18n';
import NProgress from 'nprogress';
import router from './router';
import Antd from 'ant-design-vue';
import demoBox from './components/DemoBox.vue';
import demoSort from './components/demoSort.jsx';
import clipboard from './directives/clipboard';
import App from './App.vue';
console.log('vue version: ', vueVersion);
console.log('ant design vue version: ', Antd.version);
const app = createApp(App);

app.use(Antd);
app.use(clipboard);
app.component('DemoBox', demoBox);
app.component('DemoSort', demoSort);

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    NProgress.done();
    document.documentElement.scrollTop = 0;
  }
});

app.use(router);
app.use(i18n);

app.config.globalProperties.$i18n = i18n;

app.mount('#app');
