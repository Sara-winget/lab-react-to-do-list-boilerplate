import { useEffect, useReducer, useState} from "react"
import './ToDo.css'
const initialValue={
  inputVal:'',
  list:[]
}
const ToDoList=(state,action)=>{
  switch(action.type){
    case 'enter':
      return {...state, inputVal:action.payload}
      case 'add':
        if(action.payload.trim()==='') return state;
        return {...state,list:[...state.list,action.payload],inputVal:''}
      case 'del':
        console.log(action.payload)
        return {...state,list:state.list.filter((_,index)=>index!==action.payload) }
        default:
        return state

  }
}
function ToDo(){
  const[state,dispatch]=useReducer(ToDoList,initialValue)
  return(
    <div className="toDo">
    <div className="add" style={{marginBottom:40,backgroundColor:'aqua'}}>
    <input
     style={{height:50,width:400,fontSize:32,backgroundColor:"snow"}}
     type="text"
     value={state.inputVal}
     placeholder="       Type here"
     onChange={(e)=>{dispatch({type:'enter',payload:e.target.value })}}
     />
    <button  style={{border:'4px solid', fontSize:20}} onClick={()=>{dispatch({type:'add',payload:state.inputVal})}}>Add Item</button>
<h2>{state.inputVal}</h2>
    </div>
     <div className="items">
<ul style={{listStyle:'none'}} className="uli">
{state.list.map((items,index)=>(
  
  <li className="list" key={index} style={{backgroundColor:"aqua"}}>
    <input value={items} style={{height:50,width:400,textAlign:"center",fontSize:30,backgroundColor:"snow"}}/>
  <button style={{border:'px solid', fontSize:20}} onClick={()=>{dispatch({type:'del',payload:index})}}>Delete Item</button>
  </li>
  
))}

</ul>

</div>

    </div>
  )
}

export default ToDo;