<template>
  <div class="py-5">
    <div class="card py-5 px-3">
      <div class="card-body">
        <!-- 產品、購物車列表 -->
        <div class="row justify-content-center">
          <!-- 購物車列表 -->
          <div class="col-md-10">
            <table class="table align-middle text-center">
              <thead>
                <tr>
                  <th width="150">商品圖</th>
                  <th width="200">品名</th>
                  <th >數量</th>
                  <th width="150">單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cItem in carts.carts"
                :key="cItem.id">
                  <td>
                    <div
                      style="height: 150px;
                      background-size: cover;
                      background-position: center;"
                      :style="{'backgroundImage' :
                      `url(${cItem.product.imageUrl})`}"
                    ></div>
                  </td>
                  <td>{{cItem.product.title}}</td>
                  <td>
                    <div class="d-flex flex-nowrap
                      justify-content-center">
                      <button
                      v-if="cItem.qty > 1"
                      class="btn
                      btn-outline-primary
                      shadow-none"
                      type="button"
                      @click="cItem.qty--;
                      changeQty(cItem,cItem.qty)"
                      >
                        <i class="bi bi-dash-lg"></i>
                      </button>
                      <button
                      v-else
                      class="btn
                      btn-outline-danger
                      shadow-none"
                      type="button"
                      @click="delCart(cItem.id)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                      <input type="number"
                      class="form-control
                      bg-transparent
                      shadow-none
                      text-center" readonly
                      v-model="cItem.qty"
                      >
                      <button
                      class="btn
                      btn-outline-primary
                      shadow-none"
                      type="button"
                      @click="cItem.qty++;
                      changeQty(cItem, cItem.qty)"
                      >
                        <i class="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </td>
                  <td class="text-end">
                    ${{cItem.total}}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-end fw-bold">
                  <td colspan="3">總價</td>
                  <td colspan="4">
                    {{carts.total}}元</td>
                </tr>
                <tr v-if="carts.final_total !==
                carts.total"
                class="text-success text-end
                fw-bold">
                  <td colspan="3">優惠價</td>
                  <td colspan="4">
                    {{carts.final_total}}元</td>
                </tr>
              </tfoot>
            </table>
            <button class="btn
            btn-outline-danger
            d-block ms-auto"
            type="button"
            @click="delCarts">
            <span
            v-if="carts === status.delCartLoading"
            class="spinner-border
            spinner-border-sm"
            aria-hidden="true"></span>
            刪除全品項</button>
          </div>
        </div>
        <div class="my-5">
          <hr>
        </div>
        <!-- 表單驗證 -->
        <div class="mx-auto" style="width: 500px">
          <h3 class="fw-bold text-center">
            請填寫表單
          </h3>
          <VForm action="#" v-slot="{ errors }"
          @submit="onSubmit" ref="form">
            <div class="mb-3">
              <label for="mail" class="form-label
              fw-bold">
                信箱
              </label>
              <VField
                id="mail"
                type="mail"
                name="Email"
                class="form-control"
                placeholder="請輸入信箱"
                rules="email|required"
                v-model="form.user.email"
                :class="{ 'is-invalid': errors['Email'] }"
                ></VField>
                <error-message name="Email"
                class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label fw-bold">
                姓名
              </label>
              <VField
                id="name"
                type="text"
                name="Name"
                class="form-control"
                rules="required"
                v-model="form.user.name"
                placeholder="請輸入姓名"
                :class="{ 'is-invalid': errors['Name'] }"
                ></VField>
                <error-message name="Name"
                class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="tel" class="form-label fw-bold">
                電話
              </label>
              <VField
                id="tel"
                type="tel"
                name="Telephone"
                class="form-control"
                :rules="isPhone"
                v-model="form.user.tel"
                :class="{ 'is-invalid': errors['Telephone'] }"
                placeholder="請輸入電話"></VField>
                <error-message name="Telephone"
                class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label fw-bold">
                地址
              </label>
              <VField
                id="address"
                name="Area"
                class="form-control"
                :class="{ 'is-invalid': errors['Area'] }"
                placeholder="請輸入地區"
                rules="required"
                v-model="form.user.address"
                as="select"
                >
                <option value="" selected disabled>請選擇地區</option>
                <option value="台北市">台北市</option>
                <option value="新北市">新北市</option>
                <option value="桃園市">桃園市</option>
                <option value="新竹市">新竹市</option>
                <option value="台中市">台中市</option>
              </VField>
              <error-message name="Area"
                class="invalid-feedback"></error-message>
            </div>
            <div class="mb-3">
              <label for="message" class="form-label fw-bold">
                留言
              </label>
              <VField
              id="message"
              rows="10"
              name="Message"
              class="form-control"
              v-model="form.user.message"
              as="textarea"
              :class="{ 'is-invalid': errors['Message'] }"
              ></VField>
            </div>
            <div class="mb-3">
              <div class="d-flex gap-2 justify-content-end">
                <button class="btn btn-outline-secondary
                w-25" type="button"
                @click="resetData"
                >取消</button>
                <button class="btn btn-primary w-25"
                type="submit">送出</button>
              </div>
            </div>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      carts: [],
      status: {
        addToCartLoading: '',
        delCartLoading: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    // 以下加入的是產品內容
    addToCart(product, qty = 1) {
      // console.log(product, qty);
      const cartData = {
        product_id: product.id,
        qty,
      };
      this.status.addToCartLoading = product.id;
      // console.log(cartData);
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: cartData })
        .then(() => {
          // alert('已加入購物車', res);
          this.status.addToCartLoading = '';
          this.$refs.pModal.close();
          this.getCarts();
        })
        .catch((err) => {
          alert('未加入購物車', err.response); // eslint-disable-line no-alert
        });
    },
    getCarts() {
      this.$http(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          // console.log('取得購物車資料', res);
          this.carts = res.data.data;
        })
        .catch((err) => {
          alert('未取得購物車資料', err.response); // eslint-disable-line no-alert
        });
    },
    // 以下變更的是購物車內容
    changeQty(cart, qty = 1) {
      // console.log(cart, qty);
      const cartData = {
        product_id: cart.product_id,
        qty,
      };
      // console.log(cartData);
      this.$http
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`, { data: cartData })
        .then(() => {
          // console.log('已變更購物車數量', res);
          this.getCarts();
        })
        .catch((err) => {
          alert('未變更購物車數量', err.response); // eslint-disable-line no-alert
        });
    },
    delCart(id) {
      // console.log(id);
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${id}`)
        .then((res) => {
          // eslint-disable-next-line no-alert
          alert('已刪除單一購物車品項', res.data.message);
          this.getCarts();
        })
        .catch((err) => {
          alert('未刪除單一購物車品項', err.response); // eslint-disable-line no-alert
        });
    },
    delCarts() {
      this.status.delCartLoading = this.carts;
      this.$http
        .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then((res) => {
          this.status.delCartLoading = '';
          // eslint-disable-next-line no-alert
          alert(res.data.message);
          this.getCarts();
        })
        .catch((err) => {
          this.status.delCartLoading = '';
          // eslint-disable-next-line no-alert
          alert(err.response);
          // alert('未刪除購物車品項', err.response); // eslint-disable-line no-alert
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '電話號碼需09開頭唷';
    },
    resetData() {
      this.$refs.form.resetForm();
    },
    onSubmit() {
      // console.log(this);
      const sendData = this.form;
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/order`, { data: sendData })
        .then((res) => {
          // eslint-disable-next-line no-alert
          alert(res.data.message);
          // alert('已建立訂單囉', res); // eslint-disable-line no-alert
          this.$refs.form.resetForm();
          this.getCarts();
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(err.response);
          // alert('未送表單', err.response); // eslint-disable-line no-alert
        });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
