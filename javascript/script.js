if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").then(registration => {
    console.log("SW Registered!");
    console.log(registration);
  }).catch(error => {
    console.log("SW Registration failed!");
    console.log(error);
  });
};




let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};




let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () =>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
      var dots = elem.getAttribute("data-dots");
      var marked = elem.getAttribute("data-percent");
      var percent = Math.floor(dots * marked / 100);
      var points = "";
      var rotate = 360 / dots;
  
      for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
      }
      elem.innerHTML = points;
    }); */

  document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
      var dotsAttr = circle.getAttribute("data-dots");
      var markedAttr = circle.getAttribute("data-percent");
      var dots = parseInt(dotsAttr);
      var marked = parseInt(markedAttr);
      var points = "";
      var rotate = 360 / dots;
  
      var numPoints = Math.floor((dots * marked) / 100);
  
      for (let i = 0; i < numPoints; i++) {
        var point = document.createElement("div");
        point.classList.add("points");
        point.style.setProperty("--i", i);
        point.style.setProperty("--rot", rotate + "deg");
        circle.appendChild(point);
      }
    });
  });


  (function() {
    function validEmail(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    }
  
    function validateHuman(honeypot) {
      if (honeypot) {
        console.log("Robot Detected!");
        return true;
      } else {
        console.log("Welcome Human!");
      }
    }
  
    function getFormData(form) {
      var elements = form.elements;
  
      var fields = Object.keys(elements).filter(function(k) {
        return elements[k].name !== "honeypot";
      }).map(function(k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name) {
        var element = elements[name];
        formData[name] = element.value;
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet; // Google Sheets spreadsheet name
      formData.formGoogleSendEmail = form.dataset.email || ""; // Receiving email address
  
      console.log(formData);
      return formData;
    }

    function resetForm(form) {
      form.reset();
    }
  
    function handleFormSubmit(event) {
      event.preventDefault();
      var form = event.target;
      var data = getFormData(form);
      if (data.emailAddress && !validEmail(data.emailAddress)) {
        var invalidEmail = form.querySelector(".email-invalid");
        if (invalidEmail) {
          invalidEmail.style.display = "block";
          return false;
        }
      } else {
        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              // Afficher la fenêtre contextuelle de confirmation
              var confirmationPopup = document.querySelector(".confirmation-popup");
              if (confirmationPopup) {
                confirmationPopup.style.display = "block";
              }
              resetForm(form);
            } else {
              console.log("Une erreur s'est produite lors de l'envoi du formulaire.");
            }
          }
        };
        
        var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
      }
    }

    function closeConfirmationPopup(event) {
      var target = event.target;
      if (target.classList.contains('close-icon')) {
        var confirmationPopup = target.closest('.confirmation-popup');
        if (confirmationPopup) {
          confirmationPopup.style.display = 'none';
        }
      }
    }
  
    function loaded() {
      console.log("Contact form submission handler loaded successfully.");
      var forms = document.querySelectorAll("form.gform");
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }

      document.addEventListener("click", closeConfirmationPopup, false);
     
    }
   

   document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
      var buttons = form.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
  })();