const { dataSource } = require('../data-source');
const { distanceService } = require('../distance-service');
const { placesService } = require('../places-service');
const { pubRepository } = require('../pub-repository');

function callPlacesService(pubs) {
    return Promise.all(pubs.map(pub => placesService.enrichWithPlacesData(pub)));
}

function calculateDistanceFromPrevious(pubs) {
    const addDistance = (distance, pub) => Object.assign({}, pub, { distanceFromPrevious: distance });

    const distancePromises = [ Promise.resolve(pubs[0]).then(pub => addDistance(0, pub)) ];

    for (let i = 1; i < pubs.length; ++i) {
        const promise = distanceService.distanceBetween(pubs[i - 1].location, pubs[i].location)
            .then(distance => addDistance(distance, pubs[i]));

        distancePromises.push(promise);
    }

    return Promise.all(distancePromises);
}

function calculateDistanceFromStart(pubs) {
    const result = [];

    for (let i = 0; i < pubs.length; ++i) {
        let distanceFromStart = 0;

        if (i != 0) {
            distanceFromStart = pubs[i].distanceFromPrevious + result[i - 1].distanceFromStart;
        }

        result.push(Object.assign({}, pubs[i], { distanceFromStart }));
    }

    return result;
}

function saveData(pubs) {
    return pubs.map(pub => {
        pubRepository.add(pub);

        return pub;
    });
}

module.exports = function run({ useMockedData }) {
    let basePromise;

    if (useMockedData) {
        basePromise = Promise.resolve(require('./mock/mock-data').pubs);
    } else {
        basePromise = dataSource.retrieve()
            .then(callPlacesService)
            .then(calculateDistanceFromPrevious);
    }

    return basePromise
        .then(calculateDistanceFromStart)
        .then(saveData);
};
