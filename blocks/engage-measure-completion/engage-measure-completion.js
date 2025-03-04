import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'engage-measure-completion-image';
      else div.className = 'engage-measure-completion-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}




/* Append Form */
console.log("EMC Form");
let emcForm = document.createElement("div");
emcForm.setAttribute("class", "emc-container");
emcForm.innerHTML =  '<form class="emc-form">'+
            '<div class="emc-heading form-heading">Continue the experience and work on the remaining tasks for the Bodea cross-sell campaign:</div>'+

            '<div class="btn-group btn-group-toggle" data-toggle="buttons">'+
              '<label class="btn radio-select">'+ 
                '<input type="radio" name="emc" autocomplete="off" value="Plan & Create" disabled />'+
                '<span>Plan & Create</span>'+
              '</label>'+
              '<label class="btn radio-select active">'+
                '<input type="radio" name="emc" autocomplete="off" value="Engage & Measure" checked />'+
                '<span>Engage & Measure</span>'+
              '</label>'+
            '</div>'+

            '<div class="emc-subheading form-subheading">Or click the finish button below to exit the experience.</div>'+
            '<div class="emc-subheading form-subheading">If you complete both tasks, you’ll receive an exclusive giveaway.</div>'+

            '<a class="form-button emcbtn">Finish</a>'+
          '</form>';

document.getElementsByClassName("engage-measure-completion")[0].getElementsByTagName("p")[0].parentElement.appendChild(emcForm);


// Trigger form submit on button click
let emcBTN = document.getElementsByClassName("emcbtn")[0];

emcBTN.onclick = async function() {
  console.log("emcBTN btn clicked");
  redirectTo();
}

// Redirect to next page
function redirectTo() {
  let radioSelect = document.querySelector('input[name="emc"]:checked').value;

  alert("Thank You!");
  console.log("radioSelect: ", radioSelect);
  console.log("window.location.origin: ", window.location.origin);

  window.location = window.location.origin;
}