<template>
    <div class="home">
        <v-container class="mx-4 primary--text">
            <h2>{{ $t('admin.title') }}</h2>
            <MetadataUpload />
            <v-divider></v-divider>
            <FileCards :files="meta"></FileCards>
            <v-divider></v-divider>
            <UserCards />
        </v-container>
    </div>
</template>

<script>
import MetadataUpload from '../components/MetadataUpload'
import UserCards from '../components/UserCards'
import FileCards from '../components/FileCards'
import { mapState } from 'vuex'
export default {
    name: 'AdministrationView',
    components: {
        MetadataUpload,
        FileCards,
        UserCards,
    },
    computed: {
      ...mapState({
        meta: state => state.upload.meta
      }),
    },
}
</script>
