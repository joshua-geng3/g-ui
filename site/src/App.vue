<template>
  <a-config-provider : locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import type { Ref } from 'vue';
export interface GlobalConfig {
  isMobile: Ref<boolean>;
  lang: Ref<'zh-CN' | 'en-US'>;
  isZhCN: Ref<boolean>;
  responsive: Ref<null | 'narrow' | 'crowded'>;
  blocked: Ref<boolean>;
}
</script>

<style scoped></style>
