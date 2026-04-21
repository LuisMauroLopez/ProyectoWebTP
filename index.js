let perro = 'rancio'
let color = 'verde'
let decir = `este perro es ${perro} y a demás es de color ${color} `
console.log(decir)

let num;
let num2
const ini = document.querySelector("#ini");
console.log(ini)
ini.addEventListener('mouseover', ()=>{
    ini.style.color = "pink"
  /*  ini.style.margin = "500px" */
  
})
ini.removeEventListener(); 