<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4" style="margin-top: 7rem">
        <a-form>
          <a-form-item label="New Password" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-input type="password" v-model="password" />
          </a-form-item>
        </a-form>
        <a-button type="primary" @click="change">Save</a-button>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import ax from "@/config/axios.js";

export default {
  data() {
    return {
      password: ""
    };
  },
  methods: {
    change() {
      ax.patch(
        "/users/",
        { password: this.password },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          this.$message.success("successfully change password");
                    this.$router.push('/')
        })
        .catch(err => {
          console.log(err);
                     this.$message.error(err.response.data.message);
        });
    }
  }
};
</script>

<style>
</style>
