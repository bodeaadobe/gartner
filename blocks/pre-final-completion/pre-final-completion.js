import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'pre-final-completion-image';
      else div.className = 'pre-final-completion-body';
    });
    ul.append(li);
  });
  //ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}




/* Append Form */
console.log("pfc Form");
let pfcForm = document.createElement("div");
pfcForm.setAttribute("class", "pfc-container");
pfcForm.innerHTML =  '<form class="pfc-form">'+

            '<div class="btn-group btn-group-toggle" data-toggle="buttons">'+
              '<label class="btn radio-select clickable">'+ 
                '<input type="checkbox" name="pc-checkbox" autocomplete="off" value="Plan & Create" />'+
                '<span>Plan & Create</span>'+
              '</label>'+
              '<label class="btn radio-select clickable">'+
                '<input type="checkbox" name="em-checkbox" autocomplete="off" value="Engage & Measure" />'+
                '<span>Engage & Measure</span>'+
              '</label>'+
            '</div>'+
            '<div class="form-button-container">'+ 
              '<a class="form-button explorebtn">Explore as a Creator</a>'+
              '<a class="form-button finishbtn">Finish</a>'+
            '</div>'+
          '</form>';

document.getElementsByClassName("pre-final-completion")[0].getElementsByTagName("p")[0].parentElement.appendChild(pfcForm);

/* 
//Radio button toggle 
let radioBtn = document.querySelectorAll(".radio-select");
radioBtn.forEach(element => {
  element.addEventListener('click', () => {
    element.parentElement.getElementsByClassName("active")[0].classList.remove("active");
    element.classList.add("active");

  })
});
*/


let enableCheck = JSON.parse(localStorage.getItem("jsonSummit"));
console.log("enableCheck: ", enableCheck);
// check which one is done (enable checkbox)
if(enableCheck) {
  
  if(enableCheck["plan and create"] && enableCheck["engage and measure"]) {
    window.location = window.location.origin+"/final-completion";
  } else if(enableCheck["plan and create"]) {
    document.getElementsByName('pc-checkbox')[0].setAttribute('disabled', "disabled");
    document.getElementsByName('pc-checkbox')[0].setAttribute('checked', "checked");
    document.getElementsByName('pc-checkbox')[0].parentElement.classList.remove("clickable");
    document.getElementsByName('pc-checkbox')[0].parentElement.classList.add("active");
  } else if(enableCheck["engage and measure"]) {
    document.getElementsByName('em-checkbox')[0].setAttribute('disabled', "disabled");
    document.getElementsByName('em-checkbox')[0].setAttribute('checked', "checked");
    document.getElementsByName('em-checkbox')[0].parentElement.classList.remove("clickable");
    document.getElementsByName('em-checkbox')[0].parentElement.classList.add("active");
  }


  if(enableCheck["role"] == "marketer") {
    document.getElementsByClassName("explorebtn")[0].textContent = "Explore as a Creator";
  } else if(enableCheck["role"] == "creator") {
    document.getElementsByClassName("explorebtn")[0].textContent = "Explore as a Marketer";
  }

}


// On click of clickable radio button
let boxClickables = document.getElementsByClassName("clickable");
for(let i=0; i<boxClickables.length; i++) {
  boxClickables[i].onclick = async function() {
    console.log("boxClickable btn clicked");
    
    let thisCheckboxVal = this.querySelector('input').value;
    if(thisCheckboxVal == "Plan & Create") {
      window.location = window.location.origin+"/plan-create-opening";
    } else if(thisCheckboxVal == "Engage & Measure") {
      window.location = window.location.origin+"/engage-measure-opening";
    }
  }
}





// Change role on explore button click
let exploreBTN = document.getElementsByClassName("explorebtn")[0];
exploreBTN.onclick = async function() {
  console.log("exploreBTN btn clicked");

  let jsonToUpdate = JSON.parse(localStorage.getItem("jsonSummit"));
  // check which one is done (enable checkbox)
  if(jsonToUpdate) { 
    if(jsonToUpdate["role"] == "marketer") {
      document.getElementsByClassName("explorebtn")[0].textContent = "Explore as a Marketer";
      jsonToUpdate["role"] = "creator";
      localStorage.setItem("jsonSummit", JSON.stringify(jsonToUpdate));
      window.open("https://new.express.adobe.com/brands/urn:aaid:sc:US:4a5f6329-5a5f-571c-87f4-f173aceeb975", '_blank').focus();
    } else if(jsonToUpdate["role"] == "creator") {
      document.getElementsByClassName("explorebtn")[0].textContent = "Explore as a Creator";
      jsonToUpdate["role"] = "marketer";
      localStorage.setItem("jsonSummit", JSON.stringify(jsonToUpdate));
      window.open("https://experience.adobe.com/#/@acxpevangelist/genstudio/", '_blank').focus();
    }
  }
}


// Trigger form submit on finishbtn click
let finishBTN = document.getElementsByClassName("finishbtn")[0];
finishBTN.onclick = async function() {
  console.log("finishBTN btn clicked");
  // Get call to submit intake form data
  let url = "https://440115-191salmonscallop.adobeioruntime.net/api/v1/web/apoproxy/summit25B2B";
  let jsonData = localStorage.getItem("jsonSummit");
  handleAjaxCall(url, "POST", jsonData);
}


function handleAjaxCall(url, method, jsonData){
  console.log("inside handleGetJson");
  fetch(url, {
    method: method,
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: jsonData,
    mode: 'no-cors' // Add no-cors mode to avoid preflight
  })
  //.then((response) => response.json())
  .then((response) => response)
  .then((body) => {
    console.log("Call Response: ", body);
    redirectTo();
  })
  .catch(err => {
    console.log("There was error in ajax call " + err);
    redirectTo();
  });
}

// Redirect to next page
function redirectTo() {
  //let radioSelect = document.querySelector('input[name="pfc"]:checked').value;
  //console.log("radioSelect: ", radioSelect);
  console.log("window.location.origin: ", window.location.origin);
  window.location = window.location.origin;
}


/* Video on page load */
console.log("video on page load");
let pvopl = document.createElement("div");
pvopl.setAttribute("class", "pvopl-container");
pvopl.innerHTML =  '<div class="video-block">'+
      '<div class="video-header">'+
        '<a class="video-close">x</a>'+
          '<video controls="" name="media" muted>'+
            '<source src="../icons/Gartner-Plan-Create.mp4" type="video/mp4">'+
          '</video>'+
      '</div>'+
  '</div>';


let videoPlayed = localStorage.getItem("video-played");
console.log("videoPlayed: ", videoPlayed);
document.getElementsByTagName("body")[0].appendChild(pvopl);

if(videoPlayed == "true" || enableCheck["role"] == "creator") {
  document.getElementsByClassName("pvopl-container")[0].style.display="none";
} else {
  localStorage.setItem("video-played", "true");
}

// Close video on click
let closeVideo = document.getElementsByClassName("video-close")[0];
closeVideo.onclick = async function() {
  console.log("closeVideo btn clicked");
  document.getElementsByClassName("pvopl-container")[0].style.display="none";
}