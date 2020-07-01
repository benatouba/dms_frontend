<template>
    <div>
        <h2>{{ $t('upload.title') }}</h2>
        <v-container>
            <v-layout row wrap>
                <v-row cols="12" wrap>
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
                                    accept="*.nc"
                                    class="input-file"
                                />
                                <p v-html="$t('upload.droparea')" />
                                <p v-if="isSaving">
                                    {{ $tc('upload.uploading1', fileCount, { count: fileCount }) }}
                                    {{ $tc('upload.uploading2', fileCount) }}
                                    {{ $t('upload.uploading3') }}
                                </p>
                            </v-card>
                        </form>
                    </div>
                </v-row>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

const STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3

export default {
    name: 'DropArea',
    computed: {
        ...mapGetters({
            allFiles: 'upload/allFiles',
            uploadedFiles: 'upload/uploadedFiles',
        }),
        files: {
            get() {
                return this.$store.state.files
            },
            set(obj) {
                Array.from(obj).forEach(f => {
                    this.uploadFiles.append(f)
                    this.$store.commit('addFile', f)
                })
            },
        },
        isSaving() {
            return this.currentStatus === STATUS_SAVING
        },
        isSuccess() {
            return this.currentStatus === STATUS_SUCCESS
        },
        isFailed() {
            return this.currentStatus === STATUS_FAILED
        },
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
        handleSubmit(files) {
            this.currentStatus = STATUS_SAVING

            if (!files.length) return

            files.forEach((file, id) => {
                this.uploadFiles({ file, id })
                    .then((this.currentStatus = STATUS_SUCCESS))
                    .catch(err => {
                        this.uploadError = err.response
                        this.currentStatus = STATUS_FAILED
                    })
            })
        },
    },
    data() {
        return {
            // uploadFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos',
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
