<template>
  <div class="game-container">
    <div class="left-panel">LEFT</div>

    <div class="center-panel">
      <question-card v-for="(question, index) in firstLevel" 
        :question="question.question" :answer="question.answer" :points="100" :onClick="openDialog" 
        :key="index" :id="question.id" :category="question.category" :options="shuffle(question.options)">
      </question-card>
      <question-card v-for="(question, index) in secondLevel" 
        :question="question.question" :answer="question.answer" :points="200" :onClick="openDialog"
        :key="index" :id="question.id" :category="question.category" :options="shuffle(question.options)">
      </question-card>
      <question-card v-for="(question, index) in thirdLevel" 
        :question="question.question" :answer="question.answer" :points="300" :onClick="openDialog"
        :key="index" :id="question.id" :category="question.category" :options="shuffle(question.options)">
      </question-card>
      <question-card v-for="(question, index) in fourthLevel" 
        :question="question.question":answer="question.answer" :points="400" :onClick="openDialog"
        :key="index" :id="question.id" :category="question.category" :options="shuffle(question.options)">
      </question-card>
      <question-card v-for="(question, index) in fifthLevel" 
        :question="question.question" :answer="question.answer" :points="500" :onClick="openDialog"
        :key="index" :id="question.id" :category="question.category" :options="shuffle(question.options)">
      </question-card>
    </div>

    <div class="right-panel">
      <timer></timer>
    </div>

    <div class="teams-container">
      <team-card  v-for="(team, index) in teams"  :background="background(index)" :points="team.points" :key="index" :name="team.name" :color="team.color" image="https://d30y9cdsu7xlg0.cloudfront.net/png/14261-200.png" ></team-card>
    </div>

    <dialog-question ref="dialog" :title="dialogTitle" :content='activeQuestion.question' :options='activeQuestion.options'
    :onOpen="onOpen" :onClose='onClose' :closeDialog="closeDialog" :dialogRef="dialogRef">
      
    </dialog-question>


  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

import TeamCard from '../TeamCard';
import QuestionCard from '../QuestionCard';
import Timer from '../Timer';
import DialogQuestion from '../DialogQuestion';

export default {
  name: 'game-container',
  components: { TeamCard, QuestionCard, Timer, DialogQuestion },
  data() {
    return {
      dialogRef: 'dialog',
      activeQuestion: {},
    };
  },
  mounted() {
    if (this.allQuestions.length <= 0) {
      [1, 2, 3, 4, 5].forEach(() => {
        this.getQuestion('firstLevel');
      });

      [1, 2, 3, 4, 5].forEach(() => {
        this.getQuestion('secondLevel');
      });

      [1, 2, 3, 4, 5].forEach(() => {
        this.getQuestion('thirdLevel');
      });

      [1, 2, 3, 4, 5].forEach(() => {
        this.getQuestion('fourthLevel');
      });

      [1, 2, 3, 4, 5].forEach(() => {
        this.getQuestion('fifthLevel');
      });
    }
  },
  computed: {
    ...mapState(['teams', 'firstLevel', 'secondLevel',
      'thirdLevel', 'fourthLevel', 'fifthLevel', 'teamToAnswer', 'timer', 'ref']),
    ...mapGetters(['allQuestions']),
    dialogTitle() {
      return `To win ${this.activeQuestion.points}`;
    },
  },
  methods: {
    ...mapActions(['getQuestion', 'startTimer', 'getRelatedWord', 'advanceTurn', 'checkAnswer']),
    ...mapMutations(['ADVANCE_TIMER', 'RESET_TIMER']),
    openDialog(question) {
      this.activeQuestion = question;
      this.$refs.dialog.$refs[this.dialogRef].open();
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
      const { response } = this.$refs.dialog;
      this.checkAnswer({
        answer: response,
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
    height: 70vh;
  }

  .left-panel, .right-panel {
    flex: 1 0 20%;
  }

  .center-panel {
    max-width: 60%;
    flex: 1 1 60%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .teams-container {
    height: 30vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1 0 100%;
  }

</style>
