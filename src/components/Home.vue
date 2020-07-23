<template>
  <div class="home">
    <v-container class="mx-4 primary--text">
      <h1>Home</h1>
      <p class="secondary--text">{{ $t('home.text1') }}</p>
      <v-row align="center" justify="center">
        <v-img
                v-if="$i18n.locale === 'de'"
                src="@/assets/dms_graphic_de.png"
                lazy-src="@/assets/dms_graphic_de.png"
                class="grey lighten-2 my-4"
                max-width="600"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-img
                v-if="$i18n.locale !== 'de'"
                src="@/assets/dms_graphic_en.png"
                lazy-src="@/assets/dms_graphic_en.png"
                class="grey lighten-2 my-4"
                max-width="600"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-row>
      <p class="caption text-center secondary--text my-4">
        {{ $t('home.caption') }}
          <b-link-button left rounded href="https://dx.doi.org/10.1127/metz/2019/0913">
          </b-link-button>
      </p>
      <p class="secondary--text">
          {{ $t('home.text2') }}
      </p>
    </v-container>
  </div>
</template>

<script>
// import i18n from 'vue-i18n'
export default {
    name: 'Home',
}
</script>
