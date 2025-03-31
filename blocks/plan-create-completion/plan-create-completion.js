import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'plan-create-completion-image';
      else div.className = 'plan-create-completion-body';
    });
    ul.append(li);
  });
  //ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}




/* Append Form */
console.log("PCC Form");
let pccForm = document.createElement("div");
pccForm.setAttribute("class", "pcc-container");
pccForm.innerHTML =  '<form class="pcc-form">'+
            '<div class="pcc-heading form-heading">Continue the experience and work on the remaining tasks for the Bodea cross-sell campaign:</div>'+

            '<div class="btn-group btn-group-toggle" data-toggle="buttons">'+
              '<label class="btn radio-select active">'+ 
                '<input type="checkbox" name="pc-checkbox" autocomplete="off" value="Plan & Create" disabled="disabled" checked="checked" />'+
                '<span>Plan & Create</span>'+
              '</label>'+
              '<label class="btn radio-select clickable">'+
                '<input type="checkbox" name="em-checkbox" autocomplete="off" value="Engage & Measure" disabled="disabled" />'+
                '<span>Engage & Measure</span>'+
              '</label>'+
            '</div>'+

            '<div class="pcc-subheading form-subheading">Or click the finish button below to exit the experience.</div>'+

            '<a class="form-button pccbtn">Finish</a>'+
          '</form>';

document.getElementsByClassName("plan-create-completion")[0].getElementsByTagName("p")[0].parentElement.appendChild(pccForm);

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

// On click of clickable radio button
let boxClickable = document.getElementsByClassName("btn-group-toggle")[0].getElementsByClassName("clickable")[0];
boxClickable.onclick = async function() {
  console.log("boxClickable btn clicked");
  window.location = window.location.origin+"/engage-measure-opening";
}


// Trigger form submit on button click
let pccBTN = document.getElementsByClassName("pccbtn")[0];

pccBTN.onclick = async function() {
  console.log("pccBTN btn clicked");

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
  //let radioSelect = document.querySelector('input[name="pcc"]:checked').value;
  //console.log("radioSelect: ", radioSelect);
  console.log("window.location.origin: ", window.location.origin);
  window.location = window.location.origin;
}

/* Video on page load */
console.log("video on page load");
let vopl = document.createElement("div");
vopl.setAttribute("class", "vopl-container");
vopl.innerHTML =  '<div class="video-block">'+
      '<div class="video-header">'+
        '<a class="video-close">x</a>'+
          '<video controls="" name="media" muted>'+
            '<source src="../icons/Summit2025-Plan-Create.mp4" type="video/mp4">'+
          '</video>'+
      '</div>'+
  '</div>';


let videoPlayed = localStorage.getItem("video-played");
console.log("videoPlayed: ", videoPlayed);
document.getElementsByTagName("body")[0].appendChild(vopl);

if(videoPlayed == "true") {
  document.getElementsByClassName("vopl-container")[0].style.display="none";
} else {
  localStorage.setItem("video-played", "true");
}

// Close video on click
let closeVideo = document.getElementsByClassName("video-close")[0];
closeVideo.onclick = async function() {
  console.log("closeVideo btn clicked");
  document.getElementsByClassName("vopl-container")[0].style.display="none";
}