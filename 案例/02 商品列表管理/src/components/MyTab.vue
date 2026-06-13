<script setup>
import { ref } from "vue";

const props = defineProps({
  goodsList: Array,
  totalPrice: Number,
  allSelected: Boolean,
});

const emit = defineEmits(['toggle-all', 'update-num', 'toggle-select', 'remove-item']);

const handleToggleAll = (event) => {
  emit('toggle-all', event.target.checked);
};

const handleUpdateNum = (id, delta) => {
  emit('update-num', id, delta);
};

const handleToggleSelect = (id) => {
  emit('toggle-select', id);
};

const handleRemoveItem = (id) => {
  emit('remove-item', id);
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th><input type="checkbox" :checked="props.allSelected" @change="handleToggleAll" /></th>
        <th>商品名称</th>
        <th>价格</th>
        <th>数量</th>
        <th>标签</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.goodsList" :key="item.id">
        <td><input type="checkbox" :checked="item.selected" @change="handleToggleSelect(item.id)" /></td>
        <td>{{ item.name }}</td>
        <td>¥{{ item.price.toFixed(2) }}</td>
        <td class="num">
          <button @click="handleUpdateNum(item.id, -1)">-</button>
          {{ item.num }}
          <button @click="handleUpdateNum(item.id, 1)">+</button>
        </td>
        <td class="tags">
          <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
        </td>
        <td><button @click="handleRemoveItem(item.id)">删除</button></td>
      </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="6">
                <span>总价:</span>
                <span class="total">¥{{ props.totalPrice.toFixed(2) }}</span>
            </td>
        </tr>
    </tfoot>
  </table>
</template>

<style scoped lang="less">
table {
  border-collapse: collapse;
  width: 80%;
  margin: 100px auto;
  box-sizing: border-box;
}
th {
  text-align: left;
}
th,
td {
  border: 1px solid #ccc;
  padding: 15px;
  box-sizing: border-box;
}
.num {
  button {
    background-color: #fff;
    // border: 1px solid #ccc;
    color: #333;
    width: 28px;
    height: 28px;
    line-height: 24px;
    cursor: pointer;
    border-radius: 4px;
    margin: 0 5px;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
.tags {
  span {
    display: inline-block;
    padding: 5px 15px;
    border-radius: 8px;
    background-color: #f0f0f0;
    margin-right: 5px;
  }
}
.total {
  font-weight: bold;
  color: #e74c3c;
  font-size: 18px;
  margin-left: 10px;
}
button {
  padding: 5px 15px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #c0392b;
  }
}
</style>
