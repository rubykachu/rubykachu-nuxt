<template>
  <v-container fluid class="article-page">
    <v-row>
      <v-card
        class="d-flex align-start flex-column rounded-15"
        color="grey"
        min-width="100%"
        min-height="400"
        img="http://estudiopatagon.com/themes/wordpress/breek/wp-content/uploads/2019/06/2004612-1601x500.jpg"
      >
        <v-card class="pa-2 mb-auto" color="transparent" outlined>
          <v-card-text>
            <v-icon color="white" class="icon-size mr-1"
              >mdi-calendar-week</v-icon
            >
            <span class="subheading white--text">June 5, 2019</span>
            <v-icon color="white" class="icon-size ml-5 mr-1"
              >mdi-account-clock-outline</v-icon
            >
            <span class="subheading white--text">4 mins</span>
          </v-card-text>
        </v-card>

        <v-card class="pa-2" color="transparent" outlined>
          <v-card-text>
            <v-chip color="primary" class="px-8 font-weight-bold">Cloud</v-chip>
            <h1 class="py-5 white--text display-2">
              Bringing samples back is a considerable challenge
            </h1>
          </v-card-text>
        </v-card>
      </v-card>
    </v-row>

    <v-row class="mt-12 mb-20 article-page__content-wrapper">
      <div class="pa-7">
        <v-col sm="12">
          <div v-html="content"></div>
        </v-col>

        <v-col sm="4" offset-sm="4" class="text-center my-10">
          <v-text-field
            outlined
            dense
            hide-details
            readonly
            background-color="grey lighten-4"
            append-icon="mdi-content-copy"
            label="Copy link and share article"
            value="http://estudiopatagon.com/themes/wordpress/breek/bringing-red-planet-samples-back-is-a-considerable-challenge/"
            @click:append=""
            class="text-field-copy-link"
          ></v-text-field>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    content: `<p>How can we bring a sample of Mars safely back to Earth? With scientists worldwide curious about the Red Planet’s potential for life, NASA and the European Space Agency are working on a future 'sample-return' mission to safely study Mars materials.</p>
<p>One possible location for sample hunting could be a Martian spot called Jezero Crater, the site of an ancient lake — and possibly, also a location for ancient microbes.</p>

<p>While rovers and landers can study Mars when they land there, the challenge is that there is only so much space available on these machines for instruments. On Earth, entire laboratories could study Red Planet regolith (soil) and rocks. But getting the samples back to our planet will be a considerable engineering challenge.</p>

<p>ESA officials said in a statement that the two agencies plan to perform three launches from Earth and one from Mars as part of the mission, which will include two Mars rovers and an autonomous docking in Martian orbit.</p>

<p>“A NASA launch will send the sample return lander mission to land a platform near the Mars 2020 site. From here, a small ESA rover — the Sample Fetch Rover — will head out to retrieve the cached samples,” ESA officials said in another statement.</p>`
  })
}
</script>

<style lang="scss" scoped></style>
