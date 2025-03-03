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
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}


/*
var modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML =  '<div class="modal-content">'+
    '<span class="close">&times;</span>'+
    '<form class="card-request-form">'+
        '<div class="form-screen-1">'+
            '<h2 class="card-request-h2">How do we get in touch?</h2>'+
            '<label for="name" class="field-label">Full Name</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="name"/>'+
            '<label for="email" class="field-label">Email Address</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="email"/>'+
            '<label for="city" class="field-label">Select City</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="city"/>'+
            '<label for="pan" class="field-label">PAN Card Number</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="pan"/>'+
            '<a class="form-button continue-btn">CONTINUE</a>'+
        '</div>'+
        '<div class="form-screen-2">'+
            '<h2 class="card-request-h2">Almost done!</h2>'+
            '<label for="phone" class="field-label">Phone Number</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="phone"/>'+
            '<label for="dob" class="field-label">Date of Birth (dd/mm/yyyy)</label>'+
            '<input type="text" autocomplete="off" class="field-text formVal" name="dob"/>'+
            '<div class="checkbox-block">'+
            '<input type="checkbox" class="field-checkbox formVal" name="vehicle1" value="terms & condition">'+
            '<label for="dob" class="field-label">I agree to ICICI Bank <a href="#">Terms & Conditions</a> and <a href="#">Most Important Terms & Conditions</a></label>'+
            '</div>'+
            '<a class="back-btn">Back</a>'+
            '<a class="form-button submit-btn">SUBMIT</a>'+
        '</div>'+
        '<div class="form-screen-3">'+
            '<div class="card-request-msg">Your request for Platinum Card is successfull, we will get back to you soon!</div>'+
        '</div>'+
    '</form>'+
  '</div>';
document.body.appendChild(modal);

// Get the button that opens the modal
var btn = document.getElementById("apply-now");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

// Form Button/Events
var screen1 = document.getElementsByClassName("form-screen-1")[0];
var screen2 = document.getElementsByClassName("form-screen-2")[0];
var screen3 = document.getElementsByClassName("form-screen-3")[0];
var continueBtn = document.getElementsByClassName("continue-btn")[0];
var backBtn = document.getElementsByClassName("back-btn")[0];
var submitBtn = document.getElementsByClassName("submit-btn")[0];

continueBtn.onclick = function() {
    screen1.style.display = "none";
    screen2.style.display = "block";
}
backBtn.onclick = function() {
    screen1.style.display = "block";
    screen2.style.display = "none";
}
submitBtn.onclick = function() {
    screen1.style.display = "none";
    screen2.style.display = "none";
    screen3.style.display = "block";

    var elements = document.getElementsByClassName("formVal");
    var formData = new FormData(); 
    for(var i=0; i<elements.length; i++){formData.append(elements[i].name, elements[i].value);}
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            console.log("Post Call Response: ", xmlHttp.responseText);
        }
    }
    xmlHttp.open("post", "https://edgeaem.free.beeceptor.com/application"); 
    xmlHttp.send(formData); 
}


let searchBox = document.createElement("div");
searchBox.setAttribute("class", "searchBox");
searchBox.innerHTML = '<input type="text" placeholder="Got a question? Ask away here for instant answers from our website." class="searchbox" autocomplete="off">';
document.getElementsByClassName("assistant")[0].getElementsByTagName("h2")[0].parentElement.appendChild(searchBox);
document.getElementsByClassName("assistant")[0].getElementsByClassName("button")[0].setAttribute("target", "_blank");
*/


console.log("createForm");

let intakeForm = document.createElement("div");
intakeForm.setAttribute("class", "intake-container");
intakeForm.innerHTML =  '<form class="intake-form">'+
            '<div class="intake-heading form-heading">To get started, please fill the fields below. </div>'+
            
            '<div class="form-group">'+
              '<label for="fname" class="field-label">First Name</label>'+
              '<input type="text" autocomplete="off" class="field-text form-val" name="fname" placeholder="Enter your first name" />'+
            '</div>'+

            '<div class="form-group">'+
              '<label for="lname" class="field-label">Last Name</label>'+
              '<input type="text" autocomplete="off" class="field-text form-val" name="lname" placeholder="Enter your last name" />'+
            '</div>'+

            '<div class="form-group">'+
              '<label for="company" class="field-label">Company</label>'+
              '<input type="text" autocomplete="off" class="field-text form-val" name="company" placeholder="Enter your company name" />'+
            '</div>'+

            '<div class="form-group">'+
              '<label for="bemail" class="field-label">Business email</label>'+
              '<input type="text" autocomplete="off" class="field-text form-val" name="bemail" placeholder="Enter your mail address" />'+
            '</div>'+

            '<div class="radio-group">'+
              '<label for="bemail" class="group-label">Select the campaign workstream you want to engage with today</label>'+

              '<input type="radio" id="plan-and-create" name="intake-campaign" value="Plan and Create">'+
              '<label for="plan-and-create" class="field-label">'+
                '<span>Plan and Create</span>'+
                '<div>Leverage insights to shift your B2B go-to-market strategy, and go on to generate display ads with approved assets.</div>'+
              '</label>'+

              '<input type="radio" id="engage-and-measure" name="intake-campaign" value="Engage and Measure">'+
              '<label for="engage-and-measure" class="field-label">'+
                '<span>Engage and Measure</span>'+
                '<div>Target content across email and then identify key insights from your activities.</div>'+
              '</label>'+

            '</div>'+
            
            '<div class="checkbox-group">'+
              '<input type="checkbox" id="authorize" name="authorize" value="authorize">'+
              '<label for="authorize" class="field-label">By supplying my contact information, I authorize the <a href="#">Adobe family of companies</a> to contact me with <a href="#">personalized</a> communications about Adobe’s products and services.  See our <a href="#">Privacy Policy</a> for more details or to opt-out at any time</label>'+
            '</div>'+

            '<a class="form-button intake-btn">Submit</a>'+
          '</form>';

//document.getElementsByClassName("intake")[0].getElementsByClassName("intake-body")[0].getElementsByTagName("h3")[0].parentElement.appendChild(intakeForm);
document.getElementsByClassName("intake")[0].getElementsByTagName("h3")[0].parentElement.appendChild(intakeForm);
