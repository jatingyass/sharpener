// Write your code below:
const divs = document.getElementsByTagName('div');
// console.log(divs[1]);
const subHeading = document.createElement('h3');
subHeading.textContent = 'Buy high quality organic fruits online';
// console.log(subHeading);
divs[0].appendChild(subHeading);
subHeading.style.fontStyle = 'italic';

const para = document.createElement('p');
para.textContent = 'Total fruits: 4';
// console.log(para);
para.id = 'fruits-total';

const ul = document.querySelector('ul');
// console.log(ul);
ul.previousElementSibling.append(para);
