const { pubs } = require('./data');
const { placesApiCaller } = require('./places-api-caller');
const { pubRepository } = require('./pub-repository');
const pubTransformer = require('./pub-transformer');
const populate = require('./publine')

const { distanceCalculator } = require('./distance-calculator');

distanceCalculator.distanceBetween({
  lat: 47.529971, 
  lng: 21.623596
}, {
  lat: 47.532984, 
  lng: 21.625838
}).then(result => console.log(result), status => console.log(status));

const placesApiPromises = pubs.map(pub => {
    if (pub.placeId) {
        return placesApiCaller.queryPlaceId(pub.placeId);
    } else {
        return Promise.resolve(null);
    }
});

Promise.all(placesApiPromises)
    .then(results => {
        return pubs.map((pub, index) => {
            return pubTransformer(pub, results[index]);
        });
    })
    .then(results => {
        results.forEach(result => pubRepository.add(result));
    })
    .then(() => {
        populate(pubRepository.getAll());
    });


var map = new GMaps({
    el: '.pubmap',
    lat: 47.532535,
    lng: 21.624908,
    heading: 1.7,
    disableDefaultUI: true,
    zoomControl: true,
     styles: [
            {elementType: 'geometry', stylers: [{color: '#101010'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
});

