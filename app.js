let exp = parseInt(localStorage.getItem("exp")) || 0
let projects = JSON.parse(localStorage.getItem("projects")) || []

function addProject() {

    let name = document.getElementById("projectName").value

    let project = {
        name: name,
        tasks: []
    }

    projects.push(project)

    render()

}

function addTask(projectIndex) {

    let taskName = prompt("サブタスク名")

    projects[projectIndex].tasks.push({
        name: taskName,
        done: false
    })

    render()

}

function toggleTask(projectIndex, taskIndex) {

    let task = projects[projectIndex].tasks[taskIndex]

    if (!task.done) {
        task.done = true
        exp += 5
        alert("サブタスク完了！ +5EXP")
    }


    localStorage.setItem("exp", exp)

    render()

}

function render() {

    let container = document.getElementById("projects")

    container.innerHTML = ""

    projects.forEach((project, pIndex) => {

        let done = project.tasks.filter(t => t.done).length
        let total = project.tasks.length

        let percent = total == 0 ? 0 : Math.floor(done / total * 100)

        let html = `
<div class="project">

<h3>${project.name}</h3>

<div class="progressBar">
<div class="progressFill" style="width:${percent}%"></div>
</div>

<p>${percent}%</p>

<button onclick="addTask(${pIndex})">サブタスク追加</button>

<ul>
`

        project.tasks.forEach((task, tIndex) => {

            html += `
<li>
<input type="checkbox"
${task.done ? "checked" : ""}
onclick="toggleTask(${pIndex},${tIndex})">
${task.name}
</li>
`

        })

        html += `</ul></div>`

        container.innerHTML += html

    })

    localStorage.setItem("projects", JSON.stringify(projects))

    document.getElementById("expDisplay").innerText = "EXP: " + exp

}