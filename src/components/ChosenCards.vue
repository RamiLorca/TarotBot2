<template>

  <div 
    class="main" 
    :style="{ 
      opacity: opacityValue }"
    @hook:mounted="increaseOpacity"
  >

      <div class="chosen">
            <div 
              v-for="card in threeSelectedCards" 
              :key="card.name" 
              class="chosen-card">

              <div class="card-and-name" :style="{ opacity: opacityValue }">
                <div class="card-name">{{ card.name }}</div>
                <img :src="card.imgUrl" :alt="card.name">
              </div>

            </div>
      </div>

          <v-card class="tarot-reading">
            <v-btn 
              dark 
              elevated 
              style="color: #161623;background-color: #d2cfd2"
              :disabled="loading"
              :loading="loading"
              class="text-none mb-4"
              size="large"
              variant="flat" 
              @click="sendReadingRequest"
              v-if="!tarotReading"
            >
              Get My Reading
            </v-btn>

            <v-card-text class="text-white" style="font-size:16px; text-align:left;"> 
              {{ tarotReading }}
            </v-card-text>

            <v-btn 
              v-if="tarotReading"               
              dark 
              elevated 
              style="color: #161623;background-color: #d2cfd2"
              class="text-none mb-4"
              size="large"
              variant="flat"
              @click="startOver" 
              >
              Start Over
            </v-btn>

        </v-card>
  </div>

</template>

<script>

import { mapState, mapGetters } from 'vuex';
import { getTarotReading } from '@/services/ReadingService';

export default {
  name: 'ChosenCards',
  props: {
    threeSelectedCards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      opacityValue: 0,
      translateYValue: -50,
      loading: false,
      reading: '',
    };
  },
  mounted() {
    this.increaseOpacity();
    this.animateAppearance();
  },
  methods: {
    increaseOpacity() {
      const duration = 5000;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        this.opacityValue = currentStep / steps;

        if(currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
    },
    animateAppearance() {
      const duration = 5000;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const t = currentStep / steps;
        this.opacityValue = t;
        this.translateYValue = -50 + 150 * t;

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
    },
    sendReadingRequest() {
      this.loading = true;
      const cardOne = this.selectedCards[0].name;
      const cardTwo = this.selectedCards[1].name;
      const cardThree = this.selectedCards[2].name;
        
      const message = "You will act like a master tarot reader and only respond with things a real tarot reader would say. I will list 3 cards that I've pulled from a shuffled deck " +
                    "and placed in front of me from left to right. I will also provide you with a query, describing the situation " +
                    "or question for which you will provide insight. You will use all available sources to provide clear and direct advice, " +
                    "paying special attention to how the card meanings might change based on their relative positions. " +
                    
                    "The cards I pulled are as follows: " + cardOne + ", " + cardTwo + ", " + cardThree + ". " +

                    "My query/situation is as follows: " + this.userQuery;

      getTarotReading(message);
    },
    updateReading(reading) {
        this.reading = reading;
    },
    startOver() {
      location.reload();
    }
  },
  computed: {
      ...mapState(['tarotReading', 'userQuery']),
      ...mapGetters(['selectedCards']),
  },
}
</script>

<style scoped>

.horizontal-group {
  display: flex;
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 20%;
  max-width: 90%;
  gap: 40px;
}

.chosen {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 0;
    padding: 0;
}

.chosen div img {
  width: 80%;
  min-height: 200px;
  max-height: 450px;
  background-color: rgb(189, 180, 165);
  border-radius: 15px;
}

.chosen-card {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.chosen-card img {
  width: 80%;
  min-height: 200px;
  max-height: 450px;
  background-color: rgb(189, 180, 165);
  border-radius: 15px;
}

.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fade-in-enter, .fade-in-leave-to {
  opacity: 1;
  transform: translateX(0);
}

.card-name {
  margin-bottom: 8px;
  text-transform: uppercase;
  font-family: 'EB Garamond';
  font-weight: bold;
  color: #d1cfd2;
}

.card-and-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
}

.tarot-reading {
  background-color: transparent !important;
}
</style>