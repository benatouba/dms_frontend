<template>
    <v-footer inset app class="justify-center mx-0">
        <v-tabs app inset v-model="tab" optional centered hide-slider>
            <v-tab v-for="item in links" :key="item.title.de">
                {{ item.title[$i18n.locale] }}
            </v-tab>
        </v-tabs>
        <v-tabs-items app v-model="tab">
            <v-tab-item v-for="(item, id) in links" :key="id">
                <v-card flat class="text-center">
                    <v-row>
                        <v-col cols="2">
                            <v-img
                                v-if="id === 0"
                                alt="Climatology Logo"
                                class="shrink primary--text"
                                contain
                                src="@/assets/group_logo.jpg"
                                transition="scale-transition"
                                width="40"
                            ></v-img>
                        </v-col>
                        <v-col cols="8">
                            {{ item.text[$i18n.locale] }}
                        </v-col>
                        <v-col cols="2">
                            <v-icon right @click="tab = null">{{ 'mdi-close' }}</v-icon>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        <v-col class="primary py-1 text-center white--text" cols="12">
            {{ new Date().getFullYear() }} — {{ $t('footer.system') }}
        </v-col>
    </v-footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            links: [
                {
                    title: { de: 'Über Uns', en: 'About us' },
                    text: {
                        de:
                            'Technische Universität Berlin\n' +
                            'Institut für Ökologie\n' +
                            'Fachgebiet Klimatologie\n' +
                            'Rothenburgstr. 12\n' +
                            '12165 Berlin',
                        en:
                            'Technische Universität Berlin\n' +
                            'Institut für Ökologie\n' +
                            'Fachgebiet Klimatologie\n' +
                            'Rothenburgstr. 12\n' +
                            '12165 Berlin',
                    },
                },
                {
                    title: { de: 'Disclaimer', en: 'Disclaimer' },
                    text: {
                        de:
                            'Inhalt: Die Autoren behalten sich das Recht vor, nicht verantwortlich für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der dargestellten Informationen zu sein. Haftungsansprüche bezüglich möglicher Schäden, welche durch die Verwendung der angebotenen Informationen entstehen einschließlich jeglicher Form von Informationen, die unvollständig oder fehlerhaft sind, wird hiermit zurückgewiesen. Links: Die Autoren sind nicht verantwortlich für sämtliche Inhalte, auf die von dieser Seite verwiesen wird, sofern sie nicht die volle Kenntnis von illegalen Inhalten haben und die Möglichkeit besitzen den Besucher dieser Seite davor zu schützen. Sollte irgendeine Beschädigung eintreten, die durch die Benutzung der Informationen, die hier dargestellt sind, entstehen, sind nur die Autoren der betreffenden Seiten verantwortlich, jedoch nicht derjenige, der auf diese Seiten verlinkt. Bestandskraft dieses Disclaimers: Dieses Disclaimer gilt als Teil der Internetveröffentlichung, von der weitergeleitet wurde. Sollten Abschnitte oder Aussagen dieses Statements nicht legal oder korrekt sein, bleibt der Inhalt oder die Gültigkeit von anderen Teilen unbeeinflusst.',
                        en:
                            'Content:\n' +
                            '\n' +
                            'The authors reserve the right not to be responsible for the topicality, correctness, completeness or quality of the information provided. Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected.\n' +
                            '\n' +
                            'Links:\n' +
                            '\n' +
                            'The authors are not responsible for any contents linked or referred to from his pages - unless they have full knowledge of illegal contents and would be able to prevent the visitors of his site from viewing those pages. If any damage occurs by the use of information presented there, only the authors of the respective pages might be liable, not the one who has linked to these pages.\n' +
                            '\n' +
                            'Legal validity of this disclaimer:\n' +
                            '\n' +
                            'This disclaimer is to be regarded as part of the internet publication which you were referred from. If sections or individual terms of this statement are not legal or correct, the content or validity of the other parts remain uninfluenced by this fact.',
                    },
                },
            ],
            tab: null,
        }
    },
}
</script>
