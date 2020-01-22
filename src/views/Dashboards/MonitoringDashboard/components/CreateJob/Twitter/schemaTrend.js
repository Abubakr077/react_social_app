export default {
  description: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  hashtag: {
    presence: { allowEmpty: false, message: 'is required' }
    // match: '[\\^$.|?*+()',
  }
  ,
  unit: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};
