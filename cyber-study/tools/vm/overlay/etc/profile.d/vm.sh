# Web terminal: size it from the kernel command line the page passes (vmrows=/vmcols=), then greet the learner once.
export TERM=xterm-256color EDITOR=vi PAGER=less
if [ -t 0 ]; then
  for a in $(cat /proc/cmdline); do case $a in vmrows=*) R=${a#vmrows=};; vmcols=*) C=${a#vmcols=};; esac; done
  [ -n "$R" ] && [ -n "$C" ] && stty rows "$R" cols "$C" 2>/dev/null
  unset R C a
  [ -z "$VM_GREETED" ] && [ -f /etc/motd ] && cat /etc/motd && export VM_GREETED=1
fi
