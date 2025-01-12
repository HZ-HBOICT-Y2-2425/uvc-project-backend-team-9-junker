import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

// Create a new trade
export async function createTrade(req, res) {
    const { requester_id, receiver_id, item_requested_id, item_offered_id } = req.body;

    try {
        const trade = await db('trades').insert({
            requester_id,
            receiver_id,
            item_requested_id,
            item_offered_id,
        });
        res.status(201).json({ message: 'Trade created successfully', tradeId: trade[0] });
    } catch (error) {
        console.error('Error creating trade:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Fetch trades for a specific user
export async function getTradesByUser(req, res) {
    const { user_id } = req.params;

    try {
        const trades = await db('trades')
            .where('requester_id', user_id)
            .orWhere('receiver_id', user_id);
        res.status(200).json({ trades });
    } catch (error) {
        console.error('Error fetching trades:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update the status of a trade
export async function updateTradeStatus(req, res) {
    const { trade_id } = req.params;
    const { status } = req.body;

    try {
        await db('trades').where('id', trade_id).update({ status });
        res.status(200).json({ message: 'Trade status updated successfully' });
    } catch (error) {
        console.error('Error updating trade status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}