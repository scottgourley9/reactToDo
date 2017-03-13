update tasks
  set active=false, complete=true
  where id = $1
