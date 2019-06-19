<template>
  <form class="search-box no-print">
    <a @click="handleShowMenu" href="#" class="secondary open-sidebar" title="Menu">
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
        <span class="drop-click-name" :title="category">{{categoryDisplay}}</span>
        <select class="back-dropdown" v-model="category">
          <option value disabled></option>
          <option
            v-for="(option ,index) in sortedCategories"
            :key="index"
            :value="option.value"
          >{{ option.text }}</option>
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
      suggestions: [],
      category:'All',
      categoryDisplay:'All',
      categories: [
        { value: "Watches", text: 'Watches' },
        { value: "PetSupplies", text: "Pet Supplies" },
        { value: "Toys", text: "Toys" },
        { value: "Tools", text: "Tools" },
        { value: "SportingGoods", text: "Sports & Outdoors" },
        { value: "Software", text: "Software" },
        { value: "Shoes", text: "Shoes" },
        { value: "OutdoorLiving", text: "Patio, Lawn & Garden" },
        { value: "OfficeProducts", text: "Office Products" },
        { value: "MusicalInstruments", text: "Musical Instruments" },
        { value: "Music", text: "Music" },
        { value: "MP3Downloads", text: "MP3 Downloads" },
        { value: "Video", text: "Movies & TV" },
        { value: "Magazines", text: "Magazine Subscriptions" },
        { value: "Jewelry", text: "Jewelry" },
        { value: "Industrial", text: "Industrial & Scientific" },
        { value: "HomeGarden", text: "Home & Kitchen" },
        { value: "HealthPersonalCare", text: "Health" },
        { value: "GourmetFood", text: "Grocery" },
        { value: "Electronics", text: "Electronics" },
        { value: "PCHardware", text: "Computers" },
        { value: "Wireless", text: "Cell Phones" },
        { value: "Apparel", text: "Apparel" },
        { value: "Beauty", text: "Beauty" },
        { value: "Baby", text: "Baby" },
        { value: "Automotive", text: "Automotive" },
        { value: "ArtsAndCrafts", text: "Arts & Crafts" },
        { value: "MobileApps", text: "Apps for Android" },
        { value: "Appliances", text: "Appliances" },
        { value: "All", text: "All" },
        { value: "VideoGames", text: "Video Games" },
        { value: "UnboxVideo", text: "Amazon Video" },
        { value: "KindleStore", text: "Kindle Store" },
        { value: "Books", text: "Books" }
      ]
    };
  },
  methods: {
    searchSuggestion() {},
    handleShowMenu() {
      return this.$emit("showMenu", true);
    }
  },
  created() {
    this.debounceSuggestion = debounce(this.searchSuggestion, 500);
  },
  computed: {
    sortedCategories() {
      return this.categories.sort((a, b) => {
        return a.text > b.text ? 1 : -1;
      });
    }
  },
  watch: {
      category: function(newvalue) {
      this.$emit('categoryChange', newvalue);
      this.categoryDisplay = this.sortedCategories.find(category => {
        return category.value === newvalue;
      }).text;
    }
  },
};
</script>
<style>
</style>


