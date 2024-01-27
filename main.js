const fs = require('fs');

class Record {
  constructor(REF_DATE, GEO, DGUID, Area, UOM, UOM_ID, SCALAR_ID, COORDINATE, VALUE, STATUS, SYMBOL, TERMINATED,DECIMALS ) {
    this.REF_DATE = REF_DATE;
    this.GEO = GEO;
    this.DGUID = DGUID;
    this.Area = Area;
    this.UOM = UOM;
    this.UOM_ID = UOM_ID;
    this.SCALAR_ID = SCALAR_ID;
    this.COORDINATE = COORDINATE;
    this.VALUE = VALUE;
    this.STATUS = STATUS;
    this.SYMBOL = SYMBOL;
    this.TERMINATED = TERMINATED;
    this.DECIMALS = DECIMALS;

  }

  get refDate() {
    return this.REF_DATE;
  }

  get geo() {
    return this.GEO;
  }

  get dguid() {
    return this.DGUID;
  }

  get area() {
    return this.Area;
  }


  get uom() {
    return this.UOM;
  }

  get uom_id() {
    return this.UOM_ID;
  }


  get salary_id() {
    return this.SCALAR_ID;
  }

  get coordinate() {
    return this.COORDINATE;
  }


  get value() {
    return this.VALUE;
  }


  get status() {
    return this.STATUS;
  }

  get symbol() {
    return this.SYMBOL;
  }


  get terminated() {
    return this.TERMINATED;
  }


  get decimals() {
    return this.DECIMALS;
  }

}

function readDataset(filename) {
  try {
    const fileData = fs.readFileSync(filename, 'utf8');
    const rows = fileData.split('\n');
    const columnNames = rows[0].split(',');

    const records = [];

    // Parsing the first few records from the CSV file
    for (let i = 1; i <= 5 && i < rows.length; i++) {
      const columns = rows[i].split(',');
      const record = new Record(
        columns[0],
        columns[1],
        columns[2],
        columns[3],
        columns[4],
        columns[5],
        columns[6],
        columns[7],
        columns[8],
        columns[9],
        columns[10],
        columns[11],
        columns[12],
      );
      records.push(record);
    }

    return records;
  } catch (error) {
    console.error('Error reading dataset:', error);
    return [];
  }
}

function displayRecords(records) {
  console.log('Record data:');
  records.forEach((record, index) => {
    console.log(`Record ${index + 1}:`, record);
    console.log('REF_DATE:', record.refDate);
    console.log('GEO:', record.geo);
    console.log('DGUID:', record.dguid);
    console.log('Area:', record.area);
    console.log('UOM:', record.uom);
    console.log('UOM_ID:', record.uom_id);

    console.log('SCALAR_ID:', record.salary_id);
    console.log('COORDINATE:', record.coordinate);
    console.log('VALUE:', record.value);
    console.log('STATUS:', record.status);
    console.log('SYMBOL:', record.symbol);
    console.log('TERMINATED:', record.terminated);
    console.log('DECIMALS:', record.decimals);

  });
}

// Entry point
function main() {
  const datasetFilename = '32100358.csv';

  try {
    fs.accessSync(datasetFilename, fs.constants.F_OK); // Check if the file exists
    const records = readDataset(datasetFilename);
    displayRecords(records);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
