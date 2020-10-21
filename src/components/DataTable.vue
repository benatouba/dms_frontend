<template>
    <v-container class="text--primary">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="queriedFiles"
            :loading="querying"
            :expanded.sync="expanded"
            show-expand
            dense
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
                    class="mx-1"
                    v-bind="selected"
                    @click="handleBatchDownload"
                    :disabled="!selected.length"
                >
                  <v-icon left dark>
                    mdi-download
                  </v-icon>
                  Download
                </v-btn>
                <b-confirmation-dialog
                    color="error"
                    class="mx-2"
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
                <v-spacer></v-spacer>
                <v-icon
                    dark
                    class="mx-3"
                    color="primary"
                    elevation="5"
                >
                  help
                </v-icon>
              </v-toolbar>
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
                  :icons="{ active: 'mdi-circle' }"
                  :color="colorStyle(item)"
              />
              <b-status-icon
                  :icons="{ active: 'mdi-delete', inactive: 'mdi-delete-off' }"
                  :active="!item.download_count  && !item.is_old && (!!group(item.institution) || !!account.is_superuser)"
              />
              <b-status-icon
                  :icons="{ active: 'report', inactive: 'report_off' }"
                  :active="!item.is_invalid  && !item.is_old && (!!group(item.institution) || !!account.is_superuser)"
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
import BConfirmationDialog from "@/components/BConfirmationDialog";
import BStatusIcon from "@/components/BStatusIcon";
export default {
    name: 'DataTable',
  components: {BStatusIcon, BConfirmationDialog},
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
        }),
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
    mounted() {
        this.pageLength = 10
        this.page = 1
    },
    data() {
        if (!this.page) {
            this.page = 1
            this.pageLength = 10
        }
        return {
            page: 1,
            pageLength: 10,
            pageLengthChoices: [5, 10, 20, 50],
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
