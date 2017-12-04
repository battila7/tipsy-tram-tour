const { placesApiCaller } = require('./places-api-caller');

const PlacesService = {
    PlacesService({ placesApiCaller }) {
        this.placesApiCaller = placesApiCaller;
    },
    enrichWithPlacesData(pub) {
        let basePromise;

        if (pub.placeId) {
            basePromise = this.placesApiCaller.queryByPlaceId(pub.placeId);
        } else {
            basePromise = Promise.resolve(null);
        }

        return basePromise.then(response => this.meldWithResponse(pub, response));
    },
    meldWithResponse(requested, response) {
        const result = Object.assign({}, requested);

        if (response) {
            result.location = {
                lat: response.geometry.location.lat,
                lng: response.geometry.location.lng
            };

            if (typeof result.location.lat == 'function') {
                result.location.lat = result.location.lat();
            }

            if (typeof result.location.lng == 'function') {
                result.location.lng = result.location.lng();
            }

            result.rating = response.rating;

            result.vicinity = response.vicinity;
        }

        return result;
    }
}

const placesService = Object.create(PlacesService);
placesService.PlacesService({ placesApiCaller });

module.exports = {
    placesService,
    PlacesService
};
