import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const __baseUrl = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    products: [],
    closet: [],
  },
  mutations: {
    set_items(state, items){
      state.products = items
    },
    set_closed(state, items){
      state.closet = items
    },
  },
  actions: {
    async sell(_, id){
      await this._vm.$axios.get(`${__baseUrl}/sell/${id}`)
    },
    async get_items({ commit }){
      const { data } = await this._vm.$axios.get(`${__baseUrl}/items`)
      commit('set_items', data)
    },
    async fetch_story(_, id){
      const { data } = await this._vm.$axios.get(`${__baseUrl}/story/${id}`)
      return data
    },
    async get_closet({ commit }){
      const { data } = await this._vm.$axios.get(`${__baseUrl}/closet`)
      commit('set_closed', data)
    },
    async add_closet(_, body){
      const { data } = await this._vm.$axios.post(
        `${__baseUrl}/closet`, body
      )
      return data
    }
  },
  modules: {
  }
})
