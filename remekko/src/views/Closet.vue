<template lang="html">
  <v-container class="mb-90">
    <h1 class="text-center text-h4 mt-4">my Closet ({{closet.length}})</h1>
    <v-card outlined class="ma-4" v-for="({ id, title, image }) in closet" :key="id">
      <div style="display: flex; min-height: 80px">
        <img v-if="image" style="height: 80px; position: relative" :src="image" />
        <div>
          <span class="text-body1 ml-4 pt-4">{{title}}</span>
          <br/>
          <br/>
          <v-btn text small class="ml-2" :to="`/story/${id}`">
            Read Story
          </v-btn>
          <v-btn outlined small class="ml-2" :to="`/story/${id}`">
            Sell
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions , mapState } from 'vuex'

export default {
  data: () => ({
    title: "",
    desc: "",
    image: ""
  }),
  methods: {
    ...mapActions({
      get: 'get_closet',
      add: 'add_closet',
    }),
    async add_closet(){
      const {
        title,
        desc,
        image,
      } = this

      const result = await this.add({
        title,
        desc,
        image,
      })
      console.log(result)
    },
  },
  computed: {
    ...mapState(['closet'])
  },
  mounted(){
    this.get()
  }
}
</script>

<style lang="css" scoped>
</style>
