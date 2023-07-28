<template>
  <div class="main">

    <div class="container">
      <div class="progress-container">
        <div class="progress" id="progress" ></div>
        <div class="circle active">1</div>
        <div class="circle">2</div>
        <div class="circle">3</div>
      </div>
    </div>

      <ChosenCards v-if="showChosenCards" :threeSelectedCards="selectedCards" />

    <v-card>

      <v-card-text class="text-white" style="font-size:16px; text-align:left;" v-if="currentProgress === 1">
        Welcome to Tarot Bot, your virtual tarot reader! 
        <br><br> 
        Let's get started. First, think of something to ask and enter it below.
        When you're ready to pick your cards, submit your query.
      </v-card-text>

      <v-card-text class="text-white" style="font-size:16px; text-align:left;" v-else-if="currentProgress === 2">
        Let's proceed. 
        <br><br> 
        Now shuffle the deck as many times as you want and select three cards. Then submit your cards to receive your reading.  
        <br><br>
        You've selected: {{ selectedCardsCount }} / 3 cards.
      </v-card-text>

    </v-card>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChosenCards from './ChosenCards.vue';

export default {
    name: 'UserPrompts',
    components: {
      ChosenCards,
    },
    data() {
      return {
        currentProgress: 1,
        reading: '',
      };
    },
    methods: {
      incrementProgressBar() {
        const circles = document.querySelectorAll(".circle");
        const progress = document.getElementById("progress");
        this.currentProgress++;

          circles.forEach((circle, index) => {
            if(index < this.currentProgress) {
              circle.classList.add("active");
            }
          });
          const actives = document.querySelectorAll(".active");
          progress.style.width = 
            ((actives.length - 1) / (circles.length - 1)) * 100 + "%";  
      },
      updateReading(reading) {
        this.reading = reading;
      },
    },
    computed: {
      ...mapState(['tarotReading', 'selectedCardsCount', 'selectedCards', 'showChosenCards']),
      progressBarWidth() {
        const circles = document.querySelectorAll(".circle");
        return ((this.currentProgress - 1) / (circles.length - 1)) * 100 + "%";
      },
      showChosenCards() {
        return this.$store.state.selectedCardsCount === 3;
      },
      selectedCards() {
        return this.$store.getters.selectedCards;
      },
    },
}

</script>

<style scoped>

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
  margin: 1% auto;
  background-color: #161623;
}

:root {
  --line-border-fill: #d1cfd2;
  --line-border-empty: #5c5464 ;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
}

.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: auto auto 2% auto;
  max-width: 100%;
  width: 350px;
}

.container .progress-container::before {
  content: ""; 
  background-color: #5c5464;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 100%;
}

#progress {
  background-color: #d1cfd2;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 4px;
  width: 0%;
  z-index: 1;
  transition: 0.4s ease;
}

.container .circle {
  background-color: #161623;
  color: #949296;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #5c5464;
  transition: 0.4s ease;
  z-index: 1;
}

.container .circle.active {
  border-color: #d1cfd2;
  background-color: #d1cfd2;
  color: #161623;
  font-weight: bolder;
}

.v-card {
  background-color: transparent !important;
  box-shadow: none !important;
  font-family: 'Muli', sans-serif !important;
  margin: auto;
  height: auto;
  max-width: 45%;
  min-width: 350px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.final-reading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  min-width: 350px;

}

.loader {
display: flex;
flex-direction: column;
justify-content: center;
justify-items: center;
text-align: center;
gap: 10px;
margin: 1%;
color:#d1cfd2;
}

@media (max-width: 900px) {
  .final-reading {
    width: 90%;
  }
}

</style>