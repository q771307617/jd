<template>
  <div>
    <div>首页
      <h1>{{ title }}</h1>
    </div>
    <!-- <nuxt/> -->
  </div>
</template>
<script>
import axios from 'axios';

export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  async asyncData({ params }) {
    let { data } = await axios.get(`http://test.djl.yumc.pw:8285/api/admin/department/list`);
    return { title: data };
  }
};
</script>