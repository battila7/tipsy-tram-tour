const { eventBus } = require('./event-bus');
const { pubLine } = require('./publine');
const { pubMap } = require('./pubmap');
const run = require('./pub-loader-pipeline');

pubLine.init();

pubMap.init();

run({ useMockedData: true })
  .then(() => eventBus.dispatchEvent(new Event('data-loaded')))
  .catch(err => console.log(err));
