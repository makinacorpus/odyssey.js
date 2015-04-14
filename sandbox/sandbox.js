
//i18n placeholder
function _t(s) { return s; }


var dialog = require('./dialog');
var Splash = require('./splash');
var DOMParser = require('../vendor/DOMParser');
var utils = require('./utils');


var TEMPLATE_LIST =  [{
    title: 'slides',
    description: 'Display visualization chapters like slides in a presentation',
    default: "```\n-baseurl: \"https://2.maps.nlp.nokia.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24\"\n-title: \"Circuit médiéval de Lectoure (Gers)\"\n-author: \"Makina Corpus\"\n```\n\n# Circuit médiéval de Lectoure (Gers)\n```\n- center: [43.9340, 0.6232]\n- zoom: 17\nL.marker([43.9340, 0.6232]).actions.addRemove(S.map)\n```\nBienvenue !\n\nPoint de départ du circuit\n![Ville de Lectoure](http://www.lectoure.fr/themes/danland/images/logo.gif)\n\n# Départ depuis la Cathédrale\n```\n- center: [43.9338, 0.6242]\n- zoom: 17\nL.marker([43.9338, 0.6242]).actions.addRemove(S.map)\n```\n![Cathédrale](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVR73/322010/IVR73_000681_I_1/VIG/IVR73_20103250174NUCA_V.JPG)\n\n[Cathédrale Saint-Gervais et Saint Protais](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038762)\n\n# Maison de Galard\n```\n- center: [43.9343, 0.6221]\n- zoom: 17\nL.marker([43.9343, 0.6221]).actions.addRemove(S.map)\n```\n![Maison de Galard](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322011/IVC32208_000008_I_1/VIG/IVC32208_20113200379NUCA_V.JPG)\n\n[Maison de Galard](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001113)\n\n# Sénéchaussée\n```\n- center: [43.9349, 0.6204]\n- zoom: 17\nL.marker([43.9349, 0.6204]).actions.addRemove(S.map)\n```\nLe long du parcours vous aurez des exemples des hautes maisons en pierre.\n\nArrivée au point :\n\nLa porte et la croisée de cette façade sont les vestiges visibles du siège de la Sénéchaussée établie par Louis XI\n\n![Sénéchaussée](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322010/IVC32208_000004_I_1/VIG/IVC32208_20103200274NUCA_V.JPG?1428584110068)\n\n# Edifice long de 21m\n```\n- center: [43.9352, 0.6198]\n- zoom: 17\nL.marker([43.9352, 0.6198]).actions.addRemove(S.map)\n```\nA l'Est de l'église des Cordeliers se site cet [edifice non-identifié](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001024)\n\n![Edifice non-identifié](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322009/IVC32208_000001_I_1/VIG/IVC32208_20093200305NUCA_V.JPG)\n\n# Eglise du couvent des Cordeliers\n```\n- center: [43.9351, 0.6194]\n- zoom: 17\nL.marker([43.9351, 0.6194]).actions.addRemove(S.map)\n```\n![Eglise Cordelier](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322009/IVC32208_000001_I_1/VIG/IVC32208_20093200286NUCA_V.JPG?1428587051007)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001029)\n\n# Couvent des Cordeliers\n```\n- center: [43.9352, 0.6192]\n- zoom: 17\nL.marker([43.9352, 0.6192]).actions.addRemove(S.map)\n```\n![Couvent des Cordeliers](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322009/IVC32208_000001_I_1/VIG/IVC32208_20093200270NUCA_V.JPG?1428587054404)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038766)\n\n# Château des Comtes d'Armagnac\n```\n- center: [43.9362, 0.6156]\n- zoom: 17\nL.marker([43.9362, 0.6156]).actions.addRemove(S.map)\n```\n![Château des Comtes d'Armagnac](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322010/IVC32208_000004_I_1/VIG/IVC32208_20103200286NUCA_V.JPG?1428585147984)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038777)\n\n# Couvent des Carmes\n```\n- center: [43.9341, 0.6194]\n- zoom: 17\nL.marker([43.9341, 0.6194]).actions.addRemove(S.map)\n```\n![Couvent des Carmes](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322013/IVC32208_000012_I_1/VIG/IVC32208_20133200169NUCA_V.JPG?1428585452428)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038764)\n\n# Eglise du Saint-Esprit\n```\n- center: [43.9339, 0.6196]\n- zoom: 17\nL.marker([43.9339, 0.6196]).actions.addRemove(S.map)\n```\n![Eglise du Saint-Esprit](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322012/IVC32208_000010_I_1/VIG/IVC32208_20123200143NUCA_V.JPG)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA32001117)\n\n# Voûte peinte\n```\n- center: [43.9338, 0.6214]\n- zoom: 17\nL.marker([43.9338, 0.6214]).actions.addRemove(S.map)\n```\n![Voûte peinte](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//INV/DPT32-2002/VIG/IVR73_02320017NUC_V.JPG)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IM32000406)\n\n# Tour d'Albinhac\n```\n- center: [43.9340, 0.6220]\n- zoom: 17\nL.marker([43.9340, 0.6220]).actions.addRemove(S.map)\n```\n![Tour d'Albinhac](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322010/IVC32208_000004_I_1/VIG/IVC32208_20103200271NUCA_V.JPG?1428586439810)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038772)\n\n# Fontaine de Fontélie\n```\n- center: [43.9326, 0.6238]\n- zoom: 17\nL.marker([43.9326, 0.6238]).actions.addRemove(S.map)\n```\n![Fontaine de Fontélie](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl//IVC32208/322013/IVC32208_000013_I_1/VIG/IVC32208_20133200194NUCA_V.JPG)\n\n[en savoir plus](http://patrimoines.midipyrenees.fr/fr/rechercher/recherche-base-de-donnees/index.html?notice=IA00038818)\n\n# Le circuit est terminé !\n```\n- center: [43.9336, 0.6245]\n- zoom: 14\nL.marker([43.9336, 0.6245]).actions.addRemove(S.map)\n```\nCe parcours représente environ 2kms pendant lesquels vous serez émerveillés par le charme des nombreuses maisons en pierre qui jalonnent le circuit.\n\nBien des secrets se cachent dans ces maisons en pierre ! A vous de les découvrir...\n\n[Les sources de cette présentation](http://patrimoines.midipyrenees.fr/cartographie-interactive/randonnees-patrimoine/lectoure-medieval/index.html)\n\n"
  }, {
    title: 'scroll',
    description: 'Create a visualization that changes as your reader moves through your narrative',
    default: "```\n-title: \"Example\"\n-author: \"Makina Corpus\"\n```\n\n#Your first story\n```\n- center: [37.7620, -122.4385]\n- zoom: 9\nL.marker([37.7620, -122.4385]).actions.addRemove(S.map)\n```\n\nMove the map around and save the position by clicking on \"ADD > Move map to the current position\". As you can see, now we are highlighting San Francisco.\n\nThen add here the description for your slide so it's shown on the left side box.\n\n\n#How to add more states\n```\n- center: [40.7348, -73.9970]\n- zoom: 9\nL.marker([40.7348, -73.9970]).actions.addRemove(S.map)\n```\n\nBy adding new [Markdown] (http://daringfireball.net/projects/markdown/]) h1 elements (#) you add new states to your story.\n\n\n#Adding images to your story\n```\n- center: [40.7365, -73.9982]\n- zoom: 13\n```\n\nBy default, images are also supported. \n\n![New York](http://www.boston-discovery-guide.com/image-files/new-york-1.jpg)\n\n#Exporting your story\n```\n- center: [40.4469, -28.5645]\n- zoom: 3\n```\n\nYou have different options for exporting your odyssey.js visualization. You can either embed this using an iframe, publishing with a click on bl.ocks or just share the URL of this visualization.\n\nIf you want to customize it further, you can download the generated source code by clicking on the button below.\n\n#Advanced users\n\nCheck out our [documentation](/odyssey.js/documentation/) to learn how to use odyssey to create more custom things. It's crazy the amount of cool things that can be done with the library.\n\nAlso if you are a developer, take a look at our contributing guideline so you can push code to the actual library.\n\nCheers!\n"
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
