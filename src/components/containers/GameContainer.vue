<template>
  <div class="game-container">
    <div class="left-panel">LEFT</div>

    <div class="center-panel">
      <question-card v-for="(question, index) in firstLevel" 
        :question="question.question" :answer="question.answer" :points="100" :key="index" :id="question.id" :category="question.category">
      </question-card>
      <question-card v-for="(question, index) in secondLevel" 
        :question="question.question" :answer="question.answer" :points="200" :key="index" :id="question.id" :category="question.category">
      </question-card>
      <question-card v-for="(question, index) in thirdLevel" 
        :question="question.question" :answer="question.answer" :points="300" :key="index" :id="question.id" :category="question.category">
      </question-card>
      <question-card v-for="(question, index) in fourthLevel" 
        :question="question.question":answer="question.answer" :points="400" :key="index" :id="question.id" :category="question.category">
      </question-card>
      <question-card v-for="(question, index) in fifthLevel" 
        :question="question.question" :answer="question.answer" :points="500" :key="index" :id="question.id" :category="question.category">
      </question-card>
    </div>

    <div class="right-panel">
      <timer></timer>
    </div>

    <div class="teams-container">
      <team-card  v-for="(team, index) in teams"  :background="background(index)" :points="team.points" :key="index" :name="team.name" :color="team.color" image="https://d30y9cdsu7xlg0.cloudfront.net/png/14261-200.png" ></team-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import TeamCard from '../TeamCard';
import QuestionCard from '../QuestionCard';
import Timer from '../Timer';

export default {
  name: 'game-container',
  components: { TeamCard, QuestionCard, Timer },
  data() {
    return {
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
      'thirdLevel', 'fourthLevel', 'fifthLevel', 'teamToAnswer']),
    ...mapGetters(['allQuestions']),
  },
  methods: {
    ...mapActions(['getQuestion', 'startTimer', 'getRelatedWord']),
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
