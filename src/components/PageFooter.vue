<template>

    <v-footer
      dark
      padless
    >
      <v-card
          color="#161623"
          flat
          title
          class="centered-content" 
          width="100%"
      >
          <v-card-text class="icons">
              <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4"
                  icon
              >
                  <v-icon size="24px" :color="'#bababd'">
                      {{ icon }}
                  </v-icon>
              </v-btn>
          </v-card-text>
  
          <v-card-text class="centered-content">
              <strong>Ramiro Lorca {{ new Date().getFullYear() }}</strong>
          </v-card-text>
      </v-card>
    </v-footer>
  </template>
  
  <script>
  export default {
      data: () => ({
          icons: [
              'mdi-github',
              'mdi-briefcase-account',
              'mdi-linkedin',
          ]
      })
  }
  </script>
  
  <style scoped>

  .v-footer {
    background-color: #2c2460;
  }
  
  .centered-content{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #161623;
      color: #c4c4c4ee;
  }
  
  .icons{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 10% auto auto auto;
  }
  
  </style>