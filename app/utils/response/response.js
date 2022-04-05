const ResponseUtil = {};

ResponseUtil.sendSuccess = (res, object) => {
  res.status(200).send({
    success: true,
    message: 'Vos modifications ont bien été enregistrées',
    data: object,
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

ResponseUtil.render = (res, page) => {
  res.status(200).send(page);
};

ResponseUtil.sendSuccessWithStatus = (res, object, message, status) => {
  res.status(200).send({
    success: true,
    status: status,
    message: message,
    data: object,
  });
};

module.exports = ResponseUtil;
