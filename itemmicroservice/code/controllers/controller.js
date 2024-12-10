import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

export async function getAllItems(req, res) {
    try {
        // Fetch all communities from the 'items' table
        const allItems = await db('items').select('*'); 
        // If no communities are found, send a 404 response
        if (!allItems || allItems.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        // Send all communities in the response
        res.status(200).json(allItems);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching all items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getItem(req, res) {
    try {
        const { id } = req.params; // Get the item ID from the request parameters

        // Fetch the item from the database
        const item = await db('items').where({ id }).first();

        // If the item is not found, send a 404 response
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Send the community in the response
        res.status(200).json(item);
    } catch (error) {
        // Handle any errors and send a 500 response
        console.error("Error fetching item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function storeItem(req, res) {
    try {
        const { 
            userid, name, description, images, action, available, views,
            interested, categories, communities 
        } = req.body; // Request body contains all attributes

        // console.log(req.body);
        
        // Insert the community into the database    
        const [id] = await db('items').insert({
            userid, name, description, images, action, available, views,
            interested, categories, communities
        });

        // Return success response
        res.status(201).json({
            message: "item successfully created.",
            communityId: id,
        });
    } catch (error) {
        console.error("Error storing item:", error);
        res.status(500).json({ error: "Failed to store item." });
    }
}

/*

export async function storeItem(req, res) {
    console.log("storeItem()");
    const userid = req.params.id; // `userid` is assumed to be part of the route
    console.log(req.body);
    const { name } = req.body; // Request body contains all attributes
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
*/

export async function updateItem(req, res) {
    try {
        const { id, userid } = req.params; // `userid` and `id` from the route
        const { name, description, images, action, available, views,
            interested, categories, communities  } = req.body; // Updated fields

        // Update the item in the database
        const updatedRows = await db('items')
            .where({ id, userid }) 
            .update({
                name, description, images, action, available, views,
                interested, categories, communities
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
        const { id, userid } = req.params; // `userid` and `id` from the route

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
