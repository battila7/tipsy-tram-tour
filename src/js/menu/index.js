const { scrollToElement } = require('../util');

const Menu = {
    Menu() {
    },
    init() {
        [
            'places',
            'route'
        ].map(anchor => this.addScrollOnClick(anchor));
    },
    addScrollOnClick(anchor) {
        document.querySelector(`a[href='#${anchor}']`).addEventListener('click', function listener(event) {
            event.preventDefault();

            scrollToElement(document.querySelector(`#${anchor}`));
        });
    }
};

const menu = Object.create(Menu);
menu.Menu();

module.exports = {
    menu,
    Menu
};
