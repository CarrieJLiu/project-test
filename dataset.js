//Name: Jiali Liu
//Student No: 040999344

const mycode = require('fs');

//create a record object
class Record {
  constructor(refDate, geo, dguid, area, uom, uomId, scalarId, coordinate, value, status, symbol, terminated, decimals) {
    this.REF_DATE = refDate;
    this.GEO = geo;
    this.DGUID = dguid;
    this.AREA = area;
    this.UOM = uom;
    this.UOM_ID = uomId;
    this.SCALAR_ID = scalarId;
    this.COORDINATE = coordinate;
    this.VALUE = value;
    this.STATUS = status;
    this.SYMBOL = symbol;
    this.TERMINATED = terminated;
    this.DECIMALS = decimals;
  }
}
//Jiali Liu 
//Use File-IO on startup to open and read the dataset, 
//initializing a few record objects with data parsed from the first few records in the csv file
function readDataset(filename) {
  return new Promise((resolve, reject) => {
    mycode.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const records = [];
        const rows = data.split('\n');
        const header = rows[0].split(',');
        // Iterate over each row in the dataset
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',');
           // Check if the row has the same number of columns as the header
          if (values.length === header.length) {
            const recordData = {};
            // Map the values to their corresponding column names
            for (let j = 0; j < header.length; j++) {
              recordData[header[j]] = values[j];
            }
            // Create a new record object and add it to the records array
            const record = new Record(...Object.values(recordData));
            records.push(record);
          }
        }

        resolve(records);
      }
    });
  });
}
async function runProject() {
  const datasetFilename = '32100358.csv';

  try {
    const records = await readDataset(datasetFilename);

    // Iterate over each record and display its data
    records.forEach((record) => {
     
      for (const key in record) {
        console.log(`${key}: ${record[key]}`);
      }
      console.log('-------------  Jiali Liu  ---------------');
    });
  } catch (err) {
    console.error(`Error reading dataset: ${err}`);
  }
}

runProject();
