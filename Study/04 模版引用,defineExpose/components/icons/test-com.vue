<script setup>
const count=10
const sayHi=()=>{console.log('hello')}
// 通过 defineExpose 往外暴漏属性和方法
defineExpose({
    count,
    sayHi
})
</script>

<template>
<p>测试的组件</p>
</template>