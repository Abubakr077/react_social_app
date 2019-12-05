export default {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  role: {
    presence: { allowEmpty: false, message: 'is required' }
  },
};
