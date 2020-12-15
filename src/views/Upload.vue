<template>
    <div>
        <v-container class="mx-4">
            <h2 class="primary--text">{{ $t('upload.title') }}</h2>
            <p>{{ $t('upload.info_text') }}</p>
            <i18n path="upload.format_note" tag="strong">
                <template v-slot:link>
                    <a :href="$t('nav.data_standard_link')" target="_blank">
                        {{ $t('nav.data_standard') }}
                    </a>
                </template>
            </i18n>
            <DropArea />
            <v-btn :disabled="!hasUploaded" v-on:click="handleUndo" block v-bind:class="{ primary: hasUploaded }">
                {{ $t('buttons.undo_upload') }}
            </v-btn>
            <v-divider></v-divider>
            <FileCards :files="files"></FileCards>
        </v-container>
    </div>
</template>

<script>
import DropArea from '@/components/DropArea'
import FileCards from '@/components/FileCards'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Upload',
    components: {
        DropArea,
        FileCards,
    },
    computed: {
        ...mapState({
            files: state => state.upload.files,
        }),
        hasUploaded() {
            return this.files.some(function (elm) {
                return elm.uploaded
            })
        },
    },
    methods: {
        ...mapActions({
            delete: 'queries/delete', // deletes a file from the backend
            remove: 'upload/removeFile', // only removes a file from the displayed list
        }),
        handleUndo: function () {
            let toDelete = Array()
            let elm
            for (let i = this.files.length - 1; i >= 0; i--) {
                elm = this.files[i]
                if (elm.uploaded) {
                    toDelete.push(elm.resp.result)
                } else {
                    this.remove(elm)
                }
            }
            if (toDelete) {
                this.delete(toDelete)
            }
        },
    },
}
</script>
