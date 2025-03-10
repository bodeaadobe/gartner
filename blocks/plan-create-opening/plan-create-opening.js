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
 //ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
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
                '<input type="radio" name="pco" autocomplete="off" value="Plan" disabled="disabled" checked="checked" />'+
                '<span>Plan</span>'+
              '</label>'+
              '<label class="btn radio-select">'+
                '<input type="radio" name="pco" autocomplete="off" value="Create" disabled="disabled" />'+
                '<span>Create</span>'+
              '</label>'+
            '</div>'+
          '</form>';
document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("p")[0].parentElement.prepend(pco);

// Append button
let pcoBtn = document.createElement("a");
pcoBtn.setAttribute("class", "form-button pcobtn");
pcoBtn.innerText =  'Task 1: Get started';
document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("p")[0].parentElement.appendChild(pcoBtn);

/* 
//Radio button toggle
let radioBtn = document.querySelectorAll(".radio-select");
radioBtn.forEach(element => {
  element.addEventListener('click', () => {
    element.parentElement.getElementsByClassName("active")[0].classList.remove("active");
    element.classList.add("active");

    let toggleBtnText = element.getElementsByTagName("span")[0].innerText;
    console.log("toggleBtnText: ", toggleBtnText);

    if(toggleBtnText == "Create") {
      document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("p")[0].innerText = "You’re a performance marketer tasked with launching a display campaign to increase coverage for finance stakeholders. Use Adobe GenStudio for Performance Marketing to create ads from pre-approved assets in Adobe Express and Content Hub. Review for brand compliance in a matter of seconds and publish in record time.";
      pcoBTN.innerText = "Task 2: Get started";

      var sourceList = document.getElementsByClassName("plan-create-opening")[0].querySelectorAll('picture source');
      sourceList.forEach((source)=> {
          source.setAttribute('srcset', "../../icons/create-opening.jpeg");
      }); 
      document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("img")[0].src = "../../icons/create-opening.jpeg";
    } else if(toggleBtnText == "Plan") {
      document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("p")[0].innerText = "You're a demand marketer tasked with analyzing buying group completeness for TalentSync, the HR software you need to cross-sell to your existing IT customer base. Using Adobe Journey Optimizer B2B Edition, you will gather intelligent insights and assess stakeholder contact coverage for TalentSync to inform your campaign planning.";
      pcoBTN.innerText = "Task 1: Get started";

      var sourceList = document.getElementsByClassName("plan-create-opening")[0].querySelectorAll('picture source');
      sourceList.forEach((source)=> {
          source.setAttribute('srcset', "../../icons/pco.png");
      }); 
      document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("picture")[0].src = "../../icons/pco.png";
    }

  });
});
 */

// Trigger form submit on button click
let pcoBTN = document.getElementsByClassName("pcobtn")[0];

pcoBTN.onclick = async function() {
  console.log("pcoBTN btn clicked");
  redirectTo();
}

// Toogle & Redirect
function redirectTo() {
  let radioSelect = document.querySelector('input[name="pco"]:checked').value;
  console.log("radioSelect: ", radioSelect);

  if(radioSelect == "Plan") {
    // open link1 in new tab
    window.open("https://experience.adobe.com/#/@adobedemoamericas275/sname:ajob2b-summit25/journey-optimizer-b2b/buying-groups/3", '_blank').focus();
    // progress to next tab
    document.getElementsByClassName("btn-group-toggle")[0].getElementsByClassName("radio-select")[0].classList.remove("active");
    document.getElementsByClassName("btn-group-toggle")[0].getElementsByClassName("radio-select")[0].getElementsByTagName("input")[0].removeAttribute("checked");
    document.getElementsByClassName("btn-group-toggle")[0].getElementsByClassName("radio-select")[1].classList.add("active");
    document.getElementsByClassName("btn-group-toggle")[0].getElementsByClassName("radio-select")[1].getElementsByTagName("input")[0].setAttribute("checked", "checked");

    document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("p")[0].innerText = "You’re a performance marketer tasked with launching a display campaign to increase coverage for finance stakeholders. Use Adobe GenStudio for Performance Marketing to create ads from pre-approved assets in Adobe Express and Content Hub. Review for brand compliance in a matter of seconds and publish in record time.";
    pcoBTN.innerText = "Task 2: Get started";

    var sourceList = document.getElementsByClassName("plan-create-opening")[0].querySelectorAll('picture source');
    sourceList.forEach((source)=> {
        source.setAttribute('srcset', "../../icons/create-opening.jpeg");
    }); 
    document.getElementsByClassName("plan-create-opening")[0].getElementsByTagName("img")[0].src = "../../icons/create-opening.jpeg";
  } else if(radioSelect == "Create") {
    // Update jsonSummit on local storage
    let jsonToUpdate = JSON.parse(localStorage.getItem("jsonSummit"));
    jsonToUpdate["plan and create"] = true;
    localStorage.setItem("jsonSummit", JSON.stringify(jsonToUpdate));
    console.log("jsonSummit: ", JSON.parse(localStorage.getItem("jsonSummit")));

    // open link2 in new tab
    window.open("https://experience.adobe.com/#/@adobedemoamericas275/genstudio/create", '_blank').focus();
    
    // progress to next page
    if(jsonToUpdate["engage and measure"]) {
      window.location = window.location.origin+"/final-completion";
    } else {
      window.location = window.location.origin+"/plan-create-completion";
    }
  }
}