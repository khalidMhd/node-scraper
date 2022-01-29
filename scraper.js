const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.whatmobile.com.pk/Samsung_Mobiles_Prices');
    //   await page.screenshot({ path: 'example.png' });

    const title = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a.BiggerText')).map(data => data.innerText));

    const images = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.item > div > a > img')).map(data => data.src)
    )

    const div = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.item > div')).map(data => ({
            title: data.querySelector('h4.BiggerText').innerText.trim(),
            price: data.querySelector('span.PriceFont').innerText.trim(),
            img: data.querySelector('a > img').src
        }))
    )

    console.log('div:', div);
    // console.log('images:', images);
    // console.log('title:', title);

    await browser.close();
})();


