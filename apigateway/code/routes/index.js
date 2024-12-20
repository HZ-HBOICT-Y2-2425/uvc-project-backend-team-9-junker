import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import aggregatorRoutes from './aggregatorRoutes.js';

const router = express.Router();

// Proxies
const community_microserviceProxy = createProxyMiddleware({
  target: 'http://community_microservice:3011',
  changeOrigin: true
});

const usermicroserviceProxy = createProxyMiddleware({
  target: 'http://usermicroservice:3012',
  changeOrigin: true
});

const item_microserviceProxy = createProxyMiddleware({
  target: 'http://itemmicroservice:3013',
  changeOrigin: true
});

router.use('/community_microservice', community_microserviceProxy);
router.use('/usermicroservice', usermicroserviceProxy);
router.use('/itemmicroservice', item_microserviceProxy);

// Use Aggregation Routes
router.use('/aggregator', aggregatorRoutes);

export default router;
