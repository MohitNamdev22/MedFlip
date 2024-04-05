// adminRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const router = express.Router();

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'medications.json');


// Function to read medication data from data.json file
function readDataFromFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return { medications: [] }; // Ensure that medications property is always present
  }
}


// Function to write medication data to data.json file
function writeDataToFile(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}

router.use(cors())

// Route for adding new medication by admin
router.post('/medications', (req, res) => {
  const { name, expirationDate, quantity } = req.body;

  // Read existing medication data from file
  const { medications } = readDataFromFile();

  // Generate new medication ID
  const id = medications.length > 0 ? Math.max(...medications.map(med => med.id)) + 1 : 1;

  // Add new medication to the medications array
  medications.push({ id, name, expirationDate, quantity });

  // Write updated medication data back to file
  writeDataToFile({ medications });

  res.status(201).json({ message: 'Medication added successfully', id });
});

// Route for updating existing medication by admin
router.put('/medications/:id', (req, res) => {
  const medicationId = parseInt(req.params.id);
  const { name, expirationDate, quantity } = req.body;

  // Read existing medication data from file
  const { medications } = readDataFromFile();

  // Find the index of the medication in the array
  const index = medications.findIndex(med => med.id === medicationId);

  // Update medication if found
  if (index !== -1) {
    medications[index] = { id: medicationId, name, expirationDate, quantity };

    // Write updated medication data back to file
    writeDataToFile({ medications });

    res.json({ message: 'Medication updated successfully' });
  } else {
    res.status(404).json({ message: 'Medication not found' });
  }
});

// Route for deleting medication by admin
router.delete('/medications/:id', (req, res) => {
  const medicationId = parseInt(req.params.id);

  // Read existing medication data from file
  let { medications } = readDataFromFile();

  // Filter out the medication to be deleted
  medications = medications.filter(med => med.id !== medicationId);

  // Write updated medication data back to file
  writeDataToFile({ medications });

  res.json({ message: 'Medication deleted successfully' });
});

// Route for retrieving all medications
router.get('/medications', (req, res) => {
  // Read existing medication data from file
  const { medications } = readDataFromFile();
  res.json(medications);
});

module.exports = router;
