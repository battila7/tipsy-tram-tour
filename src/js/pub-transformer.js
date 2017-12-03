module.exports = function pubTransformer(stored, response) {
    const result = Object.assign({}, stored);

    if (response) {
        result.location = response.geometry.location;

        result.rating = response.rating;

        result.vicinity = response.vicinity;
    }

    return result;
};
