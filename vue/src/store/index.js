import {createStore} from "vuex"

const store = createStore({
    state:{
        user:{
            data:{
                name: 'Timea'
            },
            token: null
        }
    },
    getter:{},
    actions:{},
    mutations:{},
    modules:{}
})

export default store