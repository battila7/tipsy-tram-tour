const PlacesApiCaller = {
    PlacesApiCaller({ service, successStatus, tooFastStatus, timeout }) {
        this.service = service;
        this.successStatus = successStatus;
        this.tooFastStatus = tooFastStatus;
        this.timeout = timeout;
    },
    queryPlaceId(placeId) {
        return new Promise((resolve, reject) => {
            this.service.getDetails({
                placeId
            }, (place, status) => {
                if (status == this.successStatus) {
                    resolve(place);
                } else if (status == this.tooFastStatus) {
                    this.retry(placeId, resolve, reject);
                } else {
                    reject(status);
                }
            })
        });
    },
    retry(placeId, resolve, reject) {
        this.timeout(handler.bind(this));

        function handler() {
            this.queryPlaceId(placeId).then(resolve, reject);
        }
    }
};

const placesApiCaller = Object.create(PlacesApiCaller);
placesApiCaller.PlacesApiCaller({
    service: new google.maps.places.PlacesService(document.createElement('div')),
    successStatus: google.maps.places.PlacesServiceStatus.OK,
    tooFastStatus: google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT,
    timeout: function timeout(handler) {
        setTimeout(handler, 100);
    }
});

module.exports = {
    placesApiCaller,
    PlacesApiCaller
};
