import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'emailer-image';
      else div.className = 'emailer-body';
    });
    ul.append(li);
  });
 //ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}


/* Append Form */
console.log("Emailer Block");
let emailerBlock = document.createElement("div");
emailerBlock.setAttribute("class", "emailer-container");
emailerBlock.innerHTML =  '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center">'+
'<tr>'+
  '<td >'+
    '<table class="bgBody" width="660" border="0" cellspacing="0" cellpadding="0" align="center">'+
    '<tr>'+
      '<td valign="top" class="movableContentContainer">'+
        
      '<div class="movableContent">'+
        '<table width="660" border="0" cellspacing="0" cellpadding="0"  align="center">'+
          '<tr>'+
            '<td bgcolor="#eb1100">'+
              '<table width="660" border="0" cellspacing="0" cellpadding="0"  align="center">'+
                '<tr><td height="15" colspan="4"></td></tr>'+
                '<tr>'+
                  '<td width="53"></td>'+

                  '<td align="left" valign="middle" >'+
                     '<div class="contentEditableContainer contentTextEditable" style="display:inline-block;padding:5px 0;">'+
                      '<div class="contentEditable" >'+
                        '<img src="../../icons/summit-emailer-logo.png" alt="Compagnie logo" data-default="placeholder" height="40px">'+
                      '</div>'+
                    '</div>'+
                  '</td>'+

                  '<td align="right" valign="middle" >'+
                    '<div class="contentEditableContainer contentTextEditable" style="display:inline-block;">'+
                      '<div class="contentEditable header-pre">'+
                        '<div>March 17</div>'+
                        '<div>Preconference</div>'+
                      '</div>'+
                      '<div class="contentEditable header-date">'+
                        '<div>March 18-20, 2025</div>'+
                        '<div>Las Vegas and online</div>'+
                      '</div>'+
                    '</div>'+
                  '</td>'+

                  '<td width="60"></td>'+
                '</tr>'+
                '<tr><td height="15" colspan="4"></td></tr>'+
              '</table>'+
            '</td>'+
            '</tr>'+
           '</table>'+
          '</div>'+

          '<div class="movableContent">'+
          '<table width="660" border="0" cellspacing="0" cellpadding="0"  align="center">'+
            '<tr>'+
            '<td>'+
              '<div class="contentEditableContainer contentImageEditable">'+
              '<div class="contentEditable" >'+
                '<img src="../../icons/emailer-banner.png" alt="Featured images" data-default="placeholder" data-max-width="660" width="660">'+
              '</div>'+
              '</div>'+
            '</td>'+
            '</tr>'+
          '</table>'+
          '</div>'+

          '<div class="movableContent bodyBlock">'+
          '<table width="660" border="0" cellspacing="0" cellpadding="0"  align="center">'+
            '<tr>'+
            '<td class="bgItem">'+
              '<table width="660" border="0" cellspacing="0" cellpadding="0"  align="center">'+
              '<tr><td height="15" colspan="4"></td></tr>'+
              '<tr>'+
                '<td width="53"></td>'+
                '<td>'+
                '<div class="contentEditableContainer contentTextEditable">'+
                  '<div class="contentEditable" >'+
                  '<p class="articleTop">Congratulations on becoming a modern B2B marketer!</p>'+
                  '</div>'+
                '</div>'+
                '</td>'+
                '<td width="60"></td>'+
              '</tr>'+
              '<tr><td height="15" colspan="4"></td></tr>'+

              '<tr>'+
                '<td width="53"></td>'+
                '<td>'+
                '<div class="contentEditableContainer contentTextEditable">'+
                  '<div class="contentEditable" >'+
                  '<p class="articleText">With Adobe, you can reimagine B2B marketing with intelligent account orchestration and content-led experiences. What you just accomplished in a few minutes typically takes organizations more than a month and positions you for unprecedented collaboration with sales.</p>'+
                  '</div>'+
                  '<div class="contentEditable" >'+
                  '<p class="articleText italicText">Enjoy your exclusive access to Omdia\'s analyst report on Adobe\'s transformation of B2B CX marks a golden opportunity for unified CX orchestration.</p>'+
                  '</div>'+
                '</div>'+
                '</td>'+
                '<td width="60"></td>'+
              '</tr>'+
              '<tr><td height="15" colspan="4"></td></tr>'+

              '<tr>'+
                '<td width="53"></td>'+
                '<td>'+
                '<div class="contentEditableContainer contentTextEditable">'+
                  '<div class="contentEditable" >'+
                  '<a href="https://business.adobe.com/products/journey-optimizer-b2b-edition.html#watch-overview" target="_blank" class="right-bottom-btn">Read now</a>'+
                  '</div>'+
                '</div>'+
                '</td>'+
                '<td width="60"></td>'+
              '</tr>'+
              '<tr><td height="15" colspan="4"></td></tr>'+

              '<tr>'+
                '<td width="53"></td>'+
                '<td>'+
                '<div class="contentEditableContainer contentTextEditable">'+
                  '<div class="contentEditable feedbackBlock">We\'d love to hear your feedback.<a href="https://survey.adobe.com/jfe/form/SV_bjivoBvEEhz5R78" target="_blank" class="feedbackText">Share your thoughts </a>+on this experience.</div>'+
                '</div>'+
                '</td>'+
                '<td width="60"></td>'+
              '</tr>'+
              '<tr><td height="15" colspan="4"></td></tr>'+

              '</table>'+
            '</td>'+
            '</tr>'+
           '</table>'+
          '</div>'+

          '<div class="movableContent footerBlock">'+
          '<table width="660" border="0" cellspacing="0" cellpadding="0"  align="center">'+
            '<tr>'+
            '<td>'+
              '<table width="660" border="0" cellspacing="0" cellpadding="0"  align="center">'+
              '<tr><td height="15" colspan="4"></td></tr>'+
              '<tr>'+
                '<td width="53"></td>'+
                '<td>'+
                '<div class="contentEditableContainer contentTextEditable">'+
                  '<div class="contentEditable" >'+
                  '<img src="../../icons/adobe-red-logo.png" alt="Featured images" data-default="placeholder">'+
                  '</div>'+
                  '<div class="contentEditable">'+
                  '<p>Any reference to Bodea, its logo, and/or its products or services is for demonstration purposes only and is not intended to refer to any actual organization, products, or services.</p>'+
                  '<p>Your content is available for 30 days. Thirty-one days after submission, all submitted and generated images associated with your participation in the GenStudio Activation will have been permanently deleted from our systems.</p>'+
                  '<p>Adobe, the Adobe logo, Creative Cloud, the Creative Cloud logo, and Document Cloud are either registered trademarks or trademarks of Adobe in the United States and/or other countries.</p>'+
                  '<p>This is not a comprehensive list of Adobe trademarks. For a full list, refer to the Adobe Trademark Guidelines. All other trademarks are the property of their respective owners.</p>'+
                  '<p>Adobe, 345 Park Avenue, San Jose, CA 95110 USA.</p>'+
                  '</div>'+
                '</div>'+
                '</td>'+
                '<td width="60"></td>'+
              '</tr>'+
              '<tr><td height="15" colspan="4"></td></tr>'+
              '</table>'+
            '</td>'+
            '</tr>'+
           '</table>'+
          '</div>'+

          '</td>'+
        '</tr>'+
        '</table>'+
      '</td>'+
      '</tr>'+

      '</table>';




document.getElementsByClassName("emailer")[0].getElementsByTagName("picture")[0].parentElement.appendChild(emailerBlock);