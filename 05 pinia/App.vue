<script setup>
import { storeToRefs } from "pinia";
import son1 from "./components/Son1.vue";
import son2 from "./components/Son2.vue";
import { useCounterStore } from "@/store/count";
import { useListStore } from "@/store/getData";
const countStore = useCounterStore();
// 通过 storeToRefs 解构可以保留响应式 
const { count } = storeToRefs(countStore);
const ListStore = useListStore();
// 方法直接解构
const { getGoods } = useListStore();
</script>

<template>
  <h1>根组件 -{{ count }} -{{ countStore.double }}</h1>
  <son1></son1>
  <son2></son2>
  <br />
  <button @click="getGoods">获取数据</button>
  <ul>
    <li v-for="item in ListStore.list" :key="item.id">
      {{ item.name }}-{{ item.price }}
    </li>
  </ul>
</template>