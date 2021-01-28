#!/bin/sh

# Check for homebrew and install if needed
echo "Installing homebrew ..."

which -s brew
if [[ $? != 0 ]] ; then
  yes | /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
  echo "Homebrew already installed ..."
fi

brew update
brew upgrade

# GNU core utilities
brew install coreutils
brew install moreutils
brew install findutils
ln -s "${BREW_PREFIX}/bin/gsha256sum" "${BREW_PREFIX}/bin/sha256sum"

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
brew install php@7.3
brew install node
brew install nvm
brew install yarn

# Other
brew install mas
brew install wget --with-iri
brew install micro
brew install gnupg
brew install ssh-copy-id

brew cleanup