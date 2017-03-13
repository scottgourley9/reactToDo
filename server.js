const express = require('express')
const bodyParser = require('body-parser')
const app = module.exports = express()
const massive = require('massive')
const connectionString = 'postgres://postgres:pass1234@localhost/toDoList'
const db = massive.connectSync({connectionString: connectionString})

app.use(bodyParser.json())

app.post('/api/tasks', function(req, res){
  console.log(req.body);
  db.create_task([req.body.task, req.body.timestamp], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('created')
    }
  })
})
app.get('/api/tasks', function(req, res){
  db.get_tasks([], function(err, tasks){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(tasks)
    }
  })
})
app.put('/api/tasks/:id', function(req, res){
  db.update_task([req.params.id, req.body.task], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('updated')
    }
  })
})
app.delete('/api/tasks/:id', function(req, res){
  db.delete_task([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('deleted')
    }
  })
})
app.put('/api/movetaskcomplete/:id', function(req, res){
  db.move_task_complete([req.params.id], function(err, success){
    if(err){
      console.log(err);
      res.status(500).json(err)
    }
    else {
      res.status(200).json('updated')
    }
  })
})
app.put('/api/movetaskactive/:id', function(req, res){
  db.move_task_active([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('updated')
    }
  })
})




app.listen(4000, function(){
  console.log('listening on port ', 4000);
})
