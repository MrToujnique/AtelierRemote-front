const countDistinct = function (ary, classifier) {
  return ary.reduce(function (counter, item) {
    var p = (classifier || String)(item);
    counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
    return counter;
  }, {});
};

export default countDistinct;
