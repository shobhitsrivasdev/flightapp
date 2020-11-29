<template>
  <div class="search-content">
    <div class="search-widget">
      <div class="waybtn">
        <button
          :class="trip == 'one' ? 'active' : ''"
          @click="(trip = 'one'), (inbound = null)"
        >
          One way
        </button>
        <button
          :class="trip == 'round' ? 'active' : ''"
          @click="trip = 'round'"
        >
          Round trip
        </button>
      </div>
      <h3>Book Domestic and International flights</h3>
      <div class="srcformbx">
        <div class="col-6 col-lg-4 lbl swap sec">
          <strong class="swap">From </strong>
          <b-autocomplete
            placeholder="City"
            :open-on-focus="true"
            :data="dataSourceFrom"
            field="display"
            @input="onSearch($event, 'from')"
            @select="selectPlace($event, 'from')"
          >
          </b-autocomplete>
        </div>
        <div class="col-6 col-lg-4 lbl sec">
          <strong class="swap">To </strong>
          <b-autocomplete
            placeholder="City"
            :open-on-focus="true"
            :data="dataSourceTo"
            field="display"
            @input="onSearch($event, 'to')"
            @select="selectPlace($event, 'to')"
          >
          </b-autocomplete>
        </div>
        <div class="col-6 col-lg-2 lbl sec" id="Fly_dep_datepickerid">
          <strong>Departure <i class="fa fa-angle-down"></i></strong>
          <b-datepicker
            placeholder="Travel Date"
            size="is-small"
            position="is-bottom-left"
            :min-date="new Date()"
            @input="selectDate($event, 'from')"
          >
          </b-datepicker>
        </div>
        <div
          class="col-6 col-lg-2 lbl sec"
          onclick="return SelectTripType('R')"
          id="Fly_ret_datepickerid"
        >
          <strong>Return <i class="fa fa-angle-down"></i></strong>
          <b-datepicker
            placeholder="Return Date"
            size="is-small"
            position="is-bottom-left"
            :disabled="trip == 'one'"
            :min-date="new Date(outbound)"
            @input="selectDate($event, 'to')"
          >
          </b-datepicker>
        </div>
      </div>
      <div style="text-align:center">
        <b-button type="is-info" size="is-medium" @click="search">
          Search Flights
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import moment from "moment";
export default {
  name: "Home",
  data() {
    return {
      dataSourceFrom: [],
      dataSourceTo: [],
      trip: "one",
      source: null,
      destination: null,
      outbound: null,
      inbound: null,
    };
  },
  methods: {
    onSearch(searchText, type) {
      if (searchText.length > 2) {
        var source = [];
        console.log(type);
        store.dispatch("searchPlaces", searchText).then((data) => {
          if (data.Places.length) {
            source = data.Places.map((places) => {
              return {
                city: places.PlaceName,
                value: places.PlaceId,
                display: `${places.PlaceName} (${places.CountryName})`,
              };
            });
          }
          if (type == "from") {
            this.dataSourceFrom = source;
          } else {
            this.dataSourceTo = source;
          }
        });
      }
    },
    selectPlace(value, type) {
      if (type == "from") {
        this.source = {
          id: value.value,
          name: value.city,
        };
      } else {
        this.destination = {
          id: value.value,
          name: value.city,
        };
      }
    },
    isValid() {
      if (this.trip == "one") {
        if (
          this.source &&
          this.destination &&
          this.outbound &&
          this.source.id !== this.destination.id
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          this.source &&
          this.destination &&
          this.outbound &&
          this.inbound &&
          this.source.id !== this.destination.id
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    search() {
      if (this.isValid()) {
        this.$router.push({
          name: "flights",
          query: {
            source: JSON.stringify(this.source),
            dest: JSON.stringify(this.destination),
            round: this.trip == "one" ? false : true,
            outbound: this.outbound,
            inbound: this.inbound,
          },
        });
      }
    },
    selectDate(date, type) {
      if (type == "from") {
        this.outbound = moment(date).format("YYYY-MM-DD");
      } else {
        this.inbound = moment(date).format("YYYY-MM-DD");
      }
    },
  },
};
</script>

<style lang="scss">
.search-content {
  float: left;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 45px;
}
.search-widget {
  background: #fff;
  border-radius: 10px;
  padding: 20px 20px 30px;
  float: left;
  position: relative;
  float: left;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 45px;
}
.waybtn {
  border: 1px solid #00205b;
  font-size: 16px;
  background: #fff;
  border-radius: 15px;
  width: auto;
  float: left;
}
.waybtn button.active {
  background: #00205b;
  color: #fff;
}
.waybtn button {
  padding: 4px 30px;
  background: #fff;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  margin: 0;
  color: #00205b;
}
.search-widget h3 {
  color: #5b5b5b;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
}
@media only screen and (min-width: 40.0625em) {
  button,
  .button {
    display: inline-block;
  }
}
.srcformbx {
  background: #fff;
  float: left;
  width: 100%;
  margin-top: 18px;
  border: 1px solid #cbcbcb;
  border-radius: 8px;
  position: relative;
}
.srcformbx .lbl {
  border-right: 1px solid #cbcbcb;
  margin-bottom: 0;
  min-height: 90px;
}
.swap {
  position: relative;
}
.srcformbx .lbl strong,
.srcformbx .lbl input,
.srcformbx .lbl b,
.srcformbx .lbl span {
  display: block;
  border: none;
  outline: none;
}
.srcformbx .lbl strong,
.srcformbx .lbl b {
  color: #b5b5b5;
  font-size: 13px;
}
.srcformbx .lbl input,
.srcformbx .lbl span big {
  font-size: 20px;
  font-weight: bold;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
.srcformbx .lbl b {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.swap img {
  position: absolute;
  right: -15px;
  top: 25px;
}
img {
  display: inline-block;
  vertical-align: middle;
}
img {
  max-width: 100%;
  height: auto;
}
@media (min-width: 992px) {
  .col-lg-2 {
    -ms-flex: 0 0 16.666667%;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
}
.sec {
  float: left;
}
.search-input {
  width: 100%;
}
.options {
  height: 40px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>
