<template>
  <a-menu
    id="nav"
    class="menu-site"
    :mode="menuMode"
    :selected-keys="[activeMenuItem]"
    disabled-overflow
  >
    <a-menu-item key="docs/vue">
      <router-link :to="getLocalizedPathname('/docs/vue/introduce', isZhCN)">
        {{ $t('app.header.menu.documentation') }}
      </router-link>
    </a-menu-item>
    <a-menu-item key="components">
      <router-link :to="getLocalizedPathname('/components/overflow/', isZhCN)">
        {{ $t('app.header.menu.components') }}
      </router-link>
    </a-menu-item>
    <a-sub-menu v-if="isZhCN" key="advanced">
      <template #title>
        <span style="position: relative">
          高级组件
          <a-badge color="red" style="position: absolute; top: -35px; right: -15px" />
        </span>
      </template>
      <a-menu-item key="surely-table">
        <a
          href="https://www.surely.cool"
          target="_blank"
          ref="noopener noreferrer"
          style="position: relative"
        >
          Surely Table
        </a>
      </a-menu-item>
      <a-menu-item key="surely-form">
        <a
          href="https://form.antdv.com"
          target="_blank"
          ref="noopener noreferrer"
          style="position: relative"
        >
          Surely Form
          <a-badge color="red" style="position: absolute; top: -18px; right: -15px" />
        </a>
      </a-menu-item>
    </a-sub-menu>
    <a-menu-item key="store">
      <a
        href="https://store.antdv.com/pro/"
        target="_blank"
        ref="noopener noreferrer"
        style="position: relative;"
      >
        {{ $t('app.header.menu.store') }}
        <!-- <a-badge color="red" style="position: absolute; top: -35px; right: -15px" /> -->
      </a>
    </a-menu-item>
    <a-menu-item v-if="isZhCN" key="geektime">
      <a
        href="https://time.geekbang.org/course/intro/100024601?code=KHKYcoBU6vZa8nMglg7AWfDxxi3BWrz9INAzAY3umPk%3D"
        target="_blank"
        rel="noopener noreferrer"
        style="position: relative"
      >
        实战课程
        <!-- <a-badge color="red" style="position: absolute; top: -35px; right: -15px" /> -->
      </a>
    </a-menu-item>
    <template v-if="isMobile">
      <a-menu-item key="switch-lang" @click="$emit('langChange')">
        {{ $t('app.header.lang') }}
      </a-menu-item>
      <a-menu-item key="github">
        <a
          href="https://github.com/vueComponent/ant-design-vue"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script lang="ts">
import type { GlobalConfig } from '../../App.vue';
import { GLOBAL_CONFIG } from '../../SymbolKey';
import { getLocalizedPathname } from '../../utils/util';
import { computed, defineComponent, inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  emits: ['langChange'],
  setup() {
    const globalConfig = inject<GlobalConfig>(GLOBAL_CONFIG);
    const menuMode = computed(() => {
      return globalConfig.isMobile.value ? 'inline' : 'horizontal';
    });
    const route = useRoute();
    const activeMenuItem = ref('home');
    watch(
      () => route.path,
      pathname => {
        const modules = pathname.split('/');
        if (pathname === '/docs/resources' || pathname === '/docs/resources-cn') {
          activeMenuItem.value = 'docs/resources';
        } else if (modules[1] === 'components') {
          activeMenuItem.value = 'components';
        } else if (modules[1] === 'docs') {
          activeMenuItem.value = `${modules[1]}/${modules[2]}`;
        } else {
          activeMenuItem.value = 'home';
        }
      },
      { immediate: true },
    );
    return {
      isMobile: globalConfig.isMobile,
      isZhCN: globalConfig.isZhCN,
      getLocalizedPathname,
      menuMode,
      activeMenuItem,
    };
  },
});
</script>
<style scoped></style>
