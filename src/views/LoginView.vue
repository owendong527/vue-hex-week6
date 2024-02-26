<!-- eslint-disable no-console -->
<template>
  <h2>登入頁面</h2>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              v-model="user.username"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              v-model="user.password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2023~∞ - 六角學院</p>
  </div>
</template>

<script>
import axios from 'axios';

// console.log(import.meta.env);
const { VITE_URL } = import.meta.env;
// const site = 'https://vue3-course-api.hexschool.io/v2';
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // 登入
    login() {
      const api = `${VITE_URL}/v2/admin/signin`;
      // console.log(api)
      // console.log(axios)
      // 以上確認 api路徑 和 axios 有沒有導入成功

      axios
        .post(api, this.user)
        // 成功
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
          // 從res 裡面知道很多訊息，其中把token和 expire 取出來，解構取得參數
          const { expired, token } = res.data;
          // eslint-disable-next-line no-console
          console.log(expired, token);
          // 將Token寫入到cookie的方法（避免跨網域CORS問題）
          // expires 設置有效時間${new Date(expired)}
          document.cookie = `hexVueToken=${token}; expires=${new Date(
            expired,
          )};`;
          this.$router.push('/admin/products');
        })
        .catch(() => {
          // console.log(‘err’, err.data.message);
          // eslint-disable-next-line no-alert
          alert('登入失敗');
        });
    },
  },
  mounted() {
    // console.log(this.$router, this.$route);
  },
};
</script>
