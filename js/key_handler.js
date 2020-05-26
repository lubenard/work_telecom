var letter_size = 0;
var letter_array = [];


function save_localStorage_key(letter_index) {
     // Because localStorage is key -> value, we also register it's timestamp
     localStorage.setItem(letter_index, Date.now());
     console.log(localStorage.getItem(letter_index));
}
 
function print_key_console(keynum) {
     console.log("Key pressed: ", keynum);
}

function get_key(key) {
    // We print the key
    print_key_console(key.key);
    //we save the letter into a array
    letter_array.push(key.key);
    // Save it into localStorage. We save a index and not the letter to avoid overwrite with the same letters
    save_localStorage_key(letter_size++);
    console.log("Letter_size", letter_size);
}

function get_delay(i) {
    console.log("i vaut ", i);
        console.log("J'attend ", Number(localStorage.getItem(i) - localStorage.getItem("start_timer")));
        return Number(localStorage.getItem(i) - localStorage.getItem("start_timer"));
}

function set_delay(i, delay) {
    
    console.log("delay for ", letter_array[i] ," is ", localStorage.getItem(i));
    var tempo = setTimeout(function(){ 
        console.log("array is ",letter_array[i]);
        document.getElementById("repeat_area").innerHTML = letter_array[i];
    }, delay);
}

function replay() {
    var i = 0;
    
    console.log("------REPLAY-----");
    console.log("letter array is ", letter_array);
    for (i = 0; i < letter_array.length; i++)
    { 
        set_delay(i, get_delay(i));
    }
    //localStorage.clear();
}

function get_onclick_timestamp() {
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
