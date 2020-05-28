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

//This function's goal is to find the cursor position, and delete the corresponding characters in the table
function del_elem() {
        var text_area = document.getElementById('key_type');
        var startPosition = text_area.selectionStart;
        var endPosition = text_area.selectionEnd;
        
        // Check if you've selected text
        if(startPosition == endPosition) {
            console.log("The position of the cursor is (" + startPosition + "/" + text_area.value.length + ")");
            letter_array.splice(startPosition - 1, 1);
            localStorage.removeItem(letter_size);
            letter_size--;
            console.log("deleted element, new array is ", letter_array);
        } else {
            console.log("Selected text from ("+ startPosition +" to "+ endPosition + " of " + text_area.value.length + ")");
            letter_array.splice(startPosition, endPosition - startPosition);
            for (j = startPosition; j < endPosition; j++)
                localStorage.removeItem(j);
            letter_size -= endPosition - startPosition;
            console.log("deleted element, new array is ", letter_array);
        }
}

//This function's goal is to reset all fields
function get_key(key) {
    if (key.key == "Backspace")
        del_elem();
    else if (key.key.length == 1) {
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
    var delay;
    
    console.log("------REPLAY-----");
    //we clear the display area
    document.getElementById("repeat_area").innerHTML = "";
    //We are looping for each key, and check if the timer is correct, due to end_timer and start_timer
    for (i = 0; i < letter_array.length; i++)
    {
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
    console.log("fin timestamp ", Date.now());
    localStorage.setItem("end_timer", Date.now());
}

//This function's goal is to set a start time
function set_start_time(start_time) {
    //We store it, and check if start time might be overwritten by button
    // The end timer will be the last key timestamp
    if (start_time == -1)
    {
        console.log("Overriden by button");
        localStorage.setItem("start_timer", Date.now());
    }
    else
        localStorage.setItem("start_timer", start_time);
}
