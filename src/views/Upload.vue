<template>
    <div class="upload">
        <DropArea />
        <v-divider></v-divider>
        <FileCards />
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
