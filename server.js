require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

let movies = [
  { id: 1, title: "inception", year: 2010},
  { id: 2, title: "interstellar", year: 2014}
]

let tasks = [
  { id: 1, title: "Estudar Node.js", completed: false, priority: "high" },
  { id: 2, title: "Fazer LAB-1", completed: true, priority: "medium" }
];

app.get("/movies", (req, res) => {
  if (movies.lenght === 0){
    return res.status(404).json({ message: "No movies found" })
  }

    res.status(200).json(movies)
})

app.get('/movies/:id', (req, res) => {

    const { 
        id
    } = req.params
    console.log(id)
    
    if (!id) {
        return res.status(404).json({ message: "Não foi adicionado nenhum ID aos parâmetros" })
    }

    const movie = movies.find((movie) => movie.id == id)

    if (!movie) {
        return res.status(404).json({ message: "Não foi achado nenhum filme com este ID" })
    }

    res.status(200).json({ message: "sucesso ao acessar a rota de get movies", movie })
})

app.post("/movies", (req, res) => {
    const { title, year} = req.body

    const id = movies.length + 1

    const newMovie = {
      id,
      title,
      year
    }
    
    movies.push(newMovie)
    res.status(200).json({ message: "Sucesso ao cadastrar um filme.", newMovie: newMovie})
})

app.put("/movies/:id", (req, res) =>{
    const { id } = req.params
    const { title, year } = req.body

    const movie = movies.find(movie => movie.id == id)

    if (title) {
      movie.title = title
    }
    if( year ){
      movie.year = year
    }
    
    if (!title && !year) {
      return res.status(404).json({ message: `Sucesso ao editar o filme de id ${id}`})
    }

    return res.status(200).json({ message: `Sucesso ao editar o filme de id ${id}`})
})

app.delete("/movies/:id",(req,res) => {
  const {id} = req.params

  const movieToDelete = movies.filter((movie)=>movie.id == id)

  movies = movies.filter((movie) => movie.id != movieToDelete)

  res.status(200).json({message:"Sucesso ao acessar rota de delete", updateMoviesList: movies})
})

// Tasks

app.get('/tasks', (req, res) => {

    const { completed } = req.query

    if(completed == undefined) {
        return res.status(200).json({ message: "Sucesso ao acessar a lista de tasks", tasks: tasks })
    }

    const isCompleted = completed === 'true'

    const tasksList = tasks.filter(task => task.completed === isCompleted)
    
    res.status(200).json({ 
        message: "Sucesso ao buscar tarefa", 
        tasksList 
    })
})

app.get('/tasks/stats', (req, res) => {
    let completedTasks = 0
    let pendentTasks = 0

    tasks.forEach(task => {
        if (task.completed) {
            completedTasks++
        }
    })
    
    tasks.forEach(task => {
        if (task.completed === false) {
            pendentTasks++
        }
    })

    res.status(200).json({ 
        message: "Sucesso ao buscar status gerais das tarefas", 
        tasksList: {
            totalTasks: tasks.length,
            completedTasks: completedTasks,
            pendentTasks: pendentTasks
        } 
    })
})


app.get('/tasks/:id', (req, res) => {

    const { 
        id
    } = req.params
    
    
    if (!id) {
        return res.status(404).json({ message: "Não foi adicionado nenhum ID aos parâmetros" })
    }

    const task = tasks.find((task) => task.id == id)

    if (!tasks) {
        return res.status(404).json({ message: "Não foi achado nenhuma task com este ID" })
    }

    res.status(200).json({ message: "sucesso ao acessar a rota de get task", task })
})

app.post('/tasks', (req, res) => {

    const tasksLenght = tasks.length

    const {
        title,
        priority
    } = req.body

    if (!title || !priority) {
        return res.status(404).json({ message: "Por favor, insira o titulo da task e o sua prioridade" })
    }

    if (priority != "low" && priority != "medium" && priority != "high") {
        return res.status(404).json({ message: "Por favor, insira uma prioridade válida (low, medium ou high)." })
    }

    const newTask = {
        id: tasksLenght + 1,
        title,
        completed: false,
        priority
    }

    tasks.push(newTask)

    res.status(200).json({ message: "Sucesso ao adicionar task nova", updatedTasks: tasks })
})

app.put("/tasks/:id", (req, res) =>{
    const { id } = req.params
    const { title, priority } = req.body

    const task = tasks.find(task => task.id == id)

    if (title) {
      task.title = title
    }
    if( priority ){
      task.priority = priority
    }
    
    if (!title && !priority) {
      return res.status(404).json({ message: `Sucesso ao editar a task de id ${id}`})
    }

    return res.status(200).json({ message: `Sucesso ao editar a task de id ${id}`})
})

app.delete("/tasks/:id",(req,res) => {
  const {id} = req.params

  const taskToDelete = tasks.filter((task)=>task.id == id)

  tasks = tasks.filter((task) => task.id != taskToDelete[0].id)

  res.status(200).json({message:"Sucesso ao acessar rota de delete", updatetasksList: tasks})
})

app.patch('/tasks/:id/toggle', (req, res) => {

    const { id } = req.params

    if (!id) return res.status(404).json({ message: "Forneça um ID"})

    const taskToEdit = tasks.filter(task => task.id == id)

    if (taskToEdit.length == 0) return res.status.json({ message: "Não foi encontrada nenhuma task com esse ID."})

    taskToEdit[0].completed = !taskToEdit[0].completed

    res.status(200).json({ message: `Sucesso ao editar o task de id ${id}`, updatedTask: taskToEdit[0] })
})

const PORT = process.env.SERVER_PORT || 3000;


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)

})
