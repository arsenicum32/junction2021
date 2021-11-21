<template lang="html">
  <div>
    <h1 class="text-center text-h4 mt-4">Shop</h1>

    <v-container class="pa-0 fill-height" fluid>

       <v-card
       style="width: calc(50% - 32px)"
       class="ma-4"
       outlined
       v-for="({ id, title}) in products.filter(({ published }) => published )"
       :key="id">
         <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="320px"
            class="white--text align-end"
        >

          <v-card-text>
            <span>{{title}}</span>
          </v-card-text>
          <v-card-actions>
            <v-btn dark text :to="`/story/${id}`">
              More
            </v-btn>
            <v-btn dark text :to="`/story/${id}`">
              Buy
            </v-btn>
          </v-card-actions>
        </v-img>

       </v-card>

    </v-container>


  </div>
</template>

<script>
import { mapActions , mapState } from 'vuex'
export default {
  methods: mapActions({
    get_items: 'get_items'
  }),
  computed: {
    ...mapState(['products'])
  },
  mounted(){
    this.get_items()
  }
}
</script>

<style lang="css" scoped>
</style>
