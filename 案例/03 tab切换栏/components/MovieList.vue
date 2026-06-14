<script setup>
const list = [
  { id: 1, name: "阿凡达:水之道" },
  { id: 2, name: "流浪地球2" },
  { id: 3, name: "满江红" },
  { id: 4, name: "蜘蛛侠:纵横宇宙" },
];
</script>

<template>
  <div class="list-container">
    <ul>
      <li v-for="item in list" :key="item.id">
        <span>{{ item.id }}</span> &nbsp; {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
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
  font-size: 14px;
  padding-left: 10px;
  padding:2px 0;
  background: #f5f5f5;
  // margin-top: 1px;
  span{
    color:#ccc
  }
}
</style>
