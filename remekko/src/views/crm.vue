<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Marimekko CRM</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <v-row>
          <v-col
            class="mt-2"
            cols="12"
          >
            <strong>Categorys</strong>
          </v-col>

          <v-col
            v-for="good in goods"
            :key="good.image"
            cols="6"
            md="2"
          >
            <v-img :src="good.image" height="150"></v-img>
            <span>{{good.title}}</span>
          </v-col>
        </v-row>
        <v-card class="ma-4">
          <v-card-text>
            <v-text-field label="title" v-model="title" />
            <v-text-field label="desc"  v-model="desc" />
            <v-text-field label="image" v-model="image" />
          </v-card-text>
          <v-card-actions>
            <v-btn @click="add_closet">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions , mapState } from 'vuex'

const json = [
  {"title": "Pieni Kukkaro Mini Unikko", "image": "https://ucarecdn.com/c2217569-5d2a-40e1-8a28-734481b3f98b/020310001_X115120_10_1598365510_1.jpg", "desc": "Made of cotton, the Pieni Kukkaro purse is a multipurpose classic. This purse is ideal for coins and other small things. It has a metallic frame that is easy to snap open and shut. The Mini Unikko pattern is printed in Helsinki."},
  {"title": "Pieni Kukkaro Mini Unikko", "image": "https://ucarecdn.com/cad378a7-fc3c-4e7a-9615-300ac616e4b3/047820153_X134030_10_1598366986.jpg", "desc": "Made of cotton, the Silmälasi Kukkaro purse is a multipurpose classic. This purse is ideal as a pencil case and much more. It has a metallic frame that is easy to snap open and shut. The Mini Unikko pattern is printed in Helsinki."},
  {"title": "Cash&Carry", "image": "https://ucarecdn.com/8b0d1226-131d-4ab4-96df-37044ceda473/026992999_X77620_10_1598365523_1.jpg", "desc": "Important essentials fit perfectly in the durable polyamide Cash & Carry bag that features an adjustable shoulder strap, reinforced interior seams and an inside zip pocket. There is sufficient space for a camera, your smartphone and wallet, and even more space for smaller items in the three exterior pockets."},
  {"title": "Pikku Karla", "image": "https://ucarecdn.com/9ce5e7a8-8240-488a-a71b-2ce8cc8ccf7b/048818900_X127941_10_1598368459.jpg", "desc": "The candy wrapper inspired Pikku Karla (Little Karla) shoulder bag is made of leather in black. The small bag has a zipper closure, a thin shoulder strap and a zipper pocket on the inside."},
  {"title": "Uusi Matkuri", "image": "https://ucarecdn.com/d8714fad-75ff-4149-bfda-50d12f38f24b/090322012_X192050_30_1634193283.jpg", "desc": "The Uusi Matkuri weekend bag is made of unbleached heavyweight cotton canvas in the golden foil Juhla Unikko pattern. The bag has handles and a zipper closure with golden metal details. There is one open pocket and a small side handle on the outside and one zipper pocket on the inside."},
  {"title": "Varsankello", "image": "https://ucarecdn.com/93308535-71bd-4947-8c1c-1788eda6d542/090421890_X192026_20_1630067341.jpg", "desc": "The Varsankello knitted headband is made of a soft wool and alpaca blend with a jacquard knit. The double-layered headband is warm, and it features the knitted Marimekko logo."},
  {"title": "Hieno", "image": "https://ucarecdn.com/b8229ff3-f7b6-491e-afed-34004acd8108/090595019_X213857_10_1636034890.jpg", "desc": "Available sizes: 34-36-40-42"},
  {"title": "Oiva", "image": "https://ucarecdn.com/9962993b-d328-48ea-a977-1a1963c904eb/071605190_X205211_10_1636255411.jpg", "desc": "This Räsymatto breakfast set includes two Oiva mugs and two Oiva plates. The dishes are made of white stoneware, which is dishwasher, oven, microwave, and freezer proof. The set is packed in a Marimekko Logo gift box."},

]

export default {
  data: () => ({
    title: "",
    desc: "",
    image: "",
    drawer: null,
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
    ...mapState(['closet']),
    goods(){
      return json
    }
  },
}
</script>

<style lang="css" scoped>
</style>
