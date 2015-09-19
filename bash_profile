export LANG=en_US.UTF-8
export LC_CTYPE=en_US.UTF-8
export GOPATH=$HOME/go
export PATH=$HOME/bin:/usr/local/bin:/usr/local/sbin:$PATH:$HOME/go/bin:/usr/X11/bin
export EDITOR="lime -w"
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_60.jdk/Contents/Home/
export ANDROID_HOME=/usr/local/opt/android-sdk
export HISTCONTROL=ignoredups:erasedups
export HISTSIZE=5000
shopt -s histappend

source "$HOME/.bash/completion"
source "$HOME/.bash/git"
source "$HOME/.bash/aliases"
source "$HOME/.bash/prompt"
source "$HOME/.bash/colors"
source "$HOME/.bash/ruby"
source "$HOME/.bash/diff"
source "$HOME/.bash/docker"
[[ -f "$HOME/.bashrc_local" ]] && source "$HOME/.bashrc_local"

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"

source "$HOME/.iterm2_shell_integration.bash"
