require 'rubygems'

require 'looksee'
require 'ap'

begin
  require 'hirb'
  Hirb.enable
rescue LoadError => ex
  puts "Cannot load hirb, please 'gem install hirb' or add it to Gemfile"
end

begin
  require 'wirble'
  Wirble.init
  Wirble.colorize
rescue LoadError => ex
  puts "Cannot load wirble, please 'gem install wirble' or add it to Gemfile"
end

