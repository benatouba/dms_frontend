<template>
    <div class="container">
        <form enctype="multipart/form-data" novalidate>
            <h1>Upload files</h1>
            <div class="dropbox primary lighten-3">
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
                <h3 class="center text-center">
                    Drag your file(s) here<br />
                    or click to browse
                </h3>
                <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
            </div>
        </form>
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
        /*...mapState({
            files: state => state.files,
            message: state => state.alerts.message,
            status: state => state.alerts.status,
        }),*/
        ...mapGetters([
            'allFiles',
            'uploadedFiles',
            'notUploadedFiles',
            'successFiles',
            'warningFiles',
            'errorFiles',
            'fatalFiles',
        ]),
        files: {
            get() {
                return this.$store.state.files
            },
            set(obj) {
                Array.from(obj).forEach(f => {
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
            uploadFiles: 'uploadFiles',
        }),
        ...mapMutations({
            addFile: 'addFile',
            setStatus: 'setStatus',
            removeFile: 'removeFile',
            updateMessage: 'updateMessage',
        }),
        handleSubmit(files) {
            this.currentStatus = STATUS_SAVING

            if (!files.length) return

            files.forEach(file => {
                console.log(file)
                this.uploadFiles({ file })
                    .then(x => {
                        console.log(x)
                        this.currentStatus = STATUS_SUCCESS
                    })
                    .catch(err => {
                        this.uploadError = err.response
                        this.currentStatus = STATUS_FAILED
                    })
            })
        },
    },
    data() {
        return {
            // uploadedFiles: [],
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
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
}

.input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}

.dropbox:hover {
    background: 'secondary lighten-3'; /* when mouse over to the drop zone, change color */
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}
</style>
