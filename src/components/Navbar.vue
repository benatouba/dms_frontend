<template>
    <nav>
        <v-app-bar app flat>
            <v-app-bar-nav-icon v-model="drawer" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="indigo--text text--darken-3">
                <span class="font-weight-bold">[UC²] </span>
                <span class="font-italic">Urban Climate under Change </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="indigo">
                <span class="white--text">Sign In</span>
                <v-icon right>mdi-log-in</v-icon>
            </v-btn>
            <v-btn
                    href="http://www.uc2-program.org/uc2_data_standard.pdf"
                    target="_blank"
                    text
            >
                <span class="mr-2">Data Standard</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn
                    href="http://www.uc2-program.org/uc2_data_policy.pdf"
                    target="_blank"
                    text
            >
                <span class="mr-2">Data Policy</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-img
                    alt="Climatology Logo"
                    class="shrink mr-2"
                    contain
                    src="@/assets/group_logo.jpg"
                    transition="scale-transition"
                    width="40"></v-img>
            <v-btn-toggle v-for="lang in languages" :key="lang.title" @click="changeLocale(lang.language)">
                <flag :iso="lang.flag" v-bind:squared=false /> {{lang.title}}
            </v-btn-toggle>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" class="primary darken-2">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white&#45;&#45;text">{{ link.text}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                drawer: true,
                links:[
                    { icon: 'mdi-home', text: 'Home', route: '/' },
                    { icon: 'mdi-cloud-search', text: 'Search Files', route: '/search' },
                    { icon: 'mdi-cloud-upload', text: 'Upload', route: '/upload' },
                    { icon: 'mdi-help', text: 'Contact', route: '/contact' },
                ],
                languages: [
                    {
                        flag: 'en',
                        language: 'en',
                        title: 'english'
                    },
                    {
                        flag: 'de',
                        language: 'de',
                        title: 'deutsch'
                    }
                ]
            }
        },
        methods: {
            changeLocale(locale) {
                locale = locale;
            }
        }
    }
</script>

<style scoped>

</style>