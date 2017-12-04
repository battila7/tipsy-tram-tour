const PubRepository = {
    PubRepository() {
        this.data = [];
        this.byLocation = new Map();
    },
    add(pub) {
        this.data.push(pub);

        this.byLocation.set(pub.location, pub);
    },
    getAll() {
        return [].concat(this.data);
    },
    getByLocation(location) {
        return this.byLocation.get(location);
    }
};

const pubRepository = Object.create(PubRepository);
pubRepository.PubRepository();

module.exports = {
    pubRepository,
    PubRepository
};
