<template>
  <md-dialog :ref="dialogRef"  @open="onOpen" @close="onClose">
    <md-dialog-title v-text="title"></md-dialog-title>

    <md-dialog-content v-text="content"></md-dialog-content>

    <md-dialog-actions>
      <form>
        <md-radio v-for="(option, index) in options" key="index" name="test" v-model="response" :md-value="option" @change="onChange">{{ option }} </md-radio>
      </form>
      <md-button class="md-primary" @click.native="closeDialog">Ok</md-button>
       <timer></timer>
    </md-dialog-actions>
  </md-dialog>
</template>


<script>
import Timer from './Timer';

export default {
  props: ['title', 'content', 'options', 'onOpen', 'onClose', 'closeDialog', 'dialogRef', 'onChange'],
  name: 'dialog-question',
  components: { Timer },
  data() {
    return {
      response: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
