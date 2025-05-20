function isDiagonal(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;
  if (n !== m) return false;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i !== j && matrix[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
}

exports.handleStats = (req, res) => {
  try {
    const { Q, R } = req.body;
    if (!Q || !R) {
      return res.status(400).json({ error: 'Missing Q or R matrices' });
    }

    const allValues = [...Q.flat(), ...R.flat()];

    const max = Math.max(...allValues);
    const min = Math.min(...allValues);
    const sum = allValues.reduce((acc, val) => acc + val, 0);
    const avg = parseFloat((sum / allValues.length).toFixed(2));
    const diagonalQ = isDiagonal(Q);
    const diagonalR = isDiagonal(R);

    return res.status(200).json({
      max,
      min,
      average: avg,
      totalSum: sum,
      diagonal: {
        Q: diagonalQ,
        R: diagonalR,
      },
    });
  } catch (err) {
    console.error('Stats handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
