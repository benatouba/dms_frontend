<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <div id="app" v-cloak @drop.prevent="handleDrop" @dragover.prevent>
                    <v-file-input
                        chips
                        :value="files"
                        @input="addFile"
                        id="name"
                        show-size
                        counter
                        multiple
                        label="File input"
                    ></v-file-input>
                    <v-btn :disabled="uploadDisabled" @click="handleSubmit(localFiles)" icon large target="_blank">
                        <v-icon>mdi-upload</v-icon>
                    </v-btn>
                    <v-container>
                        <v-row>
                            <v-col v-for="f in files" :key="f.id" class="d-flex" :elevation="5" outlined cols="12">
                                <v-card max-width="800" elevation="5" outlined class="align-self-items">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <div class="overline mb-4">{{ f.size / 1000 + ' KB' }}</div>
                                            <v-list-item-title class="headline">{{ f.name }}</v-list-item-title>
                                            <v-list-item-subtitle>{{ f.message }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-card-actions>
                                            <v-btn icon @click="handleSubmit([f])">
                                                <v-icon>mdi-upload</v-icon>
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn icon @click="removeFile(f.id)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-list-item>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
    name: 'upload',
    filters: {
        kb: function(val) {
            return Math.floor(val / 1024)
        },
    },
    computed: {
        ...mapState({
            users: state => state.users,
            files: state => state.files,
            message: state => state.alerts.message,
            status: state => state.alerts.status,
        }),
        ...mapGetters([
            // 'allFiles',
            'uploadedFiles',
            'notUploadedFiles',
            'successFiles',
            'warningFiles',
            'errorFiles',
            'fatalFiles',
        ]),
        uploadDisabled() {
            return this.localFiles.length === 0
        },
        files: {
            get() {
                return this.$store.state.files
            },
            set(obj) {
                this.$store.commit('addFile', obj)
            },
        },
    },
    methods: {
        ...mapActions({
            uploadFiles: 'uploadFiles',
        }),
        ...mapMutations({
            addFile: 'addFile',
            removeFile: 'removeFile',
            updateMessage: 'updateMessage',
        }),
        ...mapGetters({
            allFiles: 'allFiles',
        }),
        handleDrop(e) {
            e.preventDefault()
            let droppedFiles = Array.from(e.dataTransfer.files)
            this.localFiles = this.localFiles.concat(droppedFiles)
            droppedFiles.forEach(f => {
                console.log(f)
                this.addFile(f)
            })
        },
        // eslint-disable-next-line no-unused-vars
        handleSubmit(uploadFiles) {
            uploadFiles.forEach(file => {
                console.log(file)
                this.uploadFiles({ file })
            })
        },
    },
    data() {
        return {
            localFiles: [],
            inputRules: [v => v || 'Minimum file name length is 3 characters'],
            uploaded: false,
        }
    },
}
</script>

<!--<style scoped>-->
<!--h1 {-->
<!--  color: darkblue;-->
<!--}-->
<!--</style>-->
