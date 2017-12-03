module.exports = function populate(pubs) {
    const pubIterator = pubs[Symbol.iterator]();
    for (content of document.querySelectorAll('.publine-content')) {
        const pub = pubIterator.next().value;

        console.log(pub);

        content.querySelector('.vicinity').innerHTML = pub.vicinity;

        content.querySelector('.pub-rating > span').innerHTML = pub.rating;

        content.querySelector('.pub-rating > span').innerHTML = pub.rating;

        content.querySelector('.show-on-the-map').addEventListener('click', function listener() {
            console.log(`Take me to ${pub.name}!`);
        });
    }
};
