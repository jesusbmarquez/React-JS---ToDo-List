const router = require('express').Router();
//importar modelo 
const todoItemsModel = require('../models/todoItems');


//crear ruta -- agregar item a base de datos
router.post('/api/item', async (req, res)=>{
  try{
    const newItem = new todoItemsModel({
      item: req.body.item
    })
    //guardar el item en la base de datos
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})

// segunda ruta -- obtener los datos de la base de datos
router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    } catch (err) {
        res.json(err);
    }
})

// tercer ruta --- Actualizar los items de la base de datos
router.put('/api/item/:id', async (req, res) => {
    try {
        // encontrar el item por su id
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item actualizado');
    } catch (err) {
        res.json(err);
    }
})

// Borrar registro o item de la DB
router.delete('/api/item/:id', async (req, res)=>{
    try{
      //encontrar el item o tarea por su id para borrarlo
      const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Item borrado');
    }catch(err){
      res.json(err);
    }
  })


// exportar ruta
module.exports = router;