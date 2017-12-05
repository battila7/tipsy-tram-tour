const { eventBus } = require('../event-bus');

const BeerCounter = {
    BeerCounter({ eventBus, decButton, incButton }) {
        this.beerCount = 1;
        this.eventBus = eventBus;
        this.decButton = decButton;
        this.beerElement = document.querySelector('.beer-counter-beer').parentNode.cloneNode(true);
        decButton.addEventListener('click', () => {
            this.changeCount(-1);
        })
        incButton.addEventListener('click', () => {
            this.changeCount(1);
        });
    },
    changeCount(delta) {
        this.beerCount = Math.max(1, this.beerCount + delta);

        const options = {
            detail: {
                count: this.beerCount
            }
        };

        this.render();

        const event = new CustomEvent('beer-count-changed', options);

        this.eventBus.dispatchEvent(event);
    },
    render() {
        document.querySelectorAll('.beer-counter-beer').forEach(element => element.parentElement.remove());

        for (let i = 0; i < this.beerCount; ++i) {
            this.decButton.parentElement.insertAdjacentElement('afterend', this.beerElement.cloneNode(true));
        }
    }
}

const beerCounter = Object.create(BeerCounter);
beerCounter.BeerCounter({
    eventBus,
    decButton: document.querySelector('.beer-counter-decrease'),
    incButton: document.querySelector('.beer-counter-increase')
});

module.exports = {
    beerCounter,
    BeerCounter
};
