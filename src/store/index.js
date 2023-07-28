import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainDeck: [],
    userQuery: '',
    isEnterQueryVisible: true,
    isTarotCardsVisible: false,
    selectedCards: [],
    selectedCardsCount: 0,
    tarotReading: '',
  },
  mutations: {
    setMainDeck(state, cards) {
        state.mainDeck = cards;
    },
    setUserQuery(state, query) {
      state.userQuery = query;
    },
    showTarotCards(state) {
      state.isEnterQueryVisible = false;
      state.isTarotCardsVisible = true;
    },
    shuffleMainDeck(state) {
      for (let i = state.mainDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.mainDeck[i], state.mainDeck[j]] = [state.mainDeck[j], state.mainDeck[i]];
      }
    },
    addToSelectedCards(state, card) {
      state.selectedCards.push(card);
    },
    incrementSelectedCardsCount(state) {
      state.selectedCardsCount++;
    },
    hideTarotCards(state) {
      state.isTarotCardsVisible = false;
    },
    setTarotReading(state, reading) {
      state.tarotReading = reading;
    },
  },
  actions: {
    fetchTarotDeck({ commit }) {
        const mainDeck = [            
            {name: "fool", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309570"},
            {name: "magician", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309578"},
            {name: "high priestess", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309580"},
            {name: "empress", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309580"},
            {name: "emperor", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309569"},
            {name: "hierophant", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309574"},
            {name: "lovers", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309577"},
            {name: "chariot", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309566"},
            {name: "strength", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309582"},
            {name: "hermit", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309573"},
            {name: "wheel of fortune", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309571"},
            {name: "justice", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309576"},
            {name: "hanged man", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309572"},
            {name: "death", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309567"},
            {name: "temperance", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309584"},
            {name: "devil", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309568"},
            {name: "tower", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309585"},
            {name: "star", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309581"},
            {name: "moon", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309579"},
            {name: "sun", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309583"},
            {name: "judgment", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309575"},
            {name: "world", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309586"},
            {name: "ace of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309587"},
            {name: "two of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309600"},
            {name: "three of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309599"},
            {name: "four of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309590"},
            {name: "five of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309589"},
            {name: "six of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309597"},
            {name: "seven of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309596"},
            {name: "eight of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309588"},
            {name: "nine of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309593"},
            {name: "ten of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309598"},
            {name: "page of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309594"},
            {name: "knight of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309592"},
            {name: "queen of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309595"},
            {name: "king of wands", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309591"},
            {name: "ace of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309604"},
            {name: "two of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309617"},
            {name: "three of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309616"},
            {name: "four of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309607"},
            {name: "five of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309606"},
            {name: "six of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309614"},
            {name: "seven of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309613"},
            {name: "eight of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309605"},
            {name: "nine of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309610"},
            {name: "ten of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309615"},
            {name: "page of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309611"},
            {name: "knight of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309609"},
            {name: "queen of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309612"},
            {name: "king of cups", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309608"},
            {name: "ace of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309632"},
            {name: "two of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309645"},
            {name: "three of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309644"},
            {name: "four of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309635"},
            {name: "five of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309634"},
            {name: "six of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309642"},
            {name: "seven of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309641"},
            {name: "eight of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309633"},
            {name: "nine of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309638"},
            {name: "ten of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309643"},
            {name: "page of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309639"},
            {name: "knight of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309637"},
            {name: "queen of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309640"},
            {name: "king of swords", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309636"},
            {name: "ace of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309618"},
            {name: "two of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309631"},
            {name: "three of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309630"},
            {name: "four of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309621"},
            {name: "five of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309620"},
            {name: "six of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309628"},
            {name: "seven of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309627"},
            {name: "eight of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309619"},
            {name: "nine of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309624"},
            {name: "ten of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309629"},
            {name: "page of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309625"},
            {name: "knight of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309623"},
            {name: "queen of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309626"},
            {name: "king of pentacles", isReversed: "false", imgUrl: "https://openclipart.org/image/800px/309622"}
        ];
        commit('setMainDeck', mainDeck);
    },
    shuffleMainDeck({ commit }) {
      commit('shuffleMainDeck');
    },
    moveToSelectedCards({ commit, state }, card) {
      const index = state.mainDeck.findIndex((item) => item.name === card.name);
      if(index !== -1) {
        const removedCard = state.mainDeck.splice(index, 1)[0];
        commit('addToSelectedCards', removedCard);
        console.log('Selected Cards:', state.selectedCards);
      }
    },
    fetchSelectedCards({ commit }) {
      const selectedCards = [ ];
      commit('setMainDeck', selectedCards);
    },
    incrementSelectedCardsCount({ commit, state }) {
      if (state.selectedCardsCount < 3) {
        commit('incrementSelectedCardsCount');
      }
    },
  },
  getters: {
    allTarotCards: state => state.mainDeck,
    selectedCards: state => state.selectedCards,
  },
});