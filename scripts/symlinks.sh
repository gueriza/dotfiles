#!/bin/sh

symlink_dotfile() {
  ln -sfv $(grealpath $1) "$HOME/.$1"
}

symlink() {
  ln -sfv $(grealpath $1) "$HOME/$1"
}

echo "Creating symlinks ..."

pushd ./dots
symlink_dotfile .aliases
symlink_dotfile .gitconfig
symlink_dotfile .gitignore
symlink_dotfile .gitmessage
symlink_dotfile .zshrc
symlink_dotfile .zsh_plugins.txt

# SSH
mkdir "$HOME/.ssh"
ln -sfv $(grealpath ssh-config) "$HOME/.ssh/config"
popd

# Common Prompt
ln -s ~/.dotfiles/zsh/prompt/common.zsh-theme $HOME/.oh-my-zsh/themes

# VS Code
rm -rf ~/Library/Application\ Support/VSCodium/User
ln -s ~/.dotfiles/vscodium/User ~/Library/Application\ Support/VSCodium/User

