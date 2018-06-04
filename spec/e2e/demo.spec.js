describe('Demo page', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8363/demo');
    });

    test('vjslider general markup', async () => {
        await expect(page).toMatchElement('.vjslider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider');
        await expect(page).toMatchElement('.vjslider > .vjslider__slider > .vjslider__slide');
    });

    test('vjslider clones', async () => {
        await expect(page).toMatchElement('.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--blue.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--purple.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--pink.vjslider__clone');
        await expect(page).toMatchElement('.carousel__slide--green.vjslider__clone');
        await expect(page).not.toMatchElement('.carousel__slide--hidden.vjslider__clone');
    });
});
