<template>
  <div class="container">
    <div class="flights row" v-if="!loading">
      <div class="outbound col-lg-12 col-md-12 col-sm-12">
        <div class="card" style="margin-bottom: 20px;overflow: visible;">
          <div class="card-content">
            <div class="content">
              <div class="flight-details">
                <div>
                  {{ source && source.source.name }}
                  <b-icon
                    icon="arrow-alt-circle-right"
                    pack="fas"
                    size="is-small"
                  ></b-icon>
                  {{ source && source.dest.name }}
                </div>
                <div>
                  {{ formatter(new Date(), "LL") }} To
                  {{ source && formatter(source.date, "LL") }}
                </div>
              </div>
              <div class="filters">
                <div class="cost">
                  <b-radio
                    v-model="filtersOutbound.cost"
                    name="filter"
                    value="all"
                    native-value="all"
                  >
                    Show All
                  </b-radio>
                  <b-radio
                    v-model="filtersOutbound.cost"
                    name="filter"
                    value="high"
                    native-value="high"
                  >
                    Show Highest
                  </b-radio>
                  <b-radio
                    v-model="filtersOutbound.cost"
                    name="filter"
                    value="low"
                    native-value="low"
                  >
                    Show Cheapest
                  </b-radio>
                </div>
                <div class="direct">
                  <div class="field">
                    <b-switch v-model="filtersOutbound.direct">Direct</b-switch>
                    <div class="sort">
                      Sort By
                      <b-dropdown
                        v-model="filtersOutbound.sortVal"
                        aria-role="list"
                      >
                        <button
                          class="button is-primary"
                          type="button"
                          slot="trigger"
                        >
                          <template v-if="filtersOutbound.sortVal == 'COST'">
                            <span>COST</span>
                          </template>
                          <template v-if="filtersOutbound.sortVal == 'DATE'">
                            <span>DATE</span>
                          </template>
                          <template v-if="!filtersOutbound.sortVal">
                            <span>SELECT</span>
                          </template>
                          <b-icon icon="menu-down"></b-icon>
                        </button>

                        <b-dropdown-item value="COST" aria-role="listitem">
                          <span>COST</span>
                        </b-dropdown-item>

                        <b-dropdown-item value="DATE" aria-role="listitem">
                          <span>DATE</span>
                        </b-dropdown-item>
                      </b-dropdown>
                      <span @click="toggle('out')">
                        <b-icon
                          :icon="
                            filtersOutbound.asc
                              ? 'arrow-alt-circle-down'
                              : 'arrow-alt-circle-up'
                          "
                          pack="fas"
                          size="is-medium"
                        ></b-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="outbound.length">
          <div
            class="card card-flight"
            v-for="(items, i) in outbound"
            :key="i"
            :class="[
              items.cheapest ? 'highlight' : '',
              items.selected ? 'selected' : '',
            ]"
            @click="selectFlight(items, 'out')"
          >
            <div class="card-content">
              <div class="content">
                <div class="flight-details">
                  <div class="flight">
                    {{ items.carrier.Name }}
                  </div>
                  <div class="date-time">
                    {{ formatter(items.date, "LLL") }}
                  </div>
                  <div class="price">{{ items.currency }}{{ items.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          style="background-color:red;color:white;height:30px;text-align:center"
        >
          No Flights Found For this route
        </div>
      </div>
      <div class="inbound col-lg-12 col-md-12 col-sm-12" v-if="isRound">
        <div class="card" style="margin-bottom: 20px;overflow: visible;">
          <div class="card-content">
            <div class="content">
              <div class="row flight-details">
                <div>
                  {{ source && source.dest.name }}
                  <b-icon
                    icon="arrow-alt-circle-right"
                    pack="fas"
                    size="is-small"
                  ></b-icon>
                  {{ source && source.source.name }}
                </div>
                <div>
                  {{ formatter(new Date(), "LL") }} To
                  {{ formatter(destination.date, "LL") }}
                </div>
              </div>
              <div class="filters">
                <div class="cost">
                  <b-radio
                    v-model="filtersInbound.cost"
                    name="filterdes"
                    value="all"
                    native-value="all"
                  >
                    Show All
                  </b-radio>
                  <b-radio
                    v-model="filtersInbound.cost"
                    name="filterdes"
                    value="high"
                    native-value="high"
                  >
                    Show Highest
                  </b-radio>
                  <b-radio
                    v-model="filtersInbound.cost"
                    name="filterdes"
                    value="low"
                    native-value="low"
                  >
                    Show Cheapest
                  </b-radio>
                </div>

                <div class="direct">
                  <div class="field">
                    <b-switch v-model="filtersInbound.direct">Direct</b-switch>
                    <div class="sort">
                      Sort By
                      <b-dropdown
                        v-model="filtersInbound.sortVal"
                        aria-role="list"
                      >
                        <button
                          class="button is-primary"
                          type="button"
                          slot="trigger"
                        >
                          <template v-if="filtersInbound.sortVal == 'COST'">
                            <span>COST</span>
                          </template>
                          <template v-if="filtersInbound.sortVal == 'DATE'">
                            <span>DATE</span>
                          </template>
                          <template v-if="!filtersInbound.sortVal">
                            <span>SELECT</span>
                          </template>
                          <b-icon icon="menu-down"></b-icon>
                        </button>

                        <b-dropdown-item value="COST" aria-role="listitem">
                          <span>COST</span>
                        </b-dropdown-item>

                        <b-dropdown-item value="DATE" aria-role="listitem">
                          <span>DATE</span>
                        </b-dropdown-item>
                      </b-dropdown>
                      <span @click="toggle('in')">
                        <b-icon
                          :icon="
                            filtersInbound.asc
                              ? 'arrow-alt-circle-down'
                              : 'arrow-alt-circle-up'
                          "
                          pack="fas"
                          size="is-medium"
                        ></b-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="inbound.length">
          <div
            class="card card-flight"
            v-for="(items, i) in inbound"
            :key="i"
            :class="[
              items.cheapest ? 'highlight' : '',
              items.selected ? 'selected' : '',
            ]"
            @click="selectFlight(items, 'in')"
          >
            <div class="card-content">
              <div class="content">
                <div class="flight-details">
                  <div class="flight">
                    {{ items.carrier.Name }}
                  </div>
                  <div class="date-time">
                    {{ formatter(items.date, "LLL") }}
                  </div>
                  <div class="price">{{ items.currency }}{{ items.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          style="background-color:red;color:white;height:30px;text-align:center"
        >
          No Flights Found For This Route
        </div>
      </div>
    </div>
    <div
      class="selection"
      v-if="filtersInbound.selected || filtersOutbound.selected"
    >
      <div>
        <div v-if="filtersOutbound.selected">
          <div class="content">
            <div class="flight-quo">
              <div class="flight">
                {{ filtersOutbound.selected.carrier.Name }}
              </div>
              <div class="date-time">
                {{ formatter(filtersOutbound.selected.date, "LLL") }}
              </div>
              <div class="price">
                {{ filtersOutbound.selected.currency
                }}{{ filtersOutbound.selected.price }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="filtersInbound.selected">
          <div class="content">
            <div class="flight-quo">
              <div class="flight">
                {{ filtersInbound.selected.carrier.Name }}
              </div>
              <div class="date-time">
                {{ formatter(filtersInbound.selected.date, "LLL") }}
              </div>
              <div class="price">
                {{ filtersOutbound.selected.currency
                }}{{ filtersOutbound.selected.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="total"
        v-if="filtersInbound.selected || filtersOutbound.selected"
      >
        TOTAL PRICE <b>{{ getPrice }}</b>
      </div>
    </div>
    <b-loading :is-full-page="true" v-model="loading">
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin">
      </b-icon>
    </b-loading>
  </div>
</template>

<script>
import store from "../store";
import { transformFlightData } from "../utils";
import moment from "moment";
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      source: null,
      destination: null,
      outBoundData: this.outbound,
      inBoundData: this.inbound,
      filtersOutbound: {
        cost: "all",
        direct: false,
        sortVal: null,
        asc: false,
        selected: null,
      },
      filtersInbound: {
        cost: "all",
        direct: false,
        sortVal: null,
        asc: false,
        selected: null,
      },
    };
  },
  methods: {
    search() {
      store.dispatch("flights");
    },
    daysDiff(date) {
      var a = moment(new Date());
      var b = moment(new Date(date));
      return b.diff(a, "days");
    },
    filterResult(a) {
      return a;
    },
    toggle(type) {
      if (type == "out" && this.filtersOutbound.sortVal) {
        this.filtersOutbound.asc = !this.filtersOutbound.asc;
      } else {
        if (type == "in" && this.filtersInbound.sortVal) {
          this.filtersInbound.asc = !this.filtersInbound.asc;
        }
      }
    },
    selectFlight(item, type) {
      if (type == "out") {
        this.filtersOutbound.selected = item;
      } else {
        this.filtersInbound.selected = item;
      }
    },
  },
  computed: {
    outbound() {
      return store.getters.outbound;
    },
    inbound() {
      return store.getters.inbound;
    },
    isRound() {
      return this.source.round;
    },
    formatter() {
      return function(date, format) {
        return moment(date).format(format);
      };
    },
    getPrice() {
      let price = 0;
      if (this.filtersOutbound.selected) {
        price =
          this.filtersOutbound.selected.currency +
          this.filtersOutbound.selected.price;
      }
      if (this.filtersInbound.selected) {
        price =
          this.filtersInbound.selected.currency +
          this.filtersInbound.selected.price;
      }
      if (this.filtersOutbound.selected && this.filtersInbound.selected) {
        price =
          this.filtersInbound.selected.currency +
          (this.filtersInbound.selected.price +
            this.filtersOutbound.selected.price);
      }
      return price;
    },
  },
  watch: {
    filtersOutbound: {
      handler() {
        store.commit("filterOutbound", this.filtersOutbound);
      },
      deep: true,
    },
    filtersInbound: {
      handler() {
        store.commit("filterInbound", this.filtersInbound);
      },
      deep: true,
    },
  },
  mounted() {
    this.loading = true;
    let dayDiff = 0;
    var p1 = [];
    var p2 = [];
    var fvalSource = {
      Quotes: [],
      Carriers: [],
      Currencies: [],
      Places: [],
      Routes: [],
    };
    var fvalDest = {
      Quotes: [],
      Carriers: [],
      Currencies: [],
      Places: [],
      Routes: [],
    };
    var currentDate = new Date();
    console.log(this.$route.query);
    this.source = {
      source: JSON.parse(this.$route.query.source),
      dest: JSON.parse(this.$route.query.dest),
      date: this.$route.query.outbound,
      round: this.$route.query.round,
    };
    dayDiff = this.daysDiff(this.source.date);
    for (let i = 0; i <= dayDiff; i++) {
      let date = moment(currentDate.setDate(currentDate.getDate() + 1)).format(
        "YYYY-MM-DD"
      );
      p1.push(
        store.dispatch("flights", {
          query: this.source,
          date: date,
        })
      );
    }
    if (this.$route.query.round) {
      currentDate = new Date();
      dayDiff = 0;
      this.destination = {
        source: JSON.parse(this.$route.query.source),
        dest: JSON.parse(this.$route.query.dest),
        date: this.$route.query.inbound,
      };
      dayDiff = this.daysDiff(this.destination.date);
      for (let i = 0; i <= dayDiff; i++) {
        let date = moment(
          currentDate.setDate(currentDate.getDate() + 1)
        ).format("YYYY-MM-DD");
        p2.push(
          store.dispatch("flights", {
            query: this.destination,
            date: date,
          })
        );
      }
    }
    Promise.all(p1).then((res) => {
      res.forEach((data) => {
        for (let key in data) {
          fvalSource[key] = [...fvalSource[key], ...data[key]];
        }
      });
      let src = transformFlightData("out", fvalSource);
      store.commit("saveOutbound", src.quotes);
      if (p2.length) {
        Promise.all(p2).then((re) => {
          re.forEach((data) => {
            for (let key in data) {
              fvalDest[key] = [...fvalDest[key], ...data[key]];
            }
          });
          let dest = transformFlightData("in", fvalDest);
          store.commit("saveInbound", dest.quotes);
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  },
};
</script>

<style lang="scss">
.flight-details {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}
.flights {
  display: grid;
  grid-template-columns: auto auto;
  overflow: scroll;
  margin-bottom: 100px;
}
.card-flight {
  margin-bottom: 20px;
  cursor: pointer;
}
.cost {
  display: flex;
}
.filters {
  margin-top: 10px;
}
.field {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.highlight {
  border: 4px solid lightgreen;
}
.selection {
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 200px;
  background-color: lightgreen;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.selected {
  border: 5px solid black;
}
.flight-quo {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding: 10px 10px 10px 10px;
  background-color: white;
  justify-content: space-between;
}
.content {
  padding: 10px;
}
.container {
  overflow: scroll;
  max-height: 100vh;
}
</style>
