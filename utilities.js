const { validationResult } = require("express-validator");


const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error('Bad request.');
    err.status = 400;
    err.title = 'Bad request.';
    err.errors = errors;
    return next(err);
  }
  next();
};


const normalize = query => {
  const normalized = {}
  
  if (!Array.isArray(query)) {
    normalized[query.id] = { id: query.id, name: query.name };
    return normalized
  }
  
  query.forEach(obj => normalized[obj.id] = { id: query.id, name: query.name })
  
  return normalized
}


const sortTraits = traits => {
  const sortedTraits = {}
  
  traits.forEach(trait => {
    // Sort Traits by Trait Type then normalize
    sortedTraits[trait.TraitType.type] = { 
      ...sortedTraits[trait.TraitType.type],
      ...normalize(trait),
      typeId: trait.typeId,
    }
  })
  
  return sortedTraits
}



module.exports = { 
  handleValidationErrors,
  normalize,
  sortTraits,
};