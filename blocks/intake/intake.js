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


/* Append Form */
console.log("Intake Form");
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

document.getElementsByClassName("intake")[0].getElementsByTagName("p")[0].parentElement.appendChild(intakeForm);
