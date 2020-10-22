<template>
    <v-app class="primary">
      <v-app-bar app flat>
        <v-spacer></v-spacer>
        <v-toolbar-title class="secondary--text">
          <span class="font-weight-bold">{{ $t('nav.short_title') }}</span>
          <span class="font-italic mx-4">{{ $t('nav.title') }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn :href="get_data_standard_link" target="_blank" text>
          <span class="primary--text">{{ $t('nav.data_standard') }}</span>
          <v-icon small dense>mdi-open-in-new</v-icon>
        </v-btn>
        <v-btn :href="$t('nav.kb_link')" target="_blank" text>
          <span class="primary--text">{{ $t('nav.kb') }}</span>
          <v-icon small dense size="1">mdi-open-in-new</v-icon>
        </v-btn>
        <v-btn :href="$t('nav.uc2_link')" target="_blank" text>
          <span class="primary--text">{{ $t('nav.uc2website') }}</span>
          <v-icon small dense size="1">mdi-open-in-new</v-icon>
        </v-btn>
        <b-link-button large :href="$t('nav.module_a_link')">
          <v-img
              src="./assets/uc2_a_logo.jpg"
              contain
              aspect-ratio="1"
              width="50px"
              position="bottom left"
          ></v-img>
        </b-link-button>
        <b-link-button large :href="$t('nav.module_b_link')">
          <v-img
              src="./assets/uc2_b_logo.jpg"
              contain
              aspect-ratio="1"
              width="65px"
              position="bottom left"
          ></v-img>
        </b-link-button>
        <b-link-button large :href="$t('nav.module_c_link')">
          <v-img
              src="./assets/uc2_c_logo.png"
              contain
              aspect-ratio="1"
              width="60px"
              position="bottom left"
          ></v-img>
        </b-link-button>
        <div class="locale-changer">
          <v-btn
              class="primary--text"
              text
              v-model="$root.$i18n.locale"
              v-for="loc in locales"
              v-show="loc.lang !== $root.$i18n.locale"
              :key="loc.lang"
              @click="switchLocale(loc.lang)"
          >
            <flag :iso="loc.flag" v-bind:squared="false" />
            {{ loc.lang }}
          </v-btn>
        </div>
      </v-app-bar>
      <v-main>
        <v-row class="ma-14" justify="center">
          <v-icon x-large color="secondary" class="material-icons">
          build
          </v-icon>
        </v-row>
        <v-row class="ma-14" justify="center">
          <h1 class="text--secondary">
            {{ $t('text.maintenance')}}
          </h1>
        </v-row>
      </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Footer from './components/Footer'

export default {
    name: 'Maintenance',
    components: { Footer },
    computed: {
      get_data_standard_link() {
        return this.data_standard_link[this.$i18n.locale]
      },
    },
    methods: {
      switchLocale(language) {
        this.$root.$i18n.locale = language
      },
    },
    data() {
      return {
        drawer: true,
        data_standard_link: {
          en: 'http://www.uc2-program.org/index.php/en/datamanagement',
          de: 'http://www.uc2-program.org/index.php/datenmanagement',
        },
        locales: [
          {
            flag: 'gb',
            lang: 'en',
          },
          {
            flag: 'de',
            lang: 'de',
          },
        ],
      }
    },
}
</script>
