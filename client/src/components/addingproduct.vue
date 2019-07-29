<template>
  <div>
<a-button type="primary" @click="showModal">New Product</a-button>
<a-modal
      title="New Product"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >

<a-form
    :form="form"
  >
  <a-form-item
      label="Name of Product"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input v-model="dataproduct.name"
        v-decorator="[
          'name',
          {rules: [{ required: true, message: 'Please input the name!' }]}
        ]"
      />
    </a-form-item>
    
    <a-form-item
      label="Price of Product"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input-number :min="1" v-model="dataproduct.price" v-decorator="[
          'price',
          {rules: [{ required: true, message: 'Please input the price!' }]}
        ]"

      />
    </a-form-item>

     <a-form-item
      label="Stock of Product"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input-number :min="1" v-model="dataproduct.stock" v-decorator="[
          'stock',
          {rules: [{ required: true, message: 'Please input the stock!' }]}
        ]"

      />
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

export default {
  components: {
    PictureInput
  },
  data() {
    return {
      dataproduct: {
        name: "",
        price: "",
        stock: ""
      },
      error: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
    };
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      this.addProduct()    
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
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
    addProduct() {
      let newImage = new FormData();
      newImage.append("image", this.$refs.pictureInput.file);
      newImage.append("name", this.dataproduct.name);
      newImage.append("price", this.dataproduct.price);
      newImage.append("stock", this.dataproduct.stock);
      if(!this.dataproduct.name || !this.dataproduct.price || this.dataproduct.stock){
        setTimeout(() => {
        this.confirmLoading = false;
      }, 2000);
      }

      this.$store.dispatch('CREATEPRODUCTS',newImage)
      .then((data)=>{
        this.confirmLoading = false
        this.visible = false
      })
      .catch(err =>{
        console.log(err);
        
        this.error = err
      })
    }
  }
};
</script>
