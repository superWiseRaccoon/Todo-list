import React, { useState } from 'react';
import styled from "styled-components";
import "./TodoList.css";

const TodoList = () => {
  const [toDoList, setToDoList] = useState([]);

  const [toDo, setTodo] = useState({
    text: '',
    id: '',
    checked: false
  });

  const handleInput = (e) => {
    const newInput = {
      ...toDo,
      [e.target.name]: e.target.value
    };
    setTodo(newInput);
  };

  const submit = () => {
    let newInput = {
      ...toDo,
      id: Date.now()
    };
    setToDoList([...toDoList, newInput]);
    newInput = {
      ...toDo,
      text: ''
    };
    setTodo(newInput);
  }

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  }

  const handleCheck = (key) => {
    const newList = toDoList.map((item) => {
      if (item.id === key) {     
        return {
          ...item,
          checked: !item.checked
        }
      } else {
        return item;
      }
    });
    setToDoList(newList);
  }

  const handleDelete = (key) => {
    const newList = toDoList.filter((item) => {
      if (item.id !== key) {
        return item
      }
    });
    setToDoList(newList);
  }
  const test = 2;
  return (
    <div id='container'>
      <div id='header'>
        <div id='title' className='center'>Todo-list</div>
        <div id='submitBox'>
          <input name='text' type='text' value={toDo.text} spellCheck='false' onChange={(e) => handleInput(e)} onKeyDown={(e) => activeEnter(e)} />
          <button type='button' onClick={() => submit()}>+</button>
        </div>
      </div>
      <div id='body'>
        <div id='listBox'>
          {toDoList.map((item) => {
            return (
              <div className='item' key={item.id}>
                <div className='textBox'>
                  <input type='checkbox' id={item.id} onChange={() => handleCheck(item.id)} />
                  <label htmlFor={item.id}
                    style={{color: item.checked && 'rgb(21, 87, 255)',
                  textDecoration: item.checked && 'line-through'}}
                  >{item.text}</label>
                </div>
                <div className='btnBox'>
                  <button type='button' onClick={() => handleDelete()}>수정</button>
                  <button type='button' onClick={() => handleDelete(item.id)}>삭제</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div id='footer'>
        {!toDoList[0] && <div className='center' id='blankMessage'>toDoList가 비어있습니다.</div>}
      </div>
    </div>
  );
};

export default TodoList;