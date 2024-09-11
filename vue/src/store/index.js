import { createStore } from "vuex";
import axiosClient from "../axios";
import { useRouter } from "vue-router";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    currentTasklist: {
      data: {},
      loading: false
    },
    tasklists: {
      data:[],
      loading: false
    },
  },
  getter: {},
  actions: {
    getTasklist({commit}, id){
      commit("setCurrentTasklistLoading", true);
      return axiosClient
      .get(`/tasklists/${id}`)
      .then((res) => {
        commit("setCurrentTasklist", res.data);
        commit("setCurrentTasklistLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentTasklistLoading", false);
        throw err;
      });
    },
    saveTasklist({ commit }, tasklist) {
      let response;
      if (tasklist.id) {
        response = axiosClient
          .put(`/tasklists/${tasklist.id}`, tasklist)
          .then((res) => {
            commit("setCurrentTasklist", res.data);
            return res;
          });
      } else {
        response = axiosClient.post(`/tasklists`, tasklist).then((res) => {
          commit("setCurrentTasklist", res.data);
          return res;
        });
      }
      return response;
    },
    deleteTasklist({}, id){
      return axiosClient.delete(`/tasklists/${id}`);
    },
    getTasklists({commit}){
      commit('setTasklistsLoading', true)
      return axiosClient
      .get("/tasklists")
      .then((res) => {
        commit('setTasklistsLoading', false)
        commit("setTasklists", res.data);
        return res;
      });
    },
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        sessionStorage.removeItem("TOKEN");
        return response;
      });
    },
  },
  mutations: {
    setCurrentTasklist: (state, tasklist) => {
      state.currentTasklist.data = tasklist.data;
    },
    setTasklists: (state, tasklists) => {
      state.tasklists.data = tasklists.data;
    },
    setCurrentTasklistLoading: (state, loading) => {
      state.currentTasklist.loading = loading;
    },
    setTasklistsLoading: (state, loading) => {
      state.tasklists.loading = loading;
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});

export default store;
