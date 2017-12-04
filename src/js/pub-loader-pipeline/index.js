const { dataSource } = require('../data-source');
const { distanceService } = require('../distance-service');
const { placesService } = require('../places-service');
const { pubRepository } = require('../pub-repository');

function callPlacesService(pubs) {
    return Promise.all(pubs.map(pub => placesService.enrichWithPlacesData(pub)));
}

function calculateDistances(pubs) {
    const addDistance = (distance, pub) => Object.assign({}, pub, { distanceFromPrevious: distance });

    const distancePromises = [ Promise.resolve(pubs[0]).then(pub => addDistance(0, pub)) ];

    for (let i = 1; i < pubs.length; ++i) {
        const promise = distanceService.distanceBetween(pubs[i - 1].location, pubs[i].location)
            .then(distance => addDistance(distance, pubs[i]));

        distancePromises.push(promise);
    }

    return Promise.all(distancePromises);
}

function saveData(pubs) {
    return pubs.map(pub => {
        pubRepository.add(pub);

        return pub;
    });
}

module.exports = function run() {
    return dataSource.retrieve()
        .then(callPlacesService)
        .then(calculateDistances)
        .then(saveData);
};
