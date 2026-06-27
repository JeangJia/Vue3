<script setup>
import { useRoute } from 'vue-router'
import { useContentStore } from '@/stores/contentStore'
import AppHeader from '@/components/appHeader.vue'
import AppSidebar from '@/components/appSidebar.vue'

const route = useRoute()
useContentStore().seedIfEmpty()
</script>

<template>
  <div class="app-shell">
    <template v-if="route.meta.hideLayout">
      <router-view />
    </template>
    <template v-else>
      <AppSidebar />
      <div class="main-area">
        <AppHeader />
        <div class="page-content">
          <router-view />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.app-shell {
  display: flex;
  min-height: 100vh;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
