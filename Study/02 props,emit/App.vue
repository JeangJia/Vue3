<script setup>
import { ref } from "vue";
import son from "./components/icons/son-com.vue";
/*
  一. 父传子
      1. 给子组件添加属性的方式传值
      2. 在子组件通过props接收
  二. 子传父
      1. 在子组件内部 emit 触发事件(编译器宏获取)
      2. 在父组件通过 @ 监听
*/
const count = ref(20);
const name = ref("Jeang");
const addCount = (n) => (count.value += n);
const subCount = (n) => (count.value -= n);
</script>

<template>
  <h1>
    父组件-{{ count }}
    <button @click="addCount(10)">+10</button>
  </h1>
  <!-- 渲染组件不必要注册 传递方式与Vue2一样 -->
  <son :name="name" :count="count" @subCount="subCount"></son>
</template>