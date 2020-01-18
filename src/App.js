import React,{Component} from 'react';
import './App.css';

class TodoList extends Component{
  constructor(){
    super()
    this.state = {
      showData:'All',
      todos : [],
      showBtn:'none',
      line:[],
      countTodo:0,
      StorageData:[]
    }
  }

  changeShow = (value) =>{
    this.setState({showData:value})
    let tempData = []

    if(this.state.StorageData.length){
      if(value === 'All'){
          tempData = this.state.StorageData
          this.setState({todos:tempData})
      }else if(value === 'Active'){

        for(let i=0;i<this.state.StorageData.length;i++){
          if(!this.state.StorageData[i].complited){
             tempData.push(this.state.StorageData[i])
          }
        }
        this.setState({todos:tempData})

      }else if(value === 'Completed'){
        for(let i=0;i<this.state.StorageData.length;i++){
          if(this.state.StorageData[i].complited){
             tempData.push(this.state.StorageData[i])
          }
        }
        this.setState({todos:tempData})
      }
   }
  }

  clearComplite = () =>{
    let tempData = []
    
    for(let i=0;i<this.state.StorageData.length;i++){
      if(!this.state.StorageData[i].complited){
         tempData.push(this.state.StorageData[i])
      }
    }

    this.setState({StorageData:tempData})
    this.setState({todos:this.state.StorageData})
    this.changeShow("Completed")
  }

  addTodo = (event) =>{
    if(event.keyCode === 13){
        const tempTodos = this.state.todos

        const data = {
          "title":event.target.value,
          "complited": false,
          "textDecoration":'none'
        }

        tempTodos.push(data)
        this.setState({todos:tempTodos})
        this.setState({StorageData:tempTodos})

        if(this.state.todos.length !== 0){
          this.setState({showBtn:'flex'})
        }else{
          this.setState({showBtn:'none'})
        }

        this.setState({countTodo:this.countTodo(this.state.todos)})
        event.target.value = ""
    }
  }

  countTodo = (data) =>{
    let result = 0
    if(data.length){
      for(let i=0;i<data.length;i++){
       if(data[i].complited === false){
          result+=1
        }
      }
      return result
    }

   }

  setDone = (index) =>{
    const tempData = this.state.todos

    if(this.state.todos[index].complited === false){
      tempData[index].complited = true
      tempData[index].textDecoration = 'line-through'
    }else{
      tempData[index].complited = false
      tempData[index].textDecoration = 'none'
    }
    
    this.setState({todos:tempData})
    this.setState({countTodo:this.countTodo(this.state.todos)})
    this.changeShow(this.state.showData)

  }

  render(){

    if(this.state.showData === 'All'){
      return(
        <>
        <div className='todo-app'>
          <div className='todo-app-body'>
            <div className='todo-app-title'>
              <h1>Todos</h1>
            </div>
            <div className='todo-app-body-content'>
              <input onKeyUp={this.addTodo} placeholder='What need to be done' className='todo-app-body-content-input'/>
            </div>
            {this.state.todos.map((item,index)=>
            <div className='todo-app-body-content' key={index}>
              <input  readOnly={true} onClick={()=>this.setDone(index)} value={item.title} 
                      style={{textDecoration:item.textDecoration}} className='todo-app-body-content-input'/>
            </div>
            )}
  
           <div className='todo-app-body-content' style={{display:this.state.showBtn,flexDirection:'row'}}>
            <div style={{paddingRight:'60px'}}>{this.state.countTodo} Item left</div>
            <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('All')} style={{border:'1px solid black'}}>All</button>
            <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('Active')}>Active</button>
            <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('Completed')}>Completed</button>
           </div>
  
          </div>
         
        </div>
        </>
      )
    }

    else if(this.state.showData === 'Active'){
        return(
          <>
          <div className='todo-app'>
            <div className='todo-app-body'>
              <div className='todo-app-title'>
                <h1>Todos</h1>
              </div>
              <div className='todo-app-body-content'>
                <input onKeyUp={this.addTodo} placeholder='What need to be done' className='todo-app-body-content-input'/>
              </div>
              {this.state.todos.map((item,index)=>
              <div className='todo-app-body-content' key={index}>
                <input  readOnly={true} onClick={()=>this.setDone(index)} value={item.title} 
                        style={{textDecoration:item.textDecoration}} className='todo-app-body-content-input'/>
              </div>
              )}
    
             <div className='todo-app-body-content' style={{display:this.state.showBtn,flexDirection:'row'}}>
              <div style={{paddingRight:'60px'}}>{this.state.countTodo} Item left</div>
              <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('All')}>All</button>
              <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('Active')} style={{border:'1px solid black'}}>Active</button>
              <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('Completed')}>Completed</button>
             </div>
             <div>
             </div>
    
            </div>
           
          </div>
          </>
        )
    }

    else if(this.state.showData === 'Completed'){
      return(
        <>
        <div className='todo-app'>
          <div className='todo-app-body'>
            <div className='todo-app-title'>
              <h1>Todos</h1>
            </div>
            <div className='todo-app-body-content'>
              <input onKeyUp={this.addTodo} placeholder='What need to be done' className='todo-app-body-content-input'/>
            </div>
            {this.state.todos.map((item,index)=>
            <div className='todo-app-body-content' key={index}>
              <input  readOnly={true} onClick={()=>this.setDone(index)} value={item.title} 
                      style={{textDecoration:'none'}} className='todo-app-body-content-input'/>
            </div>
            )}
  
           <div className='todo-app-body-content' style={{display:this.state.showBtn,flexDirection:'row'}}>
            <div style={{paddingRight:'60px'}}>{this.state.countTodo} Item left</div>
            <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('All')}>All</button>
            <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('Active')}>Active</button>
            <button className='todo-app-body-content-btn' onClick={()=>this.changeShow('Completed')} style={{border:'1px solid black'}}>Completed</button>
           </div>
           <div>
              <button className='todo-app-body-content-btn' onClick={()=>this.clearComplite()}>Clear Completed</button>
           </div>
          </div>
         
        </div>
        </>
      )
  }

   
  }
}

export default TodoList

