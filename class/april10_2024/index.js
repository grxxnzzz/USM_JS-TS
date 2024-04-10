"use strict"; //lol

const inputEl = document.querySelector("input#inpField");
const btnEl = document.querySelector("button#btnGet");

btnEl.onclick = () => {
  fetch("https://api.github.com/users/grxxnzzz")
    .then((response) => {
      return response.json();
    })
    .then((profile) => {
      console.log(profile);
    });
};

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(5);
//     console.log("promix");
//   }, 1000);

//   reject('uspex');
// });

// promise.then((result) => {
//   console.log(result+"str20");
// }) .catch((error) => {
//   console.log(error);
// })

console.log(inputEl);
console.log("gamix");
