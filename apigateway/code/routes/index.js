import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const community_microserviceProxy = createProxyMiddleware({
  target: 'http://community_microservice:3011',
  changeOrigin: true
});

const usermicroserviceProxy = createProxyMiddleware({
  target: 'http://usermicroservice:3012',
  changeOrigin: true
});

const item_microserviceProxy = createProxyMiddleware({
  target: 'http://item_microservice:3013',
  changeOrigin: true
});

const picture_microserviceProxy = createProxyMiddleware({
  target: 'http://picture_microservice:3015',
  changeOrigin: true
});

router.use('/community_microservice', community_microserviceProxy);
router.use('/usermicroservice', usermicroserviceProxy);
router.use('/item_microservice', item_microserviceProxy);
router.use('/picture_microservice', picture_microserviceProxy);

export default router;
