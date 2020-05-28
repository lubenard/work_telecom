var letter_size = 0;
var letter_array = [];
var index_letter_removed = [];

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

//This function's goal is to reset all fields
function reset_fields() {
        console.log("Resetting all fields...");
        //We clear the typing area and the repeat area
        document.getElementById("key_type").value = "";
        document.getElementById("repeat_area").innerHTML = "";
        //we clear the variables
        letter_array = [];
        letter_size = 0;
        index_letter_removed = [];
        //We clear the local storage
        localStorage.clear();
}

//This function's goal is to find the cursor position, and delete the corresponding characters in the table
function del_elem() {
        var text_area = document.getElementById('key_type');
        var startPosition = text_area.selectionStart;
        var endPosition = text_area.selectionEnd;
        
        // Check if you've selected text
        if(startPosition == endPosition) {
            localStorage.removeItem(letter_size);
            index_letter_removed.push(letter_size);
        } else {
            for (j = startPosition; j < endPosition; j++) {
                localStorage.removeItem(j);
                index_letter_removed.push(j);
            }
        }
}

//This function's goal is to reset all fields
function get_key(key) {
    //If the key is a Backspace, launch the right function
    if (key.key == "Backspace")
        del_elem();
    else if (key.key.length == 1) {
        // We print the key
        console.log("Key pressed: ", key.key);
        //we save the letter into a array
        letter_array.push(key.key);
        // Save it into localStorage. We save a index and not the letter to avoid overwrite with the same letters
        save_localStorage_key(letter_size++);
        //we check if the key is the first in the string and if start_timer is not set
        if (letter_array.length == 1 && !localStorage.getItem("start_timer"))
            set_start_time(localStorage.getItem("0"));
    }
}

//This function's goal is to return the delay for the key
function get_delay(i) {
    return Number(localStorage.getItem(i) - localStorage.getItem("start_timer"));
}

//This function's goal is to set a timeout for each key
function set_delay(i, delay) {
    var tempo = setTimeout(function(){
        document.getElementById("repeat_area").innerHTML += letter_array[i];
        console.log("Repeating key: ", letter_array[i]);
    }, delay);
}

//This function's goal is to replay the keys.
function replay() {
    var i = 0;
    var delay;
    
    console.log("------REPLAY-----");
    //we clear the display area
    document.getElementById("repeat_area").innerHTML = "";
    //We are looping for each key, and check if the timer is correct, due to end_timer and start_timer
    for (i = 0; i < letter_size; i++)
    {
        if (index_letter_removed.indexOf(i) != -1)
            i++;
        delay = get_delay(i);
        if (localStorage.getItem("end_timer")) {
            if (localStorage.getItem(i) < localStorage.getItem("end_timer") && delay >= 0)
                set_delay(i, delay);
        }
        else if (delay >= 0)
            set_delay(i, delay);
    }
}

//This function's goal is to set a end time
function set_end_time() {
    //We store it, and if it already exist, we use it as start.
    // The end timer will be the last key timestamp or this timer
    console.log("End time set");
    localStorage.setItem("end_timer", Date.now());
}

//This function's goal is to set a start time
function set_start_time(start_time) {
    //We store it, and check if start time might be overwritten by button
    // The end timer will be the last key timestamp
    console.log("Start time set");
    if (start_time == -1)
    {
        console.log("Overriden by button");
        localStorage.setItem("start_timer", Date.now());
    }
    else
        localStorage.setItem("start_timer", start_time);
}
