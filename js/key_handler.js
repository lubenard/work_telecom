var letter_size = 0;
var letter_array = [];

window.onload = function(){
    document.getElementById("key_type").value = "";
}

function save_localStorage_key(letter_index) {
     // Because localStorage is key -> value, we also register it's timestamp
     localStorage.setItem(letter_index, Date.now());
     console.log(localStorage.getItem(letter_index));
}
 
function print_key_console(keynum) {
     console.log("Key pressed: ", keynum);
}

function clear_textbox() {
    document.getElementById("key_type").value = "";
    letter_array = [];
    letter_size = 0;
}

function pb_move() {
    var i = 1;
    var elem = document.getElementById("bar_progress");
    var width = 1;
    var id = setInterval(pb_frame, 10);
    function pb_frame() {
        if (width >= 100) {
            clearInterval(id);
            i = 0;
        } else {
            width++;
            elem.style.width = width + "%";
        }
    }
}

function reset(){
        clear_textbox();
        localStorage.removeItem("start_timer");
        localStorage.removeItem("end_timer");
        document.getElementById("repeat_area").innerHTML = "";
        document.getElementById("bar_progress").style.width =  "1%";
}

function get_key(key) {
    // We print the key
    print_key_console(key.key);
    //we save the letter into a array
    letter_array.push(key.key);
    // Save it into localStorage. We save a index and not the letter to avoid overwrite with the same letters
    save_localStorage_key(letter_size++);
    //we check if the key is the first in the string and if start_timer is not set
    if (letter_array.lenght == 0 && !(localStorage.getItem("start_timer")))
    {
        set_start_time(localStorage.getItem("0"));
    }
    console.log("Letter_size", letter_size);
}

function get_delay(i) {
    return Number(localStorage.getItem(i) - localStorage.getItem("start_timer"));
}

function set_delay(i, delay) {
    console.log("delay for ", letter_array[i] ," is ", delay);
    var tempo = setTimeout(function(){ 
        console.log("array is ",letter_array[i]);
        document.getElementById("repeat_area").innerHTML += letter_array[i];
    }, delay);
}

function replay() {
    var i = 0;
    
    console.log("------REPLAY-----");
    for (i = 0; i < letter_array.length; i++)
    { 
        if (localStorage.getItem("end_timer") && localStorage.getItem(i) < localStorage.getItem("end_timer"))
            set_delay(i, get_delay(i));
    }
    pb_move();
}

function set_end_time(start_time) {
    localStorage.removeItem("end_timer");
    // We check if it already exist in localStorage.
    // If not, we store it, and if it already exist, we use it as start.
    // The end timer will be the last key timestamp
    if (!(localStorage.getItem("end_timer")))
    {
        console.log("fin timestamp ", Date.now());
        localStorage.setItem("end_timer", Date.now());
    }
    else
    {  
        console.log("timestamp actuel", Date.now());
        console.log("OUPS, end timestamp déjà mis a", localStorage.getItem("end_timer"));
    }
}

function set_start_time(start_time) {
    localStorage.removeItem("start_timer");
    // We check if it already exist in localStorage.
    // If not, we store it, and if it already exist, we use it as start.
    // The end timer will be the last key timestamp
    if (!(localStorage.getItem("start_timer")))
    {
        console.log("début timestamp ", Date.now());
        localStorage.setItem("start_timer", Date.now());
    }
    else
    {  
        console.log("timestamp actuel", Date.now());
        console.log("OUPS, Timestamp déjà mis a", localStorage.getItem("start_timer"));
    }
}
