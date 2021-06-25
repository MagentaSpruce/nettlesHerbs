/* eslint-disable */
const contactForm = document.querySelector('.form');

let name = document.getElementById('name');
let email = document.getElementById('email');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  let formData = {
    name: name.value,
    email: email.value
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/home');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function() {
    console.log(xhr.responseText);
    if (xhr.responseText === 'success') {
      alert('Email sent');
      name.value = '';
      email.value = '';
    } else {
      alert('Something went wrong. Please try again later!');
    }
  };

  xhr.send(JSON.stringify(formData));
});
