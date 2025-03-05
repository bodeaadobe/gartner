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
  //ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
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
emoBtn.innerText =  'Task 3: Get started';
document.getElementsByClassName("engage-measure-opening")[0].getElementsByTagName("p")[0].parentElement.appendChild(emoBtn);

/* Radio button toggle */
let radioBtn = document.querySelectorAll(".radio-select");
radioBtn.forEach(element => {
  element.addEventListener('click', () => {
    element.parentElement.getElementsByClassName("active")[0].classList.remove("active");
    element.classList.add("active");

    let toggleBtnText = element.getElementsByTagName("span")[0].innerText;
    console.log("toggleBtnText: ", toggleBtnText);

    if(toggleBtnText == "Measure") {
      document.getElementsByClassName("engage-measure-opening")[0].getElementsByTagName("p")[0].innerText = "Now it’s time to analyze your results. You’ve been tasked with identifying key insights for the Bodea campaign. Use the Adobe Journey Optimizer Account Insights Dashboard to assess a comprehensive view of buying group and account metrics and evolve your B2B go-to-market strategy.";
      emoBtn.innerText = "Task 4: Get started";

      var sourceList = document.getElementsByClassName("engage-measure-opening")[0].querySelectorAll('picture source');
      sourceList.forEach((source)=> {
          source.setAttribute('srcset', "../../icons/measure-opening.jpeg");
      }); 
      document.getElementsByClassName("engage-measure-opening")[0].getElementsByTagName("img")[0].src = "../../icons/measure-opening.jpeg";
    } else if(toggleBtnText == "Engage") {
      document.getElementsByClassName("engage-measure-opening")[0].getElementsByTagName("p")[0].innerText = "You’re a demand marketer orchestrating lead-based activities in Adobe Marketo Engage to qualify buying groups and journeys using AI Assistant in Adobe Journey Optimizer B2B Edition. You’ve been tasked with pushing relevant content to target audiences for the Bodea cross-sell campaign. Use AI Assistant to assemble an email targeting Bodea finance stakeholders with TalentSync, and discover how fast and easy it is to deliver on-brand content to buying group members across channels.";
      emoBtn.innerText = "Task 3: Get started";

      var sourceList = document.getElementsByClassName("engage-measure-opening")[0].querySelectorAll('picture source');
      sourceList.forEach((source)=> {
          source.setAttribute('srcset', "../../icons/emo.png");
      }); 
      document.getElementsByClassName("engage-measure-opening")[0].getElementsByTagName("picture")[0].src = "../../icons/emo.png";
    }

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