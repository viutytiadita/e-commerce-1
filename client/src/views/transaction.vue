<template>
  <div class="d-flex justify-content-center">
    <div v-if="role=='customer'">
    <a-card 
      title="Order"
      style="width: 450px"
      v-for="transaction in transactions"
      :key="transaction._id"
    >
      <div
        class="d-flex justify-content-between"
        v-for="product in transaction.products"
        :key="product.id._id"
      >
        <a-avatar shape="square" :src="product.id.picture" />
        <p class="mr-5">{{product.id.name}}</p>
        <p>Rp {{product.id.price}}</p>
        <p class="ml-5">{{product.count}} pcs</p>
      </div>
      <div>
        <b>Total Payment : {{transaction.total}}</b>
      </div>
      <br />
      <div>
         <a-badge count="delivering..." :numberStyle= "{backgroundColor: '#52c41a'} " v-if="transaction.status=='deliver' && role=='customer'"/>
        <a-button
          type="primary"
          v-if="transaction.status=='waiting' && role=='customer'"
          @click="changeStatus(transaction._id,'deliver')"
        >Pay</a-button>
        <a-button
          type="primary"
          v-if="transaction.status=='deliver' && role=='admin'"
          @click="changeStatus(transaction._id,'accept')"
        >Send Order</a-button>
        <a-button
          type="primary"
          v-if="transaction.status=='accept' && role=='customer'"
          @click="changeStatus(transaction._id,'done')"
        >Order Arrived</a-button>
        <a-badge count="transaction done" :numberStyle= "{backgroundColor: '#52c41a'} " v-if="transaction.status=='done' && role=='customer'"/>
      </div>
    </a-card>
    </div>

    <div v-if="role=='admin'">
    <a-card 
      title="Order"
      style="width: 450px"
      v-for="transaction in alltrans"
      :key="transaction._id"
    >
      <div
        class="d-flex justify-content-between"
        v-for="product in transaction.products"
        :key="product.id._id"
      >
        <a-avatar shape="square" :src="product.id.picture" />
        <p class="mr-5">{{product.id.name}}</p>
        <p>Rp {{product.id.price}}</p>
        <p class="ml-5">{{product.count}} pcs</p>
      </div>
      <div>
        <b>Total Payment : {{transaction.total}}</b>
      </div>
      <br />
      <div>
        <a-badge count="waiting for customer payment" :numberStyle= "{backgroundColor: '#52c41a'} " v-if="transaction.status=='waiting' && role=='admin'"/>
        <a-badge count="delivered" :numberStyle= "{backgroundColor: '#52c41a'} " v-if="transaction.status=='done' && role=='admin'"/>
        <a-button
          type="primary"
          v-if="transaction.status=='waiting' && role=='customer'"
          @click="changeStatus(transaction._id,'deliver')"
        >Pay</a-button>
        <a-button
          type="primary"
          v-if="transaction.status=='deliver' && role=='admin'"
          @click="changeStatus(transaction._id,'accept')"
        >Send Order</a-button>
         <a-badge count="waiting for confirmation arriving" :numberStyle= "{backgroundColor: '#52c41a'} " v-if="transaction.status=='accept' && role=='admin'"/>
        <a-button
          type="primary"
          v-if="transaction.status=='accept' && role=='customer'"
          @click="changeStatus(transaction._id,'done')"
        >Order Arrived</a-button>
      </div>
    </a-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ax from "@/config/axios.js";

export default {
  name: "trans",
  computed: {
    ...mapState(["transactions", "role",'alltrans'])
  },
  data() {
    return {
      status: "waiting",
      datatrans: []
      // role: localStorage.role
    };
  },
  created() {
    if (this.role == "customer") {
      this.$store.dispatch("GETTRANSACTIONS");
    } else if (this.role == "admin") {
      this.$store.dispatch("GETALLTRANSACTIONS");
    }
  },
  methods: {
    changeStatus(id, payload) {
      ax.patch(
        `transactions/${id}`,
        {
          status: payload
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          console.log(data, "ini");
          if (this.role == "customer") {
            this.$store.dispatch("GETTRANSACTIONS");
          } else if (this.role == "admin") {
            this.$store.dispatch("GETALLTRANSACTIONS");
          }
        })
        .catch(err => {
          this.$message.error(err.response.data.message);
        });
    }
  }
};
</script>
<style>
</style>