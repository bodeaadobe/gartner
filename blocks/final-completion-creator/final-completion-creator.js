import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'final-completion-creator-image';
      else div.className = 'final-completion-creator-body';
    });
    ul.append(li);
  });
  //ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}




/* Append Form */
console.log("fcc Form");
let fccForm = document.createElement("div");
fccForm.setAttribute("class", "fcc-container");
fccForm.innerHTML =  '<form class="fcc-form">'+

            '<div class="btn-group btn-group-toggle" data-toggle="buttons">'+
              '<label class="btn radio-select active">'+ 
                '<input type="checkbox" name="pc-checkbox" autocomplete="off" value="Plan & Create" disabled="disabled" checked="checked" />'+
                '<span>Plan & Create</span>'+
              '</label>'+
              '<label class="btn radio-select disabled">'+
                '<input type="checkbox" name="em-checkbox" autocomplete="off" value="Engage & Measure" disabled="disabled" checked="checked" />'+
                '<span>Engage & Measure</span>'+
              '</label>'+
            '</div>'+

            '<a class="form-button neacbtn">Now Explore as a Creator</a>'+
            '<a class="form-button mtnwbtn">Move to the Next Workstream</a>'+
          '</form>';

document.getElementsByClassName("final-completion-creator")[0].getElementsByTagName("p")[0].parentElement.appendChild(fccForm);

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


// Trigger form submit on neacbtn click
let neacBTN = document.getElementsByClassName("neacbtn")[0];

neacBTN.onclick = async function() {
  console.log("neacBTN btn clicked");

  // open express link in new tab
  window.open("https://www.adobe.com/express/", '_blank').focus();

  // Get call to submit intake form data
  let url = "https://440115-191salmonscallop.adobeioruntime.net/api/v1/web/apoproxy/summit25B2B";
  let jsonData = localStorage.getItem("jsonSummit");
  handleAjaxCall(url, "POST", jsonData);
}

// Trigger form submit on mtnwbtn click
let mtnwBTN = document.getElementsByClassName("mtnwbtn")[0];

mtnwBTN.onclick = async function() {
  console.log("mtnwBTN btn clicked");

  // open genstudio link in new tab
  window.open("https://business.adobe.com/products/genstudio-for-performance-marketing.html", '_blank').focus();

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
  //let radioSelect = document.querySelector('input[name="fcc"]:checked').value;
  //console.log("radioSelect: ", radioSelect);
  console.log("window.location.origin: ", window.location.origin);
  window.location = window.location.origin;
}
