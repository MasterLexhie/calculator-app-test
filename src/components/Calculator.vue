<template>
  <div class="calculator-container">
    <div>
      <div class="h-40">
        <input v-model="result" type="text" class="display"/>
      </div>
      <div class="keys">
        <div class="special-functions">
          <button @click.prevent="specialFunctions('percentage')">%</button>
          <button @click.prevent="specialFunctions('factorial')">!</button>
          <button @click.prevent="specialFunctions('pi')">&#8508;</button>
          <button @click.prevent="setOperator('raiseToPow')">&#8896;</button>
          <button @click.prevent="specialFunctions('squareRoot')">&#8730;</button>
          <button @click.prevent="specialFunctions('square')">&#215;<sup>2</sup></button>
          <button @click.prevent="specialFunctions('sine')">sin</button>
          <button @click.prevent="specialFunctions('cos')">cos</button>
          <button @click.prevent="specialFunctions('tan')">tan</button>
          <button @click.prevent="specialFunctions('sinInverse')">sin<sup> -1 </sup></button>
          <button @click.prevent="specialFunctions('cosInverse')">cos<sup> -1 </sup></button>
          <button @click.prevent="specialFunctions('tanInverse')">tan<sup> -1 </sup></button>
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
            <button @click.prevent="invertedNumber">+/-</button>
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
      operator: undefined // operators used in calculation
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
    percentage(num) {
      return num /= 100;
    },
    factorial(n) {
      return n ? n * this.factorial(n - 1) : 1;
    },
    convertToDegree(trigFunct, angle) {
      return trigFunct(angle * Math.PI / 180);
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
        case "raiseToPow":
          value = Math.pow(firstNum, secondNum);
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
    specialFunctions(functions) {
      return functions === 'percentage' ? this.percentage(this.result)
            : functions === 'factorial' ? this.factorial(this.result)
            : functions === 'pi' ? this.result = Math.PI
            : functions === 'squareRoot' ? this.result = Math.sqrt(this.result)
            : functions === 'square' ? this.result = Math.pow(this.result, 2)
            : functions === 'sine' ? this.result = Math.sin(this.result * Math.PI / 180)
            : functions === 'cos' ? this.result = Math.cos(this.result * Math.PI / 180)
            : functions === 'tan' ? this.result = Math.tan(this.result)
            : functions === 'sinInverse' ? this.result = Math.asin(this.result)
            : functions === 'cosInverse' ? this.result = Math.acos(this.result)
            : functions === 'tanInverse' ? this.result = Math.atan(this.result)
            : ''
    },
    equal() {
      this.calculate();
      this.tmp_value = 0;
      this.operator = undefined;
    }
  }
};
</script>
<style>
.calculator-container,
.keys,
.base-keys,
.numbers,
.operators,
.special-functions {
  @apply grid;
}

.calculator-container {
  @apply content-end;
  @apply my-0;
  @apply mx-auto;
  @apply max-w-screen-md;
  height: calc(100vh - 5rem);
}

@screen lg {
  .calculator-container {
    @apply content-center;
  }
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

.numbers button:active,
.numbers button:focus,
.numbers button:visited,
.operators button:active,
.operators button:focus,
.operators button:visited,
.special-functions button:active,
.special-functions button:focus,
.special-functions button:visited {
  @apply outline-none;
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
