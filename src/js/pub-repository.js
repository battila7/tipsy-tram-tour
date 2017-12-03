const PubRepository = {
    PubRepository() {
        this.data = [];
    },
    add(pub) {
        this.data.push(pub);
    },
    getAll() {
        return [].concat(this.data);
    }
};

const pubRepository = Object.create(PubRepository);
pubRepository.PubRepository();

module.exports = {
    pubRepository,
    PubRepository
};
