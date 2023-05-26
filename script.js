const titleTable = document.querySelector("#titleTable")
const begin = document.querySelector("#begin")
const thInput = document.querySelector("#thInput")
const hiden = document.querySelector("#hiden")
const table = document.querySelector("#table")
const name1 = document.getElementById("name1")
const number = document.querySelector("#number")
const tbody = document.querySelector("#tbody")

function create(){
    begin.style.display = "none"
    hiden.style.display = "block"
    thInput.innerHTML = titleTable.value
    name1.focus()
}


function addTable(){
    tbody.innerHTML += "<tr class='tr'><td>"+ name1.value +"</td><td>"+number.value+"</td><td>"+stack(number.value)+"</td><td><input type='checkbox' class='check'></td><td class='trash'><svg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-trash' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='black' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 7l16 0' /><path d='M10 11l0 6' /><path d='M14 11l0 6' /><path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' /><path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' /></svg></td></tr>"
    name1.value = ""
    number.value = ""
    name1.focus()
    isChecked()
    deleteTr()
}

function isChecked(){
    const check = document.querySelectorAll(".check")
    const checkArray = Array.from(check)
    const tr = document.querySelectorAll(".tr") 
    let indexOf = 0
    for(let i = 0, len = check.length; i<len; i++){
        check[i].addEventListener('click', function(){
            if(this.value == 1){
                this.value = 0
                indexOf = checkArray.indexOf(this)
                tr[indexOf].style.backgroundColor = "#ffe4c4"
            }else{
                this.value = 1
                indexOf = checkArray.indexOf(this)
                tr[indexOf].style.backgroundColor = "green"
            }
        })
    }
}
function deleteTr(){
    const trash = document.querySelectorAll(".trash")
    const trashArray = Array.from(trash)
    const tr = document.querySelectorAll(".tr")
    let indexOf = 0
    for(let i = 0, len = trash.length; i<len; i++){
        trash[i].addEventListener('click', function(){
            indexOf = trashArray.indexOf(this)
            tr[indexOf].remove()
        })
    }
}


function stack(n){
    if(n>64){
        let multiple
        let decimal
        multiple = Math.floor(n / 64)
        decimal = ((n/64) - multiple)*64
        if(decimal == 0){
            return multiple + " x 64"
        }else{
            return multiple + " x 64 + " + decimal
        }
    }
    else{
        return n
    }
}

// window.onbeforeunload = function(){
//     return confirm()
// }

number.addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode == 13) {
        document.getElementById("myButton").click()
    }
})

titleTable.addEventListener("keyup", function(event){
    event.preventDefault()
    if(event.keyCode == 13){
        document.getElementById("createBtn").click()
    }
})

const blockName = document.getElementById('name1');
const autoComplete = document.getElementById('autoCompleteListe');
const url = "./mc_block_list.json";
fetch(url)
    .then(response => response.json())
    .then(data => {
        blockName.addEventListener('input', function(){
            autoComplete.innerHTML = "";
            for(let i = 0; i < data.length; i++){
                if(this.value == ""){
                    autoComplete.innerHTML = "";
                }
                else if((data[i].id).startsWith(this.value)){
                    autoComplete.innerHTML += "<li>"+ data[i].id +"</li>"
                    let autoCompleteCells = document.querySelectorAll("li")
                    for(let j = 0; j < autoCompleteCells.length; j++){
                        autoCompleteCells[j].addEventListener('click', function(){
                            blockName.value = this.innerHTML
                            autoComplete.innerHTML = ""
                            number.focus()
                        })
                    }
                }
            }
        })
    })
