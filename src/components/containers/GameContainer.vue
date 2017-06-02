<template>
  <div class="game-container">
    <div class="left-panel">LEFT</div>

    <div class="center-panel">
      <question-card v-for="(question, index) in questions" 
        :question="question.question" :answer="question.answer" :points="getPoints(index)" @questionClicked="questionClicked" 
        :key="index" :id="question.id" :category="question.category" :options="shuffle(question.options)">
      </question-card>
    </div>

    <div class="right-panel">
      <timer :time="timer"></timer>
    </div>

    <div class="teams-container">
      <team-card  v-for="(team, index) in teams"  :background="background(index)" :points="team.points" :key="index" :name="team.name"></team-card>
    </div>

    <dialog-question ref="dialog" :title="dialogTitle" :content='activeQuestion.question' :options='activeQuestion.options'
    @onOpen="onOpen" @onClose='onClose' :closeDialog="closeDialog" :dialogRef="dialogRef" @responseChange="onChange">
      <timer :time="timer"></timer>
    </dialog-question>


  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

import TeamCard from '../TeamCard';
import QuestionCard from '../QuestionCard';
import Timer from '../Timer';
import DialogQuestion from '../DialogQuestion';

export default {
  name: 'game-container',
  components: { TeamCard, QuestionCard, Timer, DialogQuestion },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.teams.length) {
        vm.$router.push('/');
        return;
      }

      vm.resetQuestions();
      vm.getQuestions();
    });
  },
  data() {
    return {
      dialogRef: 'dialog',
      activeQuestion: {},
      numberOfQuestions: 25,
    };
  },
  computed: {
    ...mapState(['teams', 'questions', 'teamToAnswer', 'timer']),
    dialogTitle() {
      return `To win ${this.activeQuestion.points}`;
    },
  },
  methods: {
    ...mapActions(['getQuestion', 'advanceTurn', 'checkAnswer', 'resetQuestions']),
    ...mapMutations(['ADVANCE_TIMER', 'RESET_TIMER']),
    setActiveQuestion(question) {
      this.activeQuestion = question;
    },
    questionClicked(question) {
      this.setActiveQuestion(question);
      this.openDialog();
    },
    openDialog() {
      this.$refs.dialog.$refs[this.dialogRef].open();
    },
    onChange(response) {
      this.response = response;
    },
    closeDialog() {
      this.$refs.dialog.$refs[this.dialogRef].close();
    },
    onOpen() {
      this.interval = setInterval(() => {
        if (this.timer <= 0) {
          window.clearInterval(this.interval);
          this.closeDialog();
        }
        this.ADVANCE_TIMER();
      }, 1000);
    },
    onClose() {
      window.clearInterval(this.interval);
      this.RESET_TIMER();
      this.checkAnswer({
        answer: this.response,
        realAnswer: this.activeQuestion.answer,
        points: this.activeQuestion.points,
      });
      this.advanceTurn();
    },
    shuffle(a) {
      /* eslint-disable */
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      /* eslint-enable */
      return [...a];
    },
    getQuestions() {
      for (let i = 0; i < this.numberOfQuestions; i += 1) {
        this.getQuestion();
      }
    },
    getPoints(index) {
      return ((index % 5) + 1) * 100;
    },
    background(index) {
      if (this.teamToAnswer === index) {
        return 'goldenrod';
      }
      return 'white';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .game-container {
    display: flex;
    flex-flow: row wrap;
    height: 100vh;
    width: 100vw;
    justify-content: center;
  }

  .left-panel, .right-panel, .center-panel {
    height: 60vh;
  }

  .left-panel, .right-panel {
    flex: 1 0 30%;
  }

  .center-panel {
    max-width: 40%;
    flex: 1 0 60%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .teams-container {
    height: 30vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
  }

</style>
