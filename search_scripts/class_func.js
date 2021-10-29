const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = document.getElementById("suggestions");
const searchIcon = searchWrapper.querySelector(".icon");
const table = document.getElementById("classes");
const res = document.getElementById('result');

const keyBoard = document.getElementById("keyboard");
const background = document.getElementById("bg");

const keys = document.querySelectorAll(".keys");
const space = document.querySelector('.space')
const shift = document.querySelector('.shift');
const backspace = document.querySelector('.backspace');
const caps_lock = document.querySelector('.capslock');
let caps_on = false;
let shift_on = false;
let filtered = [];

inputBox.onclick = () => {
        //make keyboard popup
    keyBoard.style.display = 'block';
    //make any showing result disapear
    if (inputBox.value == '') {
        res.style.display='none';
        /* idk if it's guaranteed that there are only CMSC classes*/
        /*inputBox.value = "CMSC"*/
    }
    
}

background.onclick=() => {
    //make keyboard disapear
    keyBoard.style.display = 'none';
}


searchIcon.onclick = () => {
    console.log("search pressed!")
    keyBoard.style.display = 'none';
    showSuggestions([]);
    if (inputBox.value in classMap) {
        rowCount = 1;
        //delete rows from previous search
        for(var i = 1;i<table.rows.length;){
            table.deleteRow(i);
        }
        table.style.display = 'table';
        for (let i = 0; i < classMap[inputBox.value.toUpperCase()].length; i++) {
            let row = table.insertRow(rowCount);
            let time = row.insertCell(0);
            let prof = row.insertCell(1);
            let room = row.insertCell(2);
            let floor = row.insertCell(3);
            time.innerHTML = classMap[inputBox.value.toUpperCase()][i]['time'];
            prof.innerHTML = classMap[inputBox.value.toUpperCase()][i]['professor'];
            room.innerHTML = classMap[inputBox.value.toUpperCase()][i]['room'];
            let photopath = `../floor_${classMap[inputBox.value.toUpperCase()][i]['floor']}.png`
            floor.innerHTML = `<input type='button' id='floor_button' value='View Floor Plan' onclick={"window.open(${photopath})"}/>`;
            rowCount++;
        }
    } else {
        result = "Class Not Found"
        res.style.display='block'
        res.innerHTML = result;
    }
}


for (let i = 0; i < keys.length; i++)
 {
     keys[i].setAttribute('keyname', keys[i].innerText);
     keys[i].setAttribute('id', keys[i].innerText);
     keys[i].setAttribute('lcname', keys[i].innerText.toLowerCase());

 }

 document.getElementById("suggestions").addEventListener("click", (e) => {
    inputBox.value = e.target.innerHTML
    keyBoard.style.display = 'none';
    if (e.target.innerHTML in classMap) {
        showSuggestions([]);
        rowCount = 1;
        //delete rows from previous search
        for(var i = 1;i<table.rows.length;){
            table.deleteRow(i);
        }
        table.style.display = 'table';
        for (let i = 0; i < classMap[e.target.innerHTML].length; i++) {
            let row = table.insertRow(rowCount);
            let time = row.insertCell(0);
            let prof = row.insertCell(1);
            let room = row.insertCell(2);
            let floor = row.insertCell(3);
            time.innerHTML = classMap[inputBox.value.toUpperCase()][i]['time'];
            prof.innerHTML = classMap[inputBox.value.toUpperCase()][i]['professor'];
            room.innerHTML = classMap[inputBox.value.toUpperCase()][i]['room'];
            let photopath = `../floor_${classMap[inputBox.value.toUpperCase()][i]['floor']}.png`
            floor.innerHTML = `<input type='button' id='floor_button' value='View Floor Plan' onclick={"window.open(${photopath})"}/>`;
            rowCount++;
        }
    } 

})

for (let i = 0; i < keys.length; i ++) {
    keys[i].addEventListener("click", (e) => {
        enterPressed=false;
        if (e.target.getAttribute("lcname") === "enter") {
            enterPressed=true;
            keyBoard.style.display = 'none';
            if (inputBox.value.toUpperCase() in classMap) {
                rowCount = 1;
                //delete rows from previous search
                for(var i = 1;i<table.rows.length;){
                    table.deleteRow(i);
                }
                table.style.display = 'table';
                for (let i = 0; i < classMap[inputBox.value.toUpperCase()].length; i++) {
                    let row = table.insertRow(rowCount);
                    let time = row.insertCell(0);
                    let prof = row.insertCell(1);
                    let room = row.insertCell(2);
                    let floor = row.insertCell(3);
                    time.innerHTML = classMap[inputBox.value.toUpperCase()][i]['time'];
                    prof.innerHTML = classMap[inputBox.value.toUpperCase()][i]['professor'];
                    room.innerHTML = classMap[inputBox.value.toUpperCase()][i]['room'];
                    let photopath = `../floor_${classMap[inputBox.value.toUpperCase()][i]['floor']}.png`
                    floor.innerHTML = `<input type='button' id='floor_button' value='View Floor Plan' onclick={"window.open(${photopath})"}/>`;
                    rowCount++;
                }
            } else {
                res.style.display='block';
                res.innerHTML = "Class Not Found";
            }
            //search
            //hide keyboard
            //hide suggestions
        } else if (e.target.getAttribute("lcname") === "") {
            inputBox.value = inputBox.value + " ";
        } else if (e.target.getAttribute("lcname") === "delete") {
            inputBox.value = inputBox.value.slice(0,-1);
            table.style.display='none';
        } else if (e.target.getAttribute("lcname") === "tab") {
            inputBox.value = inputBox.value + "    ";
        }
        else if (e.target.getAttribute("lcname") === "caps lock") {
            caps_on = !caps_on;
        } else if (e.target.getAttribute("lcname") === "shift") {
            shift_on = true;
            //add highlight to shift button
        } 
        else if (shift_on) {
            inputBox.value = inputBox.value + e.target.getAttribute("keyname");
            shift_on = false;
            //take highlight off of shift button
        }
        else if (caps_on) {
            inputBox.value = inputBox.value + e.target.getAttribute("keyname");
        } else {
            inputBox.value = inputBox.value + e.target.getAttribute("lcname");
            console.log(e.target.getAttribute("lcname"));

        }
        // start filtering array
        if (inputBox.value != "" && enterPressed==false) {
            let regex = new RegExp("\\b" + inputBox.value.toLowerCase())
            filtered = classes.filter((data) => {
                if (data.toLowerCase().match(regex)) {
                    return data;
                }
            })
            console.log(filtered)
            list = ''
            filtered = filtered.map((res) => {
                list += '<li>' + res + '</li>';
            })
            searchWrapper.classList.add("active");
        } else {
            filtered = [];
            suggBox.innerHTML = '';
            list = []
        }
        showSuggestions(list);
    }
        
    )
}

function showSuggestions(list) {
    if (list.length > 0) {
        suggBox.innerHTML = list;
    } else {
        suggBox.innerHTML = '';
    }
    console.log('called');

}








