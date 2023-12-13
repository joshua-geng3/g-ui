<docs>
---
order: 0
title:
zh-CN: 基本用法
en-US: Basic usage
---

## zh-CN

基本用法。

## en-US

Basic usage example.

</docs>
<template>
  <a-input v-model:value="value" @change="onChange" placeholder="Basic usage" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value = ref<string>('');
    const onChange = (e) => {
      console.log(e);
    };
    return {
      value,
      onChange,
    };
  },
});
</script>
