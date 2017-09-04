//Slider
$(function() {
  var slider = $('#slider');
  var gallery;
    $.get('/i',function(data, status){
      gallery = data;
      $.each(gallery.albums, function(index, value){
        slider.append('<section class="album" id="album-'+index+'"><a href="#'+value.name+'">'+value.name+'</a></section>');
        $.each(value.files, function(i,file){
          if(file.type == 'image'){
            $('#album-' + index).append('<img class="file" src="/i/'+ file.url +'"/>');
          }
        });
    });
  });
    var currentIndex = 0;
    var currentAlbum = $('.album').first();
    var items = currentAlbum.find('.file');
    var itemAmt = items.length;

    function cycleItems() {
       var item = items.eq(currentIndex);
       items.hide();
       item.css('display','inline-block');
    }

    var autoSlide = setInterval(function() {
          currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
                currentIndex = 0;
        }
        items = currentAlbum.find('.file'),
          cycleItems();
    }, 3000);

    $('.next').click(function() {
        clearInterval(autoSlide);
        currentIndex += 1;
        if(currentIndex > itemAmt - 1) {
          currentIndex = 0;
        }
        cycleItems();
        false;
    });

    $('.prev').click(function() {
          clearInterval(autoSlide);
          currentIndex -= 1;
        if (currentIndex < 0) {
                currentIndex = itemAmt - 1;
        }
          cycleItems();
        false;
    });

    slider.on('click', '.album', function() {
      clearInterval(autoSlide);
      items.hide();
      currentIndex = 0;
      currentAlbum = $(this);
      items = currentAlbum.find('.file');
      itemAmt = items.length;
      cycleItems();
    });
});
