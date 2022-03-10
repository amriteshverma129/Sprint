import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const tasks = [
  { id: 1, task: 'new task added to the Queue', priority: "low" },
  { id: 2, task: 'new task added to the Queue', priority: "hard" },
  { id: 3, task: 'new task added to the Queue', priority: "medium" },
  { id: 4, task: 'new task added to the Queue', priority: "hard" },
  { id: 5, task: 'new task added to the Queue', priority: "low" },
  { id: 6, task: 'new task added to the Queue', priority: "medium" },


]
function App() {
  const [todoList, setTodoList] = useState(tasks);
  const [doneList, setDoneList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [processList, setProcessList] = useState([]);

  let onDragEnd = (result) => {
    let newArr = [];
    const { source, destination } = result;
    let obj = [];
    if (source.droppableId === "todoList" && destination.droppableId !== "") {
      obj = todoList.splice(source.index, 1);
    }
    else if (source.droppableId === "processList" && destination.droppableId !== "") {
      obj = processList.splice(source.index, 1);
    }
    else if (source.droppableId === "reviewList" && destination.droppableId !== "") {
      obj = reviewList.splice(source.index, 1);
    }
    else if (source.droppableId === "doneList" && destination.droppableId !== "") {
      obj = doneList.splice(source.index, 1);
    }
    if (destination.droppableId === "todoList") {
      if (todoList.length === 0) {
        setTodoList([...todoList, ...obj])
      }
      else {
        newArr = todoList;
        newArr.splice(destination.index, 0, obj[0])
        setTodoList(newArr);
      }
    }
    else if (destination.droppableId === "processList") {
      if (processList.length === 0) {
        setProcessList([...processList, ...obj])
      }
      else {
        newArr = processList;
        newArr.splice(destination.index, 0, obj[0])
        setProcessList(newArr);
      }
    }
    else if (destination.droppableId === "reviewList") {
      if (reviewList.length === 0) {
        setReviewList([...reviewList, ...obj])
      }
      else {
        newArr = reviewList;
        newArr.splice(destination.index, 0, obj[0])
        setReviewList(newArr);
      }
    }
    else if (destination.droppableId === "doneList") {
      if (doneList.length === 0) {
        setDoneList([...doneList, ...obj])
      }
      else {
        newArr = doneList;
        newArr.splice(destination.index, 0, obj[0])
        setDoneList(newArr);
      }
    }
  }
  return (
    <div className="App">
      <div className='heading'>Sprint #4</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="Box">
          <Droppable droppableId='todoList'>
            {(provided) => (
              <div className='todoList' ref={provided.innerRef} {...provided.droppableProps}>
                <span style={{ color: "red" }}>To Do</span>
                <hr style={{ color: "red" }} />
                {todoList.map((item, index) => {
                  return (
                    <Draggable draggableId={String('todoList' + index)} index={index} key={index}>
                      {(provided) => (
                        <div className="taskBox" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                          {item.priority === "low" ? <span className='priority_low'>Low</span> : item.priority === "medium" ? <span className='priority_medium'>Medium</span> : <span className='priority_hard'>Hard</span>}<br />
                          <span className='task'>Task{item.id}</span><br />
                          <span>{item.task}</span><br />
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId='processList'>
            {(provided) => (<div className='processList' ref={provided.innerRef} {...provided.droppableProps} >
              <span style={{ color: "blue" }}>In Process</span><hr style={{ color: "blue" }} />
              {processList.map((item, index) => {
                return (
                  <Draggable draggableId={String(item.id)} index={index} key={index}>
                    {(provided) => (
                      <div className="taskBox" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        {item.priority === "low" ? <span className='priority_low'>Low</span> : item.priority === "medium" ? <span className='priority_medium'>Medium</span> : <span className='priority_hard'>Hard</span>}<br />
                        <span className='task'>Task{item.id}</span><br />
                        <span>{item.task}</span><br />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>)}
          </Droppable>
          <Droppable droppableId='reviewList'>
            {(provided) => (<div className='reviewList' ref={provided.innerRef} {...provided.droppableProps}>  <span style={{ color: "grey" }}>In Review</span><hr style={{ color: "grey" }} />
              {reviewList.map((item, index) => {
                return (
                  <Draggable draggableId={String(item.id)} index={index} key={index}>
                    {(provided) => (
                      <div className="taskBox" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        {item.priority === "low" ? <span className='priority_low'>Low</span> : item.priority === "medium" ? <span className='priority_medium'>Medium</span> : <span className='priority_hard'>Hard</span>}<br />
                        <span className='task'>Task{item.id}</span><br />
                        <span>{item.task}</span><br />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>)}
          </Droppable>
          <Droppable droppableId='doneList'>
            {(provided) => (<div className='doneList' ref={provided.innerRef} {...provided.droppableProps}>  <span style={{ color: "green" }}>Done</span><hr style={{ color: "green" }} />
              {doneList.map((item, index) => {
                return (
                  <Draggable draggableId={String(item.id)} index={index} key={index}>
                    {(provided) => (
                      <div className="taskBox" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        {item.priority === "low" ? <span className='priority_low'>Low</span> : item.priority === "medium" ? <span className='priority_medium'>Medium</span> : <span className='priority_hard'>Hard</span>}<br />
                        <span className='task'>Task{item.id}</span><br />
                        <span>{item.task}</span><br />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>)}

          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
