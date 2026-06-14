<script setup>
import { ref, computed } from 'vue'
import MovieList from './components/MovieList.vue'
import TVList from './components/TVList.vue'
import NovelList from './components/NovelList.vue'
import GameList from './components/GameList.vue'

const activeTab = ref('movie')

const currentComponent = computed(() => {
  const components = {
    movie: MovieList,
    tv: TVList,
    novel: NovelList,
    game: GameList
  }
  return components[activeTab.value]
})

const tabs = [
  { key: 'movie', label: '电影' },
  { key: 'tv', label: '电视' },
  { key: 'novel', label: '小说' },
  { key: 'game', label: '游戏' }
]
</script>

<template>
  <div class="box">
    <div class="tab-bar">
      <span
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </span>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>

<style scoped lang="less">
.box {
  height: 506px;
  width: 280px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tab-bar {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  // border-bottom: 1px solid #ccc;
}

.tab-item {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-top: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 2px solid transparent;
}

.tab-item:hover {
  background-color: #f0f0f0;
  color: #0aa770;
}

.tab-item.active {
  color: #0aa770;
  border-top: 2px solid #0aa770;
}
</style>