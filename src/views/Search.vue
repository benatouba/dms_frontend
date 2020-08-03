<template>
    <div class="search">
        <v-container class="mx-4 primary--text">
            <h2>{{ $t('search.title') }}</h2>
            <p class="secondary--text">
                {{ $t('search.info_text') }}
            </p>
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
