const createMap = require('./create-map');
const { eventBus } = require('../event-bus');
const { pubRepository } = require('../pub-repository');

const PubMap = {
    PubMap({ createMap, eventBus, pubRepository }) {
        this.map = createMap();
        this.eventBus = eventBus;
        this.pubRepository = pubRepository;

        this.markers = [];
    },
    init() {
        this.eventBus.addEventListener('data-loaded', () => this.populate());
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
