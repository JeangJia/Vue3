<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { path: '/dashboard', icon: 'DataAnalysis', label: '数据概览' },
  { path: '/content', icon: 'Document', label: '内容管理' },
  { path: '/content/new', icon: 'Plus', label: '内容发布' },
]
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <svg
        t="1782533427236"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="11635"
        width="32"
        height="32"
      >
        <path d="M151.04 171.52H896V885.76H151.04z" fill="#FFFFFF" p-id="11636"></path>
        <path
          d="M967.68 0H56.32C25.6 0 0 25.6 0 56.32v911.36c0 31.232 25.6 56.32 56.32 56.32h911.36c31.232 0 56.32-25.6 56.32-56.32V56.32c0-30.72-25.6-56.32-56.32-56.32zM370.688 229.376h282.112v194.56c0 9.728-7.68 17.408-17.408 17.408H388.096c-9.728 0-17.408-7.68-17.408-17.408v-194.56z m423.424 494.592c0 38.912-31.744 70.144-70.656 70.656H300.544c-38.912 0-70.144-31.744-70.656-70.656V300.544c0-38.912 31.744-70.656 70.656-70.656h34.816v211.968c0 19.456 15.872 35.328 35.328 35.328h282.112c19.456 0 35.328-15.872 35.328-35.328V229.888h35.328c38.912 0 70.656 31.744 70.656 70.656v423.424z"
          fill="#1AA5DD"
          p-id="11637"
        ></path>
        <path
          d="M565.76 406.016c9.728-0.512 16.896-9.216 16.896-18.432V318.976c0-9.728-7.168-17.92-16.896-18.432-10.24-0.512-18.432 7.68-18.432 17.408v70.656c0 9.728 8.192 17.92 18.432 17.408z"
          fill="#1AA5DD"
          p-id="11638"
        ></path>
      </svg>
      <span class="logo-text">创作中心</span>
    </div>
    <el-menu
      :default-active="route.path"
      :router="true"
      background-color="transparent"
      text-color="#61666d"
      active-text-color="#007bff"
    >
      <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--bg-white);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #fb7299, #00aeec);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.logo-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.el-menu {
  border-right: none;
  padding: 8px 0;
}

.el-menu-item {
  margin: 2px 8px;
  border-radius: 6px;
  height: 44px;
  line-height: 44px;

  &:hover {
    background: rgba(251, 114, 153, 0.06);
  }

  &.is-active {
    background: rgba(251, 114, 153, 0.1);
    font-weight: 500;
  }
}
</style>
