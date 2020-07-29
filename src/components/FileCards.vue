<template>
    <v-container>
        <v-expansion-panels v-for="data in files" :key="data.file.name" elevation="5" outlined>
            <v-expansion-panel v-if="Object.keys(data.resp).length">
                <v-expansion-panel-header :style="colorStyle(data.resp)">
                    <v-row align="center">
                        <v-col cols="5">
                            <strong v-if="!!data.file.name">{{ data.file.name }}</strong>
                            <strong v-else>{{ $t('upload.no_title')}}</strong>
                        </v-col>
                        <v-col cols="2">
                            <span color="#000000">{{ data.uploaded? $t('upload.uploaded'): $t('upload.not_uploaded') }}</span>
                        </v-col>
                        <v-col cols="1" justify="end">
                            <v-btn
                                    v-if="data.resp.status === 2 && !data.uploaded"
                                    v-on:click.stop="uploadAnyway(data.file,true, false)"
                                    text
                                    small
                                    ripple
                                    class="ma-2 primary--text"
                                    outlined
                                    target="_blank"
                            >
                                {{ $t('buttons.upload_with_warnings') }}
                            </v-btn>
                            <v-btn
                                    v-if="data.resp.status === 3 && is_superuser && !data.uploaded"
                                    v-on:click.stop="uploadAnyway(data.file, true, true)"
                                    text
                                    small
                                    ripple
                                    class="ma-2 primary--text"
                                    outlined
                                    target="_blank"
                            >
                                {{ $t('buttons.upload_with_errors') }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-treeview
                            :items="buildTree(value, key)"
                            :key="key"
                            v-for="(value, key) in getDataForTreeview(data.resp)"
                            :class="`${key}`"
                            rounded
                            hoverable
                            activatable
                            open-all
                            open-on-click
                    >
                    </v-treeview>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import { build_obj, mapper } from '../helpers/treebuilder.js'
import { mapState } from 'vuex'

export default {
    name: 'FileCards',
    computed: {
        ...mapState({
            files: state => state.upload.files,
            is_superuser: state => state.account.is_superuser
        }),
    },
    methods: {
        uploadAnyway(file, ignore_warnings, ignore_errors) {
            this.$store.dispatch('upload/uploadFiles', {
                file,
                ignore_warnings,
                ignore_errors,
                }
            )
        },
        buildTree(data, name) {
            if (Object.keys(data).length) {
                return [build_obj(0, name, mapper(data, 1)[0])]
            }
        },
        getDataForTreeview(data) {
            let newData = {...data}
            delete newData.result
            delete newData.status
            return newData
        },
        colorStyle(resp) {
            let colors = [
                this.$vuetify.theme.themes.light.success,
                this.$vuetify.theme.themes.light.warning,
                this.$vuetify.theme.themes.light.error,
                this.$vuetify.theme.themes.light.accent,
            ]
            let string = `border-left: 4px solid ${colors[resp.status - 1]};`
            return string
        },
    }
}
</script>