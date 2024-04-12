// adminRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const router = express.Router();

// Path to the data.json file
const dataFilePath = path.join(__dirname, 'medications.json');
const duplicateDataFilePath = path.join(__dirname, 'medications_with_pricing.json');

// Function to read medication data from data.json file
function readDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return { medications: [] }; // Ensure that medications property is always present
  }
}

// Function to write medication data to data.json file
function writeDataToFile(data, filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}


// testimonialRoutes.js

// Path to the testimonials.json file
const testimonialsFilePath = path.join(__dirname, 'testimonials.json');

// Function to read testimonials data from testimonials.json file
function readTestimonialsFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading testimonials from file:', error);
    return []; // Return an empty array if there's an error
  }
}

// Function to write testimonials data to testimonials.json file
function writeTestimonialsToFile(testimonials, filePath) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2));
  } catch (error) {
    console.error('Error writing testimonials to file:', error);
  }
}


router.use(cors())

// Route for adding new medication by admin
router.post('/medications', (req, res) => {
  const { name, expirationDate, quantity } = req.body;
  const price = 0;

  // Read existing medication data from file
  let { medications } = readDataFromFile(dataFilePath);

  // Generate new medication ID
  const id = medications.length > 0 ? Math.max(...medications.map(med => med.id)) + 1 : 1;

  // Add new medication to the medications array
  medications.push({ id, name, expirationDate, quantity, price });

  // Write updated medication data back to file
  writeDataToFile({ medications }, dataFilePath);

  let duplicateMedications = [...medications];
  duplicateMedications.forEach(medication => {
    medication.price = price; // Add pricing to each medication
  });

  // Write medication data with pricing to duplicate file
  writeDataToFile({ medications: duplicateMedications }, duplicateDataFilePath);

  res.status(201).json({ message: 'Medication added successfully', id });
});

// Route for updating existing medication by admin
router.put('/medications/:id', (req, res) => {
  const medicationId = parseInt(req.params.id);
  const { name, expirationDate, quantity } = req.body;

  // Read existing medication data from file
  let { medications } = readDataFromFile(dataFilePath);

  // Find the index of the medication in the array
  const index = medications.findIndex(med => med.id === medicationId);

  // Update medication if found
  if (index !== -1) {
    medications[index] = { id: medicationId, name, expirationDate, quantity };

    // Write updated medication data back to file
    writeDataToFile({ medications }, dataFilePath); // Corrected line
    writeDataToFile({ medications }, duplicateDataFilePath); // Corrected line

    res.json({ message: 'Medication updated successfully' });
  } else {
    res.status(404).json({ message: 'Medication not found' });
  }
});

// Route for deleting medication by admin
router.delete('/medications/:id', (req, res) => {
  const medicationId = parseInt(req.params.id);

  // Read existing medication data from file
  let { medications } = readDataFromFile(dataFilePath);

  // Filter out the medication to be deleted
  medications = medications.filter(med => med.id !== medicationId);

  // Write updated medication data back to file
  writeDataToFile({ medications }, dataFilePath); // Corrected line
  writeDataToFile({ medications }, duplicateDataFilePath); // Corrected line

  res.json({ message: 'Medication deleted successfully' });
});

// Route for retrieving all medications
router.get('/medications', (req, res) => {
  // Read existing medication data from file
  console.log("reached")
  
  const { medications } = readDataFromFile(duplicateDataFilePath);
  res.json(medications);
});

// Route for retrieving all testimonials
router.get('/testimonials', (req, res) => {
  // Read existing testimonials data from file
  const testimonials = readTestimonialsFromFile(testimonialsFilePath);
  res.json(testimonials);
});

router.post('/testimonials', (req, res) => {
  const { name, message } = req.body;

  // Read existing testimonials data from file
  const testimonials = readTestimonialsFromFile(testimonialsFilePath);

  // Generate new testimonial ID
  const id = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;

  // Add new testimonial to the testimonials array
  testimonials.push({ id, name, message });

  // Write updated testimonials data back to file
  writeTestimonialsToFile(testimonials, testimonialsFilePath);

  res.status(201).json({ message: 'Testimonial added successfully', id });
});




module.exports = router;
