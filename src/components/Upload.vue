<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="12" md="6">
                <div id="app" v-cloak @drop.prevent="handleDrop" @dragover.prevent>
                    <v-file-input
                        chips
                        v-model="localFiles"
                        id="name"
                        show-size
                        counter
                        multiple
                        label="File input"
                    ></v-file-input>
                    <v-btn :disabled="uploadDisabled" @click="handleSubmit(localFiles)" icon large target="_blank">
                        <v-icon>mdi-upload</v-icon>
                    </v-btn>
                    <v-card
                        v-for="f in localFiles"
                        :key="f.name"
                        class="mx-auto text--alert"
                        :elevation="5"
                        max-width="200"
                        outlined
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-4">{{ f.size / 1000 + ' KB' }}</div>
                                <v-list-item-title class="headline mb-1">{{ f.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ message }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn icon @click="handleSubmit([f])">
                                <v-icon>mdi-upload</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-remove</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
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
            'failedFiles',
            'successFiles',
            'warningFiles',
            'errorFiles',
            'fatalFiles',
        ]),
        uploadDisabled() {
            return this.localFiles.length === 0
        },
    },
    methods: {
        ...mapActions({
            uploadFiles: 'uploadFiles',
        }),
        ...mapMutations({
            addFile: 'addFile',
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
            // e.preventDefault()
            // uploadFiles = Array.from(uploadFiles)
            console.log(uploadFiles)
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
