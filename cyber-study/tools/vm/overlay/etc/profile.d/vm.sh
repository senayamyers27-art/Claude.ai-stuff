# Web terminal: the page writes the terminal size to /run/vm-size ("rows cols") before it logs the student in.
export TERM=xterm-256color EDITOR=vi PAGER=less
if [ -t 0 ] && [ -r /run/vm-size ]; then
  read -r R C < /run/vm-size && [ -n "$R" ] && [ -n "$C" ] && stty rows "$R" cols "$C" 2>/dev/null
  unset R C
fi
