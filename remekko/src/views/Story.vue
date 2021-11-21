<template lang="html">
  <div>
    <v-card class="ma-2" style="display: flex; height: 120px">
      <v-img
         :src="item.image"
         height="120px"
         width="80px"
         class="white--text align-end"
         style="flex-shrink: none; width: 80px"
      />
      <div class="ma-2" style="flex: 2">
        <span>
          {{item.title}}
        </span>
        <br/>
        <small>
          <v-icon>mdi-ethereum</v-icon>
          {{token}}
        </small>
      </div>

    </v-card>
    <!-- <pre>{{item}}</pre> -->

    <v-btn v-if="item.authorId === 1" @click="() => sell(item.id)">
      sell
    </v-btn>

    <h1 class="text-center text-h4 mt-4">
      {{item.title}}'s story
    </h1>

    <v-card outlined class="ma-4 text-center" v-for="story in stories" :key="story.id">
      <span class="text-caption">{{new Intl.DateTimeFormat('en-US').format(new Date(story.createdAt))}}</span>
      <br/>
      <span class="text-body2 ma-4">{{story.text}}</span>

      <v-img
         v-if="story.image"
         :src="item.image"
         height="280px"
      />

    </v-card>

    <v-form v-if="item.authorId === 1">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="message"
              :append-outer-icon="'mdi-send'"
              :append-icon="'mdi-camera'"
              label="Message"
              type="text"
              @click:append="() => {}"
              @click:append-outer="() => {}"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-form v-else>
      <v-container>
        <v-row>
          <v-col cols="12">

            <span>12 E</span>


          </v-col>
          <v-col cols="12">


            <v-btn dark large>
              Buy
            </v-btn>

          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    item: {},
    message: ""
  }),
  computed: {
    stories(){
      return this.item?.stories
    },
    token(){
      const nft = this.item?.nft

      if (nft) {
        const { assetURI } = JSON.parse(nft) // metadata
        return assetURI
      }

      return '--'
    }
  },
  methods: mapActions({
    fetch_story: 'fetch_story',
    sell: 'sell',
  }),
  beforeRouteEnter({ params: { id }}, from , next ){
    next(async vm => {
      vm.item = await vm.fetch_story(
        id
      )
    })
  }
}
</script>

<style lang="css" scoped>
</style>
