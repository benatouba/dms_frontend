<template>
    <v-container>
        <v-expansion-panels class="elevation-5">
            <v-expansion-panel color="primary" flat>
                <v-expansion-panel-header>{{ $t('account.change_groups') }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form>
                        <v-autocomplete
                                @keyup.enter="handleSubmit"
                                v-model="searchInput.institution"
                                :items="choices.institution"
                                item-text="ge_title"
                                item-value="acronym"
                                label="Institution"
                                color="primary"
                                @change="handleSubmit; getChoices(choices.site, 'site', searchInput.institution)"
                        ></v-autocomplete>
                        </v-form>
                        <v-card-actions>
                            <v-btn
                                color="primary"
                                @click="handleSubmit"
                            >
                                {{ $t('buttons.send') }}
                            </v-btn>
                        </v-card-actions>
                    </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'ChangeGroups',
    methods: {
        ...mapActions({ patch: 'account/patch' }),
        handleSubmit() {
        },
        getGroups() {

        },
    },
    created() {
        this.getGroups()
    }
}
</script>
