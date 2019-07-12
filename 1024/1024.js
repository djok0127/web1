
// Description: Create Random location of x and y, limited by same max value
// @Param : Maximum value of the location
// @return : returns the random value in between
function getRandomLocation(max) {
  var x = Math.floor(Math.random() * max);
  var y = Math.floor(Math.random() * max);
  return [x,y];
} // end of function getRandomLocation

// Description : makes square Table
// @Param : value of rows and columns
function getTable(max) {
  document.onkeydown = checkKey;
  var body = document.body,
      tbl  = document.createElement('table');
      tbl.setAttribute('id','1024');

  tbl.style.width  = '400px';
  tbl.style.height = '400px';
  tbl.style.border = '3px solid black';
  tbl.align = 'center';

  var location1 = getRandomLocation(4);
  var location2 = getRandomLocation(4);
  while(location2 === location1){
    location2 = getRandomLocation(4);
  }



  for(var i = 0; i < max; i++){
      var tr = tbl.insertRow();

      for(var j = 0; j < max; j++){
            var td = tr.insertCell();

            // td.appendChild(document.createTextNode('Cell'));
            if( (i === location1[0] && j === location1[1]) || (i ===location2[0] && j === location2 [1]) ) {
              td.appendChild(document.createTextNode('2'));
              td.style.backgroundColor = 'yellow';
            } else {
              td.appendChild(document.createTextNode(''));
            }
            td.style.border = '1px solid black';
            td.style.height = '100px';
            td.style.width = '100px';
            td.align = 'center';
            //td.style.align = 'center';
      } // end of cell for loop
  } //  end of row for loop
  body.appendChild(tbl);
} // end of getTable

function removeTable(id)
{
    var tbl = document.getElementById(id);
    if(tbl) tbl.parentNode.removeChild(tbl);
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        removeTable('1024');
        getTable(4);
    }
    else if (e.keyCode == '40') {
        // down arrow
        removeTable('1024');
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}
