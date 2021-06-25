import React, { useState, useEffect } from "react";
export function Home() {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState({ label: "", done: false });
	function deleteItems(index) {
		if (index > -1) {
			const filterList = todos.filter(item => item !== todos[index]);
			setTodos(filterList);
		}
	}
	const crearTodo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejandra", {
			method: "POST",
			body: [],
			headers: {
				"Content-Type": "application/json"
			}
		});
	};
	const listarTodo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejandra", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(newRes => newRes.json())
			.then(response => setTodos(response));
	};
	useEffect(() => {
		crearTodo();
		listarTodo();
	}, []);
	return (
		<div className="text-center mt-5 container">
			<h1>TODO LIST WITH REACT</h1>
			<form
				onSubmit={evento => {
					evento.preventDefault();
					if (task.label.length > 0) setTodos([...todos, task]);
					setTask({ label: "", done: false });
				}}>
				<input
					className="form-control form-control-lg"
					placeholder="Ingrese su tarea"
					onChange={evento =>
						setTask({ label: evento.target.value, done: false })
					}
					value={task.label}></input>
			</form>
			<ul className="list-group">
				{todos.map((item, index) => {
					return (
						<li className="list-group-item tareas" key={index}>
							<span>{item.label}</span>
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
