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
};

await fetchMatrix();
