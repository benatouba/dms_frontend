<template>
    <div>
        <v-container class="mx-4">
            <h2 class="primary--text">{{ $t('upload.title') }}</h2>
            <p>{{ $t('upload.info_text') }}</p>
            <i18n path="upload.format_note" tag="strong">
                <template v-slot:link>
                    <a :href="$t('nav.data_standard_link')" target="_blank">
                        {{ $t('nav.data_standard') }}
                    </a>
                </template>
            </i18n>
            <DropArea />
            <v-divider></v-divider>
            <FileCards />
        </v-container>
    </div>
</template>

<script>
import DropArea from '@/components/DropArea'
import FileCards from '@/components/FileCards'

export default {
    name: 'Upload',
    components: {
        DropArea,
        FileCards,
    },
}
</script>
