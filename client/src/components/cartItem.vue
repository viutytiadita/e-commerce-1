<template>
  <div>
    <div>
      <b-card :img-src="datacart.product_id.picture" img-alt="Card image" img-right class="gambar">
        <b-card-text>
          <h5>
            {{datacart.product_id.name}}
            <b-badge v-show="datacart.count > 0">{{datacart.count}}</b-badge>
          </h5>
          Rp {{datacart.product_id.price}},-
          <h5>
            <span @click="removeCart(datacart)" variant="primary">
              <a-icon type="close-circle" />
            </span>
          </h5>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import ax from "@/config/axios.js";

export default {
  name: "cartitem",
  props: ["datacart"],
  methods: {
    removeCart(cart) {
      ax.delete(`/carts/${cart._id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          return ax.patch(
            `/products/${cart.product_id._id}`,
            { stock: cart.product_id.stock + cart.count },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          );
        })
        .then(({ data }) => {
          this.$store.dispatch('GETCARTS')
          this.$store.dispatch('GETPRODUCTS')
          this.$message.success("successfully remove item from cart");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.gambar img {
  width: 6rem;
  height: 6rem;
}

.gambar {
  text-align: left;
}
</style>
