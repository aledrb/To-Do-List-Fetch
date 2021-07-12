import React, { useState, useEffect } from "react";
export function Home() {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState({});

	const crearTodo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejandra", {
			method: "POST",
			body: [],
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())

			.then(data => setTodos(data))

			.catch(error => {
				console.log(error);
			});
	};

	const listarTodo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejandra", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())

			.then(data => {
				setTodos(data);
				console.log(todos);
			})

			.catch(error => {
				console.log(error);
			});
	};
	const deleteItem = index => {
		console.log("me estoy ejecutando");
		let filterList = [];
		if (index > -1) {
			filterList = todos.filter(item => item !== todos[index]);
			setTodos(filterList);
		}
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejandra", {
			method: "PUT",
			body: JSON.stringify(filterList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())

			.then(data => {
				console.log(data);
			})

			.catch(error => {
				console.log(error);
			});
	};

	const updateTodo = evento => {
		evento.preventDefault();
		if (task.label.length > 0) setTodos([...todos, task]);
		setTask({ label: "", done: false });
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejandra", {
			method: "PUT",
			body: JSON.stringify([...todos, task]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())

			.then(data => {
				console.log(data);
			})

			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		listarTodo();
	}, []);

	return (
		<div className="text-center mt-5 container">
			<h1>TODO LIST WITH REACT</h1>
			<form
				onSubmit={evento => {
					updateTodo(evento);
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
									deleteItem(index);
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
