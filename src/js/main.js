const { pubs } = require('./data');
const { placesApiCaller } = require('./places-api-caller');
const { pubRepository } = require('./pub-repository');

const placesApiPromises = pubs.map(pub => {
    if (pub.placeId) {
        placesApiCaller.queryPlaceId(pub.placeId);
    } else {
        return Promise.resolve(null);
    }
});

Promise.all(placesApiPromises)
    .then(results => {
        return pubs.map((pub, index) => {
            pub.apiResult = results[index];

            return pub;
        });
    })
    .then(results => {
        results.forEach(result => pubRepository.add(result));
    });
