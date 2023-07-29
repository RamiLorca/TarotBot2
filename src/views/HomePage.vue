<template>
  <div class="main" style="height: 100%;">
    <UserPrompts id="main-sub-1" ref="UserPrompts" />
    <EnterQuery id="main-sub-2" v-if="isEnterQueryVisible" @submit-query="incrementProgressBar"/>
    <Transition name="fade-in">
      <TarotCards v-if="isTarotCardsVisible" :isVisible="isTarotCardsVisible" :incrementProgressBar="incrementProgressBar"/>
    </Transition>
  </div>
</template>

<script>
import UserPrompts from '../components/UserPrompts.vue'
import EnterQuery from '../components/EnterQuery.vue'
import TarotCards from '../components/TarotCards.vue'

export default {
    name: 'HomePage',
    components: {
        UserPrompts,
        TarotCards,
        EnterQuery,
    },
    computed: {
      isEnterQueryVisible() {
        return this.$store.state.isEnterQueryVisible;
      },
      isTarotCardsVisible() {
        return this.$store.state.isTarotCardsVisible;
      },
    },
    methods: {
      incrementProgressBar() {
          this.$refs.UserPrompts.incrementProgressBar();
      },
      hideTarotCards() {
      this.$store.commit('hideTarotCards');
      },
    },
}
</script>

<style scoped>

.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #161623;
}

.hidden {
  display: none !important;
}

.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity 3s;
}

.fade-in-enter, .fade-in-leave-to {
  opacity: 0;
}

</style>