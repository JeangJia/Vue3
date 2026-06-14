<script setup>
const list = [
  { id: 1, name: "塞尔达传说" },
  { id: 2, name: "艾尔登法环" },
  { id: 3, name: "原神" },
  { id: 4, name: "黑神话:悟空" },
];
</script>

<template>
  <div class="list-container">
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.id }} &nbsp; {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list-container {
  flex: 1;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  font-size: 16px;
  /* padding: 10px; */
  background: #f5f5f5;
  border-radius: 4px;
  margin-top: 2px;
}
</style>
