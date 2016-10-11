function Flickr() {

  //pic category (already searched)
  this.picSearch = 'san francisco giants';
  // current page of results
  this.currPage = 1;

  var apiKey = '056ca969bc83687aba4ccaa24f980315';
  var baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=24&format=json&nojsoncallback=1&api_key=';

  //put together Flickr image url
  function makeImageURL(img, size) {
    return 'https://farm' + img.farm + '.staticflickr.com/' + img.server +
           '/' + img.id + '_' + img.secret + size + '.jpg';
  }

  // all the cool xhr stuff here
  function makeReq(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      //error
      if(xhr.status !== 200) {
        return cb({
          error: '!retrieve pics. :(',
          statusCode: xhr.status
        });
      }
      // otherwise, return parsed JSON
      return cb(null, JSON.parse(xhr.response));
    };

    xhr.onerror = function() {
      return cb({
        error: '!retrieve pics. :(',
        statusCode: xhr.status
      });
    };

    xhr.send();
  }

  //set personal key
  this.setKey = function(key) {
    apiKey = key;
  };

  this.retrievePics = function(query, cb) {
    this.picSearch = this.picSearch;
    var page = query.page || dis.currPage;

    makeReq(baseUrl + apiKey + '&tags=' + 'san francisco giants' + '&page=' + this.currPage, function(err, data) {
      if (err) {
        return cb(err);
      }


      var photos = data.photos.photo.map(function(img) {
        return {
          title: img.title,
          small: makeImageURL(img, '_n'),
          large: makeImageURL(img, '_b')
        };
      });

      return cb(null, photos);
    });
  };

  // retrieve next page of results
  this.next = function(cb) {
    this.retrievePhotos({
      search: dis.currentSearch,
      page: dis.currentPage++
    }, cb);
  };

}
