import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

let nextId = Date.now()

export const useContentStore = defineStore(
  'content',
  () => {
    const contents = ref([])

    const totalCount = computed(() => contents.value.length)
    const publishedCount = computed(() => contents.value.filter((c) => c.status === 'published').length)
    const draftCount = computed(() => contents.value.filter((c) => c.status === 'draft').length)
    const archivedCount = computed(() => contents.value.filter((c) => c.status === 'archived').length)
    const videoCount = computed(() => contents.value.filter((c) => c.type === 'video').length)
    const articleCount = computed(() => contents.value.filter((c) => c.type === 'article').length)

    function add(item) {
      const now = new Date().toISOString()
      contents.value.push({
        ...item,
        id: String(nextId++),
        createdAt: now,
        updatedAt: now,
      })
    }

    function update(id, data) {
      const idx = contents.value.findIndex((c) => c.id === id)
      if (idx !== -1) {
        contents.value[idx] = { ...contents.value[idx], ...data, updatedAt: new Date().toISOString() }
      }
    }

    function remove(id) {
      contents.value = contents.value.filter((c) => c.id !== id)
    }

    function getById(id) {
      return contents.value.find((c) => c.id === id) || null
    }

    function seedIfEmpty() {
      if (contents.value.length > 0) return
      const samples = [
        {
          title: 'Vue 3 组合式 API 入门教程',
          type: 'video',
          coverUrl:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnMSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwQUVFQyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZCNzI5OSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSJ1cmwoI2cxKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlZ1ZSAzIOaVmeeoiTwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5Z+656GA5ZKM566A5Y2V55qE5YWo5paw5Lqk6IGU57O75YiXPC90ZXh0Pjwvc3ZnPg==',
          description:
            '本教程详细介绍 Vue 3 组合式 API 的核心概念,包括 ref、reactive、computed、watch 等响应式 API 的使用方法.',
          tags: 'Vue3,前端教程,JavaScript',
          status: 'published',
        },
        {
          title: '2024 前端开发趋势报告',
          type: 'article',
          coverUrl:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnMiIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0ZCNzI5OSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGNkI2QiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSJ1cmwoI2cyKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuWJjeerr+W8gOWPkeilv+WKv+aKpeWRijwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjE0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5YWo6Z2i5Zue6aG+5YmN56uv5paw5oqA5pyv5Y+R5bGVPC90ZXh0Pjwvc3ZnPg==',
          description:
            '盘点 2024 年前端领域的主流技术趋势,涵盖 Rust 工具链、SSR 框架演进、AI 辅助编码、WebAssembly 落地实践等热点话题.',
          tags: '前端,趋势报告,Web开发',
          status: 'published',
        },
        {
          title: 'Element Plus 实战技巧分享',
          type: 'video',
          coverUrl:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnMyIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzQwOUVGRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzY3QzIzQSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSJ1cmwoI2czKSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkVsZW1lbnQgUGx1cyDlrp6miJg8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuWPrOWImOeUqOe7hOS7tuW6k+WunueOsOmrmOaViOW8gOWPkTwvdGV4dD48L3N2Zz4=',
          description:
            '分享 Element Plus 在实际项目中的使用技巧,包括表单校验、动态表格、主题定制、按需加载等常见场景的解决方案.',
          tags: 'ElementPlus,UI框架,Vue',
          status: 'draft',
        },
        {
          title: 'CSS Grid 布局完全指南',
          type: 'article',
          coverUrl:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnNCIgeDE9IjAiIHkxPSIxIiB4Mj0iMSIgeTI9IjAiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0U2QTIzQyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZCNzI5OSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSJ1cmwoI2c0KSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkNTUyBHcmlkIOW4gOWxgCnlrozmlbTmjIfljZc8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuS7jjDliLDmkITnkIbkuIDliIbpq5jmlYhHcmlk5biD5bGA5pa55qGIPC90ZXh0Pjwvc3ZnPg==',
          description:
            '从零开始掌握 CSS Grid 布局,包含网格容器、行列定义、区域命名、响应式布局等核心知识点,附带大量可运行的代码示例.',
          tags: 'CSS,Grid,响应式布局',
          status: 'published',
        },
        {
          title: 'B站内容创作运营方法论',
          type: 'video',
          coverUrl:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnNSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0ZCNzI5OSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQUVFQyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSJ1cmwoI2c1KSIvPjx0ZXh0IHg9IjIwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkLnu5jlhoXlrrnliJvkvZzov5DokKU8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIxNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuino+aekOeIseWlveeahOWGheWuueWItuS9nOaWueazlTwvdGV4dD48L3N2Zz4=',
          description:
            '分享 B站视频创作的完整方法论,从选题策划、内容制作到发布运营,帮助新手创作者快速上手 B站内容生态.',
          tags: 'B站,内容创作,运营,新媒体',
          status: 'archived',
        },
      ]
      samples.forEach((item) => add(item))
    }

    return { contents, totalCount, publishedCount, draftCount, archivedCount, videoCount, articleCount, add, update, remove, getById, seedIfEmpty }
  },
  { persist: { storage: localStorage } },
)
