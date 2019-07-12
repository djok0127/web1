var Link = {
  setColor:function(color){
  //   var i;
  //   var alist = document.querySelectorAll('a');
  //   for(i = 0; i < alist.length; i++ ){
  //     alist[i].style.color = color;
  //   }
  // }
  // jQuery
  $('a').css('color',color);
  }
}

var Body = {
  setColor:function(color){
    //document.querySelector('body').style.color = color;
    $('body').css('color',color);
  },
  setBackGroundColor:function(color){
      // document.querySelector('body').style.backgroundColor = color;
      $('body').css('backgroundColor',color);
  }
}

function nightDayHandler(self){
  var target = document.querySelector('body');
  if(self.value === 'night'){
    Body.setBackGroundColor('black');
    Body.setColor('white')
    self.value = 'day';
    Link.setColor('white');
  } else {
    Body.setBackGroundColor('white');
    Body.setColor('black')
    self.value = 'night';
    Link.setColor('black');
  }
}
