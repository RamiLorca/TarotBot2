<template>
    <div class="main" >

      <v-btn 
        dark 
        elevated 
        style="color: #161623;background-color: #d2cfd2"
        :disabled="loading"
        :loading="loading"
        class="text-none mb-4"
        size="large"
        variant="flat" 
        @click="shuffleDeck"
      >
        Shuffle
      </v-btn>

        <div :class="{'contracted': isContracted}" class="card-list-wrapper">
          <transition class="fade-in">
            <section class="card-list" v-if="isVisible">
              <article class="card" v-for="card in mainDeck" :key="card.name" @click="moveCardToSelected(card)">
                  <div class="card-img" >
                      <img src="@/assets/Back5.png" alt="back-of-card">
                  </div>
              </article>
            </section>
        </transition>
      </div>

    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
    name: 'TarotCards',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      incrementProgressBar: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        isContracted: false,
        loading: false,
      };
    },
    computed: {
        ...mapGetters(['allTarotCards', 'selectedCards']),
        ...mapState(['userQuery']),
        mainDeck() {
            return this.allTarotCards;
        },
        mainDeckLength() {
          return this.allTarotCards.length;
        },
        selectedCardsCount() {
          return this.$store.state.selectedCardsCount;
        },
    },
    created() {
        this.$store.dispatch('fetchTarotDeck');
    },
    methods: {
      ...mapActions(['shuffleMainDeck', 'moveToSelectedCards', 'incrementSelectedCardsCount']),
      shuffleDeck() {
        this.loading = true;
        this.isContracted = true;
        setTimeout(() => {
          this.shuffleMainDeck();
          this.isContracted = false;
          this.loading = false;
        }, 2000);
        console.log(this.mainDeck);
      },
      moveCardToSelected(card) {
        if (this.selectedCardsCount < 3) {
          this.moveToSelectedCards(card);
          this.incrementSelectedCardsCount();
        }
        if(this.selectedCardsCount === 3) {
          this.incrementProgressBar();
          this.$store.commit('hideTarotCards');
        }
      },
    },
};
</script>

<style>

.main {
    padding: 0;
    margin: 0;
    background-color: #161623;
    color: white;
    font-family: 'DM Mono', monospace;
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Avenir;
}

a {
    text-decoration: none;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10%;
}

.card-list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 7%;
    padding-right: 5%;
    padding-bottom: 5%;
    height: 100%;
    max-width: 90%;
    margin: auto;
    box-sizing: border-box;
}

.card-list::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

.card-list-wrapper {
  max-width: 100%;
  animation-duration: 2s; 
  animation-timing-function: ease-in-out;
}

@keyframes accordion-effect {
  0% {
    max-width: 100%;
  }
  50% {
    max-width: 20%;
  }
  100% {
    max-width: 100%;
  }
}
.card-list-wrapper.contracted {
  animation-name: accordion-effect;
}

.card {
    height: auto;
    max-width: 140px;
    padding: 1.5rem;
    border-radius: 10%;
    background: #2c2461;
    box-shadow: -30px 0px 25px -30px rgba(0,0,0,0.63);
    display: flex;
    flex-direction: column;;
    transition: .2s;
    margin: 40px 0;
    padding: 0;
    clear: both;
    position: relative;
    overflow: hidden;
    border: .5px solid #e0dddf;
}


.card-img {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.card:hover {
    transform: translateY(3rem) translateX(-1rem);
    box-shadow: 0 0px 20px 10px rgba(255, 255, 255, 0.168) inset;
    box-shadow: 0 0px 20px 5px rgba(255, 255, 255, 0.168);
    cursor: pointer;
}

.card:not(:first-child) {
    margin-left: -119px;
} 


@media (max-width: 1120px) {
  .card-list {
    padding-left: 13%;
  }
}

@media (max-width: 800px) {
  .card-list {
    padding-left: 21%;
  }
}

@media (max-width: 600px) {
  .card {
    margin: 20px 5px;
  }
}

</style>