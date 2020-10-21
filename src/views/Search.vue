<template>
    <div id="search-view" class="search">
        <v-container class="mx-4 primary--text">
            <h2>{{ $t('search.title') }}</h2>
            <p class="secondary--text">
                {{ $t('search.info_text') }}
            </p>
            <Search/>
            <DataTable />
        </v-container>
    </div>
</template>

<script>
import Search from '@/components/Search'
import DataTable from "@/components/DataTable";

export default {
    name: 'SearchView',
    components: {
        Search,
        DataTable,
    },
}
</script>
