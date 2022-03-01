//------------ event handler --------------------


const searchBtn = () => {
  /* ----------------------
          Spinner show
   -------------------------*/

  document.getElementById('spinner-add').style.display = "block";


  /*-----------------------------
   get  searching value
   ---------------------------*/

  document.getElementById('spinner-add').style.display = "block";
  let inputFiled = document.getElementById('input-filed');
  let searchButtonVlue = inputFiled.value;
  
  inputFiled.value = '';

  /*-----------------------------------
adjust searching value with API 
------------------------------------*/
  const makeRequest = async () => {

    const url = fetch(`https://openapi.programming-hero.com/api/phones?search=${searchButtonVlue}`);
    if(!url.ok){
      console.log(new Error(url))
    }
    const data = await (await url).json();
    return data;
  }
  const getData = ()=>{
  makeRequest()
    .then(allData => displayData(allData.data))
    .catch(err => console.log(err));
  }
    getData()

}
/*---- ----------------------
          content post  display start
------------------------------*/

const displayData = (phones) => {

  const phonesCards = document.getElementById('phone-cards');
  phonesCards.textContent = "";

  document.getElementById('spinner-add').style.display = "none";
  
  
  // ----------------only 20 products show show display---------------------

  for (let i = 0; i <= phones.length; i++)
  

    if (i <= 19) {
     
      let phone = phones[i]

      const createADiv = document.createElement('div');
      createADiv.classList.add('col');



      createADiv.innerHTML = ` <div class="card h-100">
     <img src="${phone.image}" class="card-img-top h-75 w-75 ps-5 ms-3" alt="...">
     <div class="card-body">
     <h3  class="card-title">${phone.phone_name}</h3>
     <h5 style="color:grey; font-style: italic;">Brand: ${phone.brand}</h5>
       <span>Rating <img style="width: 18px;" src="/images/star.png" alt="">
       <img style="width: 15px;" src="/images/star.png" alt="">
       <img style="width: 15px;" src="/images/star.png" alt="">
       <img style="width: 15px;" src="/images/star.png" alt="">
       <img style="width: 15px;" src="/images/star1.png" alt="">
       </span> 
       
       
       
      <span  class="ps-5">  <button onclick="detailsBtn('${phone.slug}')" class="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Details</button>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
           <div class="offcanvas-header">
                 <h2 class="fw-bold" id="offcanvasRightLabel">${phone.phone_name}</h2>
     <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
 </div>
 <div id="details-info" class="offcanvas-body">
 
</div>
</div>
 </span>
</div>
     </div>`;
      phonesCards.appendChild(createADiv);
    }







}

/*---- ----------------------
              content post  display end
    ------------------------------*/


// -----------------more details part start----------------- 


const detailsBtn = (details) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(Response => Response.json())
    .then(Details => displayDetails(Details.data))
}


const displayDetails = (detail) => {

  const detailInfo = document.getElementById('details-info');
  detailInfo.textContent = '';

  const createDiv = document.createElement('div');
  createDiv.innerHTML = `<div class="row row-cols-1 row-cols-md-1 g-4">
<div class="col">
  <div class="card border-0">
    <img src="${detail.image}" class="card-img-top w-75 h-75 ms-3 ps-5" alt="..."> 
    <div class="card-body">
    <h5 style=" font-style: italic;">Brand: ${detail.brand}</h5>
    <h6 style=" font-style: italic;">${detail.releaseDate}</h6>
      
    </div>
  </div>
  <table class="table caption-top">
        
        <thead>
          <tr>
            <th scope="col">specification</th>
            <th scope="col"></th>
         </tr>
        </thead>
        <tbody id ="sensors-id">
          <tr>
            <th scope="row">RAM</th>
            <td>${detail.mainFeatures.memory}</td>
        </tr>
          <tr>
            <th scope="row">Storage</th>
            <td>${detail.mainFeatures.storage}</td>
          </tr>
          <tr>
            <th scope="row">Display</th>
            <td>${detail.mainFeatures.displaySize}</td>
           </tr>
          <tr>
            <th scope="row">others</th>
            <td>Bluetooth: ${detail.others.Bluetooth} ${detail.others.USB} WLAN: ${detail.others.WLAN} GPS: ${detail.others.GPS} NFC:${detail.others.NFC} ${detail.others.Bluetooth} </td>
           </tr>
           <tr >
          
           </tr>
        </tbody>
      </table>
  </div>`;
  detailInfo.appendChild(createDiv);

  //------------------  SENSORS DATA LOAD DISPLAY START --------------------

  const getSensors = detail.mainFeatures.sensors;
  const getSensorsDisplay = document.getElementById('sensors-id');
  const createATr = document.createElement('tr');
  createATr.innerHTML = `<th>Sensors</th>`;
  getSensorsDisplay.appendChild(createATr);


  getSensors.forEach(sensors => {
    const createATd = document.createElement('td');
    createATd.innerHTML = `<td><p>"${sensors}"</p></td>`;
    getSensorsDisplay.appendChild(createATd);


  })
}

// -----------------more details part end----------------- 