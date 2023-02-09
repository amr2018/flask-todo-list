


let task_name = $('#task-name')
let task_des = $('#task-des')
let btn = $('#btn')

// update task
async function update_task (task_id) {

	let res = await fetch('/api/v1/update_task', {
		method: "POST", 
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify({task_id:task_id})
	})

	let data = await res.json()
	console.log(data)
	$('.tasks-cont').html('')
	get_all_tasks()
}

// delete task

async function delete_task (task_id) {
	let res = await fetch('/api/v1/delete_task', {
		method: "POST", 
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify({task_id:task_id})
	})

	let data = await res.json()
	console.log(data)
	$('.tasks-cont').html('')
	get_all_tasks()
}

// get all tasks
async function get_all_tasks () {
	let res = await fetch('/api/v1/get_task', {method: "GET"})
	let data_tasks = await res.json()
	let tasks = data_tasks['tasks'].reverse()
	let tasks_html = ''

	for (let i = 0; i <= tasks.length -1; i++) {
		//console.log(tasks[i])
		// add task in html 
		let state = ''
		let color = ''

		if (tasks[i][3] == 1) {
			state = '<i class="fi fi-rr-check"></i>'
			color = '#37c93d69'
		} else {
			state = '<i class="fi fi-rr-clock-three"></i>'
			color = '#00bcd459'
		}

		tasks_html += `
		<div class=task>

		  <div class=task-name>${tasks[i][1]}</div>
		  <div class=task-des>${tasks[i][2]}</div>
		  <div class="task-done" style="background-color:${color}"  >${state}</div>
		  <div class=task-options id=${tasks[i][0]}>
		     <div class="update-task bt">done</div>
		     <div class="delet-task bt">delete</div>
		  </div>

		</div>
		`
	}

	$('.tasks-cont').html(tasks_html)

	$('.update-task').click(function () {
		let task_id = $(this).parent().attr('id')
		update_task(task_id)
	})

	$('.delet-task').click(function () {
		let task_id = $(this).parent().attr('id')
		delete_task(task_id)
	})

	
}

get_all_tasks()

// add task 

btn.click(async (e) => {
	e.preventDefault()
	let res = await fetch('/api/v1/add_task', {

	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },

	  body: JSON.stringify({
	    name: task_name.val(),
	    des: task_des.val()
	  }),


	})

	let data = await res.json()
	task_name.val('')
	task_des.val('')

	//console.log(data)
	$('.tasks-cont').html('')
	get_all_tasks()
})

