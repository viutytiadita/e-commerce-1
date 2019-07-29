<template>
  <div class="container-fluid">
    <div id="nav">
      <b-navbar type="dark" variant="light">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Vue Florist</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-show="isLogin && role == 'admin'">
            <a-dropdown>
              <a class="ant-dropdown-link" href="#">
                Menu
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <router-link to="/register">New Admin</router-link>
                </a-menu-item>
                <a-menu-item>
                  <router-link to="/changepassword">Change Password</router-link>
                </a-menu-item>
                <a-menu-item>
                  <router-link to="/transaction">Orders</router-link>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </b-nav-item>
          <b-nav-item>
            <span v-show="isLogin && role == 'customer'" @click="showDrawer">
              <a-badge :count="carts.length">
              <a-icon type="shopping-cart" style="color:#EC5578; fontSize:26px;" />
              </a-badge>
            </span>
          </b-nav-item>
          <b-nav-item>
            <router-link v-show="!isLogin" to="/register">Sign Up</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link v-show="isLogin && role == 'customer'" to="/transaction">Transaction</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link v-show="!isLogin" to="/login">Sign In</router-link>
          </b-nav-item>
          <b-nav-item v-show="isLogin" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <cart v-if="cartPage" @close-cart="closeCart" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import cart from "@/components/cart.vue";

export default {
  components: {
    cart
  },
  computed: {
    ...mapState(["isLogin", "role","carts"])
  },
  data() {
    return {
      cartPage: false
    };
  },
  watch:{
    carts(){
      this.$store.dispatch('GETCARTS')
    }
  },
  methods: {
    closeCart(payload) {
      this.cartPage = payload;
    },
    showDrawer() {
      this.cartPage = true;
    },
    logout() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });
      localStorage.clear();
      this.$store.commit("ISLOGIN", false);
      this.$store.commit("ROLE", null);
      Toast.fire({
        type: "success",
        title: "you are successfully logout!"
      });
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.container-fluid {
  padding: 0%;
}
</style>
