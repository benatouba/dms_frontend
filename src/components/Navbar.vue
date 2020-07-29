<template>
    <nav>
        <v-app-bar app flat>
            <v-app-bar-nav-icon v-model="drawer" @click="drawer = !drawer"></v-app-bar-nav-icon>
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
            <v-btn href="http://www.uc2-program.org/" target="_blank" text>
                <span class="primary--text">{{ $t('nav.uc2website') }}</span>
                <v-icon small dense size="1">mdi-open-in-new</v-icon>
            </v-btn>
            <b-link-button large href="http://www.uc2-mosaik.org/">
                <v-img
                        src="../assets/uc2_a_logo.png"
                        contain
                        aspect-ratio="1"
                        width="50px"
                        position="bottom left"
                ></v-img>
            </b-link-button>
            <b-link-button large href="http://www.uc2-3do.org/">
                <v-img
                        src="../assets/uc2_b_logo.jpg"
                        contain
                        aspect-ratio="1"
                        width="65px"
                        position="bottom left"
                ></v-img>
            </b-link-button>
            <b-link-button large href="http://uc2-klimoprax-useuclim.org/">
                <v-img
                        src="../assets/uc2_c_logo.png"
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

        <v-navigation-drawer app expand-on-hover hide-overlay v-model="drawer" class="primary">
            <v-list>
                <v-list-item
                    v-show="link.show"
                    v-for="(link, key) in links"
                    :key="key"
                    router
                    :to="link.route"
                >
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">{{
                        $t(`nav.${key}`)
                    }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BLinkButton from "./BLinkButton";

export default {
    name: 'Navbar',
    components: {BLinkButton},
    computed: {
        ...mapState({
            account: state => state.account
        }),
        get_data_standard_link() {
            return this.data_standard_link[this.$i18n.locale]
        },
        links: function() {return {
            home:  { icon: 'mdi-home', route: '/', show: true, },
            search: { icon: 'mdi-cloud-search', route: '/search', show: true, },
            upload: { icon: 'mdi-cloud-upload', route: '/upload', show: !!this.account.token, },
            contact: { icon: 'mdi-help', route: '/contact', show: true},
            account: { icon: 'mdi-account-circle', route: '/account', show: !!this.account.token, },
            admin: { icon: 'mdi-account-tie-outline', route: '/administration', show: !!this.account.token && !!this.account.is_superuser, },
            login: { icon: 'mdi-login', route: '/login', show: !this.account.token, },
            logout: { icon: 'mdi-logout', route: '/login', show: !!this.account.token, },
        }},
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
    methods: {
        ...mapActions({ logout: 'account/logout' }),
        switchLocale(language) {
            this.$root.$i18n.locale = language
        },
    },
}
</script>
