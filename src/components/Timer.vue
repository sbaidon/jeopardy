<template>
  <div class="timer">
    <h1>{{ time }}</h1>
    <md-spinner :md-progress="progress" class="md-warn"></md-spinner>
  </div>
</template>

<script>

export default {
  props: ['time'],
  name: 'timer',
  data() {
    return {
    };
  },
  computed: {
    progress() {
      return Math.round(3.33 * (30 - this.time));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
} 

</style>
