require 'rubygems'

begin
  require 'ap'
rescue LoadError
end

begin
  require 'wirble'
  Wirble::Colorize.colors.merge!(:symbol => :purple, :symbol_prefix => :red)
  Wirble.init
  Wirble.colorize
rescue LoadError => ex
  puts "Cannot load wirble, please 'gem install wirble' or add it to Gemfile"
end

begin
  require 'hirb'
  Hirb.enable :pager_command => 'less -r'
rescue LoadError => ex
  puts "Cannot load hirb, please 'gem install hirb' or add it to Gemfile"
end

begin
  require 'looksee'
rescue LoadError
end
