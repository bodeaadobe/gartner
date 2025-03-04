import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'engage-measure-opening-image';
      else div.className = 'engage-measure-opening-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}


/* Append Form */
console.log("Plan & Create Form");
let emo = document.createElement("div");
emo.setAttribute("class", "emo-container");
emo.innerHTML =  '<form class="emo-form">'+
            '<div class="btn-group btn-group-toggle" data-toggle="buttons">'+
              '<label class="btn radio-select active">'+ 
                '<input type="radio" name="emo" autocomplete="off" value="Engage" checked />'+
                '<span>Engage</span>'+
              '</label>'+
              '<label class="btn radio-select">'+
                '<input type="radio" name="emo" autocomplete="off" value="Measure" />'+
                '<span>Measure</span>'+
              '</label>'+
            '</div>'+
          '</form>';
document.getElementsByClassName("engage-measure-opening")[0].getElementsByTagName("p")[0].parentElement.prepend(emo);

// Append button
let emoBtn = document.createElement("a");
emoBtn.setAttribute("class", "form-button emobtn");
emoBtn.innerText =  'Get started';
document.getElementsByClassName("engage-measure-opening")[0].getElementsByTagName("p")[0].parentElement.appendChild(emoBtn);

/* Radio button toggle */
let radioBtn = document.querySelectorAll(".radio-select");
radioBtn.forEach(element => {
  element.addEventListener('click', () => {
    element.parentElement.getElementsByClassName("active")[0].classList.remove("active");
    element.classList.add("active");
  });
});

// Trigger form submit on button click
let emoBTN = document.getElementsByClassName("emobtn")[0];

emoBTN.onclick = async function() {
  console.log("emoBTN btn clicked");
  redirectTo();
}

// Redirect to next page
function redirectTo() {
  let radioSelect = document.querySelector('input[name="emo"]:checked').value;

  console.log("radioSelect: ", radioSelect);
  console.log("window.location.origin: ", window.location.origin);

  window.location = window.location.origin+"/engage-measure-completion";
}