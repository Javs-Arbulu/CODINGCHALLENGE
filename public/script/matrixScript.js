const sendBtn = document.getElementById('sendBtn');
const matrixInput = document.getElementById('matrixInput');
const tokenInput = document.getElementById('tokenInput');
const rotatedMatrixOutput = document.getElementById('rotatedMatrixOutput');
const statsOutput = document.getElementById('statsOutput');

sendBtn.addEventListener('click', async () => {
  let matrix;
  try {
    matrix = JSON.parse(matrixInput.value);
  } catch (err) {
    alert('Error: La matriz debe ser un JSON válido');
    return;
  }

  const token = tokenInput.value.trim();
  if (!token) {
    alert('Por favor ingresa un token JWT válido');
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/api/matrix/rotate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ matrix }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error de API: ${error}`);
    }

    const data = await response.json();

    renderMatrixAsTable(data.rotatedMatrix, 'rotatedMatrixOutput');

    renderMatrixAsTable(data.Q, 'rotatedQOutput');

    renderMatrixAsTable(data.R, 'rotatedROutput');

    statsOutput.textContent = JSON.stringify(data.stats, null, 2);
  } catch (err) {
    alert(err.message);
  }
});

function renderMatrixAsTable(matrix, containerId) {
  const container = document.getElementById(containerId);
  let html =
    '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; text-align: center;">';
  for (const row of matrix) {
    html += '<tr>';
    for (const cell of row) {
      html += `<td>${cell}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  container.innerHTML = html;
}
