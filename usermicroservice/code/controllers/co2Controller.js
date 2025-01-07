import development from '../knexfile.js';
import knex from 'knex';
const db = knex(development);

export async function getItemCO2(req, res) {
    const { category } = req.params;
    console.log(category);
    // const categoryLower = category.toLowerCase();
    // console.log(categoryLower);

    try {
        const co2_reduction = await db('co2categories')
            .where('category', category)
            .select('co2_reduction_kg');
        res.status(200).json(co2_reduction);
    } catch (error) {
        console.error('Error fetching item co2 data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function updateCO2(req, res) {
    const { username } = req.params;
    const { co2_reduction } = req.body;

    try {
        const user = await db('users').where('username', username).first();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newCO2 = user.co2_reduction_kg + co2_reduction;
        await user.update({ co2_reduction_kg: newCO2 });

        res.status(200).json(user.co2_reduction_kg);
    } catch (error) {
        console.error('Error updating CO2 reduction:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function getTotalCO2(req, res) {
    try {
        const totalCO2 = await db('users').sum('co2_reduction_kg as total').first();
        res.status(200).json(totalCO2);
    } catch (error) {
        console.error('Error fetching total CO2:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}