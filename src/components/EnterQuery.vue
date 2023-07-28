<template>


    <div class="inputOutput">
        <div class="userInput">
            <textarea
                v-model="userInput" 
                type="text" 
                rows="10" 
                name="query" 
                id="query" 
                placeholder="Enter your query here." 
                style="width: 90%; height: 90%; resize: none; outline: none;"
            ></textarea>
        </div>

        <v-btn @click="saveUserQuery" large dark :disabled="isSubmitDisabled" elevated style="color: #161623;background-color: #d2cfd2">Submit</v-btn>

    </div>


</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'EnterQuery',
    data() {
        return {
            userInput: '',
        };
    },
    computed: {
        isSubmitDisabled() {
            return this.userInput.trim().length === 0;
        },
    },
    methods: {
        ...mapMutations(['setUserQuery', 'showTarotCards']),
        saveUserQuery() {
            this.setUserQuery(this.userInput);
            this.showTarotCards();
            this.$emit('submit-query', true);
        },
    },
};

</script>

<style scoped>

.inputOutput{
    display: flex;
    flex-direction: column;
    width: 45%;
    height: 30%;
    margin: auto;
    padding: auto;
    align-items: center;
    justify-content: center;
    font-family: Avenir;
}

.userInput{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 5% 1%;
    border: 1px solid #d2cfd2;
    border-radius: 15px;
    min-width: 350px; 
}

textarea {
  border: none;
  font-size: 16px;
  color: #d2cfd2;
}

textarea::placeholder {
    color: #d2cfd2;
}

textarea:focus::placeholder {
  color: transparent;
}

textarea:focus {
  outline: none;
}

.v-btn {
  margin-top: 5%;
}

</style>