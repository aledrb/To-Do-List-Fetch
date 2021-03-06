import React, { useState } from "react";
export function Home() {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");
	function deleteItems(index) {
		if (index > -1) {
			const filterList = todos.filter(item => item !== todos[index]);
			setTodos(filterList);
		}
	}
	return (
		<div className="text-center mt-5 container">
			<h1>TODO LIST WITH REACT</h1>
			<form
				onSubmit={evento => {
					evento.preventDefault();
					if (task.length > 0) setTodos([...todos, task]);
					setTask("");
				}}>
				<input
					className="form-control form-control-lg"
					placeholder="Ingrese su tarea"
					onChange={evento => setTask(evento.target.value)}
					value={task}></input>
			</form>
			<ul className="list-group">
				{todos.map((item, index) => {
					return (
						<li className="list-group-item tareas" key={index}>
							<span>{item}</span>
							<button
								className="btn btn-light float-right"
								onClick={() => {
									deleteItems(index);
								}}>
								<i className="fa fa-check"></i>
							</button>
						</li>
					);
				})}
			</ul>
			<div className="itemsLeft">{todos.length} Items left</div>
		</div>
	);
}
