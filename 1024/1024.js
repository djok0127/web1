
// global variable
var game_table = create2DArray(4,4);

var GAME = {
  get:function(location){
    return game_table[location[0]][location[1]];
  },
  set:function(location, value){
    window.game_table[location[0]][location[1]] = value;
  },
  add:function(location){
    window.game_table[location[0]][location[1]] = (Math.random() < 0.90)? 2:4;
  },
  add2:function(location1, location2){
    var location1 = getRandomLocation(4);
    var location2 = getRandomLocation(4);

    // roll location 2 until it is not same as location 1
    while(location2[0] === location1[0] && location2[1] === location1[1]){
      location2 = getRandomLocation(4);
    }
    window.game_table[location1[0]][location1[1]] = 2;
    window.game_table[location2[0]][location2[1]] = 2;
  }, // end of update
  isBlank:function(location){
    return (window.game_table[location[0]][location[1]] === undefined
        || window.game_table[location[0]][location[1]] === 0);
  },
  isSame:function(loc1, loc2){
    return window.game_table[loc1[0]][loc1[1]] === window.game_table[loc2[0]][loc2[1]];
  }
}

function create2DArray(rows, columns){
  var x = new Array(rows);

  for (var i = 0; i < rows; i++) {
    x[i] = new Array(columns);
  }
  return x;
}

// Description: Create Random location of x and y, limited by same max value
// @Param : Maximum value of the location
// @return : returns the random value in between
function getRandomLocation(max) {
  var x = Math.floor(Math.random() * max);
  var y = Math.floor(Math.random() * max);
  return [x,y];
} // end of function getRandomLocation

function resetGame(){
  removeTable('1024');
  game_table = create2DArray(4,4);
  initGame();
}

function initGame(){
  document.onkeydown = checkKey;
  var body = document.body,
      tbl  = document.createElement('table');
      tbl.setAttribute('id','1024');

      tbl.align =  'center';

      GAME.add2();

      for(var i = 0; i < 4; i++){
        var tr = tbl.insertRow();

        for(var j = 0; j < 4; j++){
          var td = tr.insertCell();

          if(GAME.get([i,j]) === 2) {
            td.appendChild(document.createTextNode('2'));
            td.style.backgroundColor = 'yellow';
          } else {
            td.appendChild(document.createTextNode(''));
          }

          td.style.border = '1px solid black';
          td.style.height = '100px';
          td.style.width = '100px';
          td.align = 'center';
        }
      }
      body.appendChild(tbl);
}

function updateGame(){
  var newLoc;

  // add random number 2 or 4 on a blank space
  do{
    newLoc = getRandomLocation(4);
  } while(!GAME.isBlank(newLoc)); // run again if the tile is not blank
  GAME.add(newLoc);

  removeTable('1024');

  var body = document.body,
      tbl  = document.createElement('table');
      tbl.setAttribute('id','1024');

      tbl.align =  'center';

      for(var i = 0; i < 4; i++){
        var tr = tbl.insertRow();

        for(var j = 0; j < 4; j++){
          var td = tr.insertCell();
          var tile = window.game_table[i][j];

          switch (tile) {
            case 2:
              td.appendChild(document.createTextNode('2'));
              td.style.backgroundColor = '#ffff00';
              break;
            case 4:
              td.appendChild(document.createTextNode('4'));
              td.style.backgroundColor = '#ffcc00';
              break;
            case 8:
              td.appendChild(document.createTextNode('8'));
              td.style.backgroundColor = '#ff9933';
              break;
            case 16:
              td.appendChild(document.createTextNode('16'));
              td.style.backgroundColor = '#ff6600';
              break;
            case 32:
              td.appendChild(document.createTextNode('32'));
              td.style.backgroundColor = '#ff5050';
              break;
            case 64:
              td.appendChild(document.createTextNode('64'));
              td.style.backgroundColor = '#ff0066';
              break;
            case 128:
              td.appendChild(document.createTextNode('128'));
              td.style.backgroundColor = '#ff3399';
              break;
            case 256:
              td.appendChild(document.createTextNode('256'));
              td.style.backgroundColor = '#ff33cc';
              break;
            case 512:
              td.appendChild(document.createTextNode('512'));
              td.style.backgroundColor = '#ff66ff';
              break;
            case 1024:
              td.appendChild(document.createTextNode('1024'));
              td.style.backgroundColor = '#cc66ff';
              break;
            default:
            td.appendChild(document.createTextNode(''));
            td.style.backgroundColor = '#ffffff';
          } // end of switch statement

          td.style.border = '1px solid black';
          td.style.height = '100px';
          td.style.width = '100px';
          td.align = 'center';
        }
      }
      body.appendChild(tbl);
}

function removeTable(id)
{
    var tbl = document.getElementById(id);
    if(tbl) tbl.parentNode.removeChild(tbl);
}

function up_arrow(col){
  // add code
}

function down_arrow(col){
  //add code
}

function right_arrow(row){
  // add code
}

function left_arrow(){
  // check all the row
  var current_loc;
  var previous_num = 0;
  var current_num = 0;
  for(var j = 0; j < 4; j++){
    previous_num = 0;
    current_num = 0;
    for(var i = 3; i >= 0; i--){
      current_loc = [j,i];

      if(GAME.isBlank(current_loc)){
        //current location is blank

        //get rid of previous location
        GAME.set([current_loc[0],current_loc[1]+1], 0);
        // move the previous num to blank location
        GAME.set(current_loc, previous_num);

      } else {
        if(GAME.get(current_loc) === previous_num){
          //get rid of previous location
          GAME.set([current_loc[0],current_loc[1]+1], 0);
          // move the previous num to blank location
          GAME.set(current_loc, previous_num + GAME.get(current_loc));
        }

      }
    previous_num = GAME.get(current_loc) === undefined ? 0: GAME.get(current_loc);
    } // end of for
  }
} // end of left left_arrow

function addRow(row){
  //var tbl = document.getElementById('1024');
  var total = 0;
  var temp = 0;
  for(var i = 0; i < 4; i++){
    temp = GAME.get([row,i]);
    if(temp != undefined) total += temp;
  }

  return total;
} // end of function getRow

function checkKey(e) {

    e = e || window.event;
    var tbl = document.getElementById('1024');

    if (e.keyCode == '38') {
        // up arrow
        // removeTable('1024');
        // initGame(4);
        //alert(getRow(0));
    }
    else if (e.keyCode == '40') {
        // down arrow
        updateGame();
    }
    else if (e.keyCode == '37') {
       // left arrow
       left_arrow(0);
       // GAME.set([0,0],addRow(0));
       // GAME.set([1,0],addRow(1));
       // GAME.set([2,0],addRow(2));
       // GAME.set([3,0],addRow(3));
       updateGame();
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}
