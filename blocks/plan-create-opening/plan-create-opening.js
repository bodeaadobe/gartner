import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'plan-create-opening-image';
      else div.className = 'plan-create-opening-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}


/* Append Form */
console.log("Plan & Create Form");
let pco = document.createElement("div");
pco.setAttribute("class", "pco-container");
pco.innerHTML =  '<form class="pco-form">'+

            '<div class="btn-group btn-group-toggle" data-toggle="buttons">'+
              '<label class="btn radio-select active">'+ 
                '<input type="radio" name="pco" autocomplete="off" value="Plan" checked />'+
                '<span>Plan</span>'+
              '</label>'+
              '<label class="btn radio-select">'+
                '<input type="radio" name="pco" autocomplete="off" value="Create" />'+
                '<span>Create</span>'+
              '</label>'+
            '</div>'+
          '</form>';
document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("p")[0].parentElement.prepend(pco);

// Append button
let pcoBtn = document.createElement("a");
pcoBtn.setAttribute("class", "form-button pcobtn");
pcoBtn.innerText =  'Get started';
document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("p")[0].parentElement.appendChild(pcoBtn);

/* Radio button toggle */
let radioBtn = document.querySelectorAll(".radio-select");
radioBtn.forEach(element => {
  element.addEventListener('click', () => {
    element.parentElement.getElementsByClassName("active")[0].classList.remove("active");
    element.classList.add("active");
  });
});

// Trigger form submit on button click
let pcoBTN = document.getElementsByClassName("pcobtn")[0];

pcoBTN.onclick = async function() {
  console.log("pcoBTN btn clicked");
  redirectTo();
}

// Redirect to next page
function redirectTo() {
  let radioSelect = document.querySelector('input[name="pco"]:checked').value;

  console.log("radioSelect: ", radioSelect);
  console.log("window.location.origin: ", window.location.origin);

  window.location = window.location.origin+"/plan-create-completion";
}