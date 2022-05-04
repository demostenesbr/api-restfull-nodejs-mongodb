const router = require('express').Router()

const res = require('express/lib/response');
const Person = require('../Models/Person')

// Create - Criação de dados

router.post('/', async (req, res) => {
    //req.body = JSON.stringify
    const { name, salary, approved } = req.body;
    // { name: '', salary: '', approved: '' }

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
    }

    const person = new Person({
        name,
        salary,
        approved,
    });

    try {
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

// Read - Leitura de dados 

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();

        res.status(200).json(people);

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    // console.log(req)
    // Extract the id request, from the URL = req.params
    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id});

        if(!person) {
            res.status(422).json({message: 'Pessoa não encontrada!'})
            return
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Update - atualização de dados (PUT, PATCH)

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person);

        if(!updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Pessoa não encontrada!'})
            return
        }
        
        res.status(200).json(person)
    
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Delete - deletar dados 

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id});

    if(!person) {
        res.status(422).json({message: 'Pessoa não encontrada!'})
        return
    }

    try {
        await Person.deleteOne({_id: id});
        res.status(200).json({message: 'Pessoa deletada com sucesso!'})
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router;