const express = require('express');
const db = require('./db.js')

const router = express.Router()

// READ ALL Users
router.get('/items', async(req, res) => {
    const { success, data } = await db.readAllUsers()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Get User by ID
router.get('/item/:id', async(req, res) => {
    const { id } = req.params
    const { success, data } = await db.getUserById(id)
    console.log(data)
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Create User
router.post('/item', async(req, res) => {
    const { success, data } = await db.createOrUpdate(req.body)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})


// Update User by ID
router.put('/item/:id', async(req, res) => {
    const user = req.body
    const { id } = req.params
    user.id = parseInt(id)

    const { success, data } = await db.createOrUpdate(user)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Delete User by Id
router.delete('/item/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await db.deleteUserById(id)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})
  



module.exports = router;