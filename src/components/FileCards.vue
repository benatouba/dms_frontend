<template>
    <v-container>
        <v-expansion-panels v-for="data in files" :key="data.file.name" elevation="5" outlined>
            <v-expansion-panel v-if="Object.keys(data.resp).length">
                <v-row no-gutters>
                <v-expansion-panel-header :class="`filename${data.resp.status}`">
                    <strong>{{ data.file.name }}</strong>
                    <span color="#000000">{{ data.uploaded? 'uploaded': 'not uploaded'}}</span>
                    <v-btn
                            v-if="data.resp.status === 2"
                            v-on:click.stop="uploadAnyway(data.file,true, false)"
                            text
                            left
                            ripple
                            class="ma-2 primary--text"
                            outlined
                            tile
                            target="_blank"
                    >
                        {{ $t('buttons.upload_with_warnings') }}
                    </v-btn>
                    <v-btn
                            v-if="data.resp.status === 3 && is_superuser"
                            v-on:click.stop="uploadAnyway(data.file, true, true)"
                            text
                            x-small
                            left
                            ripple
                            class="ma-2 primary--text"
                            outlined
                            tile
                            dense
                            target="_blank"
                    >
                        {{ $t('buttons.upload_with_errors') }}
                    </v-btn>

                </v-expansion-panel-header>
                </v-row>
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
            is_superuser: state => state.accounts.is_superuser
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
            delete data.result
            delete data.status
            return data
        }
    }
}
</script>

<style lang="scss">
.filename1 {
    border-left: 4px solid #3cd1c2;
}
.filename2 {
    border-left: 4px solid #ffaa2c;
    color: #ffaa2c;
}
.filename3 {
    border-left: 4px solid #f83e70;
    color: #f83e70;
}
.filename4 {
    border-left: 4px solid #f83e70;
    color: #f83e70;
}
.warnings {
    border-left: 4px solid #ffaa2c;
    color: #ffaa2c;
}
.errors {
    border-left: 4px solid #f83e70;
    text-align: left;
    justify-self: left;
}
.fatal {
    border-left: 4px solid #000000;
    text-align: left;
    justify-self: left;
}
</style>
