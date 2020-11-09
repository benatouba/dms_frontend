<template>
    <v-container class="text--primary">
        <v-data-table
            v-model="selected"
            :headers="getHeaderItems"
            :items="queriedFiles"
            :server-items-length="totalQueriedFiles"
            :loading="querying"
            :expanded.sync="expanded"
            :options.sync="options"
            :footer-props="footerProps"
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
                    @click="handleDownload"
                    :loading="downloading"
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
                    @confirm="handleDelete"
                    :loading="deleting"
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
                    :loading="settingInvalid"
                    :title="$t('buttons.mark_invalid')"
                    :body="$t('search.mark_invalid_warning')"
                    color="warning"
                    @confirm="handleSetInvalid"
                >
                  <v-icon dark left>
                    error_outline
                  </v-icon>
                  Mark Invalid
                </b-confirmation-dialog>
              </v-toolbar>
            </template>
            <template v-slot:header.data-table-expand>
              <v-menu
                  rounded
              >
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        fab
                        x-small
                        depressed
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon color="secondary">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                  <v-card-subtitle>{{ $t('tooltip.add_column') }}</v-card-subtitle>
                  <v-list>
                    <v-list-item
                        v-for="item in sortItems(getListItems)"
                        :key="item.value"
                        link
                        dense
                        @click="addColumn(item.value)"
                    >
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                  </v-card>
              </v-menu>
            </template>
            <template v-slot:item.origin_time="{ value }">
              <span>{{ value.substring(0, 10) }}</span>
            </template>
            <template v-slot:item.file_size="{ item }">
              <div style="white-space: nowrap;">
                <span>{{ getItemValue('file_size', item) }}</span>
              </div>
            </template>
            <template v-slot:item.variables="{ item }">
                <span>{{ getItemValue('variables', item) }}</span>
            </template>
            <template v-slot:item.status="{ item }">
              <div style="white-space: nowrap;">
                <!--<b-status-icon
                    :icon="'mdi-circle'"
                    :color="colorStyle(item)"
                    :tooltip="getStatusTooltip(item)"
                />-->
                <b-status-icon
                    :icon="isDeletable(item) ? 'mdi-delete': 'mdi-delete-off'"
                    :tooltip="isDeletable(item) ? $t('tooltip.deletable'): $t('tooltip.not_deletable')"
                />
                <b-status-icon
                    :icon="isMarkableInvalid(item)? 'report': 'report_off'"
                    :tooltip="isMarkableInvalid(item)? $t('tooltip.markable_invalid'): $t('tooltip.not_markable_invalid')"
                />
                <span style="color: red;" v-if="item.is_invalid">{{ $t('search.is_invalid')}}</span>
                <span style="color: saddlebrown;" v-if="item.is_old">{{ $t('search.is_old')}}</span>
              </div>
            </template>
            <template v-slot:expanded-item="{ headers, item}">
                <td :colspan="headers.length">
                  <v-list dense class="ma-2">
                    <v-list-item
                        v-for="lh in getListItems"
                        :key="lh.value"
                    >
                      <v-col>
                        {{ lh.text }}
                      </v-col>
                      <v-col>
                        <div v-if="['contact_person', 'author'].filter(x => x === lh.value).length !== 0">
                          <span
                              v-for="person of getItemValue(lh.value, item)"
                              :key="person.id"
                          >
                            <v-btn
                                v-if="person.ok"
                                x-small
                                :href="`mailto:${person.email}`">
                              <v-icon x-small>mdi-email</v-icon>
                              {{ person.last_name + ", " + person.first_name}}
                            </v-btn>
                          </span>
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
            totalQueriedFiles: state => state.queries.count,
            querying: state => state.queries.querying,
            // downloading: state => state.queries.downloading,
            itemCount: state => state.queries.count,
        }),
        ...mapGetters({
          group: 'account/group',
          meta: 'queries/meta'
        }),
        getPageCount() {
            return Math.ceil(this.itemCount / this.pageLength)
        },
        getHeaderItems() {
          let selected = []
          this.headers.forEach(x => {
            if (x.showCol) {
              selected.push(x)
            }
          })
          return selected
        },
        getListItems() {
          let selected = []
          this.headers.forEach(x => {
            if (!x.showCol) {
              selected.push(x)
            }
          })
          return selected
        }
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
            let id = 0
            people.forEach(p => {
              divided = p.split(",")
              if (divided.length !== 3) {
                result.push({ ok: false, text: '', id: id } )
              } else {
                dict = { ok: true, last_name: divided[0], first_name: divided[1], email: divided[2], id: id  }
                result.push(dict)
              }
              id++
            })
            return result
          }
          if (key === 'checkerVersionMajor') {
            return item.checkerVersionMajor + '.' + item.checkerVersionMinor + '.' + item.checkerVersionSub
          }
          if (key === 'll_n_utm' && item[key]) {
            return Math.round(item[key]) + ' N, ' + Math.round(item['ll_e_utm']) + ' E'
          }
          if (key === 'ur_n_utm' && item[key]) {
            return Math.round(item[key]) + ' N, ' + Math.round(item['ur_e_utm']) + ' E'
          }
          if (['origin_time', 'upload_date', 'creation_time'].filter(x => key === x).length !== 0) {
              let divided = item[key].split('T')
              return divided[0] + ' ' + divided[1].substring(0, 8)
          }
          const entries = Object.entries(item)
          for (var [itemKey, itemValue] of entries) {
            if (key === itemKey) {
              if (Array.isArray(itemValue)) {
                return itemValue.join(', ')
              } else {
                return itemValue
              }
            }
          }
        },
        handleDownload() {
            this.downloading = true
            if (this.selected.length === 1) {
              this.download(this.selected[0])
            } else {
              let ids = []
              this.selected.forEach(
                  obj => ids.push(obj.id)
              )
              this.downloadAll(ids)
            }
            this.downloading = false
        },
        handleDelete() {
          this.deleting = true
          this.deleteFile(this.selected)
          this.selected = []
          this.deleting = false
        },
        handleSetInvalid() {
          this.settingInvalid = true
          this.setInvalid(this.selected)
          this.selected = []
          this.settingInvalid = false
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
        addColumn(value) {
          this.headers.forEach(x => {
            if (x.value === value) {
              x.showCol = true
            }
          })
        },
        sortItems(items) {
            return items.sort((a, b) => (a.text > b.text) ? 1 : -1)
        }
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
            options: {},
            loading: false,
            headers: [
              { text: 'Campaign', value: 'campaign', align: 'start', showCol: true, },
              { text: 'Location', value: 'location', align: 'start',  showCol: true, },
              { text: 'Site', value: 'site', align: 'start',  showCol: true, },
              { text: 'Acronym', value: 'acronym', align: 'start', showCol: true, },
              { text: 'Variable', value: 'variables', sortable: false, showCol: true, },
              { text: 'Feature Type', value: 'feature_type', sortable: false, showCol: true, },
              { text: 'Origin Time', value: 'origin_time', showCol: true, },
              { text: 'File Size', value: 'file_size', showCol: true, },
              { text: 'Status', value: 'status', sortable: false, showCol: true, },
              { text: 'File Standard Name', value: 'file_standard_name', showCol: false, },
              { text: 'Institution', value: 'institution', showCol: false,  },
              { text: 'Data Content', value: 'data_content', showCol: false,  },
              { text: 'Keywords', value: 'keywords', showCol: false,  },
              { text: 'Licence', value: 'licence', showCol: false,  },
              { text: 'Source', value: 'source', showCol: false,  },
              { text: 'Uploader', value: 'uploader', showCol: false,  },
              { text: 'File Type', value: 'file_type', showCol: false,  },
              { text: 'Creation Time', value: 'creation_time', showCol: false,  },
              { text: 'Upload Date', value: 'upload_date', showCol: false,  },
              { text: 'UTM Coordinates ll', value: 'll_n_utm', showCol: false, },
              // { text: 'UTM Coordinates ll (E)', value: 'll_e_utm', showCol: false, },
              { text: 'UTM Coordinates ur', value: 'ur_n_utm', showCol: false, },
              // { text: 'UTM Coordinates ur (E)', value: 'ur_e_utm', showCol: false, },
              { text: 'UTM EPSG', value: 'utm_epsg', showCol: false, },
              { text: 'Version', value: 'version', showCol: false, },
              { text: 'Checker Version', value: 'checkerVersionMajor', showCol: false, },
              { text: 'Author', value: 'author', showCol: false, },
              { text: 'Contact Person', value: 'contact_person', showCol: false, },
            ],
            selected: [],
            expanded: [],
            downloading: false,
            deleting: false,
            settingInvalid: false,
            footerProps: {
              'items-per-page-options': [ 10, 25, 50, 100, -1 ],
            }
        }
    },
}
</script>

<style>
.v-data-table-header th {
  white-space: nowrap;
}
</style>