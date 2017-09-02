# frozen_string_literal: true

require 'roda'
require 'json'
require 'pry'
require 'pry-byebug'
require 'base64'
require 'ruby-filemagic'
require 'config'
require_relative '../models/slide'
Config.load_and_set_settings(
  [
    Dir.pwd,
    'config',
    "settings.#{ENV['RACK_ENV'] || 'development'}.yml"
  ].join('/')
)
Settings.root_path = Dir.pwd
