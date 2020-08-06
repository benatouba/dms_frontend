<template>
    <div class="home">
        <v-container class="mx-4 primary--text">
            <h2>{{ $t('admin.title') }}</h2>
            <MetadataUpload />
            <v-divider></v-divider>
            <FileCard v-for="file in meta" :key="file.name" :file="file"></FileCard>
            <v-divider></v-divider>
            <UserCards />
        </v-container>
    </div>
</template>

<script>
import MetadataUpload from '../components/MetadataUpload'
import UserCards from '../components/UserCards'
import FileCard from '../components/FileCard'
import { mapState } from 'vuex'
export default {
    name: 'AdministrationView',
    components: {
        MetadataUpload,
        FileCard,
        UserCards,
    },
    computed: mapState('upload', ['meta']),
}
</script>
