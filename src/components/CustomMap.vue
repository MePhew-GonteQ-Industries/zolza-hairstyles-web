<template>
  <div class="map" :class="{ loaded: loaded }" :id="mapId">
    <a
      class="mapbox-logo"
      href="http://mapbox.com/about/maps"
      target="_blank"
      aria-label="Mapbox logo"
      ><img src="@/assets/mapbox-logo-white.svg" alt="Mapbox logo"
    /></a>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import leaflet from "leaflet";

export default {
  name: "CustomMap",
  props: {
    location: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      default: "range",
    },
  },
  setup(props) {
    const store = useStore();

    const mapId = uuidv4();

    const loaded = ref(false);

    const showMap = () => {
      const { latitude, longitude } = props.location;

      const map = leaflet
        .map(mapId, {
          dragging: false,
          scrollWheelZoom: "center",
          doubleClickZoom: "center",
          touchZoom: "center",
        })
        .setView([latitude, longitude], 5);

      map.attributionControl.setPrefix(
        '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps" target="_blank"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a>'
      );

      switch (props.type) {
        case "range": {
          leaflet
            .circle([latitude, longitude], {
              color: "var(--accent-color)",
              fillOpacity: 0.2,
              radius: 100000,
            })
            .addTo(map);
          break;
        }
        case "location": {
          leaflet.marker([latitude, longitude]).addTo(map);
          break;
        }
        default:
          break;
      }

      leaflet
        .tileLayer(
          "https://api.mapbox.com/styles/v1/mapbox/{theme}-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            maxZoom: 19,
            attribution:
              "© <a href='https://www.mapbox.com/about/maps/' target='_blank'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            theme: store.state.settings.theme === "light" ? "light" : "dark",
            accessToken: import.meta.env.VITE_MAPBOX_API_TOKEN,
          }
        )
        .addTo(map);
    };

    watch(
      () => props.show,
      (newValue) => {
        if (newValue) {
          loaded.value = true;
          setTimeout(() => {
            showMap();
          }, 100);
        }
      }
    );

    return {
      mapId,
      loaded,
    };
  },
};
</script>

<style lang="scss">
.leaflet-control-attribution {
  font-size: 1rem;
  display: flex;
  align-items: center;
  background: $background-accent-low !important;
  color: $primary-text-color;
  height: 30px;
  border-radius: 0.5rem;
  bottom: 0.5rem;
  right: 0.5rem;

  span {
    display: none;
  }

  a {
    color: $secondary-text-color;
    font-size: 0.813rem;
    display: flex;
    align-items: center;
    height: 100%;
    gap: 5px;
  }
}
</style>

<style lang="scss" scoped>
.map {
  width: 100%;
  max-width: 1000px;
  justify-self: center;
  min-width: 500px;
  border-radius: 0.5rem;

  &.loaded {
    height: 500px;
  }

  .mapbox-logo {
    position: absolute;
    z-index: 1000;
    bottom: 0.5rem;
    left: 0.5rem;
    padding: 0.5rem;
    height: 30px;
    width: 100px;
    background-color: $background-accent-low;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
  }
}
</style>
