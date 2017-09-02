# frozen_string_literal: true

# Slide class which represts single photo, album or movie
class Slide
  attr_accessor :name, :url, :date, :type
  attr_reader :file_path

  def initialize(file)
    @file_path = file.path
    self.date = file.stat.ctime
    self.name = File.basename(file.path, '.*')
    self.type = FileMagic.new(FileMagic::MAGIC_MIME).file(file_path).split('/').first
    generate_url(file)
    self
  end

  def to_s
    name
  end

  def to_h
    { name: name, url: url, date: date , type: type }
  end

  def file
    File.open(decode_url)
  end

  def decode_url
    self.class.decode_url(url)
  end

  def self.decode_url(url)
    Base64.strict_decode64(url)
  end

  def self.all
    slides = { albums: [] }
    albums = []
    Dir.glob([Settings.gallery.path,'**/'].join('/')).each do |node|
      albums << node
    end
    albums.each do |album|
      object = { name: File.basename(album, '.*'), images: [] }
      images = Dir.glob([album,'*'].join('/')).collect do |image|
        Slide.new(File.open(image)).to_h
      end
      object[:images] = images
      slides[:albums] << object
    end
    slides
  end

  protected

  def generate_url(_file)
    self.url = Base64.strict_encode64(file_path)
  end
end
