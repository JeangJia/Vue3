<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/contentStore'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const store = useContentStore()
const { contents } = storeToRefs(store)

const filterStatus = ref('')
const filterType = ref('')
const searchKeyword = ref('')

const filteredContents = computed(() => {
  let list = contents.value
  if (filterStatus.value) list = list.filter((c) => c.status === filterStatus.value)
  if (filterType.value) list = list.filter((c) => c.type === filterType.value)
  if (searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase()
    list = list.filter((c) => c.title.toLowerCase().includes(kw))
  }
  return list
})

const statusOptions = [
  { value: '', label: '全部状态' },
  { value: 'draft', label: '草稿' },
  { value: 'published', label: '已发布' },
  { value: 'archived', label: '已归档' },
]

const typeOptions = [
  { value: '', label: '全部类型' },
  { value: 'video', label: '视频' },
  { value: 'article', label: '图文' },
]

function statusTagType(status) {
  return status === 'published' ? 'success' : status === 'draft' ? 'warning' : 'info'
}

function statusLabel(status) {
  return status === 'published' ? '已发布' : status === 'draft' ? '草稿' : '已归档'
}

function goEdit(id) {
  router.push(`/content/${id}`)
}

function goCreate() {
  router.push('/content/new')
}

async function handleDelete(id, title) {
  try {
    await ElMessageBox.confirm(`确定要删除「${title}」吗?`, '确认删除', {
      type: 'warning',
      confirmButtonText: '删除',
    })
    store.remove(id)
    ElMessage.success('删除成功')
  } catch {}
}

function toggleStatus(row) {
  const next =
    row.status === 'draft' ? 'published' : row.status === 'published' ? 'archived' : 'draft'
  store.update(row.id, { status: next })
  ElMessage.success(`状态已更新为「${statusLabel(next)}」`)
}

function formatTime(iso) {
  if (!iso) return '-'
  const d = new Date(iso)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="content-list">
    <div class="toolbar">
      <div class="filters">
        <el-select v-model="filterStatus" placeholder="状态筛选" clearable style="width: 130px">
          <el-option v-for="o in statusOptions" :key="o.value" :label="o.label" :value="o.value" />
        </el-select>
        <el-select v-model="filterType" placeholder="类型筛选" clearable style="width: 130px">
          <el-option v-for="o in typeOptions" :key="o.value" :label="o.label" :value="o.value" />
        </el-select>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索标题..."
          clearable
          :prefix-icon="Search"
          style="width: 220px"
        />
      </div>
      <el-button
        type="primary"
        @click="goCreate"
        style="background: #fb7299; border-color: #fb7299"
      >
        <el-icon><Plus /></el-icon>
        发布内容
      </el-button>
    </div>

    <el-card shadow="hover">
      <el-table
        :data="filteredContents"
        stripe
        style="width: 100%"
        empty-text="暂无内容,快去发布第一篇吧"
      >
        <el-table-column prop="title" label="标题" min-width="180" show-overflow-tooltip />
        <el-table-column prop="type" label="类型" width="90">
          <template #default="{ row }">
            <el-tag :type="row.type === 'video' ? '' : 'success'" size="small">
              {{ row.type === 'video' ? '视频' : '图文' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.status)" size="small">
              {{ statusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="170">
          <template #default="{ row }">
            {{ formatTime(row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="goEdit(row.id)">编辑</el-button>
            <el-button size="small" type="warning" link @click="toggleStatus(row)">
              {{
                row.status === 'draft' ? '发布' : row.status === 'published' ? '归档' : '还原草稿'
              }}
            </el-button>
            <el-button size="small" type="danger" link @click="handleDelete(row.id, row.title)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.content-list {
  max-width: 1200px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.filters {
  display: flex;
  gap: 10px;
}
</style>
