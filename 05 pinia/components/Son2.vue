<script setup>
import { useCounterStore } from "@/store/count";
const countStore = useCounterStore()
</script>

<template>
  <h1>
    Son2组件-{{ countStore.count }}-
    <button @click="countStore.subCount(1)">-</button>
  </h1>
</template>