# frozen_string_literal: true

# TODO: move dependencies to single file.
require 'roda'
require 'json'
require 'pry'

# TODO: require App and routes separetly.
# Main app class
class App < Roda
  plugin :json
  plugin :render, engine: 'haml'
  plugin :assets, css: 'slider.scss', js: 'slider.js'
  compile_assets

  route do |r|
    r.assets unless ENV['RACK_ENV'] == 'production'
    # render preview slider
    r.root do
      view(:slider)
    end
    # render JSON with images info or specific image
    r.on 'i', String do |image|
      # TODO: decode proper image name and check time availability.
      # TODO: check CSFR/XHR request.
      @image = image
      "#{@image} requested"
    end

    r.on 'i' do
      # TODO: collect info about files/albums and render it as json.
      { images: ['image.jpg'] }
    end
  end
end

run App.freeze.app
