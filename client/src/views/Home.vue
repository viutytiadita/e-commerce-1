<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <a-carousel autoplay>
    <div id="cover1"><h3> 1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
      <productlist/>
      </div>
    </div>
  </div>
</template>

<script>
import productlist from '@/components/productlist.vue'

export default {
  name: 'home',
  components: {
    productlist
  }
}
</script>
<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 360px;
  line-height: 360px;
  /* background: #364d79; */
  background-image: url("http://www.brocadesboutique.com/q/2017/05/costco-floral-hydrangea-prices-kms-floral-hydrangea-prices-carnations-wholesale-sams-wholesale-flowers-buy-bulk-flowers-bulk-flowers-online-cheap-wedding-flower-packages-wholesale-sunflow.jpg");
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
div{
  padding: 0%;
}

</style>

