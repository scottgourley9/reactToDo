update tasks
  set active=true, complete=false
  where id = $1
