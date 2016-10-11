function Lightbox(pic) {
  var dis = this;

  dis.p = pic;
  dis.pics = [];

  var currIndex = 0;
  var lbPic = dis.p.getElementsByClassName('lightboxPic')[0];
  var lbPicSrc = dis.p.getElementsByClassName('lightboxPicSrc')[0];
  var lbTitle = dis.p.getElementsByClassName('lightboxTitle')[0];
  var exitLb = dis.p.getElementsByClassName('exitLb')[0];
  var prevPic = dis.p.getElementsByClassName('lbCtrlPrev')[0];
  var nextPic = dis.p.getElementsByClassName('lbCtrlNext')[0];
  var lastPicCb = function() {};

  // PRIVATE FUNCTIONS
  function loadPic(url, cb) {
    var tempPic = new Image();
    tempPic.src = url;
    if(cb) {
      tempPic.onload = cb;
    }
  }

  function setCurrPic(index, cb) {
    // make sure we have an image to set!
    if(!dis.pics[index]) {
      return;
    }

    // pull up the loading overlay
    lbPic.classList.add('lightbox-photo-loading');
    lbTitle.innerHTML = '';

    loadPic(dis.pics[index].large, function() {
      lbPicSrc.src = dis.pics[index].large;
      lbPic.style.backgroundImage = 'url(' + dis.pics[index].large + ')';
      lbPic.classList.remove('lightbox-photo-loading');
      lbTitle.innerHTML = dis.pics[index].title;

      if(cb) {
        return cb();
      }
    });
  }

  function setPrevPic(index) {
    if(dis.pics[index]) {
      prevPic.classList.remove('lbCtrlDisable');
      loadPic(dis.pics[index].large);
    } else {
      prevPic.classList.add('lbCtrlDisable');
    }
  }

  function setNextPic(index) {
    if(dis.pics[index]) {
      nextPic.classList.remove('lbCtrlDisable');
      loadPic(dis.pics[index].large);
    } else {
      nextPic.classList.add('lbCtrlDisable');
    }
  }

  function setPics(index) {
    setCurrPic(index);
    setPrevPic(index - 1);
    setNextPic(index + 1);
  }

  // PUBLIC FUNCTIONS
  dis.set = function(pics, cb) {
    dis.pics = pics || [];

    // do nothing if there are no photos
    if(!dis.pics.length) {
      return cb(null, []);
    }

    currIndex = 0;
    setCurrPic(currIndex, cb);
    setPrevPic(null);
    setNextPic(currIndex + 1);
  };

  dis.append = function(pics) {
    dis.pics = dis.photos.concat(pics);
    setNextPhoto(currIndex);
  };

  dis.previous = function() {
    setPhotos(currIndex--);
  };

  dis.next = function() {
    setPhotos(currIndex++);
    if(currIndex >= dis.photos.length - 1) {
      lastPhotoCb();
    }
  };

  dis.onLastPhoto = function(cb) {
    lastPhotoCb = cb;
  };

  dis.show = function(index) {
    if(typeof index === 'number') {
      currIndex = index;
      setCurrPic(index, function() {
        dis.p.classList.remove('lightboxHide');
      });
      setPrevPic(index - 1);
      setNextPic(index + 1);

      // if we're at the last photo, callback should be triggered
      if(currIndex >= dis.pics.length - 1) {
        lastPhotoCb();
      }
    } else {
      dis.p.classList.remove('lightboxHide');
    }
  };

  dis.hide = function() {
    dis.p.classList.add('lightboxHide');
  };

  // event listeners
  prevPic.addEventListener('click', dis.previous);
  nextPic.addEventListener('click', dis.next);
  exitLb.addEventListener('click', dis.hide);

}