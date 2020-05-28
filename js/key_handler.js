var letter_size = 0;
var letter_array = [];

//This function's goal is clear fields when the page load
window.onload = function(){
    document.getElementById("key_type").value = "";
    localStorage.clear();
}

//This function's goal is to store the timestamp into the localstorage
function save_localStorage_key(letter_index) {
     // Because localStorage is key -> value, we also register it's timestamp
     localStorage.setItem(letter_index, Date.now());
}

//This function's goal is to print the key pressed into the console
function print_key_console(keynum) {
     console.log("Key pressed: ", keynum);
}

//This function's goal is to reset all fields
function reset_fields() {
        console.log("Resetting all fields...");
        //We clear the typing area and the repeat area
        document.getElementById("key_type").value = "";
        document.getElementById("repeat_area").innerHTML = "";
        //we clear the variables
        letter_array = [];
        letter_size = 0;
        //We clear the local storage
        localStorage.clear();
}

//This function's goal is to reset all fields
function get_key(key) {
    // We print the key
    print_key_console(key.key);
    //we save the letter into a array
    letter_array.push(key.key);
    // Save it into localStorage. We save a index and not the letter to avoid overwrite with the same letters
    save_localStorage_key(letter_size++);
    //we check if the key is the first in the string and if start_timer is not set
    if (letter_array.length == 1 && !localStorage.getItem("start_timer"))
        set_start_time(localStorage.getItem("0"));
}

//This function's goal is to return the delay for the key
function get_delay(i) {
    return Number(localStorage.getItem(i) - localStorage.getItem("start_timer"));
}

//This function's goal is to set a timeout for each key
function set_delay(i, delay) {
    console.log("delay for ", letter_array[i] ," is ", delay);
    var tempo = setTimeout(function(){
        document.getElementById("repeat_area").innerHTML += letter_array[i];
    }, delay);
}

//This function's goal is to replay the keys.
function replay() {
    var i = 0;
    
    console.log("------REPLAY-----");
    document.getElementById("repeat_area").innerHTML = "";
    for (i = 0; i < letter_array.length; i++)
    { 
        if (localStorage.getItem("end_timer")) {
            if (localStorage.getItem(i) < localStorage.getItem("end_timer"))
                set_delay(i, get_delay(i));
        }
        else
            set_delay(i, get_delay(i));
    }
}

//This function's goal is to set a end time
function set_end_time() {
    //We store it, and if it already exist, we use it as start.
    // The end timer will be the last key timestamp or this timer
    console.log("fin timestamp ", Date.now());
    localStorage.setItem("end_timer", Date.now());
}

//This function's goal is to set a start time
function set_start_time(start_time) {
    //We store it, and check if start time might be overwritten by button
    // The end timer will be the last key timestamp
    if (start_time == -1)
    {
        console.log("début timestamp ", Date.now());
        localStorage.setItem("start_timer", Date.now());
    }
    else
        localStorage.setItem("start_timer", start_time);
}
