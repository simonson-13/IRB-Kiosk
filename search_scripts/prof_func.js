const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = document.getElementById("suggestions");
const searchIcon = searchWrapper.querySelector(".icon");
//const viewFP = document.getElementById("floorplanbutton");
var modal = document.getElementById("myModal");
var img = document.getElementById("floorimg");
var captionText = document.getElementById("caption");
var close = document.getElementsByClassName("close")[0];

const keyBoard = document.getElementById("keyboard");
const background = document.getElementById("bg");

/*highlight map*/
const highlight = document.querySelector(".highlighter");
const high_text = document.querySelector(".high_text");

/*results table*/
const profRow = document.getElementById("profRow");
const roomRow = document.getElementById("roomRow");
const floorRow = document.getElementById("floorRow");
const profTable = document.getElementById("profTable");


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
}

background.onclick=() => {
    //make keyboard disapear
    keyBoard.style.display = 'none';
}


searchIcon.onclick = () => {
    keyBoard.style.display = 'none';
    if (inputBox.value.toLowerCase() in officeMap) {
        profTable.style.display = "block";
        profRow.innerHTML = inputBox.value;
        roomRow.innerHTML = officeMap[inputBox.value.toLowerCase()];
        floorRow.innerHTML = `<div class='floorplanbutton'><p class='vp'>View Floor Plan</p<</div>`;
        result = officeMap[inputBox.value.toLowerCase()]
        showSuggestions('');
        
        //result = inputBox.value + "'s Office is: " + result;
        result = result;
        document.getElementById('result').style.marginLeft = '27%';
        document.getElementById('result').innerHTML = result;
    } else {
        result.style.display = "block";
        result = "Professor Not Found"
        document.getElementById('result').style.marginLeft = '0px';
        document.getElementById('result').innerHTML = result;
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
    profTable.style.display = "block";
    profRow.innerHTML = e.target.innerHTML;
    roomRow.innerHTML = officeMap[e.target.innerHTML.toLowerCase()];
    floorRow.innerHTML = `<div class='floorplanbutton'><p class='vp'>View Floor Plan</p></div>`;
    showSuggestions('');

    document.getElementById('result').innerHTML = result;

})

close.onclick = function() {
    modal.style.display='none';
}

for (let i = 0; i < keys.length; i ++) {
    keys[i].addEventListener("click", (e) => {
        enterPressed = false;
        if (e.target.getAttribute("lcname") === "enter") {
            enterPressed = true;
            keyBoard.style.display = 'none';
            if (inputBox.value.toLowerCase() in officeMap) {
                showSuggestions([]);
                profTable.style.display = "block";
                profRow.innerHTML = inputBox.value;
                roomRow.innerHTML = officeMap[inputBox.value.toLowerCase()];
                floorRow.innerHTML = `<div class='floorplanbutton'><p class='vp'>View Floor Plan</p></div>`;
            } else {
                result.style.display = "block";
                result = "Professor Not Found"
                document.getElementById('result').style.marginLeft = '0px';
            }
            document.getElementById('result').innerHTML = result;
            //search
            //hide keyboard
            //hide suggestions
        } else if (e.target.getAttribute("lcname") === "") {
            inputBox.value = inputBox.value + " ";
        } else if (e.target.getAttribute("lcname") === "delete") {
            inputBox.value = inputBox.value.slice(0,-1);
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
        if (inputBox.value != "" && enterPressed == false) {
            let regex = new RegExp("\\b" + inputBox.value.toLowerCase())
            filtered = suggestions.filter((data) => {
                if (data.toLowerCase().match(regex)) {
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
            list = '';
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
    if(e.target && e.target.getAttribute('class') === 'vp'){
        let floor = roomRow.innerHTML.slice(-4,-3);
        let room = roomRow.innerHTML;
        let floorimg= `./floor_${floor}.png`
        modal.style.display='block';
        img.src = floorimg;
        captionText.innerHTML = `Floor ${floor}, ${profRow.innerHTML}'s Office: ${room}`
        highlight.style.display='block';
        high_text.style.display='block';
        room = room.slice(-4, room.length);
                  high_text.innerHTML = room;
        if (room == "1210" || room == "2210") {
            highlight.style.right = '368px';
            highlight.style.top = '495px';
        } else if (room == "1124") {
            highlight.style.right = '770px';
            highlight.style.top = '335px';

        } else if (room == "1128") {
            highlight.style.right = '780px';
            highlight.style.top = '315px';

        } else if (room == "2240") {
            highlight.style.right = '280px';
            highlight.style.top = '395px';

        } else if (room == "2212") {
            highlight.style.right = '350px';
            highlight.style.top = '495px';

        } else if (room == "1248") {
            highlight.style.right = '315px';
            highlight.style.top = '385px';

        } else if (room == "3220") {
            highlight.style.right = '278px';
            highlight.style.top = '490px';

        }

    } else if (e.target && (e.target.getAttribute('class') === 'close' || e.target.getAttribute('class') === 'x')) {
        
         /*close floor plan pop up*/
         modal.style.display='none';
         highlight.style.display = 'none';
         high_text.style.display = 'none';
    }
});








