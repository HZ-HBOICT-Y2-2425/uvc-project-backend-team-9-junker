import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/aggregated-items', async (req, res) => {
  console.log("Aggregator route accessed.");

  try {
    // Fetch items
    const itemsResponse = await axios.get('http://item_microservice:3017/items');
    const items = itemsResponse.data;
    console.log("Items fetched:", items);

    if (!items || items.length === 0) {
      return res.status(404).json({ error: 'No items found' });
    }

    // Process each item and fetch associated user and community data
    const aggregatedData = await Promise.all(
      items.map(async (item) => {
        try {
          const userResponse = await axios.get(`http://usermicroservice:3012/user/public/${item.userid}`);
          const user = userResponse.data;

          const communityResponse = await axios.get(`http://community_microservice:3011/communities/${user.community_id}`);
          const community = communityResponse.data;

          return {
            ...item,
            owner: {
              fullname: user.fullname,
              profile_pic: user.profile_pic,
            },
            community: {
              name: community.name,
              location: community.location,
            },
          };
        } catch (error) {
          console.error(`Error processing item with id ${item.id}:`, error.message);
          return { ...item, error: 'Failed to fetch user or community data' };
        }
      })
    );

    res.status(200).json(aggregatedData);
  } catch (error) {
    console.error('Error aggregating data:', error.message);
    res.status(500).json({ error: 'Failed to aggregate data.' });
  }
});

export default router;
