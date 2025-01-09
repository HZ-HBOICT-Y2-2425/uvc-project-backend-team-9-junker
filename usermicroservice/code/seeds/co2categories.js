export const seed = async (knex) => {
    await knex('co2categories').del();

    // Inserts seed entries
    await knex('co2categories').insert([
        { category: 'Bicycles', co2_reduction_kg: 20.0 },
        { category: 'Books', co2_reduction_kg: 2.0 },
        { category: 'Clothing', co2_reduction_kg: 10.0 },
        { category: 'Collectibles', co2_reduction_kg: 3.0 },
        { category: 'Furniture', co2_reduction_kg: 50.0 },
        { category: 'Kitchen Appliance', co2_reduction_kg: 30.0 },
        { category: 'Kitchenware', co2_reduction_kg: 5.0 },
        { category: 'Shoes', co2_reduction_kg: 8.0 },
        { category: 'Sports Equipment', co2_reduction_kg: 15.0 },
        { category: 'Electronics', co2_reduction_kg: 40.0 },
        { category: 'Toys', co2_reduction_kg: 2.0 },
        { category: 'Miscelaneous', co2_reduction_kg: 3.0 },
        { category: 'Arts and Crafts', co2_reduction_kg: 4.0 }
    ]);
};
