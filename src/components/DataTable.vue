<template>
    <v-container class="text--primary">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="queriedFiles"
            :server-items-length="totalQueriedFiles"
            :loading="querying"
            :expanded.sync="expanded"
            :options.sync="options"
            show-expand
            item-key="id"
            show-select
            elevation="5"
        >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-btn
                    color="primary"
                    class="ma-1"
                    v-bind="selected"
                    @click="handleBatchDownload"
                    :disabled="!selected.length"
                >
                  <v-icon left dark>
                    mdi-download
                  </v-icon>
                  Download
                </v-btn>
                <v-spacer></v-spacer>
                <b-confirmation-dialog
                    color="error"
                    class="mx-1"
                    @confirm="deleteFile(selected)"
                    :disabled="!selected.length"
                    :title="$t('buttons.delete')"
                    :body="$t('search.delete_warning')"
                >
                  <v-icon left dark>
                    mdi-delete
                  </v-icon>
                  Delete
                </b-confirmation-dialog>
                <b-confirmation-dialog
                    class="mx-1"
                    :disabled="!selected.length"
                    :title="$t('buttons.mark_invalid')"
                    :body="$t('search.mark_invalid_warning')"
                    color="warning"
                    @confirm="setInvalid(selected)"
                >
                  <v-icon dark left>
                    error_outline
                  </v-icon>
                  Mark Invalid
                </b-confirmation-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.data-table-expand>
              <v-icon >
                $expand
              </v-icon>
            </template>
            <template v-slot:item.origin_time="{ value }">
              <span>{{ value.split("T")[0]}}</span>
            </template>
            <template v-slot:item.file_size="{ item }">
              <div style="white-space: nowrap;">
                <span>{{ getItemValue('file_size', item) }}</span>
              </div>
            </template>
          <template v-slot:item.status="{ item }">
            <div style="white-space: nowrap;">
              <b-status-icon
                  :icon="'mdi-circle'"
                  :color="colorStyle(item)"
                  :tooltip="getStatusTooltip(item)"
              />
              <b-status-icon
                  :icon="isDeletable(item) ? 'mdi-delete': 'mdi-delete-off'"
                  :tooltip="isDeletable(item) ? $t('tooltip.deletable'): $t('tooltip.not_deletable')"
              />
              <b-status-icon
                  :icon="isMarkableInvalid(item)? 'report': 'report_off'"
                  :tooltip="isMarkableInvalid(item)? $t('tooltip.markable_invalid'): $t('tooltip.not_markable_invalid')"
              />
            </div>
          </template>
            <template v-slot:expanded-item="{ headers, item}">
                <td :colspan="headers.length">
                  <v-list dense class="ma-2">
                    <v-list-item
                        v-for="lh in listHeaders"
                        :key="lh.value"
                    >
                      <v-col>
                        {{ lh.text }}
                      </v-col>
                      <v-col>
                        <div v-if="['contact_person', 'author'].filter(x => x === lh.value).length !== 0">
                          <v-btn
                              v-for="person of getItemValue(lh.value, item)"
                              :key="person.email"
                              x-small
                              :href="`mailto:${person.email}`">
                            <v-icon x-small>mdi-email</v-icon>
                            {{ person.last_name + ", " + person.first_name}}
                          </v-btn>
                        </div>
                        <div v-else>
                            {{ getItemValue(lh.value, item) }}
                        </div>
                      </v-col>
                    </v-list-item>
                  </v-list>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import filesize from 'filesize'
import i18n from "@/plugins/i18n"
export default {
  name: 'DataTable',
  computed: {
        ...mapState({
            account: state => state.account,
            queriedFiles: state => state.queries.result,
            querying: state => state.queries.querying,
            downloading: state => state.queries.downloading,
            itemCount: state => state.queries.count,
        }),
        ...mapGetters({
          group: 'account/group',
          meta: 'queries/meta'
        }),
        getPageCount() {
            return Math.ceil(this.itemCount / this.pageLength)
        },
    },
    methods: {
        ...mapActions({
            download: 'queries/download',
            downloadAll: 'queries/downloadAll',
            deleteFile: 'queries/delete',
            setInvalid: 'queries/setInvalid',
            resetQueryState: 'queries/resetQueryState',
            search: 'queries/search',
        }),
        isDeletable(item) {
          return (!item.download_count  && !item.is_old && (!!this.group(item.acronym) || !!this.account.is_superuser))
        },
        isMarkableInvalid(item) {
          return (!item.is_invalid  && !item.is_old && (!!this.group(item.acronym) || !!this.account.is_superuser))
        },
        getStatusTooltip(item) {
          let status = item.has_warnings ? i18n.t('tooltip.data_standard_conform') : i18n.t('tooltip.data_standard_conform')
          if (item.is_old) {
            status = i18n.t('tooltip.is_old')
          } else if (item.has_errors) {
            status = i18n.t('tooltip.data_standard_conform')      // FIXME: change to error once issue is resolved
          } else if (item.is_invalid) {
            status = i18n.t('tooltip.is_invalid')
          }
          return status
        },
        getItemValue(key, item) {
          if (key === 'file_size') {
            return filesize(item.file_size)
          }
          if (['contact_person', 'author'].filter(x => key === x).length !== 0) {
            let result = []
            let dict
            let divided
            let people = item[key].split(";")
            people.forEach(p => {
              divided = p.split(",")
              if (divided.length !== 3) {
                result.push('not parsable')
              } else {
                dict = { last_name: divided[0], first_name: divided[1], email: divided[2] }
                result.push(dict)
              }
            })
            return result
          }
          const entries = Object.entries(item)
          let result
          for (var [itemKey, itemValue] of entries) {
            if (key === itemKey) {
              result = itemValue
            }
          }
          if (Array.isArray(result)) {
            result.join(', ')
          }
          if (key === 'checkerVersionMajor') {
            result = item.checkerVersionMajor + '.' + item.checkerVersionMinor + '.' + item.checkerVersionSub
          }
          return result
        },
        handleBatchDownload() {
            if (this.selected.length === 1) {
              this.download(this.selected[0])
            } else {
              let ids = []
              this.selected.forEach(
                  obj => ids.push(obj.id)
              )
              this.downloadAll(ids)
            }
        },
        handleBatchMarkInvalid() {
          this.selected.forEach(item => {
            this.setInvalid(item)
          })
        },
        colorStyle(item) {
            let color = item.has_warnings ? 'success' : 'success' // FIXME: change color to warning once issue is resolved
            if (item.is_old) {
                color = 'brown'
            } else if (item.has_errors) {
                color = 'success'       // FIXME: change color to error once issue is resolved
            } else if (item.is_invalid) {
                color = 'warning'
            }
            return color
        },
    },
    watch: {
      options: {
        handler () {
          this.loading = true
          let ordering = null
          let offset = 0
          let limit = 10
          const { sortBy, sortDesc, page, itemsPerPage } = this.options
          offset = (page-1) * itemsPerPage
          limit = itemsPerPage
          if (sortBy.length) {
            ordering = this.options.sortBy[0]
          }
          if (sortDesc[0]) {
            ordering = '-' + ordering
          }
          this.search({ordering, offset, limit})
          this.loading = false
        },
        deep: true,
      }
    },
    data() {
        return {
            totalQueriedFiles: 10,
            options: {},
            loading: false,
            headers: [
                { text: 'Campaign', value: 'campaign' },
                { text: 'Location', value: 'location' },
                { text: 'Site', value: 'site' },
                { text: 'Acronym', value: 'acronym' },
                { text: 'Variable', value: 'variables', sortable: false, },
                { text: 'Feature Type', value: 'feature_type', sortable: false, },
                { text: 'Origin Time', value: 'origin_time' },
                { text: 'File Size', value: 'file_size' },
                { text: 'Status', value: 'status', sortable: false, },
            ],
            listHeaders: [
              {
                text: 'File Standard Name',
                align: 'start',
                value: 'file_standard_name',
              },
              { text: 'Institution', value: 'institution' },
              { text: 'Data Content', value: 'data_content' },
              { text: 'Keywords', value: 'keywords' },
              { text: 'Licence', value: 'licence' },
              { text: 'Source', value: 'source' },
              { text: 'Uploader', value: 'uploader' },
              { text: 'File Type', value: 'file_type' },
              { text: 'Creation Time', value: 'creation_time' },
              { text: 'Upload Date', value: 'upload_date' },
              { text: 'UTM Coordinates ll (N)', value: 'll_n_utm', sortable: false, },
              { text: 'UTM Coordinates ll (E)', value: 'll_e_utm', sortable: false, },
              { text: 'UTM Coordinates ur (N)', value: 'ur_n_utm', sortable: false, },
              { text: 'UTM Coordinates ur (E)', value: 'ur_e_utm', sortable: false, },
              { text: 'UTM EPSG', value: 'utm_epsg' },
              { text: 'Version', value: 'version' },
              { text: 'Checker Version', value: 'checkerVersionMajor' },
              { text: 'Author', value: 'author' },
              { text: 'Contact Person', value: 'contact_person' },
            ],
            selected: [],
            expanded: [],
        }
    },
}
</script>
