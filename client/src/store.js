import Vue from 'vue'
import Vuex from 'vuex'
import ax from './config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        role: '',
        products: [],
        carts: [],
        transactions: [],
        alltrans: []
    },
    mutations: {
        ISLOGIN(state, payload) {
            state.isLogin = payload
        },
        ROLE(state, payload) {
            state.role = payload
        },
        PRODUCTS(state, payload) {
            state.products = payload
        },
        TRANSACTIONS(state, payload){
            state.transactions = payload
        },
        ALLTRANSACTIONS(state, payload){
          state.alltrans = payload
        },
        NEWPRODUCTS(state, payload) {
            state.products.push(payload)
        },
        CARTS(state,payload){
            state.carts = payload
        }
    },
    actions: {
        GETPRODUCTS(context) {
            ax.get("/products")
                .then(({ data }) => {
                    context.commit('PRODUCTS', data)
                })
                .catch(err => {
                    console.log(err);

                });
        },
        CREATEPRODUCTS(context,payload){
            return ax.post("/products", payload, {
                headers: {
                  token: localStorage.getItem('token')
                }})
                .then(({data}) => {
                    console.log(payload);      
                    context.commit('NEWPRODUCTS',data)
                    return true
                })
                .catch(err => {
                  console.log(err);
                });
        },

        DELETEPRODUCTS(context,payload){
            return ax.delete(`/products/${payload}`,{
                headers: {
                    token: localStorage.getItem('token')
                  }
            })
              .then(({ data }) => {
                context.dispatch("GETPRODUCTS")
                return true
              })
              .catch(err => {
                console.log(err);
              });
        },

        UPDATEPRODUCTS(context,payload){
            return ax.put(`/products/${payload.id}`, payload.newImage,{
                headers: {
                    token: localStorage.getItem('token')
                  }
            })
            .then(({ data }) => {
              context.dispatch("GETPRODUCTS")
              return true
            })
            .catch(err => {
              console.log(err);
            });
    
        },
        GETCARTS(context){
            ax.get("/carts", {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
                .then(({ data }) => {
                    context.commit("CARTS",data)
                })
                .catch(err => {
                  console.log(err);
                });
        },
        GETTRANSACTIONS(context){
            ax.get(`transactions/user`,{
                headers: {
                    token: localStorage.getItem('token')
                  }
            })
            .then(({ data }) => {
                context.commit("TRANSACTIONS",data)
              })
              .catch(err => {
                console.log(err);
              });
        },
        GETALLTRANSACTIONS(context){
          ax.get(`transactions/all`,{
              headers: {
                  token: localStorage.getItem('token')
                }
          })
          .then(({ data }) => {
              context.commit("ALLTRANSACTIONS",data)
            })
            .catch(err => {
              console.log(err);
            });
      }
    }
})