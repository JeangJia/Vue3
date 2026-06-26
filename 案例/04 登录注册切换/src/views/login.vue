<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserDataStore } from '@/stores/userData'
const { userData } = storeToRefs(useUserDataStore())

const boxWidth = ref('800px')
const boxHeight = ref('400px')
const boxRef = ref(null)

onMounted(() => {
  boxRef.value.style.width = boxWidth.value
  boxRef.value.style.height = boxHeight.value
})

const flag = ref(true)
const leftRef = ref(null)
const rightRef = ref(null)

const username = ref('')
const password = ref('')
const password_second = ref('')
// 切换登录注册
const changeFlag = () => {
  flag.value = !flag.value
  const width = parseFloat(boxWidth.value)
  leftRef.value.style.transform = flag.value ? 'translateX(0)' : `translateX(${width * 0.6}px)`
  rightRef.value.style.transform = flag.value ? 'translateX(0)' : `translateX(-${width * 0.4}px)`
}
// 登录提示
const open_success = () => {
  ElMessage({
    message: '登录成功!',
    type: 'success',
  })
}
const open_error = () => {
  ElMessage.error('登录失败!')
}
// 登录验证
const login = () => {
  if (!username.value.trim()) {
    ElMessage.error('请输入用户名!')
    return
  }
  if (!password.value.trim()) {
    ElMessage.error('请输入密码!')
    return
  }
  const user = userData.value.find(
    (item) => item.username === username.value.trim() && item.password === password.value.trim()
  )
  if (user) {
    username.value = ''
    password.value = ''
    open_success()
    window.location.href = '/home'
  } else {
    open_error()
  }
}
// 注册验证
const register = () => {
  if (!username.value.trim()) {
    ElMessage.error('请输入用户名!')
    return
  }
  if (!password.value.trim()) {
    ElMessage.error('请输入密码!')
    return
  }
  if (password.value.trim() !== password_second.value.trim()) {
    ElMessage.error('两次密码不一致!')
    return
  }
  if (userData.value.find((item) => item.username === username.value.trim())) {
    ElMessage.error('用户名已存在!')
    return
  }
  userData.value.push({
    username: username.value.trim(),
    password: password.value.trim(),
  })
  ElMessage({
    message: '注册成功!',
    type: 'success',
  })
  changeFlag()
  username.value = ''
  password.value = ''
  password_second.value = ''
}
</script>

<template>
  <div class="box" ref="boxRef">
    <div class="left" ref="leftRef">
      <div v-if="flag" class="login-left">
        <h2>Welcome Back!</h2>
        <p>Please login to continue.</p>
        <button @click="changeFlag">SIGN IN</button>
      </div>
      <div v-else class="register-right">
        <h2>Hello Friend!</h2>
        <p>去注册一个账号,成为粉丝会员,开始使用吧!</p>
        <button @click="changeFlag">LOGIN</button>
      </div>
    </div>
    <div class="right" ref="rightRef">
      <div class="login-right">
        <h2 v-if="flag">登入账号</h2>
        <h2 v-else>创建账号</h2>
        <div class="login_icon">
          <svg
            t="1782371670285"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1739"
            width="25"
            height="25"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m210.5 612.4c-11.5 1.4-44.9-52.7-44.9-52.7 0 31.3-16.2 72.2-51.1 101.8 16.9 5.2 54.9 19.2 45.9 34.4-7.3 12.3-125.6 7.9-159.8 4-34.2 3.8-152.5 8.3-159.8-4-9.1-15.2 28.9-29.2 45.8-34.4-35-29.5-51.1-70.4-51.1-101.8 0 0-33.4 54.1-44.9 52.7-5.4-0.7-12.4-29.6 9.4-99.7 10.3-33 22-60.5 40.2-105.8-3.1-116.9 45.3-215 160.4-215 113.9 0 163.3 96.1 160.4 215 18.1 45.2 29.9 72.8 40.2 105.8 21.7 70.1 14.6 99.1 9.3 99.7z"
              p-id="1740"
              fill="#C5C9CC"
            ></path>
          </svg>
          <svg
            t="1782371708354"
            class="icon"
            viewBox="0 0 1025 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3647"
            width="25"
            height="25"
          >
            <path
              d="M570.934673 511.510499c-10.21403 0-20.43106 9.482028-20.43106 21.166062 0 9.484028 10.21403 18.967056 20.43106 18.967056 15.332045 0 26.277077-9.484028 26.277077-18.967056C597.21075 520.997526 586.266718 511.510499 570.934673 511.510499L570.934673 511.510499 570.934673 511.510499 570.934673 511.510499zM503.799476 412.98521c16.057047 0 26.271077-10.21403 26.271077-25.546075 0-16.053047-10.21403-25.541075-26.271077-25.541075-15.328045 0-29.925088 9.488028-29.925088 25.541075C473.874388 402.77518 488.471431 412.98521 503.799476 412.98521L503.799476 412.98521 503.799476 412.98521 503.799476 412.98521zM511.826499 63.943187c-247.385725 0-447.935312 200.545588-447.935312 447.930312 0 247.388725 200.549588 447.934312 447.935312 447.934312 247.384725 0 447.929312-200.545588 447.929312-447.934312C959.755812 264.487775 759.215224 63.943187 511.826499 63.943187L511.826499 63.943187 511.826499 63.943187 511.826499 63.943187zM427.167251 625.362832c-27.003079 0-46.708137-4.379013-72.254212-11.684034l-73.710216 37.225109 21.171062-62.765184c-51.817152-36.481107-82.471242-82.463242-82.471242-138.663406 0-99.251291 93.416274-175.148513 207.265607-175.148513 100.711295 0 190.484558 59.840175 207.998609 144.507423-7.301021-1.470004-13.871041-2.196006-19.706058-2.196006-99.256291 0-175.879515 74.440218-175.879515 164.204481 0 15.328045 2.187006 29.193086 5.835017 43.795128C439.580288 625.362832 433.006269 625.362832 427.167251 625.362832L427.167251 625.362832 427.167251 625.362832 427.167251 625.362832zM731.500143 696.881042l14.592043 52.548154-55.464162-31.380092c-21.163062 4.374013-41.600122 10.945032-62.762184 10.945032-97.795287 0-175.153513-67.141197-175.153513-150.33844 0-83.198244 77.358227-150.33844 175.153513-150.33844 92.686272 0 175.883515 67.141197 175.883515 150.33844C803.749355 625.362832 772.368263 666.957954 731.500143 696.881042L731.500143 696.881042 731.500143 696.881042 731.500143 696.881042zM359.296053 361.89806c-15.328045 0-31.380092 9.488028-31.380092 25.541075 0 15.332045 16.053047 25.551075 31.380092 25.551075 14.597043 0 26.271077-10.21903 26.271077-25.551075C385.56713 371.386088 373.893095 361.89806 359.296053 361.89806L359.296053 361.89806 359.296053 361.89806 359.296053 361.89806zM685.518008 511.510499c-10.945032 0-20.43306 9.482028-20.43306 21.166062 0 9.484028 9.488028 18.967056 20.43306 18.967056 14.596043 0 25.545075-9.484028 25.545075-18.967056C711.063083 520.997526 700.114051 511.510499 685.518008 511.510499L685.518008 511.510499 685.518008 511.510499 685.518008 511.510499zM685.518008 511.510499"
              fill="#C5C9CC"
              p-id="3648"
            ></path>
          </svg>
          <svg
            t="1782371754247"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4655"
            width="25"
            height="25"
          >
            <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
              fill="#C5C9CC"
              p-id="4656"
            ></path>
            <path
              d="M719.36 416c2.048 0.256 17.664-3.072 18.176-2.048 0.768 1.28 7.936 51.712 6.144 51.968s-14.592 3.328-14.592 3.328c-1.024-6.656-9.472-48.896-9.728-53.248m25.088-4.864l6.912 54.016c3.584 0 17.664-1.28 18.944-1.28-2.048-20.48-5.376-52.736-5.376-52.736-6.912-1.28-13.824-1.28-20.48 0m-13.568 74.752s30.72-7.68 41.728-4.096c5.632 20.48 15.872 134.912 16.896 139.52-7.168 0.768-29.952 2.816-31.744 3.328-1.28-8.448-26.88-133.376-26.88-138.752M844.8 417.28c1.792 0.512 18.176-1.792 18.176-0.512 0.256 4.096 2.048 52.224 0 52.224l-14.848 1.28c-0.256-6.656-3.84-48.64-3.328-52.992m24.832-1.28l1.28 53.248c3.584 0 17.408 0.768 18.944 0.768-0.256-20.48 0-52.736 0-52.736-6.656-1.024-13.312-1.536-20.224-1.28m-21.248 71.68s31.232-4.096 41.984 0.768c2.304 23.808 2.048 135.168 2.304 140.032-7.168 0-29.952 0.256-31.744 0.768-0.256-8.96-13.056-136.192-12.544-141.568m-72.96-137.216c18.176 92.16 32 249.856 32.256 260.096 0 0 14.336 0.256 30.464 1.28-9.472-99.328-20.992-258.304-20.992-263.168-3.84-4.352-41.728 2.048-41.728 1.792m-39.936 218.368c-3.584-25.856-96-55.296-148.224-45.824 0 0-6.4-56.832-8.96-112.384-2.048-47.36-0.256-93.696 0-101.12-3.584-2.56-40.96 15.36-61.184 22.784 0 0 24.32 102.656 41.728 315.392 0 0 28.16 3.072 76.288-6.4 48.128-9.216 105.216-38.144 100.352-72.448m-113.152 46.592l-8.192-58.624c2.048-1.024 51.968 17.664 57.344 20.992-0.768 3.584-49.152 37.632-49.152 37.632m-288.768-199.424c2.048 0.256 17.664-3.072 18.176-2.048 0.512 1.28 7.936 51.712 6.144 51.968-1.792 0.256-14.848 3.328-14.848 3.328-0.768-6.912-9.216-48.896-9.472-53.248m24.832-4.864l6.912 54.016c3.584 0 17.664-1.28 18.944-1.28-2.048-20.48-5.376-52.736-5.376-52.736-6.912-1.536-13.824-1.536-20.48 0m-13.568 74.752s30.72-7.68 41.728-4.096c5.632 20.48 15.872 134.912 16.896 139.52-7.168 0.768-29.952 2.816-31.744 3.328-1.024-8.192-26.88-133.12-26.88-138.752m113.92-68.608c1.792 0.512 18.176-1.792 18.176-0.512 0.256 4.096 2.048 52.224 0.256 52.224l-14.848 1.28c-0.512-6.4-3.84-48.384-3.584-52.992m24.832-1.28l1.28 53.248c3.584 0 17.408 0.768 18.944 0.768-0.256-20.48 0-52.736 0-52.736-6.656-1.024-13.312-1.536-20.224-1.28m-21.248 71.424s31.232-4.096 41.984 0.768c2.304 23.808 2.048 135.168 2.304 140.032-7.168 0-29.952 0.256-31.744 0.768 0-8.704-13.056-136.192-12.544-141.568m-72.96-136.96c18.176 92.16 32 249.856 32.256 260.096 0 0 14.336 0.256 30.464 1.28-9.472-99.328-20.992-258.304-20.992-263.68-3.84-4.096-41.728 2.304-41.728 2.304m-39.68 218.368c-3.584-25.856-96-55.296-148.224-45.824 0 0-6.4-56.832-8.96-112.384-2.048-47.36-0.256-93.696 0-101.12-3.328-2.304-40.96 15.36-61.184 22.784 0 0 24.32 102.656 41.728 315.392 0 0 28.16 3.072 76.288-6.4 48.128-9.216 105.216-38.144 100.352-72.448m-113.152 46.592l-8.192-58.624c2.048-1.024 51.968 17.664 57.344 20.992-1.024 3.584-49.152 37.632-49.152 37.632"
              fill="#FFFFFF"
              p-id="4657"
            ></path>
          </svg>
        </div>
        <span style="font-size: 12px; color: #c5c9cc; margin-top: 5px"
          >也可以使用以上其他方式进行{{ flag ? '登录' : '注册' }}</span
        >
        <!-- username_input -->
        <input
          style="margin-top: 20px"
          type="text"
          placeholder="Username"
          v-model="username"
          @keyup.enter="login"
        />
        <!-- password_input -->
        <input
          style="margin-top: 20px"
          type="password"
          placeholder="Password"
          v-model="password"
          @keyup.enter="login"
        />
        <!-- password_second_input -->
        <input
          v-if="!flag"
          style="margin-top: 20px"
          type="password"
          placeholder="Password"
          v-model="password_second"
        />
        <el-button v-if="flag" type="primary" class="login_but" :plain="true" @click="login"
          >LOGIN</el-button
        >
        <el-button v-if="!flag" type="primary" class="login_but" :plain="true" @click="register"
          >REGISTER</el-button
        >
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.box {
  width: 800px;
  height: 400px;
  margin: 180px auto;
  border-radius: 18px;
  display: flex;
  box-shadow: 6px 6px 16px #fff, -6px -6px 16px #fff;
  overflow: hidden;

  .left {
    width: 40%;
    height: 100%;
    background-color: #ecf0f3;
    position: relative;
    transition: 0.5s ease;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    .login-left {
      h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        color: #c5c9cc;
      }
      button {
        width: 170px;
        height: 40px;
        margin-top: 20px;
        border-radius: 28px;
        background-color: #409eff;
        color: #ffffff;
        border: none;
        outline: none;
        box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #ffffff;
        transition: 0.4s ease;
      }
      button:hover {
        transform: translateY(-4px);
      }
    }
    .register-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h2 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        color: #c5c9cc;
        text-align: center;
        line-height: 1.5;
      }
      button {
        width: 170px;
        height: 40px;
        margin-top: 20px;
        border-radius: 28px;
        background-color: #409eff;
        color: #ffffff;
        border: none;
        outline: none;
        box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #ffffff;
        transition: 0.3s ease;
      }
      button:hover {
        transform: translateY(-4px);
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -8px;
      width: 8px;
      height: 100%;
      background: linear-gradient(to right, rgba(209, 217, 230, 0.6), transparent);
    }
  }
  .right {
    width: 60%;
    height: 100%;
    background-color: #ecf0f3;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
    transition: 0.5s ease;
    box-shadow: 6px 6px 16px #d1d9e6, -6px -6px 16px #ffffff;
    border-right: 1px solid #d1d1d1;
    .login-right {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      input {
        width: 250px;
        height: 35px;
        margin: 4px 0;
        padding-left: 18px;
        font-size: 16px;
        border: 1px solid transparent;
        outline: none;
        background-color: #ecf0f3;
        transition: box-shadow 0.3s ease, border-color 0.3s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #d1d9e6;
      }
      input:focus {
        outline: none;
        box-shadow: inset 4px 4px 4px #d1d9e6, inset -2px -2px 4px #d1d9e6;
        border-color: #409eff;
      }
      .login_but {
        width: 170px;
        height: 40px;
        margin-top: 20px;
        border-radius: 28px;
        box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #ffffff;
      }
      svg {
        margin: 10px 5px;
        transition: 0.2s ease;
      }
      svg:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
