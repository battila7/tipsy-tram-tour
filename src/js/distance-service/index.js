const walkingTravelMode = 'WALKING';

const DistanceService = {
    DistanceService({ service, successStatus }) {
        this.service = service;
        this.successStatus = successStatus;
    },
    distanceBetween(from, to) {
        const fromLatLng = this.toLatLng(from);
        const toLatLng = this.toLatLng(to);

        return new Promise((resolve, reject) => {
            this.service.getDistanceMatrix({
                origins: [fromLatLng],
                destinations: [toLatLng],
                travelMode: walkingTravelMode
            }, (response, status) => {
                if (status == this.successStatus) {
                    resolve(this.extractDistance(response));
                } else {
                    reject(status);
                }
            });
        });
    },
    toLatLng(location) {
        return new google.maps.LatLng(location.lat, location.lng);
    },
    extractDistance(response) {
        return response.rows[0].elements[0].distance.value;
    }
};

const distanceService = Object.create(DistanceService);
distanceService.DistanceService({
    service: new google.maps.DistanceMatrixService(),
    successStatus: 'OK'
});

module.exports = {
    distanceService,
    DistanceService
};
