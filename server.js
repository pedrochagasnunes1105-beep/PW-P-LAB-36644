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

app.get("/tasks", (req, res) => {
  if (tasks.lenght === 0){
    return res.status(404).json({ message: "No tasks found" })
  }

    res.status(200).json(tasks)
})

app.get('/tasks/:id', (req, res) => {

    const { 
        id
    } = req.params
    console.log(id)
    
    if (!id) {
        return res.status(404).json({ message: "Não foi adicionado nenhum ID aos parâmetros" })
    }

    const task = tasks.find((task) => task.id == id)

    if (!tasks) {
        return res.status(404).json({ message: "Não foi achado nenhuma task com este ID" })
    }

    res.status(200).json({ message: "sucesso ao acessar a rota de get task", task })
})

app.post("/tasks", (req, res) => {
    const { priority, title} = req.body

    const id = tasks.length + 1

    const newtask = {
      id,
      title,
      priority
    }
    
    tasks.push(newtask)
    res.status(200).json({ message: "Sucesso ao cadastrar uma task.", newtask: newtask})
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

  tasks = tasks.filter((task) => task.id != taskToDelete)

  res.status(200).json({message:"Sucesso ao acessar rota de delete", updatetasksList: tasks})
})

const PORT = process.env.SERVER_PORT || 3000;


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)

})
