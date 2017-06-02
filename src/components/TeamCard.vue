<template>
  <div >
      <md-card :style="styleObject">

        <md-card-header>
          <div class="md-title">{{ name }}</div>
        </md-card-header>

        <md-card-content>
          <h3 class="md-subheading">Points</h3>
          <div>
            <h1>{{ points }}</h1>
          </div>
        </md-card-content>

      </md-card>
  </div>
</template>

<script>

export default {
  props: ['name', 'points', 'background', 'onClick'],
  name: 'team-card',
  data() {
    return {
    };
  },
  computed: {
    inGameView() {
      return this.$route.name === 'play';
    },
    styleObject() {
      return {
        height: '250px',
        width: '200px',
        padding: '2em 3em',
        backgroundColor: this.background,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .md-title {
    width: 100px;
 }

</style>
