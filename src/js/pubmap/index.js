const createMap = require('./create-map');
const { eventBus } = require('../event-bus');

const PubMap = {
    PubMap({ createMap, eventBus }) {
        this.map = createMap();
        this.eventBus = eventBus;
    },
    init() {
        this.eventBus.addEventListener('data-loaded', () => this.populate());
    },
    populate() {
        console.log('add markers');
    }
};

const pubMap = Object.create(PubMap);
pubMap.PubMap({
    createMap: createMap.bind(null, {
        element: '.pubmap',
        location: { 
            lat: 47.532535,
            lng: 21.624908 
        }
    }),
    eventBus
});

module.exports = {
    pubMap,
    PubMap
};
