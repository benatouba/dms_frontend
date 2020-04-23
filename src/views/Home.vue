<template>
  <div class="home">
    <div style="text-align: center;">
      <h1 class="text--lighten-3 indigo--text">Home</h1>
    </div>
    <SignIn />
  </div>
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn'

export default {
  name: 'Home',
  components: {
    SignIn,
  },
}
</script>
