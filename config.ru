# frozen_string_literal: true

require_relative 'config/config'
require_relative 'app'
# TODO: add reloader
run App.freeze.app
