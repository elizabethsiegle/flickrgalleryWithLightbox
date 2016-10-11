function Grid(pic) {
  var dis = this;

  dis.pic = pic;
  dis.pics = [];

  // PRIVATE FUNCTION
  function render(pics, offset) {
    return pics.reduce(function(html, item, i) {
      return html += '<a class="grid-box" style="background-image: url(' +
        item.small + ');" data-index="' + (i + (offset || 0)) + '"></a>';
    }, '');
  }

  // PUBLIC FUNCTIONS
  dis.setToGrid = function(photos) {
    dis.pics = photos;
    dis.pic.innerHTML = render(dis.pics);
  };

  dis.appendToGrid = function(photos) {
    dis.pic.innerHTML += render(photos, dis.pics.length);
    dis.pics = dis.pics.concat(photos);
  };

}