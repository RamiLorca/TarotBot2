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



      <carousel-3d v-if="isVisible && isMobile" :width="180" :height="290" style="margin-top:30px" ref="carousel">

        <slide class="carousel-slide" v-for="(card, i) in mainDeck" :index="i" :key="card.name">
          <figure class="carousel-figure" @click="moveCardToSelected(card)">
              <div class="carousel-card" >
                <img src="@/assets/Back5.png" alt="back-of-card">
              </div>
          </figure>
        </slide>

      </carousel-3d>

      <!-- <div class="sliding-bar" v-if="isVisibleCarousel">
        <div class="slider" :style="{ width: `${(selectedCardsCount / mainDeckLength) * 100}%` }"></div>
      </div> -->

    </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
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
        touchStartX: 0,
        touchMoveX: 0,
        isSliding: false,
        slideThreshold: 50,
        isMobile: false,
      };
    },
    components: {
      Carousel3d,
      Slide,
    },
    updated() {
      try {
        const carouselElement = this.$refs.carousel?.$el;
        if (carouselElement) {
          carouselElement.removeEventListener('touchstart', this.onTouchStart);
          carouselElement.removeEventListener('touchmove', this.onTouchMove);
          carouselElement.removeEventListener('touchend', this.onTouchEnd);

          carouselElement.addEventListener('touchstart', this.onTouchStart);
          carouselElement.addEventListener('touchmove', this.onTouchMove);
          carouselElement.addEventListener('touchend', this.onTouchEnd);
        }
      } catch (error) {
        console.error('Error in handling carousel events:', error);
      }
    },
    mounted() {
      this.isMobile = window.innerWidth < 720;
      window.addEventListener("resize", this.onWindowResize);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.onWindowResize);
      const carouselElement = this.$refs.carousel.$el;
      carouselElement.removeEventListener('touchstart', this.onTouchStart);
      carouselElement.removeEventListener('touchmove', this.onTouchMove);
      carouselElement.removeEventListener('touchend', this.onTouchEnd);
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
        isVisibleCarousel() {
          return this.windowWidth < 720;
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
      onTouchStart(event) {
        this.touchStartX = event.touches[0].clientX;
        this.isSliding = true;
      },
      onTouchMove(event) {
        if (this.isSliding) {
          this.touchMoveX = event.touches[0].clientX;
          const diff = this.touchMoveX - this.touchStartX;
          if (Math.abs(diff) > this.slideThreshold) {
            this.isSliding = false;
            if (diff > 0) {
              this.$refs.carousel.prev();
            } else {
              this.$refs.carousel.next();
            }
          }
        }
      },
      onTouchEnd() {
        this.isSliding = false;
      },
      onWindowResize() {
        this.isMobile = window.innerWidth < 720;
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

@media (min-width: 720px) {
  .carousel-3d {
    display: none !important;
  }

  .sliding-bar {
    display: none;
  }
}

@media (max-width: 720px) {
    .card-list-wrapper {
      display: none;
    }

    .carousel-3d {
      display: flex !important;
    }

    .carousel-3d-container figure {
      margin: 0;
    }

    .carousel-slide {
      border-radius: 10% !important;
      width: auto;
    }

    .carousel-card {
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;   
    }

    .carousel-card img {
      background-color: #2c2460;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .sliding-bar {
      width: 100%;
      height: 5px;
      background-color: #4f4e5e;
      position: relative;
      margin-top: 10px;
    }

    .slider {
      height: 100%;
      background-color: #d2cfd2;
      transition: width 0.3s ease;
    }

}

</style>