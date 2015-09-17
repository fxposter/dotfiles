export LANG=en_US.UTF-8
export LC_CTYPE=en_US.UTF-8
export GOPATH=$HOME/go
export PATH=$HOME/bin:/usr/local/bin:/usr/local/sbin:$PATH:/usr/local/opt/iojs/bin:$HOME/go/bin:/usr/X11/bin
export EDITOR="lime -w"
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_45.jdk/Contents/Home/
export ANDROID_HOME=/usr/local/opt/android-sdk
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/fxposter/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"

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

export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

source /Users/fxposter/.iterm2_shell_integration.bash
