const walkingTravelMode = 'WALKING';

const DistanceCalculator = {
    DistanceCalculator({ service, successStatus }) {
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
                    resolve(response.rows[0]);
                } else {
                    reject(status);
                }
            });
        });
    },
    toLatLng(location) {
        return new google.maps.LatLng(location.lat, location.lng);
    }
};

const distanceCalculator = Object.create(DistanceCalculator);
distanceCalculator.DistanceCalculator({
    service: new google.maps.DistanceMatrixService(),
    successStatus: 'OK'
});

module.exports = {
    distanceCalculator,
    DistanceCalculator
};
