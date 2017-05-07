<template>
  <div class="question">
    <md-card  @click.native.once="activeQuestion()" class="question" :class="{ 'md-warn': wasClicked }">
        <md-card-content>
          {{ points }}
        </md-card-content>
      </md-card>
  </div>
</template>

<script>
import Timer from './Timer';

export default {
  props: ['points', 'answer', 'category', 'question', 'id', 'options', 'onClick'],
  name: 'question-card',
  components: { Timer },
  data() {
    return {
      wasClicked: false,
    };
  },
  methods: {
    activeQuestion() {
      const question = {
        answer: this.answer,
        category: this.category,
        options: this.options,
        id: this.id,
        question: this.question,
        points: this.points,
      };
      this.wasClicked = true;
      this.onClick(question);
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
