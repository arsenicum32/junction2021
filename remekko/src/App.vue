<template>
  <v-app>
    <v-main>
      <header v-if="$route.name !== 'Crm'" />
      <div style="height: 55px" />
      <router-view/>
      <v-bottom-navigation
        v-if="$route.name !== 'Crm'"
        outlined
        fixed
      >
        <v-btn x-large to="/" text value="Home">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn x-large to="/closet" text value="Closet">
          <span>Closet</span>
          <v-icon>
            mdi-sofa-single-outline
          </v-icon>
        </v-btn>

        <v-btn x-large to="/shop" text value="Story">
          <span>Shop</span>
          <v-icon>mdi-shopping</v-icon>
        </v-btn>

        <v-btn x-large text>
          <span>Messages</span>
          <v-icon>mdi-chat-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style media="screen">

header {
  background: url('./assets/head.svg') no-repeat center center;
  width: 100%;
  height: 55px;
  position: fixed;
  background-color: white;
  border-bottom: 1px solid black;
  z-index: 1000;
}

</style>
