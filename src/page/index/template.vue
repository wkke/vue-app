<template>
  <section>
    <p>{{greeting}}</p>
    <Test/>
    <div class="box">{{test}}</div>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </section>


</template>
<script>
import Test from "@component/test";
import { getFetchTest } from "@model/index";
export default {
  components:{
    Test,
  },
  created(){
    this.getInitialFetch();
  },
  data(){
    return{
      greeting:"HELLO WORLD",
      test:"Loading...",
    };
  },
  methods:{
    async getInitialFetch(){
      const res = await getFetchTest();
      this.test = res;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss"
</style>

