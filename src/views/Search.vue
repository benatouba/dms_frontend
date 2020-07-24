<template>
    <div class="search">
        <v-container class="mx-4 primary--text">
            <Search />
        </v-container>
    </div>
</template>

<script>
import Search from '@/components/Search'

export default {
    name: 'SearchView',
    components: {
        Search,
    },
}
</script>
