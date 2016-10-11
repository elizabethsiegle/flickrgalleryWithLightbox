var flickr = new Flickr();
var grid = new Grid(document.querySelector('.grid'));
var lb = new Lightbox(document.querySelector('.lightbox'));

document.querySelector('.grid').addEventListener('click', function(event) {
  if (event.target !== event.currentTarget) {
    lb.show(event.target.dataset.index);
  }
});

  flickr.retrievePics({ search: 'san francisco giants', page: 1 }, function(err, data) {
    if (err) {
      error(true);
      return;
    }

    lb.set(data, function() {
      window.scrollTo(0,0);
    });

    grid.setToGrid(data);
  });