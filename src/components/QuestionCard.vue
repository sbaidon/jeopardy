<template>
  <div class="question">
    <md-card  @click.native.once="openDialog(id)" class="question" :class="{ 'md-warn': wasClicked }">
        <md-card-content>
          {{ points }}
        </md-card-content>
      </md-card>

    <md-dialog :ref="id"  @open="onOpen" @close="onClose">
      <md-dialog-title v-text="dialogTitle"></md-dialog-title>

      <md-dialog-content v-text="question"></md-dialog-content>

      <md-dialog-actions>
        <form>
          <md-radio v-for="(option, index) in options" key="index" v-model="response" name="test" :md-value="option">{{ option }} </md-radio>
        </form>
        <md-button class="md-primary" @click.native="closeDialog(id)">Ok</md-button>
         <timer></timer>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import Timer from './Timer';

export default {
  props: ['points', 'answer', 'category', 'question', 'id'],
  name: 'question-card',
  components: { Timer },
  data() {
    return {
      response: '',
      wasClicked: false,
    };
  },
  computed: {
    ...mapState(['timer', 'secondOption', 'thirdOption']),
    ...mapGetters(['getOptions']),
    dialogTitle() {
      return `To win ${this.points}`;
    },
    options() {
      return this.shuffle([...this.getOptions, this.answer]);
    },
  },
  mounted() {

  },
  methods: {
    ...mapActions(['advanceTurn', 'checkAnswer', 'getRelatedWord']),
    ...mapMutations(['ADVANCE_TIMER', 'RESET_TIMER']),
    shuffle(a) {
      /* eslint-disable */
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      /* eslint-enable */
      return a;
    },
    openDialog(ref) {
      this.getRelatedWord({ word: this.answer, option: 'secondOption' });
      this.getRelatedWord({ word: this.answer, option: 'thirdOption' });
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      this.wasClicked = true;
      this.interval = setInterval(() => {
        if (this.timer <= 0) {
          window.clearInterval(this.interval);
          this.closeDialog(this.id);
        }
        this.ADVANCE_TIMER();
      }, 1000);
    },
    onClose() {
      window.clearInterval(this.interval);
      this.RESET_TIMER();
      this.checkAnswer({
        answer: this.response,
        realAnswer: this.answer,
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
