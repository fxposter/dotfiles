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
rescue LoadError
end

begin
  require 'hirb'
  Hirb.enable :pager_command => 'less -r'
rescue LoadError
end

begin
  require 'looksee'
rescue LoadError
end
