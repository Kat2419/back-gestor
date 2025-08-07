const Transaction = require('../models/Transaction');


exports.getAll = async (req, res) => {
  try {
    const { user } = req.query; 
    if (!user) {
      return res.status(400).json({ error: "Falta el usuario" });
    }
    const txs = await Transaction.find({ user }).sort({ date: -1 });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.create = async (req, res) => {
  try {
    const { description, amount, category, user } = req.body;
    if (!user) {
      return res.status(400).json({ error: "Falta el usuario" });
    }
    const tx = new Transaction({ description, amount, category, user });
    await tx.save();
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.sendStatus(204);
  } catch (err) {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(400).json({ error: 'ID de transacción inválido' });
    }
    res.status(500).json({ error: err.message });
  }
};
