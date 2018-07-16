<template>
  <section>
    <navmenu_float></navmenu_float>
    <p>{{greeting}}</p>
    <Test/>
    <div class="box">{{test}}</div>
  </section>


</template>
<script>
import Test from "@component/test";
import { getFetchTest } from "@model/index";
import navmenu_float from "@component/navbar/navmenu_float.vue";

export default {
  components:{
    Test,navmenu_float,
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

