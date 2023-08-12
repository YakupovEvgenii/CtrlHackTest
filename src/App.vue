<template>
  <div id="app" class="app">
    <div
      @click="vuex = !vuex"
      v-text="!vuex ? 'c vuex' : 'без vuex'"
      class="app__button"
    ></div>
    <template v-if="vuex">
      <WithVuex />
    </template>
    <template v-else>
      <div class="app__inputs">
        <div>
          <div>цена</div>
          <Input
            @input="(value) => changeInput('price', value)"
            :modelValue="form.price"
          />
          {{ form.price }}
        </div>
        <div>
          <div>количество</div>
          <Input
            @input="(value) => changeInput('count', value)"
            :modelValue="form.count"
          />
          {{ form.count }}
        </div>
        <div>
          <div>сумма</div>
          <Input
            @input="(value) => changeInput('amount', value)"
            :modelValue="form.amount"
          />
          {{ form.amount }}
        </div>

        <div>
          <button @click="sendForm">отправить</button>
          <div>{{ localStorageForm }}</div>
        </div>
      </div>

      <div>
        <div v-for="(item, index) in storageList" :key="index">{{ item }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import Input from "./components/Input.vue";
import { saveLocalstorage, debounce } from "./utils";
import WithVuex from "./components/WithVuex.vue";

export default {
  name: "App",
  components: {
    Input,
    WithVuex,
  },
  data() {
    return {
      form: {
        price: null,
        count: null,
        amount: null,
        nonce: 0,
      },
      firstChangeField: null,
      storage: [],
      vuex: false,
      get localStorageForm() {
        return JSON.parse(localStorage.getItem("form")) || 0;
      },
    };
  },
  computed: {
    storageList() {
      const newarr = [...this.storage];
      return newarr.reverse();
    },
  },
  methods: {
    changeInput: debounce(function (field, value) {
      if (!this.firstChangeField) this.firstChangeField = field;
      this.form[field] = value;
      this.storage.push(`change input ${field} - ${value}`);

      if (this.firstChangeField === field) return;
      this.calculateSelectedField();
    }, 300),

    calculateSelectedField() {
      if (!this.firstChangeField) return;
      const formulas = {
        price: () => this.form.amount / this.form.count,
        count: () => this.form.amount / this.form.price,
        amount: () => this.form.price * this.form.count,
      };
      this.form[this.firstChangeField] = formulas[this.firstChangeField]();
    },

    async sendForm() {
      try {
        this.form.nonce += 1;
        this.storage.push(`send form - ${JSON.stringify(this.form)}`);
        const data = await saveLocalstorage(this.form);
        this.storage.push(`success - ${JSON.stringify(data)}`);
      } catch (error) {
        this.storage.push(`success - ${JSON.stringify(error)}`);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.app {
  &__inputs {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__button {
    margin-bottom: 50px;
    background: green;
    display: inline-block;
    padding: 10px;
  }
}
</style>
