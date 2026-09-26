<script setup>
// 由于写了 setup 所以无法直接配置 props 选项
// 所以需要借助于"编译器宏"函数接收子组件传递的数据
const props = defineProps({
  name: String,
  count: Number,
});
// 注册事件
const emit = defineEmits(['subCount'])
// 通过 emit 触发注册的事件
const sub=(n)=>{emit('subCount',n)}
</script>

<template>
  <div class="box">
    {{ name }}- {{ count }}-
    <button @click="sub(10)">-10</button>
  </div>
</template>

<style scoped lang="less">
.box {
  height: 200px;
  width: 200px;
  border: 1px solid #000;
}
</style>