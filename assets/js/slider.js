//Slider
$(function() {
  var slider = $('#slider');
  var gallery;
    $.get('/i',function(data, status){
      gallery = data;
      $.each(gallery.albums, function(index, value){
        slider.append('<section id="album-'+index+'">'+value.name+'</section>');
        $.each(value.images, function(i,image){
            console.log(image);
          $('#album-' + index).append('<img src="/i/'+ image.url +'"/>');
        });
    });
  });
});
