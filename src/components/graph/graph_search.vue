<template>
  <form class="search-box no-print">
    <a href="#" class="secondary open-sidebar" title="Menu">
      <i class="material-icons">menu</i>
    </a>
    <div class="ak-typeahead">
      <input
        v-model="searchQuery"
        autofocus
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Type in what you like"
      >
      <ul v-if="suggestions.lenght > 0" class="suggestions">
        <li v-for="(suggestion, index) in suggestions" :key="index">
          <a class="suggestion" href="#"></a>
        </li>
      </ul>
    </div>
    <div class="search-button">
      <a href="#" class="search-icon" title="Search">
        <i class="material-icons">search</i>
      </a>
      <div class="drop-click-container">
        <span class="drop-click-name" title="Appliances">Appliances</span>
        <select class="back-dropdown">
          <option value="Books">Books</option>
          <option value="KindleStore">Kindle Store</option>
          <option value="UnboxVideo">Amazon Video</option>
          <option value="VideoGames">Video Games</option>
          <option value disabled></option>
          <option value="All">All</option>
          <option value="Appliances">Appliances</option>
          <option value="MobileApps">Apps for Android</option>
          <option value="ArtsAndCrafts">Arts &amp; Crafts</option>
          <option value="Automotive">Automotive</option>
          <option value="Baby">Baby</option>
          <option value="Beauty">Beauty</option>
          <option value="Apparel">Apparel</option>
          <option value="Wireless">Cell Phones</option>
          <option value="PCHardware">Computers</option>
          <option value="Electronics">Electronics</option>
          <option value="GourmetFood">Grocery</option>
          <option value="HealthPersonalCare">Health</option>
          <option value="HomeGarden">Home &amp; Kitchen</option>
          <option value="Industrial">Industrial &amp; Scientific</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Magazines">Magazine Subscriptions</option>
          <option value="Video">Movies &amp; TV</option>
          <option value="MP3Downloads">MP3 Downloads</option>
          <option value="Music">Music</option>
          <option value="MusicalInstruments">Musical Instruments</option>
          <option value="OfficeProducts">Office Products</option>
          <option value="OutdoorLiving">Patio, Lawn &amp; Garden</option>
          <option value="PetSupplies">Pet Supplies</option>
          <option value="Shoes">Shoes</option>
          <option value="Software">Software</option>
          <option value="SportingGoods">Sports &amp; Outdoors</option>
          <option value="Tools">Tools</option>
          <option value="Toys">Toys &amp; Games</option>
          <option value="Watches">Watches</option>
        </select>
      </div>
    </div>
  </form>
</template>
<script>
import debounce from "lodash/debounce";
export default {
  data() {
    return {
      searchQuery: "",
      suggestions: []
    };
  },
  methods: {
    searchSuggestion() {}
  },
  created() {
    this.debounceSuggestion = debounce(this.searchSuggestion, 500);
  }
};
</script>
<style>
</style>


