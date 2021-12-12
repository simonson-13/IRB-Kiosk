const table = document.getElementById("classes");
const res = document.getElementById('result');
const background = document.getElementById("bg");

/*search bar stuff*/
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const highlight = document.querySelector(".highlighter")
const high_text = document.querySelector(".high_text");
const suggBox = document.getElementById("suggestions");
const searchIcon = searchWrapper.querySelector(".icon");

/*floorplan stuff*/
let viewFP = [];
var modal = document.getElementById("myModal");
var img = document.getElementById("floorimg");
var captionText = document.getElementById("caption");
var close = document.getElementsByClassName("close");

/*keyboard stuff*/
const keyBoard = document.getElementById("keyboard");
const keys = document.querySelectorAll(".keys");
const space = document.querySelector('.space')
const shift = document.querySelector('.shift');
const backspace = document.querySelector('.backspace');
const caps_lock = document.querySelector('.capslock');
const container = document.querySelector('.container');

let caps_on = false;
let shift_on = false;
let filtered = [];

inputBox.onclick = () => {
        //make keyboard popup
    keyBoard.style.display = 'block';
    keyBoard.style.zIndex = 7;
    container.style.zIndex = 7;
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
    container.style.display = 'none';
}


searchIcon.onclick = () => {
    keyBoard.style.display = 'none';
    keyBoard.style.zIndex = 0;
    showSuggestions([]);
    if (inputBox.value.toUpperCase() in classMap || "CMSC" + inputBox.value in classMap) {
        let inputValue = inputBox.value;
        if ("CMSC" + inputBox.value in classMap) {
            inputValue = "CMSC" + inputValue;
        }
        rowCount = 1;
        //delete rows from previous search
        for(var i = 1;i<table.rows.length;){
            table.deleteRow(i);
        }
        table.style.display = 'table';
        res.style.display = 'none';
        for (let i = 0; i < classMap[inputBox.value.toUpperCase()].length; i++) {
            let row = table.insertRow(rowCount);
            let time = row.insertCell(0);
            let prof = row.insertCell(1);
            let room = row.insertCell(2);
            let floor = row.insertCell(3);
            time.innerHTML = classMap[inputValue.toUpperCase()][i]['time'];
            prof.innerHTML = classMap[inputValue.toUpperCase()][i]['professor'];
            room.innerHTML = classMap[inputValue.toUpperCase()][i]['room'];
            floor.innerHTML = `<div class='floorplanbutton' alt=${room.innerHTML.toString().slice(-4)}>View Location</div>
            <!--modal floor plan image-->
            <div id='myModal' class="modal">
                  <!-- The Close Button -->
                <span class="close"><p class="x">&times;</p></span>
    
                <!-- Modal Content (The Image) -->
                <img class="modal-content" id="floorimg">
    
                <!-- Modal Caption (Image Text) -->
                <div id="caption"></div>
                
            </div>`;
            rowCount++;
        }
    } else {
        result = "Class Not Found"
        res.style.display='block'
        table.style.display = 'none';
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
    keyBoard.style.zIndex = 0;
    container.style.zIndex = 0;
    if (e.target.innerHTML in classMap || "CMSC" + e.target.innerHTML in classMap) {
        let inputValue = inputBox.value;
        if ("CMSC" + inputBox.value in classMap) {
            inputValue = "CMSC" + inputValue;
        }
        showSuggestions([]);
        rowCount = 1;
        //delete rows from previous search
        for(var i = 1;i<table.rows.length;){
            table.deleteRow(i);
        }
        table.style.display = 'table';
        res.style.display = 'none';
        for (let i = 0; i < classMap[e.target.innerHTML].length; i++) {
            let row = table.insertRow(rowCount);
            let time = row.insertCell(0);
            let prof = row.insertCell(1);
            let room = row.insertCell(2);
            let floor = row.insertCell(3);
            time.innerHTML = classMap[inputValue.toUpperCase()][i]['time'];
            prof.innerHTML = classMap[inputValue.toUpperCase()][i]['professor'];
            room.innerHTML = classMap[inputValue.toUpperCase()][i]['room'];
            floor.innerHTML = `<div class='floorplanbutton' alt=${room.innerHTML.toString().slice(-4)}>View Location</div>
            <!--modal floor plan image-->
            <div id='myModal' class="modal">
                  <!-- The Close Button -->
                <span class="close"><p class="x">&times;</p></span>
    
                <!-- Modal Content (The Image) -->
                <img class="modal-content" id="floorimg">
    
                <!-- Modal Caption (Image Text) -->
                <div id="caption"></div>
                
            </div>`;
            viewFP = document.getElementsByClassName("floorplanbutton");
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
            keyBoard.style.zIndex = 0;
            container.style.zIndex = 0;
            if (inputBox.value.toUpperCase() in classMap || "CMSC" + inputBox.value.toUpperCase() in classMap) {
                let inputValue = inputBox.value;
                if ("CMSC" + inputBox.value in classMap) {
                    inputValue = "CMSC" + inputValue;
                }
                rowCount = 1;
                //delete rows from previous search
                for(var i = 1;i<table.rows.length;){
                    table.deleteRow(i);
                }
                table.style.display = 'table';
                res.style.display = 'none';
                for (let i = 0; i < classMap[inputValue.toUpperCase()].length; i++) {
                    let row = table.insertRow(rowCount);
                    let time = row.insertCell(0);
                    let prof = row.insertCell(1);
                    let room = row.insertCell(2);
                    let floor = row.insertCell(3);
                    time.innerHTML = classMap[inputValue.toUpperCase()][i]['time'];
                    prof.innerHTML = classMap[inputValue.toUpperCase()][i]['professor'];
                    room.innerHTML = classMap[inputValue.toUpperCase()][i]['room'];
                    floor.innerHTML = `<div class='floorplanbutton' alt=${room.innerHTML.toString().slice(-4)}>View Location</div>
                    <!--modal floor plan image-->
                    <div id='myModal' class="modal">
                          <!-- The Close Button -->
                        <span class="close"><p class="x">&times</p>;</span>
            
                        <!-- Modal Content (The Image) -->
                        <img class="modal-content" id="floorimg">
            
                        <!-- Modal Caption (Image Text) -->
                        <div id="caption"></div>
                        
                    </div>`;
                    rowCount++;
                }
            } else {
                res.style.display='block';
                res.innerHTML = "Class Not Found";
                table.style.display = 'none';
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

        }
        // start filtering array
        if (inputBox.value != "" && enterPressed==false) {
            let regex = new RegExp("\\b" + inputBox.value.toLowerCase())
            let regexNum = new RegExp("cmsc" + inputBox.value.toLowerCase())
            filtered = classes.filter((data) => {
                if (data.toLowerCase().match(regex) || data.toLowerCase().match(regexNum)) {
                    return data;
                }
            })
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

}

/*floor plan pop up*/
document.addEventListener('click',function(e) {
    if(e.target && e.target.getAttribute('class') === 'floorplanbutton'){
        
        let floor = e.target.getAttribute('alt')[0]
        let room = e.target.getAttribute('alt');
        let floorimg= `./floor_${floor}.png`
        modal.style.display='block';
        img.src = floorimg;
        captionText.innerHTML = `Floor ${floor}, Classroom: ${room}`
        /* add highlight to map*/
        if (room == '0324') {
            highlight.style.top = '250px';
            highlight.style.right = '420px';
        }
        if (room == '0318') {
            highlight.style.top = '160px';
            highlight.style.right = '342px';
        }
        if (room == '1207') {
            highlight.style.top = '385px';
            highlight.style.right = '605px';
        }
        if (room == '1116') {
            highlight.style.top = '445px';
            highlight.style.right = '665px';
        }
        high_text.innerHTML = room;
        highlight.style.display = 'block';
        high_text.style.display = 'block';
        
        

    } else if (e.target && (e.target.getAttribute('class') === 'close' || e.target.getAttribute('class') === 'x')) {
        
         /*close floor plan pop up*/
         modal.style.display='none';
         //img.src = floorimg;
         //make highlight disapear on close
         highlight.style.display = 'none';
         high_text.style.display = 'none';
    }
});



    








