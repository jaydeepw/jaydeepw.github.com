(function() {
  var doc = document;
  var disableNotes = false;

  var ctr = 0;
  var spaces = /\s+/, a1 = [''];

  var toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
  };

  var query = function(query, root) {
    return queryAll(query, root)[0];
  }

  var queryAll = function(query, root) {
    if (!query) { return []; }
    if (typeof query != 'string') { return toArray(query); }
    if (typeof root == 'string') {
      root = doc.getElementById(root);
      if(!root){ return []; }
    }

    root = root || document;
    var rootIsDoc = (root.nodeType == 9);
    var doc = rootIsDoc ? root : (root.ownerDocument || document);

    if (!rootIsDoc || ('>~+'.indexOf(query.charAt(0)) >= 0)) {
      root.id = root.id || ('qUnique' + (ctr++));
      query = '#' + root.id + ' ' + query;
    }

    if ('>~+'.indexOf(query.slice(-1)) >= 0) { query += ' *'; }
    return toArray(doc.querySelectorAll(query));
  };

  var strToArray = function(s) {
    if (typeof s == 'string' || s instanceof String) {
      if (s.indexOf(' ') < 0) {
        a1[0] = s;
        return a1;
      } else {
        return s.split(spaces);
      }
    }
    return s;
  };

  // In case if web browsers that don`t support String.trim() (e.g. iPad)
  var trim = function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };

  var addClass = function(node, classStr) {
    classStr = strToArray(classStr);
    var cls = ' ' + node.className + ' ';
    for (var i = 0, len = classStr.length, c; i < len; ++i) {
      c = classStr[i];
      if (c && cls.indexOf(' ' + c + ' ') < 0) {
        cls += c + ' ';
      }
    }
    node.className = trim(cls);
  };

  var removeClass = function(node, classStr) {
    var cls;
    if (classStr !== undefined) {
      classStr = strToArray(classStr);
      cls = ' ' + node.className + ' ';
      for (var i = 0, len = classStr.length; i < len; ++i) {
        cls = cls.replace(' ' + classStr[i] + ' ', ' ');
      }
      cls = trim(cls);
    } else {
      cls = '';
    }
    if (node.className != cls) {
      node.className = cls;
    }
  };

  // from https://gist.github.com/598008
  var testStyle = function(style) {
    var elem = document.createElement('div');
    var prefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];
    var bool;
    var bump = function(all, letter) {
          return letter.toUpperCase();
        };
    var prop;

    bool = style in elem.style;
    prop = style.replace(/^(.)/, bump).replace(/-([a-z])/ig, bump);

    for (var len = prefixes.length; len--; ){
      if (bool) {
        break;
      }
      bool = prefixes[len] + prop in elem.style;
    }

    document.documentElement.className += ' ' + (bool ? '' : 'no-') + style.replace(/-/g, '');
    return bool;
  };
  var canTransition = testStyle('transition');

  // slide class
  var Slide = function(node, idx) {
    this._node = node;
    var note = query('.note > section', node);
    this._hiddenNote = note ? note.innerHTML : '';
    if (idx >= 0) {
      this._count = idx + 1;
    }
    if (this._node) {
      addClass(this._node, 'slide distant-slide');
    }
    this._makeCounter();
  };

  Slide.prototype = {
    _node: null,
    _count: 0,
    _visited: false,
    _currentState: '',
    _states: [ 'distant-slide', 'far-past', 'past', 'current', 'future', 'far-future', 'distant-slide' ],
    setState: function(state) {
      if (typeof state != 'string') {
        state = this._states[state];
      }
      if (state == 'current' && !this._visited) {
        this._visited = true;
      }
      removeClass(this._node, this._states);
      addClass(this._node, state);
      this._currentState = state;

      if (state == 'current') {
        this._onLoad();
      } else {
        this._onUnload();
      }
    },
    _onLoad: function() {
      this._fireEvent('onload');
    },
    _onUnload: function() {
      this._fireEvent('onunload');
    },
    _fireEvent: function(name) {
      var eventSrc = this._node.getAttribute(name);
      if (eventSrc) {
        eventSrc = '(function() { ' + eventSrc + ' })';
        var fn = eval(eventSrc);
        fn.call(this._node);
      }
    },
    _makeCounter: function() {
      if(!this._count || !this._node) { return; }
      var c = doc.createElement('span');
      c.className = 'counter';
      this._node.appendChild(c);
    },
    getNotes: function() {
      return this._hiddenNote;
    }
  };


  // main slideshow class
  var SlideShow = function(slides) {
    this._slides = (slides || []).map(function(el, idx) {
      return new Slide(el, idx);
    });
    var h = window.location.hash;
    try {
      this.current = h;
    } catch (e) {}
    this.current = (!this.current) ? "slide1" : this.current.replace('#', '');
    if (!query('#' + this.current)) {
      this.current = "slide1";
    }
    var _t = this;
    doc.addEventListener('keydown', function(e) { _t.handleKeys(e); }, false);
    doc.addEventListener('touchstart', function(e) { _t.handleTouchStart(e); }, false);
    doc.addEventListener('touchend', function(e) { _t.handleTouchEnd(e); }, false);
    window.addEventListener('popstate', function(e) { if (e.state) { _t.go(e.state, true); } }, false);
    query('#left-init-key').addEventListener('click', function() { _t.next(); }, false);
    this._update();
    queryAll('#nav-prev, #nav-next').forEach(function(el) {
      el.addEventListener('click', _t.onNavClick.bind(_t), false);
    });
    queryAll('menu button').forEach(function(el) {
      el.addEventListener('click', _t.onCommandClick.bind(_t), false);
    });
  };

  SlideShow.prototype = {
    _presentationCounter: query('#presentation-counter'),
    _menuCounter: query('#slide-no'),
    _hiddenNote: query('#hidden-note'),
    _help: query('#help'),
    _slides: [],
    _getCurrentIndex: function() {
      var me = this;
      var slideCount = null;
      queryAll('.slide').forEach(function(slide, i) {
        if (slide.id == me.current) {
          slideCount = i;
        }
      });
      return slideCount + 1;
    },
    _update: function(targetId, dontPush) {
      var currentIndex = this._getCurrentIndex();
      if (targetId) {
        var savedIndex = currentIndex;
        this.current = targetId;
        currentIndex = this._getCurrentIndex();
        if (Math.abs(savedIndex - currentIndex) > 1) {
          for (var x = savedIndex; x < savedIndex + 7; x++) {
            if (this._slides[x-4]) {
              this._slides[x-4].setState(0);
            }
          }
        }
      }
      var docElem = document.documentElement;
      var elem = document.elementFromPoint( docElem.clientWidth / 2, docElem.clientHeight / 2);
      if (elem && elem.className != 'presentation') {
        this._presentationCounter.textContent = currentIndex;
        if (this._menuCounter) {
          this._menuCounter.textContent = currentIndex;          
        }
      }
      this._hiddenNote.innerHTML = this._slides[currentIndex - 1].getNotes();
      if (history.pushState) {
        if (!dontPush) {
          history.pushState(this.current, 'Slide ' + this.current, '#' + this.current);
        }
      } else {
        window.location.hash = this.current;
      }
      for (var x = currentIndex; x < currentIndex + 7; x++) {
        if (this._slides[x-4]) {
          this._slides[x-4].setState(x-currentIndex);
        }
      }
    },

    current: 0,
    next: function() {
        var next = query('#' + this.current + ' + .slide');
        this._update((next) ? next.id : this.current);
    },
    prev: function() {
      var prev = query('.slide:nth-child(' + (this._getCurrentIndex() - 1) + ')');
      this._update((prev) ? prev.id : this.current);
    },
    go: function(slideId, dontPush) {
      this._update(slideId, dontPush);
    },
    showNotes: function() {
      if (disableNotes) {
        return;
      }
      this._hiddenNote.style.display = "block";
      this._hiddenNote.classList.toggle('invisible');
    },
    toggleHelp: function() {
      this._help.style.display = "block";
      this._help.classList.toggle('invisible');
    },
    handleKeys: function(e) {
      if (/^(input|textarea)$/i.test(e.target.nodeName) || e.target.isContentEditable) {
        return;
      }
      switch (e.keyCode) {
        case 37: // left arrow
          this.prev(); break;
        case 39: // right arrow
        case 32: // space
          this.next(); break;
        case 72: // H
          this.toggleHelp(); break;
        case 78: // N
          this.showNotes(); break;
      }
    },
    _touchStartX: 0,
    handleTouchStart: function(e) {
      this._touchStartX = e.touches[0].pageX;
    },
    handleTouchEnd: function(e) {
      var delta = this._touchStartX - e.changedTouches[0].pageX;
      var SWIPE_SIZE = 150;
      if (delta > SWIPE_SIZE) {
        this.next();
      } else if (delta< -SWIPE_SIZE) {
        this.prev();
      }
    },
    onNavClick: function(e) {
      if (e.target.id == "nav-prev") {
        this.prev();
      } else if (e.target.id = "nav-next") {
        this.next();
      }
    },
    onCommandClick: function(e) {
      var n = e.target.getAttribute('data-command');
      switch(n) {
        case 'notes':
          this.showNotes(); break;
        case 'help':
          this.toggleHelp(); break;
        case 'back':
          window.location.href = 'http://www.script-tutorials.com/creating-an-attractive-presentation-with-html5/'; break;
        default:
          return;
      }
    }
  };

  var slideshow = new SlideShow(queryAll('.slide'));
  document.addEventListener('DOMContentLoaded', function() {
    query('.slides').style.display = 'block';
  }, false);
  })();