<script setup>
import { ref, computed } from "vue";
import MyTab from "./components/MyTab.vue";

const goodsList = ref([
  {
    id: 1,
    name: "夏季专柜同款女鞋",
    price: 298,
    num: 1,
    tags: ["舒适", "透气", "轻便"],
    selected: false,
  },
  {
    id: 2,
    name: "冬季保暖女士休闲雪地靴 舒适加绒防水短靴 防滑棉鞋",
    price: 89,
    num: 1,
    tags: ["保暖", "防滑"],
    selected: false,
  },
  {
    id: 3,
    name: "秋冬新款女士毛衣 套头宽松针织衫 简约上衣",
    price: 199,
    num: 1,
    tags: ["秋冬", "毛衣"],
    selected: false,
  },
  {
    id: 4,
    name: "2023春秋装新款大码女装 衬衫 上衣",
    price: 19,
    num: 1,
    tags: ["秋冬", "毛衣"],
    selected: false,
  },
  {
    id: 5,
    name: "长款长袖圆领女士毛衣 2022秋装新款假两件连衣裙",
    price: 178,
    num: 1,
    tags: ["圆领", "连衣裙"],
    selected: false,
  },
]);

const totalPrice = computed(() => {
  return goodsList.value.reduce((sum, item) => {
    return sum + (item.selected ? item.price * item.num : 0);
  }, 0);
});

const allSelected = computed(() => {
  return goodsList.value.length > 0 && goodsList.value.every(item => item.selected);
});

const toggleAll = (checked) => {
  goodsList.value.forEach(item => {
    item.selected = checked;
  });
};

const updateNum = (id, delta) => {
  const item = goodsList.value.find(item => item.id === id);
  if (item) {
    item.num = Math.max(1, item.num + delta);
  }
};

const toggleSelect = (id) => {
  const item = goodsList.value.find(item => item.id === id);
  if (item) {
    item.selected = !item.selected;
  }
};

const removeItem = (id) => {
  const index = goodsList.value.findIndex(item => item.id === id);
  if (index !== -1) {
    goodsList.value.splice(index, 1);
  }
};

</script>

<template>
    <MyTab 
        :goodsList="goodsList" 
        :totalPrice="totalPrice"
        :allSelected="allSelected"
        @toggle-all="toggleAll"
        @update-num="updateNum"
        @toggle-select="toggleSelect"
        @remove-item="removeItem"
    />
</template>
