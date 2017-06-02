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
      <md-button v-if="!areTeamsRegistered" class="md-raised md-primary" @click.native="register()">Register</md-button>
      <md-button v-if="areTeamsRegistered" class="md-raised md-primary" @click.native="startGame()">Start Game</md-button>
    </form>
    <div class="teams-container">
      <team-card class="item" v-for="(team, index) in teams" :name="team.name" :key="index" :points="team.points"></team-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import TeamCard from '../TeamCard';

export default {
  name: 'register-container',
  components: { TeamCard },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.resetTeams();
    });
  },
  data() {
    return {
      teamsRegistered: 0,
      teamName: '',
    };
  },
  computed: {
    mainText() {
      return !this.areTeamsRegistered ? 'Register 4 Teams' : 'Ready to Play';
    },
    areTeamsRegistered() {
      return this.teams.length === 4;
    },
    placeholder() {
      return !this.areTeamsRegistered ? `Team # ${this.teams.length + 1}` : 'Ready';
    },
    error() {
      return this.isTeamRegistered ? 'Pleasy try another name' : "Type your team's name";
    },
    ...mapState(['isTeamRegistered', 'teams']),
  },
  methods: {
    resetTeamName() {
      this.teamName = '';
    },
    startGame() {
      this.$router.push('/play');
    },
    register() {
      if (!this.areTeamsRegistered) {
        this.registerTeam(this.teamName);
        this.resetTeamName();
      }
    },
    ...mapActions(['registerTeam', 'resetTeams']),
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
