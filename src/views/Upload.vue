<template>
    <div>
        <v-container class="mx-4">
            <h2 class="primary--text">{{ $t('upload.title') }}</h2>
            <p>{{ $t('upload.info_text') }}</p>
            <i18n path="upload.format_note" tag="strong">
                <template #link>
                    <a :href="$t('nav.data_standard_link')" target="_blank">
                        {{ $t('nav.data_standard') }}
                    </a>
                </template>
            </i18n>
            <v-tabs v-model="tab">
                <v-tabs-slider color="primary"></v-tabs-slider>
                <v-tab v-for="item in filetypes" :key="item.value"> {{ item.title }} </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <DropArea />
                </v-tab-item>
                <v-tab-item>
                    <PalmfileDropArea />
                </v-tab-item>
            </v-tabs-items>
            <v-btn :disabled="!hasUploaded" @click="handleUndo" block :class="{ primary: hasUploaded }">
                {{ $t('buttons.undo_upload') }}
            </v-btn>
            <v-divider></v-divider>
            <FileCards :files="files"></FileCards>
        </v-container>
    </div>
</template>

<script>
import DropArea from '@/components/DropArea'
import PalmfileDropArea from '@/components/PalmfileDropArea'
import FileCards from '@/components/FileCards'
import { mapActions } from 'vuex'

export default {
    name: 'Upload',
    components: {
        DropArea,
        FileCards,
        PalmfileDropArea,
    },
    computed: {
        files() {
            return this.$store.state.upload.files.filter(obj => obj.db_filetype === this.filetypes[this.tab].value)
        },
        hasUploaded() {
            return this.files.some(elm => {
                return elm.uploaded
            })
        },
    },
    methods: {
        ...mapActions({
            delete: 'queries/delete', // deletes a file from the backend
            remove: 'upload/removeFile', // only removes a file from the displayed list
        }),
        async getJobList() {
            return await fetch(process.env.VUE_APP_API_ENDPOINT + 'data/palmjob/')
        },
        handleUndo() {
            let toDelete = Array()
            let elm
            for (let i = this.files.length - 1; i >= 0; i--) {
                elm = this.files[i]
                if (elm.uploaded) {
                    toDelete.push(elm)
                } else {
                    this.remove(elm)
                }
            }
            if (toDelete) {
                this.delete(toDelete)
            }
        },
    },
    data() {
        return {
            filetypes: [
                { title: '[UC]² Observations', value: 'uc2' },
                { title: 'PALM-4U Job', value: 'palmfile' },
            ],
            tab: '',
        }
    },
}
</script>
