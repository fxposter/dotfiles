export LANG=en_US.UTF-8
export LC_CTYPE=en_US.UTF-8
export GOPATH=$HOME/go
export PATH=~/bin:/usr/local/bin:/usr/local/sbin:$PATH:/usr/local/share/npm/bin:$HOME/go/bin
export EDITOR=lime
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_45.jdk/Contents/Home

export HISTCONTROL=ignoredups:erasedups
export HISTSIZE=5000
shopt -s histappend

source ~/.bash/completion
source ~/.bash/git
source ~/.bash/aliases
source ~/.bash/prompt
source ~/.bash/colors
source ~/.bash/ruby
[[ -f "$HOME/.bashrc_local" ]] && source "$HOME/.bashrc_local"

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"
[[ -s `brew --prefix`/etc/autojump.bash ]] && source `brew --prefix`/etc/autojump.bash
