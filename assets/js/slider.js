//Slider
var Slider = {
  init(selector, options = {}){
    // TODO: merge options
    this.options = { preload: 2 };
    this.elem = $(selector);
    if(this.elem){
      this.load_data();
      this.set_album();
      this.set_events();
    }
    return this;
  },
  load_data(){
    var slider = this;
    $.get('/i',function(data, status){
      this.gallery = data;
      $.each(this.gallery.albums, function(index, value){
        slider.elem.append('<section class="album" id="album-'+index+'"><a href="#'+value.name+'">'+value.name+'</a></section>');
        $.each(value.files, function(i,file){
          slider.draw_file(index,file);
        });
      });
    });
  },
  set_album(album = false){
    album = album || this.elem.find('.album').first()
    this.current_album = {
      elem: album,
      index: 0,
    };
    this.current_album.items = this.current_album.elem.find('.file');
    this.current_album.items_len = this.current_album.items.length;
  },
  set_events(){
    var slider = this;
    $('.next').click(function() {
      slider.next_file(1);
      return false;
    });
    $('.prev').click(function() {
      slider.next_file(-1);
      return false;
    });
    this.elem.on('click', '.album', function() {
      slider.set_album($(this));
      slider.next_file(1);
    });
  },
  next_file(increment){
    this.current_album.index += increment;
    if(this.current_album.index > this.current_album.items_len - 1) {
      this.current_album.index = 0;
    }
    this.current_album.items.hide();
    var item = $(this.current_album.items[this.current_album.index])
    for(i = 0; i < this.options.preload; i++){
      preload  = $(this.current_album.items[this.current_album.index + increment])
      if(!preload.attr('src')){
        preload.attr('src', preload.data('src'));
      }
    }
    item.attr('src',item.data('src'));
    item.css('display','inline-block')
  },
  draw_file(index, file){
    if(file.type == 'image'){
      $('#album-' + index).append('<img class="file" data-src="/i/'+ file.url +'"/>');
    }
  }
};
$(function() {
  Slider.init('#slider');
});
