const EventBus = {
    EventBus(eventTarget) {
        this.eventTarget = eventTarget;
    },
    addEventListener(...args) {
        return this.eventTarget.addEventListener(...args);
    },
    dispatchEvent(...args) {
        return this.eventTarget.dispatchEvent(...args);
    },
    removeEventListener(...args) {
        return this.eventTarget.removeEventListener(...args);
    }
};

const eventBus = Object.create(EventBus);
eventBus.EventBus(document.createElement('div'));

module.exports = {
    eventBus,
    EventBus
};
