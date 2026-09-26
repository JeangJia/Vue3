<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
const game = ref([
  { id: '1', name: '王者荣耀' },
  { id: '2', name: '和平精英' },
  { id: '3', name: '原神' },
  { id: '4', name: '炉石传说' },
])
</script>
<template>
  <div class="box">
    <h1>{{ count }}</h1>
    <h1>游戏列表</h1>
    <li v-for="item in game" :key="item.id">{{ item.name }}</li>
  </div>
</template>
<style>
.box {
  background-color: #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
