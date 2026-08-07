<template>
  <demo-sort :cols="1">
    <Size />
    <Control />
    <Vertical />
    <Collapsible />
    <CollapsibleIcon />
    <Multiple />
    <Group />
    <Lazy />
  </demo-sort>
</template>
<script lang="ts">
import Size from './size.vue';
import Control from './control.vue';
import Vertical from './vertical.vue';
import Collapsible from './collapsible.vue';
import CollapsibleIcon from './collapsible-icon.vue';
import Multiple from './multiple.vue';
import Group from './group.vue';
import Lazy from './lazy.vue';
import CN from '../index.zh-CN.md';
import US from '../index.en-US.md';
import { defineComponent } from 'vue';
export default defineComponent({
  CN,
  US,
  components: {
    Size,
    Control,
    Vertical,
    Collapsible,
    CollapsibleIcon,
    Multiple,
    Group,
    Lazy,
  },
});
</script>
