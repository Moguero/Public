'use strict';

console.log("Hello test test");

let today = new Date();

let formatDate = today.toDateString();

let selectedElement = document.getElementById('date');

selectedElement.innerHTML = formatDate;
