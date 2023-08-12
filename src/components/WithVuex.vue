<template>
  <div id="app" class="app">
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
  </div>
</template>

<script>
import Input from "./Input.vue";
import { debounce } from "../utils";

export default {
  name: "App",
  components: {
    Input,
  },
  data() {
    return {
      get localStorageForm() {
        return JSON.parse(localStorage.getItem("form")) || 0;
      },
    };
  },
  computed: {
    storageList() {
      return this.$store.getters.storageListReverse;
    },
    form() {
      return this.$store.state;
    },
    localStorageState() {
      return this.$store.getters.localStorageState;
    },
  },
  methods: {
    changeInput: debounce(function (field, value) {
      this.$store.dispatch("setFormValue", { field, value });
    }, 300),

    async sendForm() {
      this.$store.dispatch("sendForm");
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
}
</style>
