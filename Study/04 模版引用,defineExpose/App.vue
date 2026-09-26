<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import testCom from "./components/icons/test-com.vue";
/*
  模版引用(获取dom元素,也可以获取组件)
  1. 调用ref函数,生成一个ref对象
  2. 通过ref标识,进行绑定
  3. 通过ref对象.value即可访问到绑定的元素(必须在dom渲染完的前提下)
*/
const inp = ref(null);
const test = ref(null);
// console.log(inp.value);
// 生命周期钩子 onMounted
onMounted(() => {
  console.log(inp.value);
  inp.value.focus();
});
onMounted(()=>{
  console.log(test.value.count);
  console.log(test.value.sayHi);
})
</script>

<template>
  <div>
    <!-- ref绑定 -->
    <input type="text" ref="inp" />
  </div>
  <!-- 绑定组件 -->
  <testCom ref="test"></testCom>
</template>