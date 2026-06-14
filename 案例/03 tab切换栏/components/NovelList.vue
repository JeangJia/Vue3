<script setup>
const list = [
  { id: 1, name: "三体全集" },
  { id: 2, name: "活着" },
  { id: 3, name: "百年孤独" },
  { id: 4, name: "红楼梦" },
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
