<template>
    <div class="search">
        <v-container class="mx-4 primary--text">
            <Query />
        </v-container>
    </div>
</template>

<script>
import Query from '@/components/Query'

export default {
    name: 'Search',
    components: {
        Query,
    },
}
</script>
