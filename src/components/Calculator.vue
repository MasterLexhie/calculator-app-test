<template>
  <div class="
    grid
    content-end
    my-0
    mx-auto
    h-screen
    max-w-screen-md"
  >
    <div>
      <div class="h-40">
        <input v-model="result" type="text" class="display"/>
      </div>
      <div class="keys">
        <div class="special-functions">
          <button>%</button>
          <button>!</button>
          <button>&#8508;</button>
          <button>&#8911;</button>
          <button>&#8730;</button>
          <button>&#215;<sup>2</sup></button>
          <button>sin</button>
          <button>cos</button>
          <button>tan</button>
          <button>sin<sup> -1 </sup></button>
          <button>cos<sup> -1 </sup></button>
          <button>tan<sup> -1 </sup></button>
        </div>
        <div class="base-keys">
          <div class="numbers">
            <button @click.prevent="appendNumber(7)">7</button>
            <button @click.prevent="appendNumber(8)">8</button>
            <button @click.prevent="appendNumber(9)">9</button>
            <button @click.prevent="appendNumber(4)">4</button>
            <button @click.prevent="appendNumber(5)">5</button>
            <button @click.prevent="appendNumber(6)">6</button>
            <button @click.prevent="appendNumber(1)">1</button>
            <button @click.prevent="appendNumber(2)">2</button>
            <button @click.prevent="appendNumber(3)">3</button>
            <button @click.prevent="decimalPoint">.</button>
            <button @click.prevent="appendNumber(0)">0</button>
            <button @click.prevent="">+/-</button>
          </div>
          <div class="operators">
            <button @click.prevent="setOperator('/')"> &#247; </button>
            <button class="row-span-2" @click.prevent="clear"> C </button>
            <button @click.prevent="setOperator('*')"> &#215; </button>
            <button @click.prevent="setOperator('-')"> - </button>
            <button @click.prevent="setOperator('+')"> + </button>
            <button class="equal-sign" @click.prevent="equal"> = </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: 0, //number value
      tmp_value: 0, //temporary value used in calculating
      reset: false,
      operator: undefined, // operators used in calculation
    };
  },
  methods: {
    clear() {
      this.result = 0;
      this.tmp_value = 0;
      this.operator = undefined;
    },
    invertedNumber() {
      this.result *= -1;
    },
    percentage() {
      this.result /= 100;
    },
    appendNumber(num) {
      if (this.result === 0 || this.reset === true) {
        this.result = "";
        this.reset = false;
      }
      this.result += num.toString();
    },
    decimalPoint() {
      if (!this.result.includes(".")) this.result += ".";
    },
    calculate() {
      let value = 0;
      let firstNum = parseFloat(this.tmp_value);
      let secondNum = parseFloat(this.result);
      switch (this.operator) {
        case "+":
          value = firstNum + secondNum;
          break;
        case "-":
          value = firstNum - secondNum;
          break;
        case "*":
          value = firstNum * secondNum;
          break;
        case "/":
          value = firstNum / secondNum;
          break;
      }
      this.result = value;
    },
    setOperator(operator) {
      if (this.tmp_value != 0) {
        this.calculate();
      }
      this.tmp_value = this.result;
      this.operator = operator;
      this.reset = true;
    },
    equal() {
      this.calculate();
      this.tmp_value = 0;
      this.operator = undefined;
    },
  },
};
</script>
<style>
.keys,
.base-keys,
.numbers,
.operators,
.special-functions {
  @apply grid;
}

.base-keys {
  grid-template-columns: 1fr 120px;
}

.numbers {
  @apply grid-cols-3;
  @apply bg-gray-800;
}

.operators {
  @apply grid-cols-2;
  @apply bg-gray-700;
}

.numbers button:active {
  @apply bg-gray-600;
}

.operators button:active {
  @apply bg-gray-500;
}

.special-functions {
  @apply grid-cols-4;
  @apply bg-teal-400;
  grid-template-rows: repeat(3, 40px);
}

.display {
  @apply w-full;
  @apply leading-loose;
  @apply pt-10;
  @apply px-3;
  @apply text-right;
  @apply h-full;
  @apply text-4xl;
  @apply bg-white;
}

.numbers,
.operators {
  @apply text-white;
  grid-template-rows: repeat(4, 60px);
}

.equal-sign {
  @apply col-start-2;
  @apply col-end-2;
  @apply row-start-3;
  @apply row-end-5;
  @apply bg-orange-500;
}

.equal-sign:active {
  @apply bg-orange-600 !important;
}

@screen sm {
  .keys {
    grid-template-columns: 2fr 1fr;
  }
  
  .special-functions {
    @apply grid-cols-3;
    @apply order-last;
    grid-template-rows: repeat(4, 60px);
  }
}
</style>


 <!-- <div class="text-white bg-purple sm:bg-test md:bg-blue md:text-yellow lg:bg-red xl:bg-orange">test</div> -->
    <!-- <button 
      class="
        rounded-lg px-4 
        md:px-5 
        xl:px-4 py-3 
        md:py-4 
        xl:py-3 bg-teal-500 hover:bg-teal-600 
        md:text-lg 
        xl:text-base text-white font-semibold leading-tight shadow-md"
      >
          Click me
      </button> -->
    <!-- <table cellspacing="10">
      <tr>
        <td colspan="4">
          <input type="text" v-model="result" disabled />
        </td>
      </tr>
      <tr>
        <td class="button dark" @click="clear">C</td>
        <td class="button dark" @click="invertedNumber">+/-</td>
        <td class="button dark" @click="percentage">%</td>
        <td class="button orange" @click="setOperator('/')">/</td>
      </tr>
      <tr>
        <td class="button grey" @click="numbers(7)">7</td>
        <td class="button grey" @click="numbers(8)">8</td>
        <td class="button grey" @click="numbers(9)">9</td>
        <td class="button orange" @click="setOperator('*')">*</td>
      </tr>
      <tr>
        <td class="button grey" @click="numbers(4)">4</td>
        <td class="button grey" @click="numbers(5)">5</td>
        <td class="button grey" @click="numbers(6)">6</td>
        <td class="button orange" @click="setOperator('-')">-</td>
      </tr>
      <tr>
        <td class="button grey" @click="numbers(1)">1</td>
        <td class="button grey" @click="numbers(2)">2</td>
        <td class="button grey" @click="numbers(3)">3</td>
        <td class="button orange" @click="setOperator('+')">+</td>
      </tr>
      <tr>
        <td colspan="2" class="button button-col2 grey" @click="numbers(0)">
          0
        </td>
        <td class="button grey" @click="decimalPoint">.</td>
        <td class="button orange" @click="equal">=</td>
      </tr>
    </table> -->
