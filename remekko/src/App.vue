<template>
  <v-app>
    <v-main>
      <router-view/>
      <v-bottom-navigation
      outlined
      fixed
      >
        <v-btn x-large to="/" text value="Home">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn x-large to="closet" text value="Closet">
          <span>Closet</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn x-large to="shop" text value="Story">
          <span>Shop</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({

    //
  }),
};
</script>
