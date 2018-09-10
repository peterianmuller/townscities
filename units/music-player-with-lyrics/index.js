console.clear();
var _data = JSON.parse(
   `{"lyrics":[{"line":"","time":-1},{"line":"Hey, let's all go into the forest","note":"Verse 1","time":16000},{"line":"Nobody will notice for a while","time":20000},{"line":"There we can visit all the creatures","time":24000},{"line":"Maybe they can teach us facts of life","time":27500},{"line":"","time":32000},{"line":"Or we can travel to the ocean","note":"Verse 2","time":55500},{"line":"Don't forget your lotion","time":59500},{"line":"It's quite hot","time":61500},{"line":"I once met seven lovely crabs","time":64000},{"line":"They said I should go back and join them for tea","time":67500},{"line":"","time":72000},{"line":"Oh wait, the forest got demolished","note":"Verse 3","time":95500},{"line":"When they built the airport years ago","time":99000},{"line":"But we can still go see the ocean","time":103500},{"line":"Cause they put it in a bowl at the mall","time":107500},{"line":"","time":112000}]}`
);

var _data = JSON.parse(
   `{"lyrics":[{"line":"","time":-1},
               {"line":"Present simple","note":"Verse 1","time":4000},
               {"line":"I go you go he goes","time":5900},
               {"line":"she goes it goes you go","time":8800},
               {"line":"they go and we go together","time":11800},
               {"line":"","time":16300},
               {"line":"present continuous","time":16500},
               {"line":"I am going you are going he is going","time":18000},
               {"line":"she is going it is going you are going","time":21000},
               {"line":"they are going","time":24000},
               {"line":"we are going together","time":25900},
               {"line":"","time":27800},
               {"line":"simple past","time":29000},
               {"line":"I went you went","time":30500},
               {"line":"he went she went it went","time":32000},
               {"line":"you went","time":35800},
               {"line":"Cause they put it in a bowl at the mall","time":107500},
               {"line":"","time":112000}]}`
);

console.log(_data);

var currentLine = '';

function align() {
   var a = $('.highlighted').height();
   var c = $('.content').height();
   console.log($('.highlighted'));
   var d =
      $('.highlighted').offset().top -
      $('.highlighted')
         .parent()
         .offset().top;
   var e = d + a / 2 - c / 2;
   $('.content').animate({ scrollTop: e + 'px' }, { easing: 'swing', duration: 250 });
}

var lyricHeight = $('.lyrics').height();
$(window).on('resize', function() {
   if ($('.lyrics').height() != lyricHeight) {
      //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
      lyricHeight = $('.lyrics').height();
      align();
   }
});

$(document).ready(function() {
   $('video').on('timeupdate', function(e) {
      var time = this.currentTime * 1000;
      var past = _data['lyrics'].filter(function(item) {
         return item.time < time;
      });
      if (_data['lyrics'][past.length] != currentLine) {
         currentLine = _data['lyrics'][past.length];
         $('.lyrics div').removeClass('highlighted');
         $(`.lyrics div:nth-child(${past.length})`).addClass('highlighted'); //Text might take up more lines, do before realigning
         align();
      }
   });
});

generate();

function generate() {
   var html = '';
   for (var i = 0; i < _data['lyrics'].length; i++) {
      html += '<div';
      if (i == 0) {
         html += ` class="highlighted"`;
         currentLine = 0;
      }
      html += '>';
      html += _data['lyrics'][i]['line'] == '' ? '&middot;' : _data['lyrics'][i]['line'];
      html += '</div>';
   }
   $('.lyrics').html(html);
   align();
}