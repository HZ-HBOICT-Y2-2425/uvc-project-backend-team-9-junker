// Use 'npx knex seed:run' to populate database with seed data.

export const seed = async function (knex) {
    // Deletes ALL existing entries in the items table
    await knex('items').del();
    await knex('communities').del();
  
    // Inserts seed entries
    await knex('items').insert([
       {
            id: 0,
            userid: 0,
            name: "Bike (Barely Used)",
            description: "Almost new",
            images: ["bike.jpg", "bike2.jpg"],
            action: true,
            available: true,
            views: 18,
            interested: 4,
            categories: ["Bicycles", "Outdoors", "Sports"],
            communities: [0, 1, 2, 3]
        },
        {
            id: 2,
            userid: 1,
            name: "Sneakers [Vintage]",
            description: "Size 12",
            images: ["sneaker1.avif", "sneaker3.avif", "sneaker4.avif", "sneaker5.avif", "sneaker6.avif", "sneaker7.avif"],
            action: true,
            available: true,
            views: 28,
            interested: 1,
            categories: ["Shoes", "Clothing"],
            communities: [0, 1, 2, 3]
        },
        {
            id: 3,
            userid: 0,
            name: "Pan",
            description: "",
            images: ["pan.webp"],
            action: "",
            available: true,
            views: 8,
            interested: 5,
            categories: ["Kitchen"],
            communities: [0, 1, 2, 3]
        },
        {
            id: 4,
            userid: 2,
            name: "Bookshelf Hardwood 30x15x7",
            description: "Hardwood bookshelf dimensions: 30x15x7",
            images: ["bookshelf.avif"],
            action: "",
            available: true,
            views: 1,
            interested: 0,
            categories: ["Furniture"],
            communities: [0, 1]
        },
        {
            id: 5,
            userid: 0,
            name: "Corner Desk",
            description: "height: 120cm",
            images: ["desk.jpg"],
            action: "",
            available: true,
            views: 10,
            interested: 2,
            categories: ["Furniture"],
            communities: [0, 1, 2]
        },
        {
            id: 6,
            userid: 0,
            name: "Glass",
            description: "self made",
            images: ["glass.webp"],
            action: "",
            available: true,
            views: 20,
            interested: 7,
            categories: ["Kitchen"],
            communities: [0, 1, 2]
        },
        {
            id: 7,
            userid: 0,
            name: "Tennis Racket",
            description: "I'm trying to cure my tennis elbow.",
            images: ["tennis_racket.jpg"],
            action: true,
            available: true,
            views: 20,
            interested: 7,
            categories: ["Outdoors", "Sports"],
            communities: [0, 1, 2]
        }
    ]);

     // Insert items_communities (relationships)
    await knex('items_communities').insert([
        { item_id: items[0].id, community_id: communities[0].id },
        { item_id: items[0].id, community_id: communities[1].id },
        { item_id: items[0].id, community_id: communities[2].id },
        { item_id: items[0].id, community_id: communities[3].id },
        { item_id: items[2].id, community_id: communities[0].id },
        { item_id: items[2].id, community_id: communities[1].id },
        { item_id: items[2].id, community_id: communities[2].id },
        { item_id: items[2].id, community_id: communities[3].id },
    ]);
  };
  