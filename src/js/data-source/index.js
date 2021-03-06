const DataSource = {
    DataSource(loader) {
        this.loader = loader;
    },
    retrieve() {
        return this.loader();
    }
};

const dataSource = Object.create(DataSource);
dataSource.DataSource(() => Promise.resolve(require('../static-data').pubs));

module.exports = {
    dataSource,
    DataSource
};
