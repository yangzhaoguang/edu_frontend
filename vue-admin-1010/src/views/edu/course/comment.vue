<template>
  <div>1111</div>
</template>

<script>
export default {
    data() {
        return {
            courseId: ''
        }
    },
  created() {
    this.init()
  },
  methods: {
    init() {
      //判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        console.log(this.courseId)
      }
    }
  }
};
</script>

<style></style>
