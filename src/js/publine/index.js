const { eventBus } = require('../event-bus');
const { pubRepository } = require('../pub-repository');

const PubLine = {
    PubLine({ eventBus, pubRepository }) {
        this.eventBus = eventBus;
        this.pubRepository = pubRepository;
    },
    init() {
        this.eventBus.addEventListener('data-loaded', () => this.populate(this.pubRepository.getAll()));
    },
    populate(pubs) {
        const pubIterator = pubs[Symbol.iterator]();
        
        for (content of document.querySelectorAll('.publine-content')) {
            const pub = pubIterator.next().value;

            content.querySelector('.vicinity').innerHTML = pub.vicinity;

            content.querySelector('.pub-rating > span').innerHTML = pub.rating;

            content.querySelector('.pub-rating > span').innerHTML = pub.rating;

            content.querySelector('.show-on-the-map').addEventListener('click', () => {
                const options = {
                    detail: {
                        location: pub.location
                    }
                };

                const event = new CustomEvent('show-on-the-map', options)

                this.eventBus.dispatchEvent(event);
            });

            content.querySelector('.pub-distance').innerHTML = `${pub.distanceFromStart.toLocaleString()} m`;
        }
    }
};

const pubLine = Object.create(PubLine);
pubLine.PubLine({ eventBus, pubRepository });

module.exports = {
    pubLine,
    PubLine
};
