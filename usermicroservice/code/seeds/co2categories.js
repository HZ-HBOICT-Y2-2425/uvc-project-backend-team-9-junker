export const seed = async (knex) => {
    await knex('co2categories').del();

    // Inserts seed entries
    await knex('co2categories').insert([
        { category: 'outdoors', co2_reduction_kg: 10.0 },
        { category: 'furniture', co2_reduction_kg: 50.0 },
        { category: 'kitchen', co2_reduction_kg: 5.0 },
        { category: 'clothing', co2_reduction_kg: 3.0 },
        { category: 'sports', co2_reduction_kg: 7.0 },
    ]);
};
