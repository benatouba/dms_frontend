<template>
    <div class="upload">
        <h1>Upload Files</h1>
        <upload />
    </div>
</template>

<script>
import upload from '../components/Upload'

export default {
    name: 'Upload',
    components: {
        upload,
    },
}
</script>
