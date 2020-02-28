<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">加法</router-link> |
      <router-link to="/sub">减法</router-link> -->
      <span :class="btnCss.AddGen" @click="handleClick('AddGen')">加法</span> | 
      <span :class="btnCss.SubGen" @click="handleClick('SubGen')">减法</span>
    </div>
    <component :is="comp"></component>
  </div>
</template>

<script>
import AddGen from './views/add-gen';
import SubGen from './views/sub-gen';
export default {
  name: 'App',
  components: {
    AddGen,
    SubGen
  },
  data() {
    return {
      comp: 'AddGen',
      btnCss: {
        AddGen: 'active',
        SubGen: ''
      },
    }
  },
  methods: {
    handleClick(_str) {
      this.btnCss = {
        AddGen: '',
        SubGen: ''
      };
      this.btnCss[_str] = 'active';
      this.comp = _str;
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  color: #2c3e50;
  span {
    cursor: pointer;
  }
  .active {
    color: #42b983;
  }
}
</style>
