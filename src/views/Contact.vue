<template>
    <div class="contact">
        <v-container class="mx-4 primary--text">
            <h1>Contact Info</h1>
            <v-card v-for="contact in contacts" :key="contact.id" class="ma-1">
                <v-container>
                    <v-row justify="space-between">
                        <v-col cols="auto">
                            <div class="overline mt-1 ml-4">{{ contact.role }}</div>
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
                                    <v-btn text :href="`${contact.website}`" target="_blank">
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
                    name: 'Dieter Scherer',
                    role: 'Programmkoordinator',
                    website: 'http://www.klima.tu-berlin.de/index.php?show=team_scherer',
                    email: 'dieter.scherer@tu-berlin.de',
                    tel: '+49-(0)30-314-71356',
                },
                {
                    id: 1,
                    name: 'Ute Fehrenbach   ',
                    role: 'Koordinationsbüro',
                    website: 'http://www.klima.tu-berlin.de/index.php?show=team_fehrenbach',
                    email: 'ute.fehrenbach@tu-berlin.de',
                    tel: '+49-(0)30-314-71309',
                },
                {
                    id: 2,
                    name: 'Katharina Scherber ',
                    role: 'Koordinationsbüro',
                    website: 'http://www.klima.tu-berlin.de/index.php?show=team_scherber',
                    email: 'katharina.scherber@tu-berlin.de',
                    tel: '+49-(0)30-314-71330',
                },
                {
                    id: 3,
                    name: 'Tom Grassmann',
                    role: 'DMS Support',
                    website: 'http://www.klima.tu-berlin.de/index.php?show=team_grassmann',
                    email: 'grassmann@tu-berlin.de',
                    tel: '+49-(0)30-314-71192',
                },
                {
                    id: 4,
                    name: 'Benjamin Schmidt',
                    role: 'DMS Support',
                    website: 'https://www.klima.tu-berlin.de/index.php?show=team_schmidt',
                    email: 'benjamin.schmidt@tu-berlin.de',
                    tel: '+49-(0)30-314-73195',
                },
            ],
        }
    },
}
</script>
