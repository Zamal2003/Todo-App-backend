const express = require('express');
const router= express.Router();
const Task= require('../models/shemaTodo')

//get all todos
router.get('/', async (req, res)=>{
    try {
        const todos= await Task.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//post a new todo
router.post('/', async(req, res)=>{
    const todo= new Task({
        task: req.body.task,
    });
    try {
        const newTodo= await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

//put a todo
router.put('/:id', async(req, res)=>{
    try {
        const todo = await Task.findByIdAndUpdate(
            req.params.id,
            { task: req.body.task },
            { new: true } // Returns the updated document
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        
        res.json(todo);
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//delete todo by id
router.delete('/:id', async(req, res)=>{
    try {
        const todo= await Task.findById(req.params.id);
        if(!todo) return res.status(404).json({message: 'todo not found'});
        await todo.deleteOne();
        res.json({message: 'todo deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports= router;