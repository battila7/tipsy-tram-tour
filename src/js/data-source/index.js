const DataSource = {
    DataSource(loader) {
        this.loader = loader;
    },
    retrieve() {
        return this.loader();
    }
};

const dataSource = Object.create(DataSource);
dataSource.DataSource(() => Promise.resolve(require('./data')));

module.exports = {
    dataSource,
    DataSource
};
