const config = require('./config.js') 

// Create or Update items
const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: config.aws_table_name,
        Item: data
    }

    try{
        await config.db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false, error: error.message}
    }
}

// Read all items
const readAllItems = async()=>{
    const params = {
        TableName: config.aws_table_name
    }

    try {
        const { Items = [] } = await config.db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null, error: error.message }
    }

}

// Read Item by ID
const getItemById = async (value, key = 'id') => {
    const params = {
        TableName: config.aws_table_name,
        Key: {
            [key]: parseInt(value)
        }
    }
    try {
        const { Item = {} } =  await config.db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null, error: error.message}        
    }
}

// Delete item by ID
const deleteItemById = async(value, key = 'id' ) => { 
    const params = {
        TableName: config.aws_table_name,
        Key: {
            [key]: parseInt(value)
        }
    }
        
    try {
        await config.db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false, error: error.message}
    }
}


module.exports = {
    createOrUpdate,
    readAllItems,
    getItemById,
    deleteItemById
}