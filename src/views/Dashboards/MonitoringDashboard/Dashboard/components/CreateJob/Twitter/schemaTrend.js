export default {
  hashtag:{
    presence: { allowEmpty: false, message: 'is required' },
    // match: '[\\^$.|?*+()',
  }
  ,
  unit : {
    presence: { allowEmpty: false, message: 'is required' }
  }
};
