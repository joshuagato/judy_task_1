const options = {
    mode: 'no-cors',
    headers: {
        'Content-Type': 'text/csv; charset=UTF-8'
    }
}
const fetchMatrix = async () => {
    const response = await fetch('./matrix.csv', options);
    const data = await response.text();
    const matrixArray = data.split('\n');

    const matrix = buildMatrix(matrixArray);
    displayCSVInput(matrix);
};

// Function to build the CSV file values into a matrix
const buildMatrix = (elementsArray) => {
    const [topRow, middleRow, bottomRow] = elementsArray;
    return `${topRow}
        ${middleRow}
        ${bottomRow}
    `;
};

// Function to display the input of the matrix
const displayCSVInput = (matrix) => {
    document.querySelector('#csv-input').value = matrix;
};

await fetchMatrix();
