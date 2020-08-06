<template>
    <div>
        <v-container>
            <h3>{{ $t('admin.meta_title') }}</h3>
            <v-row class="my-2" align="center">
              <v-btn-toggle v-model="listname" dense dark group>
                <v-btn color="primary" value="institution" text ripple elevation="5">
                  {{ $t('buttons.institution') }}
                </v-btn>
                <v-btn color="primary" value="site" text ripple elevation="5">
                  {{ $t('buttons.site') }}
                </v-btn>
                <v-btn color="primary" value="variable" text ripple elevation="5">
                  {{ $t('buttons.variable') }}
                </v-btn>
              </v-btn-toggle>
              <span class="text--secondary">{{ $t('buttons.option_select') }}</span>
            </v-row>
            <v-row class="my-2">
                <v-file-input
                    v-if="!!listname"
                    color="primary"
                    v-model="data"
                    :placeholder="$t('admin.upload_placeholder')"
                    :label="$t('admin.upload_label')"
                    prepend-icon="mdi-file-delimited"
                    @keyup.enter.prevent="handleMetadataUpload"
                    clearable
                    show-size
                    type="file"
                    accept=".csv"
                >
                    <template v-slot:append-outer>
                        <v-btn
                            v-show="!!data"
                            @click="handleMetadataUpload"
                            color="primary"
                            dark text ripple elevation="5">
                            {{ $t('buttons.upload') }}
                        </v-btn>
                    </template>
                </v-file-input>
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
        handleMetadataUpload(e) {
            if (e) {
                e.preventDefault()
            }
            this.uploadMetadataList({ file: this.data, type: this.listname })
        },
    },
    data() {
        return {
            data: null,
            listname: '',
        }
    },
}
</script>

<style>
.key {
    text-transform: capitalize;
}
</style>
