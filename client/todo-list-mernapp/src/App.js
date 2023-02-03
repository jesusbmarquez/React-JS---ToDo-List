import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {

const [itemText, setItemText] = useState('');
const [listItems, setListItems] = useState([]);
const [isUpdating, setIsUpdating] = useState('');
const [updateItemText, setUpdateItemText] = useState('');

// agregar nuevo item 
const addItem = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5500/api/item', {item: itemText})
    setListItems(prev => [...prev, res.data]);
    setItemText('');
  } catch(err){
    console.log(err);
  }
}

// Funcion para traer todos los items de la DB -- Use Effect
useEffect(()=>{
  const getItemsList = async () => {
    try {
      const res = await axios.get('http://localhost:5500/api/items')
      setListItems(res.data);
      console.log('render')
    } catch(err){
      console.log(err);
    }
  }
  getItemsList()
},[]);

  // borrar item de la lista
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch(err) {
      console.log(err);
    }
  }

  // Actualizar item
  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      // mostrar el nuevo item o tarea actualizada
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }

  // funcion que muestra un campo input al dar click en editar y un nuevo boton para poder actualizar
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="Editar Tarea" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Actualizar</button>
    </form>
  )

  return (
    <div className="App">
      <h1>To-Do SPA</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Agregar tarea' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <button type="submit">Agregar</button>
      </form>
      <div className="todo-listItems">
{
          listItems.map(item => (
          <div className="todo-item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
                  <p className="item-content">{item.item}</p>
                  <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Editar</button>
                  <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Borrar</button>
                </>
            }
          </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
