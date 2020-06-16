<template>
    <nav>
        <v-app-bar app flat>
            <v-app-bar-nav-icon v-model="drawer" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="primary--text">
                <span class="font-weight-bold">{{ $t('nav.short_title') }}</span>
                <span class="font-italic mx-4">{{ $t('nav.title') }}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="this.isLoggedIn" @click="logout" text color="primary">
                {{ $t('buttons.logout') }}
            </v-btn>
            <v-btn v-else text color="primary">
                <router-link to="Login">{{ $t('buttons.login') }}</router-link>
                <v-icon right>mdi-log-in</v-icon>
            </v-btn>
            <v-btn :href="get_data_standard_link" target="_blank" text>
                <span class="primary--text">{{ $t('nav.data_standard') }}</span>
                <v-icon x-small dense>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn href="http://www.uc2-program.org/uc2_data_policy.pdf" target="_blank" text>
                <span class="primary--text">{{ $t('nav.data_policy') }}</span>
                <v-icon x-small dense size="1">mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn :href="$t('nav.kb_link')" target="_blank" text>
                <span class="primary--text">{{ $t('nav.kb') }}</span>
                <v-icon x-small dense size="1">mdi-open-in-new</v-icon>
            </v-btn>
            <v-img
                alt="Climatology Logo"
                class="shrink primary--text"
                contain
                src="@/assets/group_logo.jpg"
                transition="scale-transition"
                width="40"
            ></v-img>
            <div class="locale-changer">
                <v-btn
                    class="primary--text"
                    text
                    v-model="$root.$i18n.locale"
                    v-for="lang in locales"
                    v-show="lang.lang !== $root.$i18n.locale"
                    :key="lang.lang"
                    @click="$root.$i18n.locale = lang.lang"
                >
                    <flag :iso="lang.flag" v-bind:squared="false" />
                    {{ lang.lang }}
                </v-btn>
            </div>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" class="primary">
            <v-list>
                <v-list-item v-for="link in links" :key="link.route" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">{{
                        $t('nav.drawer_elements', { text: link.text[$i18n.locale] })
                    }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Navbar',
    computed: {
        ...mapGetters({ isLoggedIn: 'accounts/isLoggedIn' }),
        get_data_standard_link() {
            return this.data_standard_link[this.$i18n.locale]
        },
    },
    data() {
        return {
            drawer: true,
            links: [
                { icon: 'mdi-home', text: { en: 'Home', de: 'Home' }, route: '/' },
                { icon: 'mdi-cloud-search', text: { en: 'Search', de: 'Suche' }, route: '/search' },
                { icon: 'mdi-cloud-upload', text: { en: 'Upload', de: 'Hochladen' }, route: '/upload' },
                { icon: 'mdi-help', text: { en: 'Contact', de: 'Kontakt' }, route: '/contact' },
            ],
            data_standard_link: {
                en: 'http://www.uc2-program.org/uc2_data_standard.pdf',
                de: 'http://www.uc2-program.org/uc2_datenstandard.pdf',
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
        ...mapActions({ logout: 'accounts/logout' }),
    },
}
</script>
