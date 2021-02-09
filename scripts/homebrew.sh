#!/bin/sh

# Check for homebrew and install if needed
echo "Installing homebrew ..."

which -s brew
if [[ $? != 0 ]] ; then
  yes | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "Homebrew already installed ..."
fi
echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> /Users/riza/.zprofile
eval $(/opt/homebrew/bin/brew shellenv)

brew update
brew upgrade

# GNU core utilities
brew install coreutils
brew install moreutils
brew install findutils

# Install zsh
brew install zsh
brew install tree
brew install antigen

# Highlighting
brew install source-highlight

# Git
brew install git
brew install ydiff
brew install hub

# Development
brew install python
brew install python3
#brew install php@7.3
brew install node
brew install nvm
brew install yarn

# Other
brew install mas
brew install wget
brew install micro
brew install gnupg
brew install ssh-copy-id

brew cleanup
