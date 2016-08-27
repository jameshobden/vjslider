document.addEventListener('DOMContentLoaded', function() {
    console.log('kurwa', instanceOf (new VJSlider()));
    var slider = new VJSlider(document.querySelector('.carousel')),
        loopStarted = false,
        loop;
    console.log(VJSlider);

    document.querySelector('.js-prev').addEventListener('click', function(event) {
        event.preventDefault();
        slider.prev();
    });

    document.querySelector('.js-next').addEventListener('click', function(event) {
        event.preventDefault();
        slider.next();
    });

    document.querySelector('.js-start-loop').addEventListener('click', function(event) {
        event.preventDefault();
        if (!loopStarted) {
            slider.next();
            loop = setInterval(function() {
                slider.next();
            }, 1000);
            loopStarted = true;
        }
    });

    document.querySelector('.js-stop-loop').addEventListener('click', function(event) {
        event.preventDefault();
        if (loopStarted) {
            clearInterval(loop);
            loopStarted = false;
        }
    });
});