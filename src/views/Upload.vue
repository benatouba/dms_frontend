<template>
    <div>
        <v-container class="mx-4 primary--text">
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
