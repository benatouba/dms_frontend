<template>
    <div id="home-view" class="home">
        <v-container class="mx-4">
            <Home />
        </v-container>
    </div>
</template>

<script>
import Home from '@/components/Home'
export default {
    name: 'HomeView',
    components: { Home },
    data() {
        return {
          refresher: 0,
        }
  },
}
</script>
