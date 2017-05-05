<template>
  <div class="question">
    <md-card  @click.native="openDialog(question.id)" class="question" :class="{ 'md-warn': isAnswered }">
        <md-card-content>
          {{ points }}
        </md-card-content>
      </md-card>

    <md-dialog :ref="question.id"  @open="onOpen" @close="onClose">
      <md-dialog-title v-text="dialogTitle"></md-dialog-title>

      <md-dialog-content v-text="question.question"></md-dialog-content>

      <md-dialog-actions>
        <form>
            <md-radio v-model="answer" id="my-test1" name="my-test-group1" :md-value="question.answer" >{{ question.answer }}</md-radio>
            <md-radio v-model="answer" id="my-test2" name="my-test-group1" md-value="2">Another radio</md-radio>
            <md-radio v-model="answer" id="my-test3" name="my-test-group1" md-value="3">Another another radio</md-radio>
        </form>
        <md-button class="md-primary" @click.native="closeDialog(question.id)">Ok</md-button>
         <timer></timer>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Timer from './Timer';

export default {
  props: ['points', 'question', 'category'],
  name: 'question-card',
  components: { Timer },
  data() {
    return {
      activeTeam: 0,
      dialogTitle: `To win ${this.points}`,
      answer: '',
      isAnswered: false,
    };
  },
  computed: {
    ...mapState(['timer']),
  },
  methods: {
    ...mapActions(['advanceTurn', 'checkAnswer']),
    ...mapMutations(['ADVANCE_TIMER', 'RESET_TIMER']),
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      this.isAnswered = true;
      this.interval = setInterval(() => {
        if (this.timer <= 0) {
          window.clearInterval(this.interval);
          this.closeDialog(this.question.id);
        }
        this.ADVANCE_TIMER();
      }, 1000);
    },
    onClose() {
      window.clearInterval(this.interval);
      this.RESET_TIMER();
      this.checkAnswer({
        answer: this.answer,
        realAnswer: this.question.answer,
        points: this.points,
      });
      this.advanceTurn();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .question {
    flex: 1  0 20%;
    height: 100px;
    text-align: center
  }

  .disabled {
    background-color: blue;
  }

</style>
