const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = document.getElementById("suggestions");
const searchIcon = searchWrapper.querySelector(".icon");
const viewFP = document.getElementById("floorplanbutton");
var modal = document.getElementById("myModal");
var img = document.getElementById("floorimg");
var captionText = document.getElementById("caption");
var close = document.getElementsByClassName("close")[0];

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
    viewFP.style.zIndex=0;
    keyBoard.style.display = 'block';
}

background.onclick=() => {
    //make keyboard disapear
    keyBoard.style.display = 'none';
}


searchIcon.onclick = () => {
    console.log("search pressed!")
    keyBoard.style.display = 'none';
    if (inputBox.value.toLowerCase() in officeMap) {
        result = officeMap[inputBox.value.toLowerCase()]
        showSuggestions('');
        //result = inputBox.value + "'s Office is: " + result;
        result = result;
        viewFP.style.zIndex=5;
        viewFP.style.display = 'block';
        document.getElementById('result').style.marginLeft = '27%';
        document.getElementById('result').innerHTML = result;
    } else {
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
    result = officeMap[e.target.innerHTML.toLowerCase()]
    showSuggestions('');
    //result = inputBox.value + "'s Office is: " + result;
    result = result;
    viewFP.style.zIndex=5;
    viewFP.style.display = 'block';

    document.getElementById('result').innerHTML = result;

})

/* floor plan pop up */
viewFP.addEventListener("click", (e) => {
    console.log('viewFP clicked!')
    let floor = document.getElementById("result").innerHTML.slice(-4,-3)
    let res_string = document.getElementById("result").innerHTML
    let floorimg= `./floor_${floor}.png`
    modal.style.display = 'block'
    img.src = floorimg;
    captionText.innerHTML = `Floor ${floor}, ${inputBox.value}'s Office: ${res_string.slice(-8,res_string.length)}`
})
/*close floor plan pop up*/

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
                result = officeMap[inputBox.value.toLowerCase()]
                showSuggestions([]);
                //result = inputBox.value + "'s Office is: " + result;
                result = result;
                document.getElementById('result').style.marginLeft = '27%';
                viewFP.style.zIndex=5;
                viewFP.style.display = 'block';
            } else {
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
            console.log(e.target.getAttribute("lcname"));

        }
        // start filtering array
        if (inputBox.value != "" && enterPressed == false) {
            let regex = new RegExp("\\b" + inputBox.value.toLowerCase())
            filtered = suggestions.filter((data) => {
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








