
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
  },
  merge:function(loc1, loc2){
    // merge loc2 to loc 1
    window.game_table[loc1[0]][loc1[1]] = window.game_table[loc1[0]][loc1[1]] + window.game_table[loc2[0]][loc2[1]];
    window.game_table[loc2[0]][loc2[1]] = 0;
  },
  move:function(loc1, loc2){
    // move loc2 to loc 1
    window.game_table[loc1[0]][loc1[1]] = window.game_table[loc2[0]][loc2[1]];
    window.game_table[loc2[0]][loc2[1]] = 0;
  },
  updateGameStatus:function(){
    // -1: lose, 0: keep playing , 1: victory
    var lose = false;
    while(1){

    } // end of while
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
  updateScore();
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


function updateScore(){
  var score = 0;
  for(var i = 0; i < 4; i++)
    for(var j = 0; j < 4; j++)
      if(window.game_table[i][j] != undefined)
      score = score + window.game_table[i][j];

  document.getElementById("score").innerHTML = score;
}

function removeTable(id)
{
    var tbl = document.getElementById(id);
    if(tbl) tbl.parentNode.removeChild(tbl);
}

function up_arrow(){
  var head_loc;
  var tail_loc;
  var head_exists = false;
  var tail_exists = false;
  var mergeable = true;
  // take care of columns
  for(var col = 0; col < 4; col ++){
    for(var head = 3; head >= 1; head --){
      head_loc = [head, col];
      mergeable = true;

      for(var tail = head - 1; tail >= 0; tail --){
        head_exists = !GAME.isBlank(head_loc);
        tail_loc = [tail, col];
        tail_exists = !GAME.isBlank(tail_loc);

        if(tail_exists && head_exists) {
          if(GAME.get(head_loc) === GAME.get(tail_loc) && mergeable)
            GAME.merge(head_loc,tail_loc);

          mergeable = false;
        }
        if(!head_exists && tail_exists)
            GAME.move(head_loc, tail_loc);

      } // end of tail for
    } // end of head for
  } // end of row for
}

function down_arrow(){
  var head_loc;
  var tail_loc;
  var head_exists = false;
  var tail_exists = false;
  var mergeable = true;
  // take care of columns
  for(var col = 0; col < 4; col ++){
    for(var head = 0; head < 3; head ++){
      head_loc = [head, col];
      mergeable = true;
      for(var tail = head + 1; tail < 4; tail ++){
        head_exists = !GAME.isBlank(head_loc);
        tail_loc = [tail, col];
        tail_exists = !GAME.isBlank(tail_loc);

        if(tail_exists && head_exists) {
          if(GAME.get(head_loc) === GAME.get(tail_loc) && mergeable)
            GAME.merge(head_loc,tail_loc);

          mergeable = false;
        }
        if(!head_exists && tail_exists)
            GAME.move(head_loc, tail_loc);


      } // end of tail for
    } // end of head for
  } // end of row for
}

function right_arrow(row){
  var head_loc;
  var tail_loc;
  var head_exists = false;
  var tail_exists = false;
  var mergeable = true;
  // take care of columns
  for(var row = 0; row < 4; row ++){
    for(var head = 3; head >= 1; head --){
      head_loc = [row, head];
      mergeable = true;
      for(var tail = head - 1; tail >= 0; tail --){
        head_exists = !GAME.isBlank(head_loc);
        tail_loc = [row, tail];
        tail_exists = !GAME.isBlank(tail_loc);

        if(tail_exists && head_exists) {
          if(GAME.get(head_loc) === GAME.get(tail_loc) && mergeable)
            GAME.merge(head_loc,tail_loc);

          mergeable = false;
        }
        if(!head_exists && tail_exists)
            GAME.move(head_loc, tail_loc);


      } // end of tail for
    } // end of head for
  } // end of row for
} // end of right arrow

function left_arrow(){
  var head_loc;
  var tail_loc;
  var head_exists = false;
  var tail_exists = false;
  var mergeable = true;

  for(var row = 0; row < 4; row ++){
    for(var head = 0; head < 3; head ++){
      head_loc = [row, head];
      mergeable  = true;
      for(var tail = head + 1; tail < 4; tail ++){
        head_exists = !GAME.isBlank(head_loc);
        tail_loc = [row, tail];
        tail_exists = !GAME.isBlank(tail_loc);

        if(tail_exists && head_exists) {
          if(GAME.get(head_loc) === GAME.get(tail_loc) && mergeable)
            GAME.merge(head_loc,tail_loc);

          mergeable = false;
        } // end of tail exists and head exists
        if(!head_exists && tail_exists)
            GAME.move(head_loc, tail_loc);

      } // end of tail for
    } // end of head for
  } // end of row for
} // end of

function checkKey(e) {

    e = e || window.event;
    var tbl = document.getElementById('1024');

    if (e.keyCode == '38') {
        down_arrow();
        updateGame();
    }
    else if (e.keyCode == '40') {
        // down arrow
        up_arrow();
        updateGame();
    }
    else if (e.keyCode == '37') {
       // left arrow
       left_arrow();
       updateGame();
    }
    else if (e.keyCode == '39') {
       // right arrow
       right_arrow();
       updateGame();
    }

}
