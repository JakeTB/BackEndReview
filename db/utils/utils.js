exports.formatDates = list => {
  if (!list) return [];
  if (!list.length) return [];

  let returnArray = list.map(object => {
    let copyObject = { ...object };
    let dateToFormat = copyObject.created_at;

    let numberDate = new Date(dateToFormat);

    copyObject.created_at = numberDate;
    return copyObject;
  });

  return returnArray;
};

exports.makeRefObj = list => {
  if (!list) return [];

  let listCopy = [...list];
  if (!list.length) return [];

  let refObj = {};
  listCopy.forEach(object => {
    refObj[object.title] = object.article_id;
  });

  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  if (!comments) return [];
  let copyCommentsArray = [...comments];
  return copyCommentsArray.map(object => {
    let copyObject = { ...object };
    let name = copyObject.created_by;
    copyObject.author = name;
    copyObject.article_id = articleRef[copyObject.belongs_to];
    let dateToFormat = copyObject.created_at;
    delete copyObject.created_by;
    delete copyObject.created_at;
    delete copyObject.belongs_to;
    copyObject.created_at = new Date(dateToFormat);
    return copyObject;
  });
};
