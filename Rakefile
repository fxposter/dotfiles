require 'rake'
require 'erb'

desc "Install the dot files into user's home directory"
task :install do
  replace_all = false
  Dir[*file_selectors].each do |file|
    next if %w[Rakefile README.md LICENSE linux macosx macosx/iterm windows].include? file

    target_file = target_path(file)
    if File.exist?(File.join(ENV['HOME'], target_file)) || File.symlink?(File.join(ENV['HOME'], target_file))
      if File.identical? file, File.join(ENV['HOME'], target_file)
        puts "identical ~/#{target_file}"
      elsif replace_all
        replace_file(file)
      else
        print "overwrite ~/#{target_file}? [ynaq] "
        case $stdin.gets.chomp
        when 'a'
          replace_all = true
          replace_file(file)
        when 'y'
          replace_file(file)
        when 'q'
          exit
        else
          puts "skipping ~/#{target_file}"
        end
      end
    else
      link_file(file)
    end
  end
end

def file_selectors
  selector = ['*']
  if RUBY_PLATFORM.downcase.include?('darwin')
    selector << 'macosx/*'
  elsif RUBY_PLATFORM.downcase.include?('linux')
    selector << 'linux/*'
  else # windows?
    selector << 'windows/*'
  end
end

def target_path(file)
  ".#{File.basename(file).sub(/.erb$/, '')}"
end

def replace_file(file)
  system %Q{rm -rf "$HOME/#{target_path(file)}"}
  link_file(file)
end

def link_file(file)
  target_file = target_path(file)
  if file =~ /.erb$/
    puts "generating ~/#{target_file}"
    File.open(File.join(ENV['HOME'], target_file), 'w') do |new_file|
      new_file.write ERB.new(File.read(file)).result(binding)
    end
  else
    puts "linking ~/#{target_file}"
    system %Q{ln -s "$PWD/#{file}" "$HOME/#{target_file}"}
  end
end

