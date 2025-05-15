const axios = require("axios");

const candidateId = "f08317e1-0f0a-43c3-83c1-2f2b3061d10c";
const BASE_URL = "https://challenge.crossmint.io/api";

// =============================
// CHALLENGE 2 - BUILD LOGO
// =============================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function buildLogo() {
  try {
    const { data } = await axios.get(`${BASE_URL}/map/${candidateId}/goal`);
    const goal = data.goal;

    for (let row = 0; row < goal.length; row++) {
      for (let column = 0; column < goal[row].length; column++) {
        const cell = goal[row][column];

        if (cell === "SPACE") continue;

        try {
          if (cell === "POLYANET") {
            await postPolyanet(row, column);
          } else if (cell.includes("SOLOON")) {
            const color = cell.split("_")[0].toLowerCase();
            await postSoloon(row, column, color);
          } else if (cell.includes("COMETH")) {
            const direction = cell.split("_")[0].toLowerCase();
            await postCometh(row, column, direction);
          }
          await sleep(3000);
        } catch (err) {
          console.error(
            `Error in row ${row}, column ${column}:`,
            err.response?.data || err.message
          );
        }
      }
    }

    console.log("Logo Built Successfully.");
  } catch (error) {
    console.error("Error Building Logo:", error.message);
  }
}

// =============================
//  CHALLENGE 1 – PUSH Y DELETE
// =============================

async function pushPolyanet(row, column) {
  try {
    await axios.post(`${BASE_URL}/polyanets`, {
      row,
      column,
      candidateId,
    });
    console.log(`Polyanet Created (${row}, ${column})`);
  } catch (error) {
    console.error(" Error Create:", error.response?.data || error.message);
  }
}

async function deletePolyanet(row, column) {
  try {
    await axios.delete(`${BASE_URL}/polyanets`, {
      data: {
        row,
        column,
        candidateId,
      },
    });
    console.log(`Polyanet Deleted (${row}, ${column})`);
  } catch (error) {
    console.error("Error Delete", error.response?.data || error.message);
  }
}

// =============================
//  AUXILIAR FUNCTIONS
// =============================

async function postPolyanet(row, column) {
  return axios.post(`${BASE_URL}/polyanets`, {
    row,
    column,
    candidateId,
  });
}

async function postSoloon(row, column, color) {
  return axios.post(`${BASE_URL}/soloons`, {
    row,
    column,
    color,
    candidateId,
  });
}

async function postCometh(row, column, direction) {
  return axios.post(`${BASE_URL}/comeths`, {
    row,
    column,
    direction,
    candidateId,
  });
}

// buildLogo();

// pushPolyanet(3, 4);
// removePolyanet(3, 4);
