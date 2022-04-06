const ResponseUtil = {};

ResponseUtil.sendSuccess = (res,object) => {
  res.status(200).send({
    success: true,
    object,
  });
};

ResponseUtil.sendError = (res, error) => {
  res.status(500).send({
    success: false,
    message: 'Error',
    error: error.errors?.[0]?.message ? error.errors[0].message : error.message,
  });
};

ResponseUtil.sendWarning = (res, message) => {
  res.status(400).send({
    success: false,
    message: message,
  });
};



module.exports = ResponseUtil;
