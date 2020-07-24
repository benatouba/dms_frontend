<template>
    <div>
        <h2>{{ $t('upload.title') }}</h2>
        <v-container>
            <v-layout row>
                <v-row align="center">
                    <div class="container">
                        <form enctype="multipart/form-data" novalidate>
                            <v-card
                                class="dropbox primary secondary--text text-center"
                                outline
                                block
                                flat
                                hover
                                xs12
                                md6
                            >
                                <input
                                    type="file"
                                    multiple
                                    :name="uploadFieldName"
                                    :disabled="isSaving"
                                    @change="handleSubmit($event.target.files)"
                                    fileCount="$event.target.files.length"
                                    accept="binary/*"
                                    class="input-file"
                                />
                                <p v-if="!isSaving" v-html="$t('upload.droparea')"/>
                                <p v-show="isSaving">
                                    {{ $tc('upload.uploading1', fileCount, { count: fileCount }) }}
                                    {{ $tc('upload.uploading2', fileCount) }}
                                    {{ $t('upload.uploading3') }}
                                </p>
                                <v-text-field v-show="isSaving" color="black" loading disabled></v-text-field>
                            </v-card>
                        </form>
                    </div>
                </v-row>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
    name: 'DropArea',
    computed: {
        ...mapGetters({
            allFiles: 'upload/allFiles',
            uploadedFiles: 'upload/uploadedFiles',
        }),
        ...mapState('upload', ['files'])
    },
    methods: {
        ...mapActions({
            uploadFiles: 'upload/uploadFiles',
        }),
        ...mapMutations({
            addFile: 'upload/addFile',
            removeFile: 'upload/removeFile',
            updateMessage: 'upload/updateMessage',
        }),
        async handleSubmit(files) {
            this.isSaving = true

            if (!files.length) return

            files.forEach((file) => {
                this.$store.dispatch('upload/uploadFiles', {
                    file,
                    ignore_warnings: false,
                    ignore_errors: false,
                })
            })
            await new Promise(r => setTimeout(r, 2000));
            this.isSaving = false
        },
    },
    data() {
        return {
            uploadError: null,
            isSaving: false,
            uploadFieldName: 'netCDF',
            fileCount: null,
        }
    },
}
</script>

<style lang="scss">
.dropbox {
    outline: 2px dashed black;
    outline-offset: -10px;
    color: 'warning';
    padding: 10px 10px;
    min-height: 200px;
    position: relative;
    z-index: 0;
    cursor: pointer;
    opacity: 50;
}

.input-file {
    opacity: 0;
    margin-left: -50%;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    cursor: pointer;
    background-color: #f83e70;
    justify-self: center;
}
</style>
