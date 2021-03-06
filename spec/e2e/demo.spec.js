describe('Demo page', () => {

    let slide1, slide2, slide3;

    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo');
    });

    test('vjslider general markup', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slide');
    });

    test('it should get handles to slides', async () => {
        slide1 = await page.$('.vjslider__slide[data-id="1"]');
        slide2 = await page.$('.vjslider__slide[data-id="2"]');
        slide3 = await page.$('.vjslider__slide[data-id="3"]');
        expect(slide1).not.toBeNull();
        expect(slide2).not.toBeNull();
        expect(slide3).not.toBeNull();
    });

    test('it should not create any slide clones', async () => {
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(5);
    });

    test('sliding forward', async () => {
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(false);
        page.click('.js-next');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('sliding forward again', async () => {
        page.click('.js-next');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('sliding backward', async () => {
        page.click('.js-prev');
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('swiping left with to small movement', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(250, 300);
        await page.mouse.up();
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('swiping left', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(100, 300);
        await page.mouse.up();
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('swiping right with to small movement', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(350, 300);
        await page.mouse.up();
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(false);
        expect(await slide3.isIntersectingViewport()).toBe(true);
    });

    test('swiping right', async () => {
        await page.mouse.move(300, 300);
        await page.mouse.down();
        await page.mouse.move(500, 300);
        await page.mouse.up();
        await new Promise(resolve => setTimeout(resolve, 400));
        expect(await slide1.isIntersectingViewport()).toBe(false);
        expect(await slide2.isIntersectingViewport()).toBe(true);
        expect(await slide3.isIntersectingViewport()).toBe(false);
    });

    test('reloading', async () => {
        await page.click('.js-reload');
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slide');
        expect(await page.$$eval('.vjslider__slide', elements => elements.length)).toBe(6);
        expect(await slide1.isIntersectingViewport()).toBe(true);
        expect(await slide2.isIntersectingViewport()).toBe(true);
    });

    test('destroying vjslider', async () => {
        await page.click('.js-destroy');
        await expect(page).not.toMatchElement('.vjslider');
        await expect(page).toMatchElement('.carousel');
        await expect(page).not.toMatchElement('.vjslider__slide');
        await expect(page).not.toMatchElement('.vjslider__slide--no-animate');
        await expect(page).toMatchElement('.carousel__slide');
        await expect(page).not.toMatchElement('.carousel__slide[style*=""]');
    });
});
