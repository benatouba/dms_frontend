<template>
    <div>
        <v-container>
            <h3>{{ $t('admin.meta_title') }}</h3>
            <v-row>
                <v-file-input
                    color="primary"
                    v-model="data"
                    :placeholder="$t('admin.upload_placeholder')"
                    :label="$t('admin.upload_label')"
                    prepend-icon="mdi-file-delimited"
                    @keyup.enter="handleMetadataUpload"
                    clearable
                    type="file"
                    accept=".csv"
                >
                    <template v-slot:selection="{ text }">
                        <v-chip label color="primary">
                            {{ text }}
                        </v-chip>
                    </template>
                </v-file-input>
            </v-row>
            <v-row align="center">
                <v-btn-toggle v-model="listname" mandatory elevation="1" dense dark group>
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
                <span class="text--secondary">{{ $t('buttons.option_select') }}</span>
            </v-row>
            <v-row>
                <v-btn @click="handleMetadataUpload" color="primary" dark text ripple elevation="1">
                    {{ $t('buttons.upload') }}
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'MetadataUpload',
    methods: {
        ...mapActions({
            uploadMetadataList: 'upload/metadataList',
        }),
        handleMetadataUpload() {
            this.uploadMetadataList({ file: this.data, type: this.listname })
        },
    },
    data() {
        return {
            data: null,
            listname: 'institution',
        }
    },
}
</script>

<style>
.key {
    text-transform: capitalize;
}
</style>
