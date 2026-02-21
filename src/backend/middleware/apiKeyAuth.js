// Simple API key auth middleware for demo purposes
module.exports = function(apiKey) {
  return (req, res, next) => {
    const key = req.header('x-api-key');
    if (!key || key !== apiKey) return res.status(401).send({ error: 'Unauthorized' });
    next();
  };
};
