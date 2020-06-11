<template>
    <div class="search">
        <v-container class="mx-4 primary--text">
            <h1>Search Files</h1>
            <Query />
        </v-container>
    </div>
</template>

<script>
// @ is an alias to /src
import Query from '@/components/Query'

export default {
    name: 'Search',
    components: {
        Query,
    },
}
</script>
