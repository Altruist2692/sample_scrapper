const setup = require('../starter-kit/setup');
const Database = require('database-js').Connection;

exports.run = async (browser) => {
  const page = await browser.newPage();
  await page.goto('https://www.gopopup.com/en/berlin-berliner-innenstadt/pop-up/xdzph/',
  );

  await Promise.all([
    page.waitForSelector('.place-header-bar-left'),
  ]);


  const title = await page.$eval('div.place-header-bar-left h1', element => element.textContent);
  console.log(title)

  const pricingValue = await page.$eval('div.place-header-bar-right span.preu', element => element.textContent);
  console.log('Pricing Value: ' + pricingValue)

  const spaceRaw = await page.$$eval('div#place-icons .container .box-icon-place', options => options.map((option) => {
    const res = {}
    if(option.firstChild.nodeName == 'IMG'){
      res["space_partial"] = option.innerText
    }
    if(option.firstChild.className == "icon icon-space"){
      res["space_size"] = option.innerText
    }
    if(option.firstChild.className == "icon icon-location"){
      res["address_area"] = option.innerText
    }
    return res
  }))
  // console.log("Res" +  res);
  for (var i = 0; i < spaceRaw.length; i++) {
    console.log(spaceRaw[i])
  }

  const rentByTime = await page.$$eval('div.preus ul li a', options => options.map((option) => {
    const res = {}
    res[option.textContent] = option.dataset.preu
    return res
  }))

  for (var i = 0; i < rentByTime.length; i++) {
    console.log(rentByTime[i])
  }

  const description = await page.$eval('div#espacio', element => element.textContent);
  console.log('description: ' + description)

  const amenitiesRaw = await page.$$eval('p.title_apartat', options => options.map((option) => {
    if(option.textContent == 'Amenities'){
      console.log(option.parentNode.parentNode.childNodes['2'].childNodes['0'].childNodes)
      const childs = option.parentNode.parentNode.childNodes['2'].childNodes['0'].childNodes
      const colArr = []
      for (var i = 0; i < childs.length; i++) {
        if(childs[i].className == 'col-md-4'){
          colArr.push(childs[i].childNodes)
        }
      }
      const cbSpan = []
      for (var i = 0; i < colArr.length; i++) {
        for (var key in colArr[i]) {
          const currentEle = colArr[i][key]
          if(currentEle.className == 'checkbox'){
            cbSpan.push(currentEle.innerText)
          }
        }
      }
      return cbSpan;
    }
  }));
  const amenities = amenitiesRaw.filter(function (el) { return el != null; }).flat();
  console.log(amenities);

  const spaceUsageRaw = await page.$$eval('p.title_apartat', options => options.map((option) => {
    if(option.textContent == 'Usage'){
      console.log(option.parentNode.parentNode.childNodes['2'].childNodes['0'].childNodes)
      const childs = option.parentNode.parentNode.childNodes['2'].childNodes['0'].childNodes
      const colArr = []
      for (var i = 0; i < childs.length; i++) {
        if(childs[i].className == 'col-md-4'){
          colArr.push(childs[i].childNodes)
        }
      }
      const cbSpan = []
      for (var i = 0; i < colArr.length; i++) {
        for (var key in colArr[i]) {
          const currentEle = colArr[i][key]
          if(currentEle.className == 'checkbox'){
            cbSpan.push(currentEle.innerText)
          }
        }
      }
      return cbSpan;
    }
  }));
  const spaceUsage = spaceUsageRaw.filter(function (el) { return el != null; }).flat();
  console.log(spaceUsage);

  const openingHoursRaw = await page.$$eval('p.title_apartat', options => options.map((option) => {
    if(option.textContent == 'Opening hours'){
      return option.nextElementSibling.innerText
    }
  }));
  const openingHours = openingHoursRaw.filter(function (el) { return el != null; }).flat();
  console.log("Opening Hours: " + openingHours);

  const specialConditionRaw = await page.$$eval('p.title_apartat', options => options.map((option) => {
    if(option.textContent == 'Special Conditions'){
      return option.nextElementSibling.innerText
    }
  }));
  const specialCondition = specialConditionRaw.filter(function (el) { return el != null; }).flat();
  console.log("Special Conditions: " + specialCondition);


  const minRentalRaw = await page.$$eval('p.title_apartat', options => options.map((option) => {
    if(option.textContent == 'Minimum reservation days'){
      return option.nextElementSibling.innerText
    }
  }));
  const minRental = minRentalRaw.filter(function (el) { return el != null; }).flat();
  console.log("Minimum reservation days: " + minRental);

  const latitude = await page.$eval('#place-map', (element) => element.dataset.lat);
  console.log("Latitude: " + latitude)

  const longitude = await page.$eval('#place-map', (element) => element.dataset.lng);
  console.log("Longitude: " + longitude)

  console.log("images : " + await page.evaluate(() => dynamicGal.map(option => option.src)))
  // console.log('ga variable problem', await page.evaluate(() => dynamicGal.toString()));

  await page.close();
  return 'done';
  //To setup AWS Lambda schedule - https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html
};
