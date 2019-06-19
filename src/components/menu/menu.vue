<template>
  <div>
    <div class="windows-container">
      <div>
        <div v-if="showAbout" class="window col shadow">
          <div class="header row">
            <span class="header-text">About</span>
            <a @click="closeMenu" href="#" title="Close Menu" class="secondary close-btn">
              <i class="material-icons">close</i>
            </a>
          </div>
          <div class="content">
            <p>Amazon graph is a visual recommendation service that helps people find the right product from Amazon's catalog; be it a book, a movie or a video game -Amazon graph finds everything!</p>
            <p>A link between the two products means that they are often bought together. By simply observing the network of products one can guess at what is popular and what isn’t.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="showmenu && !showAbout" class="menu-transition">
        <div class="backdrop"></div>
        <div class="global-menu col">
          <div class="header has-border">
            <div class="row row-header">
              <span class="logo-text secondary">Amazon graph</span>
              <a href="#" @click="closeMenu" title="Close Menu" class="secondary close-btn">
                <i class="material-icons">close</i>
              </a>
            </div>
          </div>
          <div class="content">
            <div class="col has-border block">
              <a @click="$event=>showAbout=true" class="row item primary" href="#">About</a>
              <a class="row item primary" href="mailto:donc310@gmail.com">Send feedback</a>
            </div>
            <div class="col has-border block">
              <a class="row item primary" href="https://twitter.com/donc310" target="_blank">Twitter</a>
            </div>
            <div class="col has-border block">
              <div class="row item">
                <span class="space-letter">Store:</span>
                <div class="drop-click-container">
                  <span class="drop-click-name" :title="country">{{countryDisplay}}</span>
                  <select class="back-dropdown" v-model="country">
                    <option
                      v-for="(option ,index) in countries"
                      :key="index"
                      :value="option.value"
                    >{{ option.text }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "menu",
  props: {
    showmenu: { type: Boolean, required: true }
  },
  data() {
    return {
      showAbout: false,
      country: "US",
      countryDisplay: "USA",
      countries: [
        { text: "USA", value: "US" },
        { text: "UK", value: "UK" },
        { value: "JP", text: "Japan" },
        { value: "DE", text: "Germany" },
        { value: "CA", text: "Canada" },
        { value: "CN", text: "China" },
        { value: "FR", text: "France" },
        { value: "IT", text: "Italy" },
        { value: "ES", text: "Spain" }
      ]
    };
  },
  computed: {},

  methods: {
    closeMenu() {
      var vm = this;
      this.$emit("closeMenu", true);
      setTimeout(() => {
        vm.showAbout = false;
      }, 0);
    }
  },
  watch: {
    country: function(newvalue) {
      this.$emit("countryChange", newvalue);
      this.countryDisplay = this.countries.find(country => {
        return country.value === newvalue;
      }).text;
    }
  }
};
</script>

