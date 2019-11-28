export default {
  keyword: {
    // presence: { allowEmpty: false, message: 'is required' }
  },
  link: {
    // presence: { allowEmpty: false, message: 'is required' },
    url: {
      url:true,
    message: 'is not valid'},
  },
  target_type: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};
