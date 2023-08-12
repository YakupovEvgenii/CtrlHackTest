import Vue from "vue";
import Vuex from "vuex";
import { saveLocalstorage } from "../utils";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form: {
      price: null,
      count: null,
      amount: null,
      nonce: 0,
    },
    storageList: [],
  },
  mutations: {
    setForm(state, { field, value }) {
      state.form[field] = value;
    },
    setStorageList(state, value) {
      state.storageList.push(value);
    },
    setIncrement(state) {
      state.form.nonce += 1;
    },
  },
  actions: {
    setFormValue({ commit }, { field, value }) {
      commit("setForm", { field, value });
    },
    async sendForm({ commit, state }) {
      try {
        commit("setIncrement");
        commit("setStorageList", `send form - ${JSON.stringify(state.form)}`);
        const data = await saveLocalstorage(state.form);
        commit("setStorageList", `success - ${JSON.stringify(data)}`);
      } catch (error) {
        commit("setStorageList", `success - ${JSON.stringify(error)}`);
      }
    },
  },
  getters: {
    storageListReverse(state) {
      const newarr = [...state.storageList];
      return newarr.reverse();
    },
  },
  modules: {},
});
