!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.editor=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

var dropdown = _dereq_('./dropdown');
var saveAs = _dereq_('../vendor/FileSaver');
var Splash = _dereq_('./splash');
var exp = _dereq_('./gist');
var share_dialog = _dereq_('./share_dialog');
var debounce = _dereq_('./utils').debounce;


function close(el) {
  var d = d3.select(document.body).selectAll('#actionDropdown').data([]);
  d.exit().remove();
}

function open(el, items, _class, offset) {
  var d = d3.select(document.body).selectAll('#actionDropdown').data([0]);
  // enter
  var ul = d.enter().append('ul').attr('id', 'actionDropdown').style('position', 'absolute');
  if (_class) {
    d3.selectAll('#actionDropdown').attr('class', _class);
  } else {
    d3.selectAll('#actionDropdown').attr('class', '');
  }

  offset = offset || { x: 0, y: 0 }

  // update
  var bbox = el.getBoundingClientRect(),
      h = bbox.top + 25 + offset.y;
  d.style({
    top: h + "px",
    left: (bbox.left + offset.x) + "px",
  });

  var drop = dropdown().items(items);
  d.call(drop);

  if ((d3.select('#actionDropdown').node().offsetHeight+h - d3.select('#editor_modal').node().offsetHeight) > 120) {
    var top_ = (h - d3.select('#actionDropdown').node().offsetHeight - 40)+"px";

    d3.selectAll('#actionDropdown')
      .classed('drop-top', true)
      .style('top', top_)
  }

  return drop;

}
function dialog(context) {
  var code = '';
  var evt = d3.dispatch('code', 'template', 'basemap');

  function _dialog (el) {

    var codeEditor = el.selectAll('textarea#code')
      .data([code]);

    var enter = codeEditor.enter();
    var divHeader = enter.append('div')
      .attr('class','header');
    var divOptions = enter.append('div')
      .attr('class','options');

    divHeader.append('a')
      .attr('class','expandButton')
      .attr('href','#')
      .attr('title','Toggle expanded mode')
      .on('click', function(e){
        d3.event.preventDefault();
        // console.log(event.target);
        _expand();
      })

    divHeader.append('h1')
      .text('Editor');

    var templates = context.templates().map(function(d) { return d.title; }),
        basemaps = context.basemaps();

    var help = divOptions.append('ul').attr('class', 'h-left');

    help
      .append('li')
      .append('a')
      .attr('class', 'helpButton')
      .attr('title','Documentation')
      .attr('href', '#');

    var selector = help.append('li')
      .append('a')
      .attr('class', 'basemapSelector')
      .attr('title','Change basemap')
      .attr('href', '#basemap')

    selector.append('img')
      .attr('id', 'selectorImg')
      .attr('src', 'https://cartocdn_a.global.ssl.fastly.net/base-light/6/30/24.png')
      .attr('alt', '');

    selector.append('span')
      .attr('id', 'selectorName')
      .text(basemaps[0].title);

    selector
      .on('click', function() {
        d3.event.preventDefault();

        var self = this;

        open(this, context.basemaps().map(function(d) { return '<img src="'+d.thumbnail+'" alt="" /><span>'+d.title+'</span>'; })).on('click', function(e) {
          var md = el.select('textarea').node().codemirror.getValue();
          evt.basemap(md, e.match(/<span>(.*?)<\/span>/)[1]);

          close(self);
        });
      });


    var optionsMap = divOptions.append('ul').attr('class', 'h-right');

    optionsMap
      .append('li')
      .append('a')
      .attr('class', 'collapseButton')
      .attr('href','#')
      .attr('title','Toggle collapse mode')
      .on('click', function(e) {
        d3.event.preventDefault();

        if (d3.select(this).classed('expandButton')) {
          el.select('.CodeMirror').style('padding', '20px 20px 20px 72px');
          el.style('bottom', 'auto').style('min-height', '330px');
          el.style('bottom', '80px').style('height', 'auto');
          el.selectAll('.actionButton').style("visibility", "visible");
          d3.select(this).classed('expandButton', false);
          el.select('#actions_bar').classed('collapseActions', false);
        } else {
          el.style('bottom', 'auto').style('min-height', '0');
          el.style('bottom', 'auto').style('height', '119px');
          d3.select(this).classed('expandButton', true);
          el.selectAll('.actionButton').style("visibility", "hidden");
          el.select('#actions_bar').classed('collapseActions', true);
          el.select('.CodeMirror').style('padding', '0');
        }
      });

    optionsMap
      .append('li')
      .append('a')
      .attr('class', 'downloadButton')
      .attr('href','#')
      .attr('title','Download story')
      .on('click', function(e) {
        d3.event.preventDefault();

        function isSafari() {
          if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            return true;
          }

          return false;
        }

        function notOld() {
          if (window.File && window.FileReader && window.FileList && window.Blob) {
            return true;
          } else {
            return false;
          }
        }

        if (!isSafari() && notOld()) {
          var md = el.select('textarea').node().codemirror.getValue();
          exp.zip(md, context.template(), function(zip) {
            saveAs(zip.generate({ type: 'blob' }), 'story.zip');
          });
        } else {
          alert('Download is not fully supported in this browser.');
        }
      });

    optionsMap
      .append('li')
      .append('a')
      .attr('class', 'shareButton')
      .attr('href','#')
      .attr('title','Share story')
      .on('click', function(e) {
        d3.event.preventDefault();

        var md = el.select('textarea').node().codemirror.getValue();

        exp.gist(md, context.template(), function(gist) {
          // console.log(gist);
          //window.open(gist.html_url);
          share_dialog(gist.url, gist.html_url);
        });

        document.getElementById("copy-button").innerHTML = "Copy";

        var client = new ZeroClipboard(document.getElementById("copy-button"), {
          moviePath: "../vendor/ZeroClipboard.swf"
        });

        client.on("load", function(client) {
          client.on('datarequested', function(client) {
            var input = document.getElementById('shareInput');

            client.setText(input.value);
          });

          client.on("complete", function(client, args) {
            this.textContent = "Copied!";
          });
        });
      });

    divHeader.append('a')
      .attr('id', 'show_slide')
      .text(templates[0])
      .attr('title','Change template')
      .attr('href', '/odyssey.js/sandbox/sandbox.html')
      .on('click', function(d) {
        d3.event.preventDefault();
        d3.select(document.body).call(Splash(context).on('template', function(t) {
          evt.template(t);
        }));

        function initAnim($el) {
          var $anim = $el.find(".anim > div");
          
          $anim.spriteanim();

          $el.on("mouseenter", function() {
            $(this).find(".anim > div").spriteanim('play');
          });

          $el.on("mouseleave", function() {
            $(this).find(".anim > div").spriteanim('stop');
          });
        }

        initAnim($('li.template'));
      });


    context.on('template_change.editor', function(t) {
      d3.select('#show_slide').text(t);
    });

    var actions_bar = enter.append('div')
      .attr('id', 'actions_bar');

    var textarea = enter.append('textarea')
      .attr('id', 'code')
      .on('keyup.editor', function() {
        evt.code(this.value);
      });

    var sendCode = debounce(function(code) {
      evt.code(code);
    }, 100);



    textarea.each(function() {
      var codemirror = this.codemirror = CodeMirror.fromTextArea(this, {
        mode: "markdown",
        lineWrapping: true
      });
      var codemirror_wrap = el.select('.CodeMirror-wrap');
      var showActions = debounce(function() { placeActionButtons(codemirror_wrap, codemirror); }, 500);
      var hideActions = debounce(function() { el.selectAll('.actionButton').remove(); }, 20);
      codemirror.on('scroll',  function() {
        showActions();
        hideActions();
      });
      this.codemirror.on('change', function(c) {
        // change is raised at the beginning with any real change
        if (c.getValue()) {
          sendCode(c.getValue());
          var codemirror_wrap = el.select('.CodeMirror-wrap');
          placeActionButtons(codemirror_wrap, codemirror);
        }
      });
    });

    function _expand() {
      var _t = d3.select('#editor_modal');
      var _hassClass = _t.classed('expanded')
      _t.classed('expanded', !_hassClass);

      var _b = d3.select('a.expandButton');
      _b.classed('expanded', !_hassClass);

    }

    // update
    codeEditor.each(function(d) {
      this.codemirror.setValue(d);
      var codemirror_wrap = el.select('.CodeMirror-wrap');
      placeActionButtons(codemirror_wrap, this.codemirror);
    });

    context.on('error.editor', function(errors) {
      var e = el.selectAll('.error').data(errors)
      e.enter()
        .append('div')
        .attr('class', 'error')
      e.text(String)

      e.exit().remove();
    })

  }

  var SLIDE_REGEXP = /^#[^#]+/i;
  var ACTIONS_BLOCK_REGEXP = /\s*```/i;

  function getLines(codemirror, i, j) {
    var lines = '';
    for(var k = i; k < j; ++k) {
      lines += codemirror.getLine(k) + '\n';
    }
    return lines;
  }

  // adds action to slideNumber.
  // creates it if the slide does not have any action
  function addAction(codemirror, slideNumer, action) {
    // parse properties from the new actions to next compare with
    // the current ones in the slide
    var currentActions = O.Template.parseProperties(action);
    var currentLine;
    var c = 0;
    var blockStart;

    // search for a actions block
    for (var i = slideNumer + 1; i < codemirror.lineCount(); ++i) {
      var line = codemirror.getLineHandle(i).text;
      if (ACTIONS_BLOCK_REGEXP.exec(line)) {
        if (++c === 2) {
          // parse current slide properties
          var slideActions = O.Template.parseProperties(getLines(codemirror, blockStart, i));
          var updatedActions = {};

          // search for the same in the slides
          for (var k in currentActions) {
            if (k in slideActions) {
              updatedActions[k] = currentActions[k];
            }
          }

          // remove the ones that need update
          for (var k in updatedActions) {
            for (var linePos = blockStart + 1; linePos < i; ++linePos) {
              if (k in O.Template.parseProperties(codemirror.getLine(linePos))) {
                codemirror.removeLine(linePos);
                i -= 1;
              }
            }
          }

          // insert in the previous line
          currentLine = codemirror.getLineHandle(i);
          codemirror.setLine(i, action + "\n" + currentLine.text);
          return;
        } else {
          blockStart = i;
        }
      } else if(SLIDE_REGEXP.exec(line)) {
        // not found, insert a block
        currentLine = codemirror.getLineHandle(slideNumer);
        codemirror.setLine(slideNumer, currentLine.text + "\n```\n" + action +"\n```\n");
        return;
      }
    }
    // insert at the end
    currentLine = codemirror.getLineHandle(slideNumer);
    codemirror.setLine(slideNumer, currentLine.text + "\n```\n"+ action + "\n```\n");
  }


  // place actions buttons on the left of the beggining of each slide
  function placeActionButtons(el, codemirror) {

    // search for h1's
    var positions = [];
    var lineNumber = 0;
    codemirror.eachLine(function(a) {
      if (SLIDE_REGEXP.exec(a.text)) {
         positions.push({
           pos: codemirror.heightAtLine(lineNumber)-66, // header height
           line: lineNumber
         });
      }
      ++lineNumber;
    });

    //remove previously added buttons
    el.selectAll('.actionButton').remove()

    var buttons = el.selectAll('.actionButton')
      .data(positions);

    // enter
    buttons.enter()
      .append('div')
      .attr('class', 'actionButton')
      .style({ position: 'absolute' })
      .html('add')
      .on('click', function(d, i) {
        d3.event.stopPropagation();
        var self = this;
        open(this, context.actions()).on('click', function(e) {
          context.getAction(e, function(action) {
            addAction(codemirror, d.line, action);
            context.changeSlide(i);
          });
          close(self);
        });
      });

    el.on('click.actionbutton', function() {
      //close popup
      close();
    })

    // update
    var LINE_HEIGHT = 38;
    buttons.style({
      top: function(d) { return (d.pos - LINE_HEIGHT) + "px"; },
      left: 16 + "px"
    });

  }

  _dialog.code = function(_) {
    if (!arguments.length) return _;
    code = _;
    return _dialog;
  };

  return d3.rebind(_dialog, evt, 'on');
}

module.exports = dialog;

},{"../vendor/FileSaver":9,"./dropdown":2,"./gist":3,"./share_dialog":5,"./splash":6,"./utils":7}],2:[function(_dereq_,module,exports){

function dropdown() {
  var evt = d3.dispatch('click');
  var items = [];

  function _dropdown(el) {
    var i = el.selectAll('.item').data(items);
    // enter
    i.enter().append('li').attr('class', 'item').on('click', function(d) {
      evt.click(d.value || d);
    });
    // update
    i.html(function(d) { return d.text || d; });
    // remove
    i.exit().remove();

    return _dropdown;
  }

  // gets a list of { value: '...', text: '...' }
  _dropdown.items = function(_) {
    if (!arguments.length) return _;
    items = _;
    return _dropdown;
  };

  return d3.rebind(_dropdown, evt, 'on');
}


module.exports = dropdown;

},{}],3:[function(_dereq_,module,exports){
function relocateAssets(doc) {
  var s = location.pathname.split('/');
  var relocate_url = "http://cartodb.github.io" + s.slice(0, s.length - 1).join('/') + "/";

  var js = doc.getElementsByTagName('script');
  for (var i = 0; i < js.length; ++i) {
    var src = js[i].getAttribute('src');
    if (src && src.indexOf('http') !== 0) {
      js[i].setAttribute("src", (relocate_url + src).replace(/sandbox\/..\//g, ''));
    }
  }

  var css = doc.getElementsByTagName('link');
  for (var i = 0; i < css.length; ++i) {
    var href = css[i].getAttribute('href');
    if (href && href.indexOf('http') !== 0) {
      css[i].setAttribute("href", relocate_url + href);
    }
  }
}

function processHTML(html, md, transform) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, 'text/html');

  // transform
  transform && transform(doc);

  var md_template = doc.createElement("script");

  md_template.setAttribute("id", "md_template");
  md_template.setAttribute("type", "text/template");

  md_template.innerHTML = md;
  doc.body.appendChild(md_template);

  return '<!doctype><html>'+doc.documentElement.innerHTML+'</html>';
}

function files(md, template, callback) {
  function request(r, callback) {
    d3.xhr(r).get(callback);
  }
  queue(2)
    .defer(request, template + '.html')
    .awaitAll(ready);

  function ready(error, results) {
    results = results.map(function(r) {
      return r.responseText;
    });

    callback({
      'odyssey.html': processHTML(results[0], md, relocateAssets)
    });
  }
}

function zip(md, template, callback) {
  files(md, template, function(contents) {
    var zip = new JSZip();
    for (var f in contents) {
      zip.file(f, contents[f]);
    }
    callback(zip);
  });
}

function Gist(md, template, callback) {
  var gistData = null;

  d3.xhr(template + ".html").get(function(err, xhr) {
    var html = xhr.responseText;
    var payload = {
        "description": "Odyssey.js template",
        "public": true,
        "files": {
          'index.html': {
            content: processHTML(html, md, relocateAssets)
          }
        }
    };

    d3.xhr('https://api.github.com/gists')
      .header("Content-Type", "application/json")
      .post(JSON.stringify(payload), function(err, xhr) {
        gist = JSON.parse(xhr.responseText);
        var BLOCKS = 'http://bl.ocks.org/anonymous/raw/';
        // console.log(gist);
        callback({
          url: gist.url,
          html_url: BLOCKS + gist.id,
        });
      });
  });

}

module.exports = {
  gist: Gist,
  zip: zip
}

},{}],4:[function(_dereq_,module,exports){

//i18n placeholder
function _t(s) { return s; }


var dialog = _dereq_('./dialog');
var Splash = _dereq_('./splash');
var DOMParser = _dereq_('../vendor/DOMParser');
var utils = _dereq_('./utils');


var TEMPLATE_LIST =  [{
    title: 'slides',
    description: 'Display visualization chapters like slides in a presentation',
    default: "```\n-baseurl: \"https://2.maps.nlp.nokia.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24\"\n-title: \"Circuit médiéval de Lectoure (Gers)\"\n-author: \"Makina Corpus\"\n```\n\n# Circuit médiéval de Lectoure (Gers)\n```\n- center: [43.9340, 0.6232]\n- zoom: 17\nL.marker([43.9340, 0.6232]).actions.addRemove(S.map)\n```\nBienvenue !\n\nPoint de départ du circuit\n![Ville de Lectoure](http://www.lectoure.fr/themes/danland/images/logo.gif)\n\n# Départ depuis la Cathédrale\n```\n- center: [43.9338, 0.6242]\n- zoom: 17\nL.marker([43.9338, 0.6242]).actions.addRemove(S.map)\n```\n![Cathédrale](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVR73/322010/IVR73_000681_I_1/VIG/IVR73_20103250174NUCA_V.JPG)\n\n[Cathédrale Saint-Gervais et Saint Protais](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038762)\n\n# Maison de Galard\n```\n- center: [43.9343, 0.6221]\n- zoom: 17\nL.marker([43.9343, 0.6221]).actions.addRemove(S.map)\n```\n![Maison de Galard](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322011/IVC32208_000008_I_1/VIG/IVC32208_20113200379NUCA_V.JPG)\n\n[Maison de Galard](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001113)\n\n# Sénéchaussée\n```\n- center: [43.9349, 0.6204]\n- zoom: 17\nL.marker([43.9349, 0.6204]).actions.addRemove(S.map)\n```\nLe long du parcours vous aurez des exemples des hautes maisons en pierre.\n\nArrivée au point :\n\nLa porte et la croisée de cette façade sont les vestiges visibles du siège de la Sénéchaussée établie par Louis XI\n\n![Sénéchaussée](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322010/IVC32208_000004_I_1/VIG/IVC32208_20103200274NUCA_V.JPG?1428584110068)\n\n# Edifice long de 21m\n```\n- center: [43.9352, 0.6198]\n- zoom: 17\nL.marker([43.9352, 0.6198]).actions.addRemove(S.map)\n```\nA l'Est de l'église des Cordeliers se site cet [edifice non-identifié](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001024)\n\n![Edifice non-identifié](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322009/IVC32208_000001_I_1/VIG/IVC32208_20093200305NUCA_V.JPG)\n\n# Eglise du couvent des Cordeliers\n```\n- center: [43.9351, 0.6194]\n- zoom: 17\nL.marker([43.9351, 0.6194]).actions.addRemove(S.map)\n```\n![Eglise Cordelier](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322009/IVC32208_000001_I_1/VIG/IVC32208_20093200286NUCA_V.JPG?1428587051007)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001029)\n\n# Couvent des Cordeliers\n```\n- center: [43.9352, 0.6192]\n- zoom: 17\nL.marker([43.9352, 0.6192]).actions.addRemove(S.map)\n```\n![Couvent des Cordeliers](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322009/IVC32208_000001_I_1/VIG/IVC32208_20093200270NUCA_V.JPG?1428587054404)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038766)\n\n# Château des Comtes d'Armagnac\n```\n- center: [43.9362, 0.6156]\n- zoom: 17\nL.marker([43.9362, 0.6156]).actions.addRemove(S.map)\n```\n![Château des Comtes d'Armagnac](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322010/IVC32208_000004_I_1/VIG/IVC32208_20103200286NUCA_V.JPG?1428585147984)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038777)\n\n# Couvent des Carmes\n```\n- center: [43.9341, 0.6194]\n- zoom: 17\nL.marker([43.9341, 0.6194]).actions.addRemove(S.map)\n```\n![Couvent des Carmes](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322013/IVC32208_000012_I_1/VIG/IVC32208_20133200169NUCA_V.JPG?1428585452428)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038764)\n\n# Eglise du Saint-Esprit\n```\n- center: [43.9339, 0.6196]\n- zoom: 17\nL.marker([43.9339, 0.6196]).actions.addRemove(S.map)\n```\n![Eglise du Saint-Esprit](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322012/IVC32208_000010_I_1/VIG/IVC32208_20123200143NUCA_V.JPG)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001117)\n\n# Voûte peinte\n```\n- center: [43.9338, 0.6214]\n- zoom: 17\nL.marker([43.9338, 0.6214]).actions.addRemove(S.map)\n```\n![Voûte peinte](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//INV/DPT32-2002/VIG/IVR73_02320017NUC_V.JPG)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IM32000406)\n\n# Tour d'Albinhac\n```\n- center: [43.9340, 0.6220]\n- zoom: 17\nL.marker([43.9340, 0.6220]).actions.addRemove(S.map)\n```\n![Tour d'Albinhac](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322010/IVC32208_000004_I_1/VIG/IVC32208_20103200271NUCA_V.JPG?1428586439810)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038772)\n\n# Fontaine de Fontélie\n```\n- center: [43.9326, 0.6238]\n- zoom: 17\nL.marker([43.9326, 0.6238]).actions.addRemove(S.map)\n```\n![Fontaine de Fontélie](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322013/IVC32208_000013_I_1/VIG/IVC32208_20133200194NUCA_V.JPG)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038818)\n\n# Le circuit est terminé !\n```\n- center: [43.9336, 0.6245]\n- zoom: 14\nL.marker([43.9336, 0.6245]).actions.addRemove(S.map)\n```\nCe parcours représente environ 2kms pendant lesquels vous serez émerveillés par le charme des nombreuses maisons en pierre qui jalonnent le circuit.\n\nBien des secrets se cachent dans ces maisons en pierre ! A vous de les découvrir...\n\n[Les sources de cette présentation](http://patrimoines.midipyrenees.fr/cartographie-interactive/randonnees-patrimoine/lectoure-medieval/index.html)\n\n"
  }, {
    title: 'scroll',
    description: 'Create a visualization that changes as your reader moves through your narrative',
    default: "```\n-baseurl: \"https://2.maps.nlp.nokia.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24\"\n-title: \"Le patrimoine en Midi-Pyrénées\"\n-author: \"Makina Corpus\"\n```\n\n# Le patrimoine en Midi-Pyrénées\n```\n- center: [43.9318, 0.6281]\n- zoom: 12\nL.marker([43.9318, 0.6278]).actions.addRemove(S.map)\n```\nD'après l'Inventaire du Patrimoine de la Commune de Lectoure initié en 1979 et repris depuis 2009\n\n![Région Midi-Pyrénée](http://www.grandsudinsolite.fr/client/cache/rubrique/100_______logocrmidipyrenees_14.png)\n\n# La tannerie royale de Lectoure\n```\n- center: [43.9323, 0.6255]\n- zoom: 17\nL.marker([43.9323, 0.6255]).actions.addRemove(S.map)\n```\nCi-dessous le lien  vers la vidéo réalisée dans le cadre du concours CLAP PATRIMOINE 2011 \n\norganisé par la Fondation du Crédit Agricole Pyrénées-Gascogne\n\n[La Tannerie en vidéo ici](https://www.youtube.com/watch?v=SNfTv5SO194)\n\n# Le pigeonnier de soupton\n```\n- center: [43.9711, 0.6827]\n- zoom: 12\nL.marker([43.9711, 0.6827]).actions.addRemove(S.map)\n```\nCe pigeonnier carré à arcades et escalier en vis central date probablement du 17ème\nsiècle. La corniche saillante appelée « randière », placée à mi-hauteur, a pour fonction d'empêcher l'ascension des rongeurs.\n\n![Le pigeonnier de soupton](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl_tmp//IVC32208/322010/IVC32208_000004_I_1/ICN/IVC32208_20103200351NUCA_V.PNG)\n\n# L eglise de Tane\n```\n- center: [43.9244, 0.6768]\n- zoom: 14\nL.marker([43.9244, 0.6768]).actions.addRemove(S.map)\n```\nEglise à vaisseau unique, chœur à trois côtés (chevet plat), et clocher-tour en façade, datant probablement du milieu du 19ème siècle. Le style est à la fois néo-roman (arcs trilobés, contreforts) et néo-gothique (arcs brisés et arc en accolade). Faites le tour de l'édifice par le sud et découvrez la façade de la sacristie accolée à l'angle nord-est. Au 19ème siècle déjà, le hameau de Tané comptait moins de dix parcelles bâties. La paroisse devait donc dépasser largement les limites du hameau et réunir les fidèles de\nplusieurs écarts voisins. Se garer devant l'ancienne école primaire.\n\n![L eglise de Tane](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/eglise-tane.png)\n\n# Malus (croix de chemin)\n```\n- center: [43.8926, 0.7084]\n- zoom: 13\nL.marker([43.8926, 0.7084]).actions.addRemove(S.map)\n```\nCroix destinée à la bénédiction des terres et des récoltes lors de processions se déroulant à la saint Marc et les trois jours précédant l'Ascension : les Rogations. La croix de calcaire semble avoir été remplacée par une petite croix en métal de style 19ème. La cuve creusée dans le dé de pierre d'origine servait à recueillir des offrandes ou de l'eau bénite.\n\n![Malus (croix de chemin)](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/malus.png)\n\n# Ayraud (croix de chemin)\n```\n- center: [43.9099, 0.6840]\n- zoom: 14\nL.marker([43.9099, 0.6840]).actions.addRemove(S.map)\n```\nCroix destinée à la bénédiction des terres et des récoltes lors de processions se déroulant à la saint Marc et les trois jours précédant l'Ascension : les Rogations. Les degrés servaient à recueillir des offrandes. Celle-ci, en calcaire, pourrait en grande partie remonter au 17ème siècle, comme le laissent supposer ses moulurations épaisses. Les quatre bornes placées aux angles indiquent les points cardinaux.\n\n![Ayraud (croix de chemin)](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/ayraud.png)\n\n# Fontaine de la Trelauzere\n```\n- center: [43.9228, 0.6342]\n- zoom: 14\nL.marker([43.9228, 0.6342]).actions.addRemove(S.map)\n```\nLa source de Saint-Gény se situe en contrebas de la colline Sainte-Croix, là même où aurait vécu saint Geny, l'un des quatre évangélisateurs de Lectoure au 4ème siècle. Non loin de là, vers 980, est fondé le couvent de Saint-Gény, remplacé en 1068 par un prieuré clunisien. La source est aujourd'hui recouverte d'une voûte en berceau brisé.\n\n![Fontaine de la Trelauzere](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/trelauzere.png)\n\n# Puits couvert du chemin de la tride\n```\n- center: [43.9307, 0.6203]\n- zoom: 14\nL.marker([43.9307, 0.6203]).actions.addRemove(S.map)\n```\nPuits étroits couverts d'une voûte en berceau, dissimulé dans la pente, sous le glacis extérieur constituant avec les trois lignes de remparts l'ensemble du système de fortification de la ville. Accès uniquement piéton, le Chemin de la Tride étant réservé à la circulation des riverains.\n\n![Puits couvert du chemin de la tride](http:////s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/tride.png)\n\n# Fontaine / abreuvoir de Pradoulin\n```\n- center: [43.9281, 0.6173]\n- zoom: 14\nL.marker([43.9281, 0.6173]).actions.addRemove(S.map)\n```\nRemarquez le fronton triangulaire de cette fontaine, de facture particulièrement soignée (éléments en pierre de taille), accostée de deux abreuvoirs. Elle réceptionne l'eau d'une source qui devait déjà être utilisée aux premiers siècles de notre ère, lorsque la ville, « Lactora », était bâtie au pied du promontoire rocheux, au bord du Gers. \n\n![Fontaine / abreuvoir de Pradoulin](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/pradoulin.png)\n\n# Grenier surélevé de Garros\n```\n- center: [43.9214, 0.5961]\n- zoom: 13\nL.marker([43.9214, 0.5961]).actions.addRemove(S.map)\n```\nLe rez-de-chaussée de ce grenier indépendant était probablement destiné au séchage. Les élévations nord et ouest sont en pierre tandis que les élévations Est et sud sont en pan de bois à l'étage et ouvertes en rez-de-chaussée. La façade sud est soutenue par trois piliers en pierre de taille de section carrée selon un style basquo-landais atypique sur la commune.\nPropriété privée : observer depuis la route.\n\n![Grenier surélevé de Garros](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/garros.png)\n\n# Le lavoir / Fontaine à Le Mounet du Hour\n```\n- center: [43.9266, 0.5996]\n- zoom: 14\nL.marker([43.9266, 0.5996]).actions.addRemove(S.map)\n```\nSource maçonnée alimentant un lavoir rectangulaire autrefois utilisé par les lavandières du Mounet du Hour et des écarts voisins. Ce hameau est aujourd'hui constitué d'une dizaine de maisons alors qu'il n'en comptait que trois en 1824.\n\n![Le lavoir / Fontaine à Le Mounet du Hour](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/mounet.png)\n\n# Tour médiéval de Lamothe\n```\n- center: [43.9600, 0.5932]\n- zoom: 14\nL.marker([43.9600, 0.5932]).actions.addRemove(S.map)\n```\nTour construite dans la deuxième moitié du 13e siècle ou la première moitié du 14e siècle, près de la rive gauche du Gers. Est-ce un moulin dès l'origine ? Servait-elle au contrôle d'un passage sur la rivière ? En 1779, dans le dîmaire de l'Ordre de Malte, elle est appelée «ancien moulin, et tour de Lamothe». Les baies géminées ont été vendues au début du 20ème siècle. Attention l'accès à cet édifice en ruine est interdit, l'observer depuis le chemin.\n\n![Tour médiéval de Lamothe](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/lamothe.png)\n\n#Pont-Barrage de Lamothe\n```\n- center: [43.9624, 0.5980]\n- zoom: 13\nL.marker([43.9624, 0.5980]).actions.addRemove(S.map)\n```\nPont-barrage construit sur le Gers, probablement au 18e siècle, afin d'inonder les pâtures\nà la saison sèche. En 1782 le pont et les moulins situés de part et d'autre figurent sur le plan d'un dîmaire de l'Ordre de Malte. Ce pont-barrage comptait sept arches à l'origine. Il s'agit de l'un des derniers conservés sur le cours du Gers. Attention l'accès à cet difice en ruine est interdit, l'observer depuis la rive.\n\n![Pont-Barrage de Lamothe](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/lamothep.png)\n\n# Moulin à eau de Manirac\n```\n- center: [43.9504, 0.6258]\n- zoom: 14\nL.marker([43.9504, 0.6258]).actions.addRemove(S.map)\n```\nMoulin à eau de plan carré construit sur trois niveaux au 18ème siècle. Est-ce ce moulin qui figure sur la carte de Cassini établie dans la seconde moitié du 18ème siècle ? Le ruisseau de Bournaca alimentait deux roues probablement horizontales. L'édifice est en cours de restauration. Accès à pied uniquement. Propriété privée à observer depuis le chemin de randonnée.\n\n![Moulin à eau de Manirac](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/manirac.png)\n\n# Fontaine de Clarette\n```\n- center: [43.9418, 0.6343]\n- zoom: 14\nL.marker([43.9418, 0.6343]).actions.addRemove(S.map)\n```\nDans le cadre exotique et surprenant d'une bambouseraie, se révèle au pied d'une paroi calcaire, parmi les lierres grimpants, la « Fontaine de Rajocan » voûtée en berceau brisé, aussi appelée « Fontaine de la Rage aux Chiens ». Selon la légende, c'est ici que venaient s'abreuver les animaux malades de la rage, car ils savaient que cette source ne tarissait jamais. Cette interprétation pourrait cependant aussi provenir d'une traduction erronée du gascon «Arrajadés» qui désigne les pentes toujours exposées au soleil.\n\n![Fontaine de Clarette](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/clarette.png)\n\n# Sources\n```\n- center: [43.9336, 0.6245]\n- zoom: 14\nL.marker([43.9336, 0.6245]).actions.addRemove(S.map)\n```\n[Les sources de cette présentation](http://patrimoines.midipyrenees.fr/fileadmin/Patrimoines-editorial/Decouvrir_le_patrimoine/Presentation_du_pole_patrimoine_en_Midi-Pyrenees/La_connaissance_du_patrimoine/partenaires/Lectoure/JPP-2011-Lectoure.pdf)\n"
  }, {
    title: 'torque',
    description: 'Link story elements to moments in time using this animated map template',
    default: "```\n-title: \"Example\"\n-author: \"Makina Corpus\"\n-vizjson: \"http://viz2.cartodb.com/api/v2/viz/521f3768-eb3c-11e3-b456-0e10bcd91c2b/viz.json\"\n-duration: 18\n```\n\n# Torque Template\n```\n- step: 0\n- center: [-4.0396, 5.5371]\n- zoom: 2\n```\n\n## Animated maps\n\nDelete the [Markdown](http://daringfireball.net/projects/markdown/) to get started with your own or watch this story to learn some of the techniques.\n\n# vizjson\n```\n-step: 30\nS.torqueLayer.actions.pause()\nO.Actions.Sleep(3000)\nS.torqueLayer.actions.play()\n```\n\nUnlike other Odyssey.js templates, the Torque template requres a Viz.JSON URL to add an animated layer to your map. You can find out more about Viz.JSON URLs [here](http://developers.cartodb.com/documentation/using-cartodb.html#sec-8)\n\nTo add your own, just replace the above link so it looks like,\n\n**-vizjson: \"http://your-url/viz.json\"**\n\n\n# Markdown\n```\n-step: 60\nS.torqueLayer.actions.pause()\nO.Actions.Sleep(3000)\nS.torqueLayer.actions.play()\n```\n\nLike all templates, the Torque template runs on [Markdown](http://daringfireball.net/projects/markdown/). This gives you the ability to create completely custom content for your story\n\n# Change map position \n```\n- step: 111\n- center: [50.2613, -2.1313]\n- zoom: 5\nS.torqueLayer.actions.pause()\nO.Actions.Sleep(3000)\nS.torqueLayer.actions.play()\n```\n\nYou can tour the map by:\n\n1. Add a new section using the headline notation, **#**\n2. Pause the slider and move it to the desired time in your map visualization.\n3. Beside your new headline, click Add and then **insert time**\n4. Move your map to your desired location, and click \"move map to current position\"\n\n# Pause your map\n```\n- step: 292\n- center: [9.4165, -79.2828]\n- zoom: 7\nS.torqueLayer.actions.pause()\nO.Actions.Sleep(2000)\nS.torqueLayer.actions.play()\n```\n\nIf you want to highlight a particular moment in time, it is helpful to use a Pause, Sleep, Play series of events like this slide. \n"
  }
];

var BASEMAP_LIST =  [{
    title: 'CartoDB Light',
    url: "https:\/\/cartocdn_a.global.ssl.fastly.net\/base-light\/{z}\/{x}\/{y}.png",
    thumbnail: "https:\/\/cartocdn_a.global.ssl.fastly.net\/base-light\/6\/30\/24.png"
  }, {
    title: 'Nokia Day',
    url: "https://2.maps.nlp.nokia.com/maptile/2.1/maptile/newest/normal.day/{z}\/{x}\/{y}/256/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24",
    thumbnail: "https:\/\/2.maps.nlp.nokia.com\/maptile\/2.1\/maptile\/newest\/normal.day\/6\/30\/24\/256\/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24"
  }, {
    title: 'Stamen Watercolor',
    url: "http://{s}.tile.stamen.com/watercolor/{z}\/{x}\/{y}.jpg",
    thumbnail: "http:\/\/a.tile.stamen.com\/watercolor\/6\/30\/24.jpg"
  }
];


function editor(callback) {

  var body = d3.select(document.body);
  var context = {};

  d3.rebind(context, d3.dispatch('error', 'template_change'), 'on', 'error', 'template_change');

  context.templates = function(_) {
    if (_) {
      var t = TEMPLATE_LIST.map(function(d) { return d.title; }).indexOf(_);
      if (t >= 0) {
        return TEMPLATE_LIST[t];
      }
      return null;
    }
    return TEMPLATE_LIST;
  };

  context.save = utils.debounce(function(_) {
    if (this.code() && this.template()) {
      O.Template.Storage.save(this.code(), this.template());
    }
  }, 100, context);

  context.template = function(_) {
    if (_) {
      if (this._template !== _) {
        this._template = _;
        this.template_change(_);
      }
    }
    return this._template;
  }

  context.code = function(_) {

    if (_) {
      this._code = _;
      // console.log("code", _);
    }
    return this._code;
  }

  context.basemaps = function(_) {
    if (_) {
      var t = BASEMAP_LIST.map(function(d) { return d.title; }).indexOf(_);
      if (t >= 0) {
        return BASEMAP_LIST[t];
      }
      return null;
    }
    return BASEMAP_LIST;
  }

  var template = body.select('#template');
  var code_dialog = dialog(context);

  var iframeWindow;
  var $editor = body.append('div')
    .attr('id', 'editor_modal')
    .call(code_dialog);


  d3.select(document.body);

  var callbacks = {};

  function readMessage(event) {
    var msg = JSON.parse(event.data);

    if (msg.id) {
      callbacks[msg.id](msg.data);
      delete callbacks[msg.id];
    }
  }

  if (!window.addEventListener) {
    window.attachEvent("message", function load(event) {
      readMessage(event);
    });
  } else {
    window.addEventListener("message", function load(event) {
      readMessage(event);
    });
  }

  function sendMsg(_, done) {
    var id = new Date().getTime();
    callbacks[id] = done;
    _.id = id;
    iframeWindow.postMessage(JSON.stringify(_), iframeWindow.location);
  }

  function execCode(_, done) {
    var id = new Date().getTime();
    callbacks[id] = done;
    iframeWindow.postMessage(JSON.stringify({
      type: 'code',
      code: _,
      id: id
    }), iframeWindow.location);
  }

  function sendCode(_) {
    sendMsg({
      type: 'md',
      code: _
    }, function(err) {
      if (err) {
        err = [err]
      } else {
        err = []
      }
      context.error(err);
    });
  }

  function getAction(_, done) {
    sendMsg({ type: 'get_action', code: _ }, done);
  }

  function changeSlide(_) {
    sendMsg({ type: 'change_slide', slide: _ });
  }

  code_dialog.on('basemap.editor', function(md, bm) {
    var basemap_data = context.basemaps(bm);

    //TODO: refactor with addAction
    if (basemap_data) {
      var url = basemap_data.url;

      if (md.indexOf('baseurl:') === -1) {
        var ibas = md.indexOf('```')+3,
            bas = "\n-baseurl: \""+url+"\"";

        md = md.slice(0, ibas) + bas + md.slice(ibas);
      } else {
        var md_i = md.indexOf('baseurl:')+8,
            md_ = md.slice(md_i, md.length);

        md = '```\n-baseurl: \"'+url+'"\n'+md_.slice(md_.indexOf('\n')+1, md_.length);
      }

      $editor.call(code_dialog.code(md));
    }
  });

  code_dialog.on('code.editor', function(code) {
    if (code.indexOf('baseurl:') != -1) {
      var code_i = code.indexOf('baseurl:')+8,
          code_ = code.slice(code_i, code.length);
          url = code_.split("\"")[1];

      var url_ = url.replace(/\{s\}/g, "a")
        .replace(/\{x\}/g, "30")
        .replace(/\{y\}/g, "24")
        .replace(/\{z\}/g, "6");

      document.getElementById('selectorImg').src = url_;

      var urls = context.basemaps().map(function(d) { return d.url; });

      for(var i = 0; i < urls.length; i++) {
        if (url === urls[i]) {
          document.getElementById('selectorName').innerHTML = context.basemaps()[i].title;
        }
      }
    }

    sendCode(code);
    context.code(code);
    context.save();
  });

  context.sendCode = sendCode;
  context.execCode = execCode;
  context.actions = function(_) {
    if (!arguments.length) return this._actions;
    this._actions = _;
    return this;
  };
  context.getAction = getAction;
  context.changeSlide = changeSlide;


  template.on('load', function() {
    iframeWindow = template.node().contentWindow;
    O.Template.Storage.load(function(md, template) {
      sendCode(md);
      set_template(template);

      $editor.call(code_dialog.code(md));
    });
    sendMsg({ type: 'actions' }, function(data) {
      context.actions(data);
    });

    // when there is no code, show template selector splash
    if (!context.code() && location.hash.length === 0) {
      d3.select(document.body).call(Splash(context).on('template', function(t) {
        var template_data = context.templates(t);
        if (template_data) {
          context.code(template_data.default);
          set_template(t);
          sendCode(template_data.default);
          $editor.call(code_dialog.code(template_data.default));
        }
      }));

      callback && callback();
    }
  });

  function set_template(t) {
    var html_url = t + ".html";
    if (template.attr('src') !== html_url) {
      template.attr('src', t + ".html");
      context.template(t);
      context.save();
    }
  }

  code_dialog.on('template.editor', function(t) {
    set_template(t);
  });

  //set_template('scroll');

}

module.exports = editor;

},{"../vendor/DOMParser":8,"./dialog":1,"./splash":6,"./utils":7}],5:[function(_dereq_,module,exports){

function share_dialog(url, html_url) {
  var share_iframe = "<iframe width='100%' height='520' frameborder='0' src='"+html_url+"' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>"

  // show the dialog
  var s = d3.select('#share_dialog').style('display', 'block');

  function close() {
    s.style('display', 'none');
  }

  var input = s.select('#shareInput');

  // update url
  input.attr('value', share_iframe);

  s.selectAll('#mode_menu li').classed("selected", false);
  s.select('#mode_menu li.first').classed("selected", true);

  // select input on click
  input.on("click", function() {
    this.select();
  });

  // toggle iframe url
  s.selectAll('#mode_menu a')
    .on('click', function() {
      d3.event.preventDefault();

      s.selectAll('#mode_menu li').classed("selected", false);
      d3.select(this.parentNode).classed("selected", true);

      var type = d3.select(this).attr("data-embed");

      if (type === 'url') {
        input.attr('value', html_url);
      } else if (type === 'iframe') {
        input.attr('value', share_iframe);
      }
    });


  // bind events for copy and close on ESP press
  s.selectAll('#closeButton')
    .on('click', function() {
      d3.event.preventDefault();
      close();
    });

  d3.select("body")
    .on("keydown", function() {
      if (d3.event.which === 27) {
        close();
      }
    });
}

module.exports = share_dialog

},{}],6:[function(_dereq_,module,exports){

function Splash(context) {

  var evt = d3.dispatch('template')

  function _splash() {
    var s = d3.select(document.body)
      .selectAll('#template_selector')
      .data([0]);

    var div = s.enter().append('div')
      .attr('id', 'template_selector')
      .attr('class', 'splash h-valign');

    var inner_content = div.append('div').attr('class', 'splash_inner')

    inner_content.append('h1').text('Select your template')
    inner_content
      .append('p')
      .attr('class', 'last')
      .text('Templates give you different ways to unfold your story')
    var templates = inner_content.append('ul').attr('class', 'template_list h-valign')


    var template = templates
      .selectAll('.template').data(context.templates())
      .enter()
        .append('li')
        .attr('class', 'template h-valign')
        .append ('div')
        .attr('class', function(d) {
            return 'inner-template '
          })

    template
        .append('div')
        .attr('class', 'anim')
        .append('div')
        .attr('id', function(d) {
          return d.title
        })
        .attr('data-baseurl', function(d) {
          return d.title
        })
        .attr('data-grid', '6x8')
        .attr('data-blocksize', '180x134')
        .attr('data-frames', function(d) {
          if (d.title == "slides") return 150
            else return 50
        })
        .attr('data-fps', '30')
        .attr('data-autoplay', 'stop')
        .attr('data-autoload', 'true')
        .attr('data-retina', 'false')
        .attr('data-idx', 0)

    template
        .append('p')
          .text(function(d) {
            return d.description
          })

    template
      .append('a').text(function(d) {
          return d.title
        })
      .attr('class', 'button-template').on('click', function(d) {
        d3.event.preventDefault();
        evt.template(d.title);
        _splash.close()
      })
  }

  _splash.close = function() {
    var s = d3.select(document.body)
      .selectAll('#template_selector')
      .data([]);
    s.exit().remove();
  }

  return d3.rebind(_splash, evt, 'on');

}

module.exports = Splash

},{}],7:[function(_dereq_,module,exports){

function debounce(fn, t, ctx) {
  var i;
  return function() {
    var args = arguments;
    clearTimeout(i);
    i = setTimeout(function() { fn.apply(ctx || window, args); }, t);
  }
}

module.exports = {
  debounce: debounce
}

},{}],8:[function(_dereq_,module,exports){
/*
 * DOMParser HTML extension
 * 2012-09-04
 *
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/

(function(DOMParser) {
  "use strict";

  var
    DOMParser_proto = DOMParser.prototype
  , real_parseFromString = DOMParser_proto.parseFromString
  ;

  // Firefox/Opera/IE throw errors on unsupported types
  try {
    // WebKit returns null on unsupported types
    if ((new DOMParser).parseFromString("", "text/html")) {
      // text/html parsing is natively supported
      return;
    }
  } catch (ex) {}

  DOMParser_proto.parseFromString = function(markup, type) {
    if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
      var
        doc = document.implementation.createHTMLDocument("")
      ;
            if (markup.toLowerCase().indexOf('<!doctype') > -1) {
              doc.documentElement.innerHTML = markup;
            }
            else {
              doc.body.innerHTML = markup;
            }
      return doc;
    } else {
      return real_parseFromString.apply(this, arguments);
    }
  };
}(DOMParser));

},{}],9:[function(_dereq_,module,exports){
/* FileSaver.js
 *  A saveAs() FileSaver implementation.
 *  2014-05-27
 *
 *  By Eli Grey, http://eligrey.com
 *  License: X11/MIT
 *    See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs
  // IE 10+ (native saveAs)
  || (typeof navigator !== "undefined" &&
      navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
  // Everyone else
  || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof navigator !== "undefined" &&
	    /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = !view.externalHost && "download" in save_link
		, click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent(
				"click", true, false, view, 0, 0, 0, 0, 0
				, false, false, false, false, 0, null
			);
			node.dispatchEvent(event);
		}
		, webkit_req_fs = view.webkitRequestFileSystem
		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		, fs_min_size = 0
		, deletion_queue = []
		, process_deletion_queue = function() {
			var i = deletion_queue.length;
			while (i--) {
				var file = deletion_queue[i];
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			}
			deletion_queue.length = 0; // clear queue
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, FileSaver = function(blob, name) {
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, blob_changed = false
				, object_url
				, target_view
				, get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url;
				}
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					// don't create more object URLs than needed
					if (blob_changed || !object_url) {
						object_url = get_object_url(blob);
					}
					if (target_view) {
						target_view.location.href = object_url;
					} else {
						window.open(object_url, "_blank");
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
				}
				, abortable = function(func) {
					return function() {
						if (filesaver.readyState !== filesaver.DONE) {
							return func.apply(this, arguments);
						}
					};
				}
				, create_if_not_found = {create: true, exclusive: false}
				, slice
			;
			filesaver.readyState = filesaver.INIT;
			if (!name) {
				name = "download";
			}
			if (can_use_save_link) {
				object_url = get_object_url(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return;
			}
			// Object and web filesystem URLs have a problem saving in Google Chrome when
			// viewed in a tab, so I force save with application/octet-stream
			// http://code.google.com/p/chromium/issues/detail?id=91158
			if (view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = true;
			}
			// Since I can't be sure that the guessed media type will trigger a download
			// in WebKit, I append .download to the filename.
			// https://bugs.webkit.org/show_bug.cgi?id=65440
			if (webkit_req_fs && name !== "download") {
				name += ".download";
			}
			if (type === force_saveable_type || webkit_req_fs) {
				target_view = view;
			}
			if (!req_fs) {
				fs_error();
				return;
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event);
								};
								writer.onerror = function() {
									var error = writer.error;
									if (error.code !== error.ABORT_ERR) {
										fs_error();
									}
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event];
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE;
								};
								filesaver.readyState = filesaver.WRITING;
							}), fs_error);
						}), fs_error);
					};
					dir.getFile(name, {create: false}, abortable(function(file) {
						// delete file if it already exists
						file.remove();
						save();
					}), abortable(function(ex) {
						if (ex.code === ex.NOT_FOUND_ERR) {
							save();
						} else {
							fs_error();
						}
					}));
				}), fs_error);
			}), fs_error);
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name) {
			return new FileSaver(blob, name);
		}
	;
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort");
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	view.addEventListener("unload", process_deletion_queue, false);
	saveAs.unload = function() {
		process_deletion_queue();
		view.removeEventListener("unload", process_deletion_queue, false);
	};
	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
  module.exports = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return saveAs;
  });
}
},{}]},{},[4])
(4)
});