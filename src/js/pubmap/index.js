const createMap = require('./create-map');
const { eventBus } = require('../event-bus');
const { pubRepository } = require('../pub-repository');
const { scrollToElement } = require('../util');
const { odyssey } = require('../odyssey');

const PubMap = {
    PubMap({ createMap, eventBus, pubRepository }) {
        this.map = createMap();
        this.eventBus = eventBus;
        this.pubRepository = pubRepository;

        this.markers = [];
        this.routes = [];
    },
    init() {
        this.eventBus.addEventListener('data-loaded', () => this.populate());
        this.eventBus.addEventListener('show-on-the-map', options => this.centerTo(options.detail.location));
        this.eventBus.addEventListener('beer-count-changed', options => this.modifyOdyssey(options.detail.count));
    },
    populate() {
        this.markers = this.pubRepository.getAll().map(pub => {
            const placeholder = this.map.createMarker({
                lat: pub.location.lat,
                lng: pub.location.lng,
                title: pub.name,
                draggable: false,
                icon: this.resolveIcon(pub.priceRange),
                infoWindow: {
                    content: this.infoWindowContentFor(pub)
                }
            });

            return {
                location: pub.location,
                placeholder
            };
        });

        this.map.addMarkers(this.markers.map(marker => marker.placeholder));

        this.modifyOdyssey(1);
    },
    modifyOdyssey(count) {
        console.log(count);

        this.map.removePolylines();

        const routeDescriptors = odyssey.forBeersPerPlace(count, this.pubRepository.getAll().map(pub => pub.location));

        console.log(routeDescriptors);

        routeDescriptors.forEach(desc => {
            this.map.drawRoute({
                origin: desc.origin,
                destination: desc.destination,
                waypoints: desc.waypoints,
                strokeColor: desc.strokeColor,
                strokeOpacity: 0.55,
                strokeWeight: 6
            });
        });
    },
    centerTo(location) {
        this.map.setCenter(location.lat, location.lng);

        scrollToElement(document.querySelector('.pubmap'), 1000);
    },
    resolveIcon(index) {
        const name = [ 'beer', 'wine', 'cocktail' ][index - 1];

        return {
            url: `assets/img/${name}.png`,
            scaledSize: new google.maps.Size(32, 32)
        };
    },
    infoWindowContentFor(pub) {
        return `
            <div class="has-black-text">
                <h2 class="title">${pub.name}</h1>
                <h3 class="subtitle">${pub.vicinity}</h2>
            </div>
        `;
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
