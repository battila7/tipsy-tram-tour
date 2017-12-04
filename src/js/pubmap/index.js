const createMap = require('./create-map');
const { eventBus } = require('../event-bus');
const { pubRepository } = require('../pub-repository');
const { scrollToElement } = require('../util');

const PubMap = {
    PubMap({ createMap, eventBus, pubRepository }) {
        this.map = createMap();
        this.eventBus = eventBus;
        this.pubRepository = pubRepository;

        this.markers = [];
    },
    init() {
        this.eventBus.addEventListener('data-loaded', () => this.populate());
        this.eventBus.addEventListener('show-on-the-map', options => this.centerTo(options.detail.location));
    },
    populate() {
        this.markers = this.pubRepository.getAll().map(pub => {
            const placeholder = this.map.createMarker({
                lat: pub.location.lat,
                lng: pub.location.lng,
                title: pub.name
            });

            return {
                location: pub.location,
                placeholder
            };
        });

        this.map.addMarkers(this.markers.map(marker => marker.placeholder));
    },
    centerTo(location) {
        this.map.setCenter(location.lat, location.lng);

        scrollToElement(document.querySelector('.pubmap'), 1000);
    }
};

const pubMap = Object.create(PubMap);
pubMap.PubMap({
    createMap: createMap.bind(null, {
        element: '.pubmap',
        location: { 
            lat: 47.531295,
            lng: 21.624691
        }
    }),
    eventBus,
    pubRepository
});

module.exports = {
    pubMap,
    PubMap
};
