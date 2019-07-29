<template>
  <div>
    <b-card
      :title="dataitem.name"
      :img-src="dataitem.picture"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 15rem;"
      class="mb-2"
    >
      <b-card-text>
        <p>Rp {{dataitem.price}},-</p>
        <small>{{dataitem.stock}} pcs</small>
      </b-card-text>

      <a-button
        type="primary"
        v-show="role == 'customer'"
        @click="addtoCart(dataitem)"
        icon="shopping-cart"
        :loading="loading"
      >Add To Cart</a-button>
      <span v-show="role == 'admin'" @click="deleteProduct(dataitem._id)">
        <a-icon
          type="delete"
          style="color:#EC5578; fontSize:26px; margin-right:10px;"
          theme="filled"
        />
      </span>
      <span v-show="role == 'admin'" type="primary" @click="showModal">
        <a-icon type="edit" style="color:#EC5578; fontSize:26px;" theme="filled" />
      </span>
    </b-card>

    <a-modal
      title="Edit Product"
      :visible="visible"
      @ok="handleOk(dataitem)"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="Name of Product" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="dataproduct.name" />
        </a-form-item>

        <a-form-item label="Price of Product" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-input-number :min="1" v-model="dataproduct.price" />
        </a-form-item>

        <a-form-item label="Stock of Product" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
          <a-input-number :min="1" v-model="dataproduct.stock" />
        </a-form-item>

        <picture-input
          ref="pictureInput"
          @change="onChange"
          width="300"
          height="300"
          margin="16"
          accept="image/jpeg, image/png"
          size="10"
          buttonClass="btn"
          :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or JPG'
      }"
        ></picture-input>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import ax from "@/config/axios.js";
import { mapState } from "vuex";

export default {
  name: "item",
  props: ["dataitem"],
  components: {
    PictureInput
  },
  computed: {
    ...mapState(["role"])
  },
  data() {
    return {
      dataproduct: {
        name: this.dataitem.name,
        price: this.dataitem.price,
        stock: this.dataitem.stock,
        picture: this.dataitem.picture
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      loading: false
    };
  },
  methods: {
    addtoCart(product) {
      this.loading = true;

      if (product.stock <= 0) {
        this.$message.error("stock is empty, cannot add to cart");
        this.loading = false;
      } else {
        ax.patch(
          `/products/${product._id}`,
          { stock: product.stock - 1 },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
          .then(({ data }) => {
            
            ax.get(`/carts/${product._id}`, {
              headers: {
                token: localStorage.getItem("token")
              }
            })
          .then(({ data }) => {
            console.log(data,'iiiiii');
            
            if (data) {
              ax.patch(
                `/carts/${data._id}`,
                {
                  count: data.count
                },
                {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                }
              ).then(({ data }) => {
                console.log(data);
                this.loading = false;
                this.$store.dispatch("GETPRODUCTS");
                this.$message.success("successfully added");
              });
            } else {
              ax.post(
                "/carts",
                {
                  product_id: product._id
                },
                {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                }
              )
                .then(response => {
                  console.log(response.data, "addcart");
                  this.loading = false;
                  this.$message.success("successfully add to cart");
                  this.$store.dispatch("GETPRODUCTS");
                })
                .catch(err => {
                  console.log(err);
                  this.loading = false;
                });
            }
          })
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }
    },
    deleteProduct(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            return this.$store.dispatch("DELETEPRODUCTS", id).then(data => {
              $swal.fire(
                "Deleted!",
                "one product has been deleted.",
                "success"
              );
            });
          }
        })
        .catch(err => {
          $swal.fire(err.response.data.message, "error");
        });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(data) {
      this.confirmLoading = true;
      console.log(data, "ppp");

      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
      this.editProduct(data);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        console.log(image);
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    editProduct(data) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      let newImage = new FormData();
      newImage.append("image", this.$refs.pictureInput.file);
      newImage.append("name", this.dataproduct.name);
      newImage.append("price", this.dataproduct.price);
      newImage.append("stock", this.dataproduct.stock);
      let obj = {
        id: data._id,
        newImage
      };
      this.$store
        .dispatch("UPDATEPRODUCTS", obj)
        .then(({ data }) => {
          this.confirmLoading = false;
          this.visible = false;
          Toast.fire({
            type: "success",
            title: "successfully editted"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
img {
  height: 15rem;
}
</style>
