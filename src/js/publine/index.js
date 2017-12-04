module.exports = function populate(pubs) {
    const pubIterator = pubs[Symbol.iterator]();
    
    for (content of document.querySelectorAll('.publine-content')) {
        const pub = pubIterator.next().value;

        content.querySelector('.vicinity').innerHTML = pub.vicinity;

        content.querySelector('.pub-rating > span').innerHTML = pub.rating;

        content.querySelector('.pub-rating > span').innerHTML = pub.rating;

        content.querySelector('.show-on-the-map').addEventListener('click', function listener() {
            console.log(`Take me to ${pub.name}!`);
        });

        content.querySelector('.pub-distance').innerHTML = `${pub.distanceFromStart.toLocaleString()} m`;
    }
};
