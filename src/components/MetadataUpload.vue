<template>
    <div>
        <v-container>
            <h3>{{ $t('admin.meta_title') }}</h3>
            <v-row>
            <v-file-input
                    color="primary"
                    v-model="metaDataList"
                    :placeholder="$t('admin.upload_placeholder')"
                    :label="$t('admin.upload_label')"
                    prepend-icon="mdi-file-delimited"
                    @keyup.enter="handleMetadataUpload"
                    clearable
                    type="file"
                    accept=".csv"
            >
                <template v-slot:selection="{ text }">
                    <v-chip
                            label
                            color="primary"
                    >
                        {{ text }}
                    </v-chip>
                </template>
            </v-file-input>
            </v-row>
            <v-row>
            <v-btn-toggle
                    v-model="listname"
                    mandatory
                    elevation="1"
                    dense
                    group
            >
                <v-btn color="secondary" value="institution" text ripple elevation="3">
                    Institution
                </v-btn>
                <v-btn color="secondary" value="site" text ripple elevation="3">
                    Site
                </v-btn>
                <v-btn color="secondary" value="variable" text ripple elevation="3">
                    Variable
                </v-btn>
            </v-btn-toggle>
            </v-row>
            <v-row>
                <v-btn
                        @click="handleMetadataUpload"
                        color="primary"
                        dark
                        text
                        ripple
                        elevation="1"
                >
                    {{ $t('buttons.upload')}}
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'MetadatUpload',
    computed: {
        ...mapActions({
            getInfo: 'accounts/info',
            uploadMetadataList: 'upload/metadataList'
        }),
    },
    methods: {
        handleMetadataUpload() {
            this.$store.dispatch('upload/metadataList', {file: this.metaDataList, listname: this.listname})
        },
        getUserList(data) {
            let newDict = Object.assign({}, data)
            delete newDict.groups
            delete newDict.username
            return newDict
        },
    },
    async mounted() {
        this.accountInfo = await this.$store.dispatch('accounts/info', '')
    },
    data() {
        return {
            metaDataList: null,
            listname: '',
        }
    },
}
</script>

<style>
    .key{
        text-transform: capitalize;
    }
</style>
