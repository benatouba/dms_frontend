<template>
  <div class="home">
    <v-container class="mx-4 primary--text">
      <h1>Home</h1>
      <p class="secondary--text">{{ $t('home.text1') }}</p>
      <v-row align="center" justify="center">
        <v-img
            :src="$t('home.img_link')"
            :lazy-src="$t('home.img_link')"
            class="grey lighten-2 my-4"
            max-width="600"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <br>
        <p class="caption text-center secondary--text my-4">
          {{ $t('home.caption') }}
        </p>
        <p class="secondary--text">{{ $t('home.text2') }}</p>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>
