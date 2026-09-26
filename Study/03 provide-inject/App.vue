<script setup>
import { provide, ref } from 'vue';
import center from './components/icons/center.vue';
// 1. 跨层传递普通数据
provide('temp-color','blue')

// 2. 跨层传递响应式数据
const count=ref(20)
provide('count',count)

// 3. 跨层传递函数 给子孙传递可以修改数据的方法
provide('changeCount',(newValue)=>{
  count.value = newValue
})


</script>

<template>
<h1>顶部</h1>
<center></center>

</template>