<script setup>
import { useCounterStore } from "@/store/count";
const countStore = useCounterStore()
</script>

<template>
  <h1>
    Son1组件-{{ countStore.count }}-
    <button @click="countStore.addCount(1)">+</button>
    </h1>
</template>