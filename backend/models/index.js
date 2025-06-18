const Event = require('./Event');
const Category = require('./Category');

// Define associations
Event.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

Category.hasMany(Event, {
  foreignKey: 'categoryId',
  as: 'events'
});

module.exports = {
  Event,
  Category
}; 