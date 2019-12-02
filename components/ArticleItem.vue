<template>
  <v-card class="mx-auto article-item" hover>
    <v-chip
      class="article-item__category px-5 py-3 font-weight-bold"
      color="indigo"
      text-color="white"
    >
      Ruby on Rails
    </v-chip>
    <v-img
      class="white--text align-end article-item__image"
      max-height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      lazy-src="https://picsum.photos/id/11/100/60"
      aspect-ratio="1"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <div class="white">
      <v-card-title class="pb-2">Top 10 Australian beaches</v-card-title>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="px-3">
        <v-avatar size="36px" color="grey darken-3" class="elevation-3">
          <img
            alt="Avatar"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          />
        </v-avatar>

        <span class="ml-3">Minh Tang Q.</span>

        <v-spacer></v-spacer>

        <div class="caption">
          <div>
            <v-icon color="primary" class="icon-size">mdi-calendar-week</v-icon>
            <span class="subheading">June 5, 2019</span>
          </div>
          <div>
            <v-icon color="primary" class="icon-size"
              >mdi-account-clock-outline</v-icon
            >
            4 mins
          </div>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.article-item {
  position: relative;
  border-radius: 15px !important;
  border: 0 !important;
  background-color: unset;

  &__image {
    border-radius: 15px 15px 0 0 !important;
  }

  &__category {
    position: absolute;
    z-index: 2;
    top: -15px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .icon-size {
    font-size: 15px;
  }
}
</style>
