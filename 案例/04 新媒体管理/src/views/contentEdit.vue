<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '@/stores/contentStore'

const route = useRoute()
const router = useRouter()
const store = useContentStore()

const isEdit = ref(false)
const editId = ref('')

const formRef = ref(null)
const dropRef = ref(null)
const fileInput = ref(null)
const isDragover = ref(false)
const uploadError = ref('')

const form = ref({
  title: '',
  type: 'article',
  coverUrl: '',
  description: '',
  tags: '',
  status: 'draft',
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  description: [{ required: true, message: '请输入内容描述', trigger: 'blur' }],
}

onMounted(() => {
  const id = route.params.id
  if (id) {
    const item = store.getById(id)
    if (item) {
      isEdit.value = true
      editId.value = id
      form.value = {
        title: item.title,
        type: item.type,
        coverUrl: item.coverUrl || '',
        description: item.description,
        tags: item.tags || '',
        status: item.status,
      }
    } else {
      ElMessage.error('内容不存在')
      router.push('/content')
    }
  }
})

function processFile(file) {
  uploadError.value = ''
  if (!file.type.startsWith('image/')) {
    uploadError.value = '仅支持图片文件(jpg、png、gif 等)'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = '文件大小不能超过 5MB'
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    form.value.coverUrl = e.target.result
  }
  reader.readAsDataURL(file)
}

function onDrop(e) {
  isDragover.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

function onFileChange(e) {
  const file = e.target?.files?.[0]
  if (file) processFile(file)
}

function triggerFile() {
  fileInput.value?.click()
}

function removeCover() {
  form.value.coverUrl = ''
  uploadError.value = ''
}

function submit() {
  if (!form.value.coverUrl) {
    uploadError.value = '请上传封面图'
    return
  }
  formRef.value?.validate((valid) => {
    if (!valid) return

    const data = {
      ...form.value,
      tags: form.value.tags
        .split(/[,,]/)
        .map((t) => t.trim())
        .filter(Boolean)
        .join(','),
    }

    if (isEdit.value) {
      store.update(editId.value, data)
      ElMessage.success('更新成功')
    } else {
      store.add(data)
      ElMessage.success('发布成功')
    }
    router.push('/content')
  })
}

function cancel() {
  router.push('/content')
}
</script>

<template>
  <div class="content-edit">
    <el-card shadow="hover" class="form-card">
      <template #header>
        <span class="form-title">{{ isEdit ? '编辑内容' : '发布新内容' }}</span>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" label-position="right">
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入内容标题"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio value="video">视频</el-radio>
                <el-radio value="article">图文</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio value="draft">草稿</el-radio>
                <el-radio value="published">直接发布</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="封面图" required>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="onFileChange"
          />
          <div
            v-if="!form.coverUrl"
            ref="dropRef"
            class="drop-zone"
            :class="{ 'is-dragover': isDragover }"
            @click="triggerFile"
            @dragenter.prevent="isDragover = true"
            @dragover.prevent="isDragover = true"
            @dragleave="isDragover = false"
            @drop.prevent="onDrop"
          >
            <el-icon :size="40" color="#c0c4cc"><UploadFilled /></el-icon>
            <p class="drop-text">拖拽图片到此处,或<span class="link">点击上传</span></p>
            <p class="drop-hint">支持 jpg、png、gif,大小不超过 5MB</p>
            <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>
          </div>
          <div v-else class="cover-uploaded">
            <img :src="form.coverUrl" alt="封面预览" />
            <div class="cover-mask">
              <el-button type="primary" size="small" @click="triggerFile">更换图片</el-button>
              <el-button type="danger" size="small" @click="removeCover">移除</el-button>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="5"
            placeholder="请输入内容描述..."
            maxlength="500"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="标签">
          <el-input v-model="form.tags" placeholder="多个标签用逗号分隔,如:教程,前端,Vue" />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submit"
            style="background: #fb7299; border-color: #fb7299"
          >
            {{ isEdit ? '保存修改' : '发布内容' }}
          </el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.content-edit {
  max-width: 800px;
}

.form-card {
  :deep(.el-card__header) {
    padding: 16px 24px;
  }
}

.form-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.drop-zone {
  width: 100%;
  min-height: 180px;
  border: 2px dashed #dcdfe6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s;
  padding: 30px;

  &:hover,
  &.is-dragover {
    border-color: #fb7299;
    background: rgba(251, 114, 153, 0.04);
  }
}

.drop-text {
  margin-top: 12px;
  font-size: 15px;
  color: var(--text-secondary);

  .link {
    color: #fb7299;
    cursor: pointer;
  }
}

.drop-hint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--text-muted);
}

.upload-error {
  margin-top: 8px;
  font-size: 13px;
  color: #f56c6c;
}

.cover-uploaded {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  max-width: 400px;
  border: 1px solid var(--border-color);

  img {
    width: 100%;
    display: block;
    max-height: 260px;
    object-fit: cover;
  }

  .cover-mask {
    display: none;
  }

  &:hover .cover-mask {
    display: flex;
    gap: 6px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px;
    background: rgba(0, 0, 0, 0.55);
    justify-content: center;
  }
}
</style>
