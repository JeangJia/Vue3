<!-- setup定义数据 + 函数 然后以对象方式return -->
<script setup>
const msg = "hello vue";
const click = () => {
  console.log(msg);
};
// 一. reactive 和 ref
//     1. reactive: 接收一个对象类型数据,返回一个响应式对象
//        import { reactive } from "vue";
//        const state = reactive({
//          count:100
//        })
//     2. ref接收简单类型 或 复杂类型,返回一个响应式的对象 (常用)
//        本质是在原有传入的数据的基础上,外层包了一层对象,在借助 reactive 实现的响应式
//         注意:
//         1. 脚本中访问数据,需要通过.value访问数据
//         2. 在template中, .value不需要加
import { computed, ref, watch } from "vue";
const count = ref(100);
const add = () => {
  count.value++;
};
// 二. 计算属性computed
//     const 计算属性 = computed(() => {
//           return 计算返回结果
//     })
const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const newList = computed(() => {
  return list.value.filter((item) => item & 1);
});
// 三. 监视数据变化
//     1. 浅层监视
//        watch(ref对象/[],()=>{})
watch(count, (newValue, oldValue) => {
  console.log(newValue);
});
//     2. 深度监视
const info = ref({
  name: "jeang",
  age: 20,
});
const changeage = () => {
  info.value.age--;
};
const changename = () => {
  info.value.name = "Jia Jeang";
};
watch(
  info,
  (newValue, oldValue) => {
    console.log(newValue);
  },
  {
    // immediate:true, //立刻执行
    deep: true, //开启深度监视
  }
);
//     3. 监听对象里面一个数据
watch(
  () => info.value.name,
  (newValue) => {
    console.log("修改了name");
  }
);
</script>

<template>
  <div>{{ msg }}</div>
  <button @click="click">按钮</button>
  <div>{{ count }}</div>
  <button @click="add">+1</button>
  <div>{{ list }}</div>
  <div>{{ newList }}</div>
  <div>{{ info }}</div>
  <button @click="changeage">修改age</button>
  <button @click="changename">修改name</button>
</template>

<style>
</style>