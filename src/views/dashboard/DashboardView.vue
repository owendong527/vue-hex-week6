<template>
  <h2>這是後台</h2>
  <nav>
    <RouterLink to="/admin/products">產品列表</RouterLink> |
    <RouterLink to="/admin/order">訂單列表</RouterLink> |
    <RouterLink to="/">回到前台</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    // 確認登入
    checkAdmin() {
      axios
        .post(`${VITE_URL}/v2/api/user/check`)
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log('驗證成功', res.data.success);
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          // alert(err.data.message);
          // window.location = "login.html";
          this.$router.push('/login');
        });
    },
    openProduct(item) {
      this.productCheck = item;
    },
  },
  mounted() {
    // 取得 在登入頁面寫入cookie的Token 這裡拿出來用
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // console.log(token);
    // 因為登入的頁面是管理者登入的 而必須帶入 token，而這token 須帶在header裡面
    axios.defaults.headers.common.Authorization = token;

    // this.getProducts();
    // 先確認登入
    this.checkAdmin();
  },
};
</script>
