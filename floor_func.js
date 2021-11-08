const keys = document.querySelectorAll(".keys");
const suggBox = document.getElementById("suggestions");
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
for (let i = 0; i < keys.length; i ++) {
    console.log("enter")
    keys[i].addEventListener("click", (e) => {// start filtering array
        if (inputBox.value != "" /*&& enterPressed==false*/) {
            let regex = new RegExp("\\b" + inputBox.value.toLowerCase())
            filtered = recomendations.filter((data) => {
                if (data.toLowerCase().match(regex)) {
                    return data;
                }
            })
            console.log(filtered);
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
        console.log(list)
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
document.getElementById("suggestions").addEventListener("click", (e) => {
    inputBox.value = e.target.innerHTML
    //result = officeMap[e.target.innerHTML]
    showSuggestions('');
    //result = inputBox.value + "'s Office is: " + result;
    // viewFP.style.zIndex=5;
    // viewFP.style.display = 'block';

    // document.getElementById('result').innerHTML = result;
    search()
    //search for result using search()
})
    
    
