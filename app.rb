# frozen_string_literal: true

# Main app class
class App < Roda
  plugin :json
  plugin :render, engine: 'haml'
  plugin :assets, css: 'slider.scss', js: ['jquery-3.2.1.min.js', 'jquery.fullscreen-min.js', 'slider.js']
  compile_assets

  route do |r|
    r.assets unless ENV['RACK_ENV'] == 'production'
    # render preview slider
    r.root do
      view(:slider)
    end
    # render JSON with images info or specific image
    r.on 'i', String do |image|
      # TODO: check time availability.
      # TODO: check CSFR/XHR request.
      # TODO: configure x-sendfile
      slide = begin
                Slide.new(File.new(Slide.decode_url(image)))
              rescue
                nil
              end
      file = slide.file
      response.headers['Content-Type'] = FileMagic.new(FileMagic::MAGIC_MIME).file(file.path)
      response.headers['Content-Length'] = file.size.to_s
      if ENV['RACK_ENV'] == 'production'
        response.headers['X-Sendfile'] = file.path
      else
        response.body << file.read
      end
    end
    # render JSON for galleries
    r.on 'i' do
      # TODO: check CSFR/XHR request.
      Slide.all
    end
  end
end
