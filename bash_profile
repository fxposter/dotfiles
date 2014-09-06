export LANG=en_US.UTF-8
export LC_CTYPE=en_US.UTF-8
export GOPATH=$HOME/go
export PATH=$HOME/bin:/usr/local/bin:/usr/local/sbin:$PATH:/usr/local/share/npm/bin:$HOME/go/bin
export EDITOR=lime
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_05.jdk/Contents/Home/
export ANDROID_HOME=/usr/local/opt/android-sdk
export DOCKER_HOST=tcp://192.168.59.103:2375

export HISTCONTROL=ignoredups:erasedups
export HISTSIZE=5000
shopt -s histappend

source ~/.bash/completion
source ~/.bash/git
source ~/.bash/aliases
source ~/.bash/prompt
source ~/.bash/colors
source ~/.bash/ruby
source ~/.bash/diff
[[ -f "$HOME/.bashrc_local" ]] && source "$HOME/.bashrc_local"

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"

source /usr/local/opt/chruby/share/chruby/chruby.sh
source /usr/local/opt/chruby/share/chruby/auto.sh
