const MockPlacesService = {
    MockPlacesService(response, status) {
        this.response = response;
        this.status = status;
    },
    getDetails(placeId, callback) {
        console.log('Returning mocked Google Places API response');

        setTimeout(() => callback(this.response, this.status), 0);
    }
};

const mockPlacesService = Object.create(MockPlacesService);
mockPlacesService.MockPlacesService(require('./mock-places-service-response'), google.maps.places.PlacesServiceStatus.OK);

module.exports = {
    mockPlacesService,
    MockPlacesService
};
