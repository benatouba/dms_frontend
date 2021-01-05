<template>
    <v-row align="center">
        <div class="container">
            <form enctype="multipart/form-data" novalidate>
                <v-card class="dropbox primary accent--text text-center" outline block flat hover xs12 md6>
                    <input
                        id="droparea-input"
                        type="file"
                        multiple
                        :name="uploadFieldName"
                        :disabled="isSaving"
                        @change="handleSubmit($event.target.files)"
                        fileCount="$event.target.files.length"
                        accept="application/x-netcdf"
                        class="input-file"
                    />
                    <p v-if="!isSaving" v-html="$t('upload.droparea')" />
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import i18n from '@/plugins/i18n'

export default {
    name: 'DropArea',
    computed: {
        ...mapGetters({
            allFiles: 'upload/allFiles',
            uploadedFiles: 'upload/uploadedFiles',
        }),
        ...mapState('upload', ['files']),
    },
    methods: {
        ...mapActions({
            uploadFiles: 'upload/uploadFiles',
            info: 'alerts/info',
        }),
        checkFiletype(files) {
            let str
            let noTypeFiles = []
            files.forEach(file => {
                str = file.name.toLowerCase()
                // first check for non-netcdf files
                // then check if file name can be associated with category
                if (file.type !== 'application/x-netcdf') {
                    noTypeFiles.push(file.name)
                } else if (str.startsWith('p3d')) {
                    file.file_type = 'p3d'
                } else if (str.startsWith('uc2')) {
                    file.file_type = 'uc2'
                } else {
                    file.file_type = undefined
                    noTypeFiles.push(file.name)
                }
            })
            return noTypeFiles
        },
        async handleSubmit(files) {
            if (!files.length) return
            let noTypeFiles = this.checkFiletype(files)
            if (noTypeFiles.length) {
                this.info({
                    type: 'error',
                    message: i18n.t('alerts.undefined_type_upload', {
                        fileTypes: 'P3D, DYNAMIC, CHEMISTRY, STATIC, RLW, RSW, VMEAS, PALMCONFIG, CSDCONFIG, UC2',
                        noTypeFiles: noTypeFiles.join(', '),
                    }),
                })
                return
            }

            this.isSaving = true

            files.forEach(file => {
                this.uploadFiles({
                    file,
                    ignore_warnings: false,
                    ignore_errors: false,
                })
            })
            await new Promise(r => setTimeout(r, 2000))
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
