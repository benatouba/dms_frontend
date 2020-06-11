<template>
    <div class="home">
        <v-container class="mx-4 primary--text">
            <h1>Home</h1>
            <p class="secondary--text">
                Umfassende Daten zu Wetter, Klima und Luftqualität in Großstädten sind bis heute leider nur begrenzt
                verfügbar. Im Rahmen der Fördermaßnahme sollen daher durch Modul B bereits verfügbare Daten aufbereitet,
                und neue bzw. fehlende Daten mittels Langzeitmessungen, Intensivmesskampagnen und physikalischer
                Modellierung erhoben werden. Um den Austausch von Beobachtungs- sowie Modelldaten zwischen den
                Projektpartnern auch über die Modulgrenzen hinweg zu Modul A und C z.B. für die Validierung des neu
                entwickelten Stadtklimamodells PALM-4U oder für stadtklimatologische und wissenschaftliche Studien zu
                unterstützen, wird in der Fördermaßnahme ein Datenmanagementsystem (DMS) entwickelt.
            </p>
            <v-row align="center" justify="center">
                <v-img
                    src="http://www.uc2-program.org/sites/default/files/inline-images/DMS%20Grafik%20Deutsch.png"
                    lazy-src="http://www.uc2-program.org/sites/default/files/inline-images/DMS%20Grafik%20Deutsch.png"
                    class="grey lighten-2"
                    max-width="600"
                >
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
}
</script>
