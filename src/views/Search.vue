<template>
  <div class="search">
    <h1>Search Files</h1>
    <Query />
  </div>
</template>

<script>
// @ is an alias to /src
import Query from '@/components/Query'

export default {
  name: 'Search',
  components: {
    Query,
  },
}
</script>
