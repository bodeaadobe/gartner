import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'intake-image';
      else div.className = 'intake-body';
    });
    ul.append(li);
  });
  //ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}


/* Append Form */
console.log("Intake Form");
let intakeForm = document.createElement("div");
intakeForm.setAttribute("class", "intake-container");
intakeForm.innerHTML =  '<form class="intake-form">'+
            '<div class="intake-heading form-heading">To get started, please fill the fields below. </div>'+
            
            '<div class="form-group">'+
              '<label for="fname" class="field-label">First Name*</label>'+
              '<input type="text" autocomplete="off" class="field-text form-val" name="fname" placeholder="Enter your first name" required />'+
            '</div>'+

            '<div class="form-group">'+
              '<label for="lname" class="field-label">Last Name*</label>'+
              '<input type="text" autocomplete="off" class="field-text form-val" name="lname" placeholder="Enter your last name" required />'+
            '</div>'+

            '<div class="form-group">'+
              '<label for="company" class="field-label">Company*</label>'+
              '<input type="text" autocomplete="off" class="field-text form-val" name="company" placeholder="Enter your company name" required />'+
            '</div>'+

            '<div class="form-group">'+
              '<label for="bemail" class="field-label">Business Email*</label>'+
              '<input type="email" autocomplete="off" class="field-text form-val" name="bemail" placeholder="Enter your mail address" required />'+
            '</div>'+

            '<div class="radio-group">'+
              '<label for="bemail" class="group-label">Select the campaign workstream you want to start with.</label>'+

              '<div class="radio-row">'+
                '<input type="radio" id="plan-and-create" name="intake-campaign" value="Plan and Create" checked="checked">'+
                '<label for="plan-and-create" class="field-label">'+
                  '<span>Plan and Create</span>'+
                  '<div>Leverage insights to shift your B2B go-to-market strategy, and go on to generate display ads with approved assets.</div>'+
                '</label>'+
              '</div>'+

              '<div class="radio-row">'+
                '<input type="radio" id="engage-and-measure" name="intake-campaign" value="Engage and Measure">'+
                '<label for="engage-and-measure" class="field-label">'+
                  '<span>Engage and Measure</span>'+
                  '<div>Target content across email and then identify key insights from your activities.</div>'+
                '</label>'+
              '</div>'+

            '</div>'+
            
            '<div class="checkbox-group">'+
              '<input type="checkbox" id="authorize" name="authorize" value="authorize" checked="checked">'+
              '<label for="authorize" class="field-label">By supplying my contact information, I authorize the <a href="#">Adobe family of companies</a> to contact me with <a href="#">personalized</a> communications about Adobe’s products and services.  See our <a href="#">Privacy Policy</a> for more details or to opt-out at any time</label>'+
            '</div>'+

            '<a class="form-button intake-btn">Submit</a>'+
          '</form>';

document.getElementsByClassName("intake")[0].getElementsByTagName("p")[0].parentElement.appendChild(intakeForm);

// clear localstorage on page load
localStorage.removeItem("jsonSummit");
localStorage.removeItem("video-played");


// Trigger form submit on button click
var submitBtn = document.getElementsByClassName("intake-btn")[0];

submitBtn.onclick = async function() {
  console.log("submit btn clicked");

  let fname = document.getElementsByName("fname")[0].value;
  let lname = document.getElementsByName("lname")[0].value;
  let company = document.getElementsByName("company")[0].value;
  let bemail = document.getElementsByName("bemail")[0].value;
  //let radioSelect = document.querySelector('input[name="intake-campaign"]:checked').value;

  if(fname == "" || lname == "" || company == "" || bemail == "") {
    var form = document.querySelector('form')
    form.reportValidity();
    return;
  } else {
    // creating json to be submitted on finish click
    let jsonSummit = {};
    jsonSummit.email = bemail;
    jsonSummit.fname = fname;
    jsonSummit.lname = lname;
    jsonSummit.companyname = company;
    jsonSummit["plan and create"] = false;
    jsonSummit["engage and measure"] = false;
    
    localStorage.setItem("jsonSummit", JSON.stringify(jsonSummit));
    console.log("jsonSummit: ", JSON.parse(localStorage.getItem("jsonSummit")));
    
    // Get call to submit intake form data
    let url = "https://hook.fusion.adobe.com/na86ylnnkhopr6bahppq1qkqswhp4xk6?email="+bemail+"&firstName="+fname+"&lastName="+lname+"&company="+company;
    handleAjaxCall(url, "GET");

  }
}

function handleAjaxCall(url, method){
  console.log("inside handleGetJson");
  fetch(url, {
    method: method,
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
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
  let radioSelect = document.querySelector('input[name="intake-campaign"]:checked').value;

  console.log("radioSelect: ", radioSelect);
  console.log("window.location.origin: ", window.location.origin);

  if(radioSelect == "Plan and Create") {
    window.location = window.location.origin+"/plan-create-opening";
  } else if(radioSelect == "Engage and Measure") {
    window.location = window.location.origin+"/engage-measure-opening";
  }
}