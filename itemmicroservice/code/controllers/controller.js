import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

export async function showAllItems(req, res) {
    try {
        // Fetch all items from the 'items' table
        const allItems = await db('items').select('*'); 
        // If no items are found, send a 404 response
        if (!allItems || allItems.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        // Send all items in the response
        res.status(200).json(allItems);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching all items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export async function createItem(req, res) {
    try {
        const { userid } = req.params; // Assuming `userid` is passed in the route

        // Send the `userid` back to the client for inclusion in the form
        res.status(200).json({
            message: "Ready to create an item",
            userid,
        });
    } catch (error) {
        console.error("Error preparing item creation:", error);
        res.status(500).json({ error: "Failed to prepare item creation." });
    }
}

export async function storeItem(req, res) {
    console.log("storeItem()");
    const userid = req.params.id; // `userid` is assumed to be part of the route
    console.log(req.body);
    const { name } = req.body; // Request body contains all attributes
    /*
    const name = "item1";
    */
    const description = "new item";
    const action = true;
    const available = true;

    // Check if data is provided
    if (!name || !description || !action || !available) {
        return res.status(400).send("Name, description, action, available are required");
    }

    try {
        
        // Insert the item into the database    
        await db('items').insert({
            userid: userid,        // Foreign key from the route
            name: name,          // Item name
            description: description,   // Item description
            action: action,        // Boolean for action
            available: available,     // Boolean for availability
        });

        //console.log(item);

        // Return success response
        res.status(201).json({
            message: "Item successfully created.",
            //itemId: id,
        });
    } catch (error) {
        console.error("Error storing item:", error);
        res.status(500).json({ error: "Failed to store item." });
    }
}

export async function updateItem(req, res) {
    try {
        const { userid, id } = req.params; // `userid` and `id` from the route
        const { name, description, action, available } = req.body; // Updated fields

        // Update the item in the database
        const updatedRows = await db('items')
            .where({ id, userid }) 
            .update({
                name,
                description,
                action,
                available,
            });

        if (updatedRows === 0) {
            return res.status(404).json({ error: "Item not found or not owned by this user." });
        }

        res.status(200).json({ message: "Item successfully updated." });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Failed to update item." });
    }
}

export async function deleteItem(req, res) {
    try {
        const { userid, id } = req.params; // `userid` and `id` from the route

        // Delete the item from the database
        const deletedRows = await db('items')
            .where({ id, userid }) 
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ error: "Item not found or not owned by this user." });
        }

        res.status(200).json({ message: "Item successfully deleted." });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Failed to delete item." });
    }
}
