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

    const transformedMatrixArray = transformMatrix(matrixArray);
    const transformedMatrix = buildTransformedMatrix(transformedMatrixArray);
    displayCSVOutput(transformedMatrix);
};

// Function to build the CSV file values into a matrix
const buildMatrix = (elementsArray) => {
    const [topRow, middleRow, bottomRow] = elementsArray;
    return `${topRow}
            ${middleRow}
            ${bottomRow}
        `;
};

// Function to build the transformed into a matrix
const buildTransformedMatrix = (elementsArray) => {
    const [topRowArray, middleRowArray, bottomRowArray] = elementsArray;
    const topRow = topRowArray.join(', ');
    const middleRow = middleRowArray.join(', ');
    const bottomRow = bottomRowArray.join(', ');
    return `${topRow}
            ${middleRow}
            ${bottomRow}
        `;
};

// Function to display the input of the matrix
const displayCSVInput = (matrix) => {
    document.querySelector('#csv-input').value = matrix;
};

// Function to display the output of the matrix
const displayCSVOutput = (matrix) => {
    document.querySelector('#csv-output').value = matrix;
};

// Function to transform the matrix by filtering out bad sectors
const transformMatrix = (matrix) => {
    const transformedMatrix = [];
    for (let eachRow of matrix) {
        const transformedEachRow = [];
        const eachRowArray = eachRow.split(', ');
        eachRowArray.forEach((eachElement, indexOfEachElement) => {
            let eachElementNewValue;
            if (eachElement === '0') {
                if (indexOfEachElement === 0 ) {
                    if (eachRowArray[indexOfEachElement + 1] !== '0')
                        eachElementNewValue = eachRowArray[indexOfEachElement + 1];
                    else if (eachRowArray[indexOfEachElement + 2] !== '0')
                        eachElementNewValue = eachRowArray[indexOfEachElement + 2];
                    else eachElementNewValue = 1;
                } else if (indexOfEachElement === 1) {
                    if (eachRowArray[indexOfEachElement + 1] !== '0')
                        eachElementNewValue = eachRowArray[indexOfEachElement + 1];
                    else if (eachRowArray[indexOfEachElement - 1] !== '0')
                        eachElementNewValue = eachRowArray[indexOfEachElement - 1];
                    else eachElementNewValue = 1;
                } else {
                    if (eachRowArray[indexOfEachElement - 1] !== '0')
                        eachElementNewValue = eachRowArray[indexOfEachElement - 1];
                    else if (eachRowArray[indexOfEachElement - 2] !== '0')
                        eachElementNewValue = eachRowArray[indexOfEachElement - 2];
                    else eachElementNewValue = 1;
                }
                transformedEachRow.push(eachElementNewValue);
            } else transformedEachRow.push(eachElement);
        })
        transformedMatrix.push(transformedEachRow);
    }
    return transformedMatrix;
}

fetchMatrix();
