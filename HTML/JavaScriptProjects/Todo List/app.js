const todo = [];
let command;
let listInput;
let sequence = 0;
let trash;
let heading;

function displayList(heading) {
    console.log(heading);
    sequence = 0;
    for (todoItem of todo) {
        sequence++;
        console.log(`${sequence}. ${todoItem}`)
    };
}

command = prompt("What would you like to do?")

while (command !== 'quit') {
    if (!command) {
        command = prompt("Try again, dumb ass!");

    } else if (command === 'new') {
        listInput = prompt("Please enter a Todo...");
        if (!listInput) {
            listInput = prompt("Try again, dumb ass!");

        } else {
            todo.push(listInput);
            console.log(`${listInput} added to your list!`);
        };

    } else if (command === 'list') {
        displayList('Your List');

    } else if (command === 'delete') {
        displayList('Your List');

        listInput = prompt("Please the line number of the item you wish to delete?");
        console.log(parseInt(listInput));

        while ((!listInput) || (Number.isNaN(parseInt(listInput)))) {
            listInput = prompt("Try again, dumb ass!");
        };

        if (parseInt(listInput) > 0 && parseInt(listInput) <= todo.length) {
            trash = todo.splice(parseInt(listInput) - 1, 1);
            console.log(`${trash} removed from your list!`);
        } else {
            console.log("Come back when you buy a clue, you moron!")
        };
    } else {
        command = prompt("Try again, dumb ass!");
    };
    command = prompt("What would you like to do next?");
}

displayList("Here's what you did today...");
console.log("Thanks for using lame.app!");
