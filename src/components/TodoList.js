import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import "./TodoList.css";
import Paging from './Paging';

const TodoList = () => {
  const [toDoList, setToDoList] = useState([]);

  const [toDo, setTodo] = useState({
    text: '',
    id: '',
    checked: false,
    editOn: false,
    editText: ''
  });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const itemsCountPerPage = 7;
  
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

  const update = (key) => {
    const updateValue = toDoList.map((item) => {
      if (key === item.id) {
        return {
          ...item,
          text: toDo.editText,
          editOn: false
        }
      } else {
        return item
      }
    })
    setToDoList(updateValue);
  }

  const activeEnter = (e, type, key) => {
    if (e.key === "Enter") {
      switch (type) {
        case 'submit':
          submit();
          break;
        case 'update':
          update(key);
          break;
        default:
          break;
      }
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

  const handleEditSwitch = (key) => {
    const newList = toDoList.map((item) => {
      if (item.id === key) {
        const newTodo = {
          ...toDo,
          editText: item.text
        }
        setTodo(newTodo);
        return {
          ...item,
          editOn: !item.editOn
        }
      } else {
        return {
          ...item,
          editOn: false
        };
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

  const handleChangePage  = (num) => {
    let inputList = [];
    setPage(num);
    for (let i = (num-1) * itemsCountPerPage; i < num * itemsCountPerPage; i++) {
      inputList.push(toDoList[i]);
      if(i === toDoList.length-1) {
        break;
      };
    }
    setPages(inputList);
  }

  useEffect (() => {
    if(toDoList[0]) {
      if(toDoList[(page-1)*itemsCountPerPage]) {
        handleChangePage(page);        
      } else {
        handleChangePage(page-1);
      }
    }
  }, [toDoList]);

  return (
    <div id='container'>
      <div id='header'>
        <div id='title' className='center'>Todo-list</div>
        <div id='submitBox'>
          <input name='text' type='text' value={toDo.text} spellCheck='false' onChange={(e) => handleInput(e)} onKeyDown={(e) => activeEnter(e, 'submit')} />
          <button type='button' onClick={() => submit()}>+</button>
        </div>
      </div>
      <div id='body'>
        <div id='listBox'>
          {toDoList[0] && pages.map((item,index) => {
            return (
              <div className='item' key={item.id}>
                <div className='textBox'>
                  <input type='checkbox' id={item.id} onChange={() => handleCheck(item.id)} 
                  checked={item.checked ? true : false}
                  />
                  {
                    item.editOn ?

                      <input name='editText' type='text' className='editBox' value={toDo.editText} autoFocus spellCheck="false" onChange={(e) => handleInput(e)} onKeyDown={(e) => activeEnter(e, 'update', item.id)} /> :

                      <label htmlFor={item.id}
                        style={{
                          color: item.checked && 'rgb(21, 87, 255)',
                          textDecoration: item.checked && 'line-through'
                        }}
                      >{item.text}</label>
                  }
                </div>
                <div className='btnBox'>
                  {
                    item.editOn ?
                      <><button type='button' onClick={() => update(item.id)}>완료</button><button type='button' onClick={() => handleEditSwitch(item.id)}>취소</button></>
                      :
                      <><button type='button' onClick={() => handleEditSwitch(item.id)}>수정</button><button type='button' onClick={() => handleDelete(item.id)}>삭제</button></>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div id='footer'>
        {toDoList[0] ?
          <Paging totalItemsCount={toDoList.length} page={page} handleChangePage={handleChangePage} itemsCountPerPage={itemsCountPerPage}/>
          :
          <div className='center' id='blankMessage'>toDoList가 비어있습니다.</div>
        }
      </div>
    </div>
  );
};

export default TodoList;