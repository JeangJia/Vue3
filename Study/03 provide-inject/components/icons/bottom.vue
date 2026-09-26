<script setup>
import { inject } from 'vue';
// 通过 inject 接收传下来的数据
// 接收普通数据
const color = inject('temp-color')
// 接收响应式数据
const count = inject('count')
// 接收函数
const changeCount = inject('changeCount')

</script>

<template>
<h3>底部-{{ color }}-{{ count }}</h3>
<button @click="changeCount(100)">count变为100</button>

</template>