import { createStore } from "vuex";
import axiosClient from "../axios"
import {useRouter} from 'vue-router'

const store = createStore({
    state:{
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
            },
    },
    getter:{},
    actions: {
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
            return axiosClient
              .post("/logout")
              .then((response) => {
                commit("logout");
                sessionStorage.removeItem("TOKEN");
                return response;
              })
          },
    },
    mutations: {
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
    modules:{}
})

export default store