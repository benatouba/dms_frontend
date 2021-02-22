<template>
    <div id="search-view" class="search">
        <v-container class="mx-4 primary--text">
            <h2>{{ $t('search.title') }}</h2>
            <p class="secondary--text">
                {{ $t('search.info_text') }}
            </p>
            <Search />
            <DataTable :headers="headers" />
        </v-container>
    </div>
</template>

<script>
import Search from '@/components/Search'
import DataTable from '@/components/DataTable'

export default {
    name: 'Files',
    components: {
        Search,
        DataTable,
    },
    data() {
        return {
            headers: {
                file: [
                    { text: 'Campaign', value: 'campaign', align: 'start', showCol: true },
                    { text: 'Location', value: 'location', align: 'start', showCol: true },
                    { text: 'Site', value: 'site', align: 'start', showCol: true },
                    { text: 'Acronym', value: 'acronym', align: 'start', showCol: true },
                    { text: 'Variable', value: 'variables', sortable: false, showCol: true },
                    { text: 'Feature Type', value: 'feature_type', sortable: false, showCol: true },
                    { text: 'Origin Time', value: 'origin_time', showCol: true },
                    { text: 'File Size', value: 'file_size', showCol: true },
                    { text: 'Status', value: 'status', sortable: false, showCol: true },
                    { text: 'File Standard Name', value: 'file_standard_name', showCol: false },
                    { text: 'Institution', value: 'institution', showCol: false },
                    { text: 'Data Content', value: 'data_content', showCol: false },
                    { text: 'Keywords', value: 'keywords', showCol: false },
                    { text: 'Licence', value: 'licence', showCol: false },
                    { text: 'Source', value: 'source', showCol: false },
                    { text: 'Uploader', value: 'uploader', showCol: false },
                    { text: 'File Type', value: 'file_type', showCol: false },
                    { text: 'Creation Time', value: 'creation_time', showCol: false },
                    { text: 'Upload Date', value: 'upload_date', showCol: false },
                    { text: 'UTM Coordinates ll', value: 'll_n_utm', showCol: false },
                    // { text: 'UTM Coordinates ll (E)', value: 'll_e_utm', showCol: false, },h

                    { text: 'UTM Coordinates ur', value: 'ur_n_utm', showCol: false },
                    // { text: 'UTM Coordinates ur (E)', value: 'ur_e_utm', showCol: false, },
                    { text: 'UTM EPSG', value: 'utm_epsg', showCol: false },
                    { text: 'Version', value: 'version', showCol: false },
                    { text: 'Checker Version', value: 'checkerVersionMajor', showCol: false },
                    { text: 'Author', value: 'author', showCol: false },
                    { text: 'Contact Person', value: 'contact_person', showCol: false },
                    { text: '', value: 'data-table-expand', showCol: true },
                ],
                palmfile: [
                    { text: 'Palm Job', value: 'job', showCol: false },
                    { text: 'Type', value: 'type', showCol: true },
                    { text: 'Domain', value: 'domain_name', showCol: true },
                    { text: 'Upload Date', value: 'upload_date', showCol: false },
                    { text: 'File Standard Name', value: 'file_standard_name', showCol: false },
                    { text: 'Restart File', value: 'restart', showCol: false },
                    { text: 'Version', value: 'version', showCol: false },
                    { text: '', value: 'data-table-expand', showCol: true },
                ],
                palmjob: [
                    { text: 'Files', value: 'files', sortable: false, showCol: true },
                    { text: 'Name', value: 'job_name', showCol: true },
                    { text: 'Institutions', value: 'institution_acronyms', showCol: true },
                    { text: 'Licence', value: 'licence', showCol: true },
                    { text: 'Description', value: 'description', sortable: false, showCol: false },
                    { text: '', value: 'data-table-expand', sortable: false, showCol: true },
                ],
            },
        }
    },
}
</script>
