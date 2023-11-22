<template>
  <h1>
    <a id="logo" :href="isZhCN ? '/index-cn' : '/index'">
      <img alt="logo" :src="logo" />
      Ant Design Vue
    </a>
  </h1>
</template>
<script lang="ts">
import type { GlobalConfig } from '../../App.vue';
import { GLOBAL_CONFIG } from '../../SymbolKey';
import { defineComponent, inject } from 'vue';
import logo from '../../assets/logo.svg';
export default defineComponent({
  setup() {
    return { logo, isZhCN: inject<GlobalConfig>(GLOBAL_CONFIG).isZhCN.value };
  },
});
</script>
<style scoped></style>
