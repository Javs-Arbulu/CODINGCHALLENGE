const axios = require('axios');

function rotateMatrix(matrix) {
  return matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex]).reverse(),
  );
}

function simulateQR(matrix) {
  const Q = matrix.map((row) =>
    row.map((val) => parseFloat((val / 2).toFixed(2))),
  );
  const R = matrix.map((row) =>
    row.map((val) => parseFloat((val * 2).toFixed(2))),
  );
  return { Q, R };
}

exports.handleMatrix = async (req, res) => {
  try {
    const { matrix } = req.body;

    if (!Array.isArray(matrix) || !Array.isArray(matrix[0])) {
      return res.status(400).json({ error: 'Invalid matrix format' });
    }

    const rotated = rotateMatrix(matrix);
    const { Q, R } = simulateQR(rotated);

    // Enviar a segunda API
    const statsResponse = await axios.post('http://localhost:3002/api/stats', {
      Q,
      R,
    });

    return res.status(200).json({
      rotatedMatrix: rotated,
      Q,
      R,
      stats: statsResponse.data,
    });
  } catch (err) {
    console.error('Matrix handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
