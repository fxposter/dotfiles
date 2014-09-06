require 'irb/completion'

IRB.conf[:SAVE_HISTORY] = 5000

begin
  require 'ap'
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
