$('#coverart').click(function() {
  if($(this).attr('src') == 'noalbum.png') {
    
    //Remove Visible HTML
    $('h3').remove();
    $('#coverart').remove();

    //Generate Static HTML
    heading = ['Track Name', 'Artist', 'Album', 'Cover', 'Release Date', 'Website', 'Genre'];
    classNames = [];
    for(var i = 0; i < 7; i++) {
      var id = heading[i].toLowerCase().replace(/\s/g, '')
      $('main').append('<section id="' + id + '"></section>');
      $('section#' + id).append('<ul></ul');
      $('section#' + id + ' ul').append('<h1>' + heading[i] + '</h1>');
      classNames.push(id);
    }
    $('body').append('<footer>End of list</footer>');

    //Output JSON
    $.getJSON('lab4.json', function(data) {
      
      //Generate Dynamic HTML
      for(var i = 0; i < 7; i++){
        for(var j = 0; j < data.songs.length; j++) {
          var liHead = '<li class="' + classNames[i] + '" id="' + j;
          //Cover Images
          if (i == 3) {
            $('section#' + classNames[i] + ' ul').append(liHead + '"><img src="#"/></li>');
          } else if (i == 5) {
            $('section#' + classNames[i] + ' ul').append(liHead + '"><a href=""></a></li>');
          } else {
            $('section#' + classNames[i] + ' ul').append(liHead + '"></li>');
          }
        }
      }

      //Input Data
      for(var i = 0; i < data.songs.length; i++) {
        $('#' + i + '.trackname').html(data.songs[i].trackName);
        $('#' + i + '.artist').html(data.songs[i].artist);
        $('#' + i + '.album').html(data.songs[i].album);
        $('#' + i + '.cover img').attr('src', data.songs[i].coverImage);
        $('#' + i + '.releasedate').html(data.songs[i].releaseDate);
        $('#' + i + '.website a').text(data.songs[i].website);
        $('#' + i + '.website a').attr('href', data.songs[i].website);
        $('#' + i + '.genre').html(data.songs[i].genre);
      }
    });
  }
});
