<script setup>
import { ref, watch } from "vue";

const list = ref(
  localStorage.getItem("study_plan")
    ? JSON.parse(localStorage.getItem("study_plan"))
    : [
        {
          id: 1,
          subject: "Vue3基础",
          content: "Composition API学习",
          location: "自习室",
          status: false,
        },
        {
          id: 2,
          subject: "Vite",
          content: "构建工具配置",
          location: "实验室",
          status: false,
        },
      ]
);

watch(list, (val) => localStorage.setItem("study_plan", JSON.stringify(val)), {
  deep: true,
});

const subject = ref("");
const content = ref("");
const loc = ref("1");

const editId = ref(null);
const editSubject = ref("");
const editContent = ref("");
const editLoc = ref("1");

const add = () => {
  if (!subject.value || !content.value) return;
  list.value.push({
    id: Date.now(),
    subject: subject.value,
    content: content.value,
    location: ["", "自习室", "图书馆", "实验室", "其他"][loc.value],
    status: false,
  });
  subject.value = content.value = "";
  loc.value = "1";
};

const del = (id) => (list.value = list.value.filter((item) => item.id !== id));

const toggle = (id) => {
  const item = list.value.find((item) => item.id === id);
  if (item) item.status = !item.status;
};

const startEdit = (item) => {
  editId.value = item.id;
  editSubject.value = item.subject;
  editContent.value = item.content;
  editLoc.value = { "自习室": "1", "图书馆": "2", "实验室": "3", "其他": "4" }[item.location] || "1";
};

const saveEdit = () => {
  const item = list.value.find((item) => item.id === editId.value);
  if (item) {
    item.subject = editSubject.value;
    item.content = editContent.value;
    item.location = ["", "自习室", "图书馆", "实验室", "其他"][editLoc.value];
  }
  cancelEdit();
};

const cancelEdit = () => {
  editId.value = null;
  editSubject.value = "";
  editContent.value = "";
  editLoc.value = "1";
};
</script>

<template>
  <div class="box">
    <div class="title">学习计划表</div>
    <div class="addItem">
      <div class="inpwrap">
        <span>科目</span>
        <input type="text" placeholder="请输入学习科目" v-model="subject" />
      </div>
      <div class="inpwrap">
        <span>内容</span>
        <input type="text" placeholder="请输入学习内容" v-model="content" />
      </div>
      <div class="selwrap">
        <span>地点</span>
        <select v-model="loc">
          <option value="1">自习室</option>
          <option value="2">图书馆</option>
          <option value="3">实验室</option>
          <option value="4">其他</option>
        </select>
      </div>
      <button class="addBtn" @click="add" style="margin-left: 30px">
        添加
      </button>
    </div>
    <table class="tab">
      <thead>
        <tr>
          <th>序号</th>
          <th>学习科目</th>
          <th>学习内容</th>
          <th>学习地点</th>
          <th>状态</th>
          <th>编辑</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in list" :key="item.id">
          <td>{{ i + 1 }}</td>
          <td>
            <input v-if="editId === item.id" v-model="editSubject" class="editInput" />
            <span v-else>{{ item.subject }}</span>
          </td>
          <td>
            <input v-if="editId === item.id" v-model="editContent" class="editInput" />
            <span v-else>{{ item.content }}</span>
          </td>
          <td>
            <select v-if="editId === item.id" v-model="editLoc" class="editSelect">
              <option value="1">自习室</option>
              <option value="2">图书馆</option>
              <option value="3">实验室</option>
              <option value="4">其他</option>
            </select>
            <span v-else>{{ item.location }}</span>
          </td>
          <td>
            <el-switch
              :model-value="item.status"
              @change="toggle(item.id)"
              active-color="#10b981"
              inactive-color="#ef4444"
            />
            <span :class="item.status ? 'done' : 'undone'">{{
              item.status ? "已完成" : "未完成"
            }}</span>
          </td>
          <td>
            <span v-if="editId === item.id">
              <button class="saveBtn" @click="saveEdit">保存</button>
              <button class="cancelBtn" @click="cancelEdit">取消</button>
            </span>
            <span v-else class="edit" @click="startEdit(item)">修改</span>
          </td>
          <td class="del" @click="del(item.id)" style="color: #ef4444">删除</td>
        </tr>
        <tr v-if="list.length === 0">
          <td colspan="7">暂无数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="less">
.box {
  width: 1300px;
  margin: 80px auto;
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

  .title {
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    padding-left: 30px;
    color: #fff;
    font-weight: bold;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
  }

  .addItem {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #334155;

    .inpwrap {
      height: 48px;
      width: 280px;
      display: flex;
      align-items: center;
      background: #0f172a;
      border: 2px solid #334155;
      border-radius: 10px;
      overflow: hidden;
      margin-left: 30px;

      span {
        width: 70px;
        height: 100%;
        line-height: 48px;
        text-align: center;
        background: rgba(99, 102, 241, 0.1);
        color: #818cf8;
        font-size: 14px;
        font-weight: 500;
      }

      input {
        height: 100%;
        padding-left: 12px;
        font-size: 14px;
        border: none;
        outline: none;
        background: transparent;
        color: #f1f5f9;
        flex: 1;

        &::placeholder {
          color: #64748b;
        }
      }
    }

    .selwrap {
      height: 48px;
      width: 150px;
      display: flex;
      align-items: center;
      background: #0f172a;
      border: 2px solid #334155;
      border-radius: 10px;
      overflow: hidden;
      margin-left: 30px;

      span {
        width: 60px;
        height: 100%;
        line-height: 48px;
        text-align: center;
        background: rgba(99, 102, 241, 0.1);
        color: #818cf8;
        font-size: 14px;
        font-weight: 500;
      }

      select {
        height: 100%;
        padding-left: 8px;
        font-size: 14px;
        border: none;
        outline: none;
        background: transparent;
        color: #f1f5f9;
        cursor: pointer;

        option {
          background: #0f172a;
          color: #f1f5f9;
        }
      }
    }

    .addBtn {
      width: 90px;
      height: 48px;
      font-size: 15px;
      font-weight: bold;
      border: none;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #fff;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
      }
    }
  }

  .tab {
    width: 100%;
    border-collapse: collapse;
    padding: 20px;

    th {
      background: linear-gradient(0deg, #0f172a, #1e293b);
      color: #f1f5f9;
      font-weight: 600;
      padding: 15px 20px;
      text-align: left;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #6366f1;
    }

    td {
      padding: 15px 20px;
      color: #f1f5f9;
      border-bottom: 1px solid #334155;
    }

    tbody tr {
      &:hover {
        background: #334155;
      }
    }
  }
}

.done {
  color: #10b981;
  margin-left: 10px;
  font-size: 13px;
}

.undone {
  color: #f59e0b;
  margin-left: 10px;
  font-size: 13px;
}

.del {
  color: #ef4444;
  cursor: pointer;
  text-decoration: underline;
}

.edit {
  color: #6366f1;
  cursor: pointer;
  text-decoration: underline;
}

.editInput {
  width: 100%;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #334155;
  border-radius: 6px;
  background: #0f172a;
  color: #f1f5f9;
  outline: none;

  &:focus {
    border-color: #6366f1;
  }
}

.editSelect {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #334155;
  border-radius: 6px;
  background: #0f172a;
  color: #f1f5f9;
  outline: none;
  cursor: pointer;
}

.saveBtn {
  padding: 4px 12px;
  font-size: 13px;
  border: none;
  background: #10b981;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 6px;

  &:hover {
    background: #059669;
  }
}

.cancelBtn {
  padding: 4px 12px;
  font-size: 13px;
  border: none;
  background: #64748b;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #475569;
  }
}
</style>
