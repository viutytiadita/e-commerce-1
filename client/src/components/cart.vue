<template>
  <div>
    <a-drawer
      title="Your Shopping Cart"
      width="350"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div class="haha" v-if="carts.length < 1">
        <h4>Your shopping cart still empty! Go choose your flowers now!</h4>
        <img
          src="https://image.freepik.com/free-vector/bear-vector-polar-bear-heart-valentine-cartoon-shopping-cart_71328-109.jpg"
          alt="bear"
        />
      </div>
      <cItem v-for="cart in carts" :key="cart._id" :datacart="cart" />
      <div v-if="countTotal > 0">
        <h5>Total : Rp {{countTotal}},-</h5>
      </div>
      <div
        v-if="carts.length > 0"
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button style="marginRight: 8px" @click="onClose">Cancel</a-button>
        <a-button @click="checkOut" type="primary">Checkout</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import cItem from "@/components/cartItem.vue";
import ax from "@/config/axios.js";
import { mapState } from "vuex";

export default {
  name: "cart",
  components: {
    cItem
  },
  data() {
    return {
      visible: false,
      totalprice : 0
    };
  },
  computed: {
    ...mapState(["carts"]),
    countTotal(){
      if(this.carts.length <= 0){
        return 0
      }
      console.log(this.carts.length,'iiiiii');
      this.totalprice = 0
      this.carts.forEach(cart => {
        let price = cart.product_id.price * cart.count
        this.totalprice = this.totalprice + price
      });
      return this.totalprice
    }                
  },
  methods: {
    checkOut(){
      ax.post(`/transactions`,{
            total : this.totalprice,
            carts: this.carts
          },{
            headers: {
              token: localStorage.getItem("token")
            }
          })
        .then(({data})=>{
            this.$store.dispatch('GETCARTS')
            this.$message.success("successfully checkout");
            this.onClose()
            this.$router.push('/transaction')
        })
        .catch(err =>{
            this.$message.error(err.response.data.message);
        })
    },
    onClose() {
      this.visible = false;
      this.$emit("close-cart", false);
    },
  },
  created() {
    this.visible = true;
    this.$store.dispatch('GETCARTS')
  }
  
};
</script>

<style>
</style>
