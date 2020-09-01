<template>
    <div class="contact">
        <v-container class="mx-4 primary--text">
            <h1>Contact Info</h1>
            <v-card v-for="(contact, id) in contacts" :key="id" class="ma-1">
                <v-container>
                    <v-row justify="space-between">
                        <v-col cols="auto">
                            <div class="overline mt-1 ml-4">{{ contact.role[$i18n.locale] }}</div>
                            <v-card-title>
                                {{ contact.name }}
                            </v-card-title>
                            <v-card-subtitle>
                                {{ contact.tel }}
                            </v-card-subtitle>
                        </v-col>
                        <v-col cols="3" class="pl-0">
                            <v-row class="ma-0" justify="center">
                                <v-col class="px-0">
                                    <v-btn text :href="`mailto:${contact.email}`">
                                        email
                                    </v-btn>
                                </v-col>
                                <v-col class="px-0">
                                    <v-btn text :href="`${contact.website[$i18n.locale]}`" target="_blank">
                                        website
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    components: {},
    methods: {},
    data() {
        return {
            contacts: [
                {
                    id: 0,
                    name: 'Benjamin Schmidt',
                    role: { de: 'DMS Support', en: 'DMS Support' },
                    website: {
                      de: 'https://www.klima.tu-berlin.de/index.php?show=team_schmidt',
                      en: 'https://www.klima.tu-berlin.de/index.php?show=team_schmidt&lang=en',
                    },
                    email: 'benjamin.schmidt@tu-berlin.de',
                    tel: '+49-(0)30-314-73195',
                },
                {
                    id: 1,
                    name: 'Tom Grassmann',
                    role: { de: 'DMS Support', en: 'DMS Support' },
                    website: {
                      de: 'http://www.klima.tu-berlin.de/index.php?show=team_grassmann',
                      en: 'http://www.klima.tu-berlin.de/index.php?show=team_grassmann&lang=en',
                    },
                    email: 'grassmann@tu-berlin.de',
                    tel: '+49-(0)30-314-71192',
                },
                // {
                //     id: 2,
                //     name: 'Katharina Scherber',
                //     role: { de: 'Koordinationsbüro Berlin', en: 'Coordination Office Berlin' },
                //     website: {
                //     de: 'http://www.klima.tu-berlin.de/index.php?show=team_scherber',
                //     en: 'http://www.klima.tu-berlin.de/index.php?show=team_scherber&lang=en',
                //     },
                //     email: 'katharina.scherber@tu-berlin.de',
                //     tel: '+49-(0)30-314-71330',
                // },
                {
                    id: 3,
                    name: 'Ute Fehrenbach',
                    role: { de: '[UC]² Koordinationsbüro Berlin', en: '[UC]² Co-ordination Office Berlin' },
                    website: {
                      de: 'http://www.klima.tu-berlin.de/index.php?show=team_fehrenbach',
                      en: 'https://www.klima.tu-berlin.de/index.php?show=team_fehrenbach&lan=en'
                    },
                    email: 'ute.fehrenbach@tu-berlin.de',
                    tel: '+49-(0)30-314-71309',
                },
                {
                    id: 4,
                    name: 'Dieter Scherer',
                    role: { de: '[UC]² Programmkoordinator', en: '[UC]² Programme Co-ordinator' },
                    website: {
                      de: 'http://www.klima.tu-berlin.de/index.php?show=team_scherer',
                      en: 'http://www.klima.tu-berlin.de/index.php?show=team_scherer&lang=en'
                    },
                    email: 'dieter.scherer@tu-berlin.de',
                    tel: '+49-(0)30-314-71356',
                },
            ],
        }
    },
}
</script>
