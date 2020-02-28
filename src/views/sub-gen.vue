<style lang="less">
.home {
  font-family: "微软雅黑", "Microsoft YaHei", "Microsoft YaHei UI", "Segoe UI",
    Arial, Verdana, Sans-Serif, sans-serif;
  .btn {
    font-size: 26px;
    padding: 3px 18px;
    margin-bottom: 10px;
  }
  .list-box {
    margin: 0 auto;
    font-size: 20px;
    td {
      position: relative;
      padding: 10px 0;
      .validator {
        position: absolute;
        width: 90px;
        top: 10px;
        left: 10px;
        text-align: left;
        .correct {
          color: #42b983;
        }
        .error {
          color: #ff0000;
        }
      }
      &.suanshi {
        span {
          display: inline-block;
          width: 32px;
          input {
            width: 26px;
            text-align: center;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="home">
    <button class="btn" @click="showResult">检查答案</button>
    <table class="list-box">
      <tr v-for="(i,index) of items" :key="index">
        <td class="suanshi">
          <component @subInput="subInput" :is="setInput(i.a)" :val="i.a" :index="index" :data="i"></component>-
          <component @subInput="subInput" :is="setInput(i.b)" :val="i.b" :index="index" :data="i"></component>=
          <component
            @subInput="subInput"
            :is="setInput(i.result)"
            :val="i.result"
            :index="index"
            :data="i"
          ></component>
        </td>
        <td>
          <span class="validator" v-if="showFlag" v-html="i.validator">{{i.validator}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import num from "./num.vue";
import numInput from "./numInput.vue";
export default {
  name: "Home",
  components: {
    num,
    numInput
  },
  data() {
    return {
      showFlag: false, //显示答案
      maxNumber: 30, // 生成数量（条）
      range: 10, // 算数范围【最大值】
      items: [] // 算数题元素
    };
  },
  created() {
    this.makeGen();
  },
  methods: {
    showResult() {
      this.showFlag = !this.showFlag;
    },
    makeGen() {
      let _obj;
      while (this.items.length < this.maxNumber) {
        _obj = this.sub();
        if (_obj !== undefined) this.items.push(_obj);
      }
    },
    // 按范围生成随机数
    randomNum() {
      return Math.round(Math.random() * this.range);
    },
    // 生成加法数
    add() {
      let _a = this.randomNum();
      let _b = this.randomNum();
      let _temp = {};
      if (_a + _b > this.maxNumber) {
        this.add();
      } else {
        _temp = {
          a: _a,
          b: _b,
          result: _a + _b
        };
        return this.setHidePosition(_temp);
      }
    },
    sub() {
      let _a = this.randomNum();
      let _b = this.randomNum();
      let _temp = {
        a: _a,
        b: _b,
        result: _a - _b
      };
      if (_a < _b) {
        _temp.a = _b;
        _temp.b = _a;
        _temp.result = _b - _a;
      }

      return this.setHidePosition(_temp);
    },
    /**
     * 算式中随机一个位置换成 input
     */
    setHidePosition(_temp) {
      let _rangePosition = ["a", "b", "result"]; // 算式中的位置
      let _random = Math.round(Math.random() * (2 - 0) + 0); // 随机0~2整数，对应数组 _rangePosition 中 index
      _temp.empty = _temp[_rangePosition[_random]]; // 交换
      _temp[_rangePosition[_random]] = "input"; // 交换 'input'用于判断渲染组件
      return _temp;
    },
    /**
     * 判断当前渲染组件 num/numInput
     */
    setInput(_val) {
      if (_val === "input") {
        return "numInput";
      } else {
        return "num";
      }
    },
    /**
     * 接收输入的值，检查结果
     */
    subInput(val) {
      this.showFlag = false;
      if (this.items[val.index].empty !== Number(val.num)) {
        this.items[val.index].validator = '<span class="error">答错了！</span>';
      } else {
        this.items[val.index].validator = '<span class="correct">正确</span>';
      }
    }
  }
};
</script>
