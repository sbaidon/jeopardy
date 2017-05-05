<template>
  <div class="register-container">
    <h1>Jeopardy</h1>
    <h2 v-text="mainText"></h2>
    <form novalidate @submit.stop.prevent="register()">
      <md-input-container :class="{ 'md-input-invalid' : isTeamRegistered }">
        <label>Type your team's name</label>
        <md-input :placeholder="placeholder" v-model="teamName"></md-input>
        <span class="md-error" v-text="error"></span>
      </md-input-container>
      <md-button class="md-raised md-primary" @click.native="register()">Register</md-button>
    </form>
    <div class="teams-container">
      <team-card class="item" v-for="(team, index) in teams" :name="team.name" :key="index" :color="team.color" :points="team.points"></team-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import TeamCard from '../TeamCard';

export default {
  name: 'register-container',
  components: { TeamCard },
  data() {
    return {
      teamsRegistered: 0,
      teamName: '',
      teamRepeated: 'Please try another name',
      timeToStart: 3,
    };
  },
  computed: {
    mainText() {
      if (this.teams.length === 4) {
        return `The Game Starts in ${this.timeToStart}`;
      }
      return 'Register 4 Teams';
    },
    placeholder() {
      return `Team # ${this.teams.length + 1}`;
    },
    error() {
      return this.isTeamRegistered ? this.teamRepeated : "Type your team's name";
    },
    ...mapState(['isTeamRegistered', 'teams']),
  },
  methods: {
    startPlay(length) {
      if (length === 4) {
        const interval = setInterval(() => {
          this.timeToStart -= 1;
        }, 1000);

        const timeOut = setTimeout(() => {
          this.$router.push('/play');
          clearTimeout(timeOut);
          clearInterval(interval);
        }, 4000);
      }
    },
    register() {
      this.registerTeam(this.teamName);
      this.startPlay(this.teams.length);
      this.teamName = '';
    },
    ...mapActions(['registerTeam']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .teams-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 50vw;
    padding-top: 2em;
  }

  .item {
    flex: 0 0 25%;
  }

</style>
