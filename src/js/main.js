const { pubs } = require('./data');
const { placesApiCaller } = require('./places-api-caller');
const { pubRepository } = require('./pub-repository');
const pubTransformer = require('./pub-transformer');
const populate = require('./publine')

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
