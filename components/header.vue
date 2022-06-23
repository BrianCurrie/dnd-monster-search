<template>
  <v-app-bar app elevate-on-scroll
    ><v-spacer></v-spacer>
    <v-switch
      v-model="$vuetify.theme.dark"
      inset
      hide-details
      :label="`${$vuetify.theme.dark ? 'Dark mode' : 'Light mode'}`"
    />
  </v-app-bar>
</template>
