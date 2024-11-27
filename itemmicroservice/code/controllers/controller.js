import development from '../knexfile.js';
import knex from 'knex';
import ItemModel from '../models/itemModel.js';
const db = knex(development);

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
    try {
        const { userid } = req.params; // `userid` is assumed to be part of the route
        const { name, description, action, available } = req.body; // Request body contains all attributes

        // Insert the item into the database
        const [id] = await db('items').insert({
            userid,        // Foreign key from the route
            name,          // Item name
            description,   // Item description
            action,        // Boolean for action
            available,     // Boolean for availability
        });

        // Return success response
        res.status(201).json({
            message: "Item successfully created.",
            itemId: id,
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
