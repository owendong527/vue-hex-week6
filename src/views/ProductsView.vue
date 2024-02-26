<template>
  <!-- vue-loading-overlay -->
  <VueLoading
    :active="isLoading"
    :color="color"/>

    <div class="py-5">
      <div class="card py-5 px-3">
        <div class="card-body">
          <!-- productModal -->
          <ProductModal
          ref="pModal"
          :temp-modal="tempProduct"
          :add-cart-modal="addToCart"
          :is-loading="status.addToCartLoading"
          ></ProductModal>
        <!-- 產品、購物車列表 -->
        <div class="row justify-content-center">
          <!-- 產品列表 -->
          <div class="col-md-10">
            <table class="table align-middle
            text-center">
              <thead>
                <tr>
                  <th>商品圖片</th>
                  <th>商品名稱</th>
                  <th>商品價格</th>
                  <th>商品選項</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pItem in remoteData"
                :key="pItem.id">
                  <td style="width: 150px;">
                    <div
                    style="height: 100px;
                    background-size: cover;
                    background-position: center;"
                    :style="{'backgroundImage' :
                    `url(${pItem.imageUrl})`}"
                    ></div>
                  </td>
                  <td class="fw-bold">
                    {{pItem.title}}</td>
                  <td>
                    <div v-if="pItem.origin_price ==
                    pItem.price">
                      <p class="mb-0 fw-bold">
                        原價{{pItem.origin_price}}元
                      </p>
                    </div>
                    <div v-else>
                      <del class="mb-0
                      text-muted">
                        原價{{pItem.origin_price}}元
                      </del>
                      <p class="mb-0 fw-bold">
                        現在只要{{pItem.price}}元
                      </p>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex
                    justify-content-center">
                      <button class="btn fw-bold
                      btn-outline-success"
                      type="button"
                      @click="openModal(pItem)"
                      >查看更多</button>
                      <button class="btn fw-bold
                      btn-outline-primary"
                      type="button"
                      @click="addToCart(pItem)"
                      >
                      <span
                      v-if="pItem.id ===
                      status.addToCartLoading"
                      class="spinner-border
                      spinner-border-sm"
                      aria-hidden="true"></span>
                      加入購物車</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductModal from '../components/ProductsModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      remoteData: [],
      tempProduct: {},
      carts: [],
      status: {
        addToCartLoading: '',
        delCartLoading: '',
      },
      isLoading: true,
      color: '#993300',
    };
  },
  components: {
    ProductModal,
  },
  methods: {
    getRemoteData() {
      this.isLoading = true;
      this.$http(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          // console.log('已取得產品', res);
          this.remoteData = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          alert('未取得產品', err.response.data.message); // eslint-disable-line no-alert
        });
    },
    openModal(product) {
      // console.log(product);
      this.tempProduct = product;
      this.$refs.pModal.show();
    },
    // 以下加入的是產品內容
    addToCart(product, qty = 1) {
      // console.log(product, qty);
      const cartData = {
        product_id: product.id,
        qty,
      };
      const message = `加入購物車成功，新增 ${qty} 筆商品~~`;
      this.status.addToCartLoading = product.id;
      this.$http
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: cartData })
        .then((res) => {
          alert(message, res); // eslint-disable-line no-alert
          this.status.addToCartLoading = '';
          this.$refs.pModal.close();
        })
        .catch((err) => {
          alert('未加入購物車', err.response); // eslint-disable-line no-alert
        });
    },
  },
  mounted() {
    this.getRemoteData();
  },
};
</script>
