module.exports = function scrollToElement(element) {
    return new Promise(resolve => {
        const delta = document.documentElement.scrollHeight / 133;

        scrollTo(element.offsetTop);

        function scrollTo(to) {
            setTimeout(function() {
                const prev = document.documentElement.scrollTop;
                document.documentElement.scrollTop = document.documentElement.scrollTop + delta;
                if ((document.documentElement.scrollTop < to) && (prev != document.documentElement.scrollTop)) {
                    scrollTo(to);
                } else {
                    resolve();
                }
            }, 10);
        }
    });
};
