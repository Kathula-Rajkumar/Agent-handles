const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const ListItem = require('../models/Listitem');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    if (req.user.role !== 'admin')
      return res.status(403).json({ msg: 'Forbidden' });
  
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
  
    // Accept only csv, xlsx, xls
    const ext = req.file.originalname.split('.').pop();
    if (!['csv', 'xlsx', 'xls'].includes(ext)) {
      return res.status(400).json({ msg: 'Invalid file type' });
    }
  
    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);
  
    if (!rows.length) return res.status(400).json({ msg: 'CSV empty' });
  
    // Get all agents
    const agents = await User.find({ role: 'agent' });
    if (agents.length < 1) return res.status(400).json({ msg: 'No agents found' });
  
    // Distribute rows among agents
    let distributed = [];
    for (let i = 0; i < rows.length; i++) {
      let agentIndex = i % agents.length;
      const row = rows[i];
  
      // Ensure field names are matched and fallback values
      distributed.push({
        firstName: row.FirstName || row.firstname || "N/A",
        phone: row.Phone ? String(row.Phone) : "—",
        notes: row.Notes || "",
        assignedAgent: agents[agentIndex]._id
      });
    }
  
    // Save to DB
    await ListItem.insertMany(distributed);
  
    res.json({ msg: 'List uploaded & distributed', distributedCount: distributed.length });
  });
  

// Get lists by agent
router.get('/agent/:agentId', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.id !== req.params.agentId) {
    return res.status(403).json({ msg: 'Forbidden' });
  }
  const lists = await ListItem.find({ assignedAgent: req.params.agentId });
  res.json(lists);
});

// Get all agents list (for admin dashboard)
// backend/routes/list.js
router.get('/all', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  
    try {
      // get agents
      const agents = await User.find({ role: 'agent' }, '_id name email');
  
      let lists = [];
  
      for (let agent of agents) {
        const items = await ListItem.find({ assignedAgent: agent._id });
  
        lists.push({
          agentId: agent._id,
          agentName: agent.name,
          agentEmail: agent.email,
          items
        });
      }
  
      res.json(lists);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
module.exports = router;
