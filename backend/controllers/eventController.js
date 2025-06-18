const { Event, Category } = require('../models');
const { Op } = require('sequelize');

// Helper to add full photo URL to an event object
const attachPhotoUrl = (event) => {
  return {
    ...event.toJSON(),
    photoUrl: event.photo ? `http://localhost:5001/uploads/${event.photo}` : null,
  };
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let where = {};
    let order = [['createdAt', 'DESC']]; // Default sort

    // Apply category filter
    if (category) {
      where.categoryId = category;
    }

    // Apply search filter
    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`
      };
    }

    // Apply sorting
    if (sort === 'date') {
      order = [['date', 'ASC']];
    } else if (sort === 'price') {
      order = [['price', 'ASC']];
    }

    const events = await Event.findAll({
      where,
      order,
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    });

    // Add photoUrl to each event
    const eventsWithPhotoUrls = events.map(attachPhotoUrl);

    res.status(200).json({
      success: true,
      count: eventsWithPhotoUrls.length,
      data: eventsWithPhotoUrls
    });
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get events by category
exports.getEventsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const events = await Event.findAll({
      where: { categoryId }
    });

    const eventsWithPhotoUrls = events.map(attachPhotoUrl);

    res.status(200).json({
      success: true,
      data: eventsWithPhotoUrls
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get single event
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    const eventWithPhotoUrl = attachPhotoUrl(event);

    res.status(200).json({
      success: true,
      data: eventWithPhotoUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { title, description, date, price, categoryId, location } = req.body;

    if (!title || !description || !date || !price || !categoryId || !location) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required.'
      });
    }

    const event = await Event.create({
      name: title,                       // map title → name
      description,
      date,
      price: parseFloat(price),
      categoryId: parseInt(categoryId),
      location,
      photo: req.file ? req.file.filename : null
    });

    const eventWithPhotoUrl = attachPhotoUrl(event);

    res.status(201).json({
      success: true,
      data: eventWithPhotoUrl
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.photo = req.file.filename;
    }

    await event.update(updatedData);

    const updatedEvent = await Event.findByPk(req.params.id, {
      include: [{
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    });

    const updatedEventWithPhotoUrl = attachPhotoUrl(updatedEvent);

    res.status(200).json({
      success: true,
      data: updatedEventWithPhotoUrl
    });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    await event.destroy();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
