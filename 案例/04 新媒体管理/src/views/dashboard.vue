<script setup>
import { useContentStore } from '@/stores/contentStore'
import { storeToRefs } from 'pinia'

const { totalCount, publishedCount, draftCount, archivedCount, videoCount, articleCount } =
  storeToRefs(useContentStore())

const cards = [
  { label: '内容总数', value: totalCount, color: '#FB7299', icon: 'Document' },
  { label: '已发布', value: publishedCount, color: '#67C23A', icon: 'CircleCheck' },
  { label: '草稿', value: draftCount, color: '#E6A23C', icon: 'Edit' },
  { label: '已归档', value: archivedCount, color: '#909399', icon: 'Folder' },
]

const typeCards = [
  { label: '视频', value: videoCount, color: '#00AEEC', icon: 'VideoCamera' },
  { label: '图文', value: articleCount, color: '#FB7299', icon: 'Picture' },
]
</script>

<template>
  <div class="dashboard">
    <div class="stat-cards">
      <el-card v-for="card in cards" :key="card.label" class="stat-card" shadow="hover">
        <div class="stat-inner">
          <div class="stat-info">
            <span class="stat-label">{{ card.label }}</span>
            <span class="stat-value">{{ card.value }}</span>
          </div>
          <div class="stat-icon" :style="{ background: card.color }">
            <el-icon :size="24"><component :is="card.icon" /></el-icon>
          </div>
        </div>
      </el-card>
    </div>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header><span class="card-title">按类型统计</span></template>
          <div class="type-list">
            <div v-for="t in typeCards" :key="t.label" class="type-item">
              <div class="type-icon" :style="{ background: t.color }">
                <el-icon :size="18"><component :is="t.icon" /></el-icon>
              </div>
              <span class="type-label">{{ t.label }}</span>
              <span class="type-value">{{ t.value }}</span>
              <el-progress
                :percentage="totalCount ? Math.round((t.value / totalCount) * 100) : 0"
                :color="t.color"
                :stroke-width="8"
                :show-text="false"
              />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header><span class="card-title">最近内容</span></template>
          <div v-if="useContentStore().contents.length === 0" class="empty-hint">
            暂无内容,去<a href="/content/new" @click.prevent="$router.push('/content/new')"
              >发布第一篇</a
            >吧
          </div>
          <div v-else class="recent-list">
            <div
              v-for="item in useContentStore().contents.slice(-5).reverse()"
              :key="item.id"
              class="recent-item"
            >
              <span class="recent-title">{{ item.title }}</span>
              <el-tag
                :type="
                  item.status === 'published'
                    ? 'success'
                    : item.status === 'draft'
                    ? 'warning'
                    : 'info'
                "
                size="small"
              >
                {{
                  item.status === 'published'
                    ? '已发布'
                    : item.status === 'draft'
                    ? '草稿'
                    : '已归档'
                }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.dashboard {
  max-width: 1200px;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  :deep(.el-card__body) {
    padding: 20px;
  }
}

.stat-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.type-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.type-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.type-label {
  font-size: 14px;
  color: var(--text-secondary);
  width: 40px;
}

.type-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  width: 36px;
  text-align: right;
}

.el-progress {
  flex: 1;
  min-width: 80px;
}

.empty-hint {
  color: var(--text-muted);
  font-size: 14px;
  text-align: center;
  padding: 20px 0;

  a {
    color: #fb7299;
    cursor: pointer;
  }
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recent-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
}

.recent-title {
  font-size: 14px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  margin-right: 12px;
}
</style>
