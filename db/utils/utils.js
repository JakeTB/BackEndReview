exports.formatDates = list => {
  if (!list.length) return [];
  let listCopy = [...list];
  let dateToFormat = listCopy[0].created_at;
  let numberDate = new Date(dateToFormat);
  let dateFormat = `${numberDate}`;
  [firstObj] = list;
  firstObj.date = { dateFormat };
  delete firstObj.created_at;
  console.log("ANSWER", firstObj);
  return [firstObj];
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
