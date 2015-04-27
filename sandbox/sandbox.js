
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
    default: "```\n-baseurl: \"https://2.maps.nlp.nokia.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24\"\n-title: \"Le patrimoine en Midi-Pyrénées\"\n-author: \"Makina Corpus\"\n```\n\n# Le patrimoine en Midi-Pyrénées\n```\n- center: [43.9318, 0.6281]\n- zoom: 12\nL.marker([43.9318, 0.6278]).actions.addRemove(S.map)\n```\nD’aprés l’Inventaire du Patrimoine de la Commune de Lectoure initié en 1979 et repris depuis 2009\n\n![Région Midi-Pyrénée](http://www.grandsudinsolite.fr/client/cache/rubrique/100_______logocrmidipyrenees_14.png)\n\n# La tannerie royale de Lectoure\n```\n- center: [43.9323, 0.6255]\n- zoom: 17\nL.marker([43.9323, 0.6255]).actions.addRemove(S.map)\n```\nCi-dessous le lien  vers la vidéo réalisée dans le cadre du concours CLAP PATRIMOINE 2011 \n\norganisé par la Fondation du Crédit Agricole Pyrénées-Gascogne\n\n[La Tannerie en vidéo ici](https://www.youtube.com/watch?v=SNfTv5SO194)\n\n# Le pigeonnier de soupton\n```\n- center: [43.9711, 0.6827]\n- zoom: 12\nL.marker([43.9711, 0.6827]).actions.addRemove(S.map)\n```\nCe pigeonnier carré à arcades et escalier en vis central date probablement du 17ème\nsiècle. La corniche saillante appelée « randière », placée à mi-hauteur, a pour fonction d’empêcher l’ascension des rongeurs.\n\n![Le pigeonnier de soupton](http://patrimoines.midipyrenees.fr/fileadmin/img/renabl_tmp//IVC32208/322010/IVC32208_000004_I_1/ICN/IVC32208_20103200351NUCA_V.PNG)\n\n# L eglise de Tane\n```\n- center: [43.9244, 0.6768]\n- zoom: 14\nL.marker([43.9244, 0.6768]).actions.addRemove(S.map)\n```\nEglise à vaisseau unique, chœur à trois côtés (chevet plat), et clocher-tour en façade, datant probablement du milieu du 19ème siècle. Le style est à la fois néo-roman (arcs trilobés, contreforts) et néo-gothique (arcs brisés et arc en accolade). Faites le tour de l’édifice par le sud et découvrez la façade de la sacristie accolée à l’angle nord-est. Au 19ème siècle déjà, le hameau de Tané comptait moins de dix parcelles bâties. La paroisse devait donc dépasser largement les limites du hameau et réunir les fidèles de\nplusieurs écarts voisins. Se garer devant l’ancienne école primaire.\n\n![L eglise de Tane](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/eglise-tane.png)\n\n# Malus (croix de chemin)\n```\n- center: [43.8926, 0.7084]\n- zoom: 13\nL.marker([43.8926, 0.7084]).actions.addRemove(S.map)\n```\nCroix destinée à la bénédiction des terres et des récoltes lors de processions se déroulant à la saint Marc et les trois jours précédant l’Ascension : les Rogations. La croix de calcaire semble avoir été remplacée par une petite croix en métal de style 19ème. La cuve creusée dans le dé de pierre d’origine servait à recueillir des offrandes ou de l’eau bénite.\n\n![Malus (croix de chemin)](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/malus.png)\n\n# Ayraud (croix de chemin)\n```\n- center: [43.9099, 0.6840]\n- zoom: 14\nL.marker([43.9099, 0.6840]).actions.addRemove(S.map)\n```\nCroix destinée à la bénédiction des terres et des récoltes lors de processions se déroulant à la saint Marc et les trois jours précédant l’Ascension : les Rogations. Les degrés servaient à recueillir des offrandes. Celle-ci, en calcaire, pourrait en grande partie remonter au 17ème siècle, comme le laissent supposer ses moulurations épaisses. Les quatre bornes placées aux angles indiquent les points cardinaux.\n\n![Ayraud (croix de chemin)](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/ayraud.png)\n\n# Fontaine de la Trelauzere\n```\n- center: [43.9228, 0.6342]\n- zoom: 14\nL.marker([43.9228, 0.6342]).actions.addRemove(S.map)\n```\nLa source de Saint-Gény se situe en contrebas de la colline Sainte-Croix, là même où aurait vécu saint Geny, l’un des quatre évangélisateurs de Lectoure au 4ème siècle. Non loin de là, vers 980, est fondé le couvent de Saint-Gény, remplacé en 1068 par un prieuré clunisien. La source est aujourd’hui recouverte d’une voûte en berceau brisé.\n\n![Fontaine de la Trelauzere](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/trelauzere.png)\n\n# Puits couvert du chemin de la tride\n```\n- center: [43.9307, 0.6203]\n- zoom: 14\nL.marker([43.9307, 0.6203]).actions.addRemove(S.map)\n```\nPuits étroits couverts d’une voûte en berceau, dissimulé dans la pente, sous le glacis extérieur constituant avec les trois lignes de remparts l’ensemble du système de fortification de la ville. Accès uniquement piéton, le Chemin de la Tride étant réservé à la circulation des riverains.\n\n![Puits couvert du chemin de la tride](http:////s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/tride.png)\n\n# Fontaine / abreuvoir de Pradoulin\n```\n- center: [43.9281, 0.6173]\n- zoom: 14\nL.marker([43.9281, 0.6173]).actions.addRemove(S.map)\n```\nRemarquez le fronton triangulaire de cette fontaine, de facture particulièrement soignée (éléments en pierre de taille), accostée de deux abreuvoirs. Elle réceptionne l’eau d’une source qui devait déjà être utilisée aux premiers siècles de notre ère, lorsque la ville, « Lactora », était bâtie au pied du promontoire rocheux, au bord du Gers. \n\n![Fontaine / abreuvoir de Pradoulin](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/pradoulin.png)\n\n# Grenier surélevé de Garros\n```\n- center: [43.9214, 0.5961]\n- zoom: 13\nL.marker([43.9214, 0.5961]).actions.addRemove(S.map)\n```\nLe rez-de-chaussée de ce grenier indépendant était probablement destiné au séchage. Les élévations nord et ouest sont en pierre tandis que les élévations Est et sud sont en pan de bois à l’étage et ouvertes en rez-de-chaussée. La façade sud est soutenue par trois piliers en pierre de taille de section carrée selon un style basquo-landais atypique sur la commune.\nPropriété privée : observer depuis la route.\n\n![Grenier surélevé de Garros](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/garros.png)\n\n# Le lavoir / Fontaine à Le Mounet du Hour\n```\n- center: [43.9266, 0.5996]\n- zoom: 14\nL.marker([43.9266, 0.5996]).actions.addRemove(S.map)\n```\nSource maçonnée alimentant un lavoir rectangulaire autrefois utilisé par les lavandières du Mounet du Hour et des écarts voisins. Ce hameau est aujourd’hui constitué d’une dizaine de maisons alors qu’il n’en comptait que trois en 1824.\n\n![Le lavoir / Fontaine à Le Mounet du Hour](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/mounet.png)\n\n# Tour médiéval de Lamothe\n```\n- center: [43.9600, 0.5932]\n- zoom: 14\nL.marker([43.9600, 0.5932]).actions.addRemove(S.map)\n```\nTour construite dans la deuxième moitié du 13e siècle ou la première moitié du 14e siècle, près de la rive gauche du Gers. Est-ce un moulin dès l’origine ? Servait-elle au contrôle d’un passage sur la rivière ? En 1779, dans le dîmaire de l’Ordre de Malte, elle est appelée «ancien moulin, et tour de Lamothe». Les baies géminées ont été vendues au début du 20ème siècle. Attention l’accès à cet édifice en ruine est interdit, l’observer depuis le chemin.\n\n![Tour médiéval de Lamothe](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/lamothe.png)\n\n#Pont-Barrage de Lamothe\n```\n- center: [43.9624, 0.5980]\n- zoom: 13\nL.marker([43.9624, 0.5980]).actions.addRemove(S.map)\n```\nPont-barrage construit sur le Gers, probablement au 18e siècle, afin d’inonder les pâtures\nà la saison sèche. En 1782 le pont et les moulins situés de part et d’autre figurent sur le plan d’un dîmaire de l’Ordre de Malte. Ce pont-barrage comptait sept arches à l’origine. Il s’agit de l’un des derniers conservés sur le cours du Gers. Attention l’accès à cet difice en ruine est interdit, l’observer depuis la rive.\n\n![Pont-Barrage de Lamothe](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/lamothep.png)\n\n# Moulin à eau de Manirac\n```\n- center: [43.9504, 0.6258]\n- zoom: 14\nL.marker([43.9504, 0.6258]).actions.addRemove(S.map)\n```\nMoulin à eau de plan carré construit sur trois niveaux au 18ème siècle. Est-ce ce moulin qui figure sur la carte de Cassini établie dans la seconde moitié du 18ème siècle ? Le ruisseau de Bournaca alimentait deux roues probablement horizontales. L’édifice est en cours de restauration. Accès à pied uniquement. Propriété privée à observer depuis le chemin de randonnée.\n\n![Moulin à eau de Manirac](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/manirac.png)\n\n# Fontaine de Clarette\n```\n- center: [43.9418, 0.6343]\n- zoom: 14\nL.marker([43.9418, 0.6343]).actions.addRemove(S.map)\n```\nDans le cadre exotique et surprenant d’une bambouseraie, se révèle au pied d’une paroi calcaire, parmi les lierres grimpants, la « Fontaine de Rajocan » voûtée en berceau brisé, aussi appelée « Fontaine de la Rage aux Chiens ». Selon la légende, c’est ici que venaient s’abreuver les animaux malades de la rage, car ils savaient que cette source ne tarissait jamais. Cette interprétation pourrait cependant aussi provenir d’une traduction erronée du gascon «Arrajadés» qui désigne les pentes toujours exposées au soleil.\n\n![Fontaine de Clarette](http://s3.amazonaws.com/uploads.knightlab.com/storymapjs/9582ee22205f3a1a24cc6abdfb892dd7/le-patrimoine-en-midi-pyrenees/_images/clarette.png)\n\n# Sources\n```\n- center: [43.9336, 0.6245]\n- zoom: 14\nL.marker([43.9336, 0.6245]).actions.addRemove(S.map)\n```\n[Les sources de cette présentation](http://patrimoines.midipyrenees.fr/fileadmin/Patrimoines-editorial/Decouvrir_le_patrimoine/Presentation_du_pole_patrimoine_en_Midi-Pyrenees/La_connaissance_du_patrimoine/partenaires/Lectoure/JPP-2011-Lectoure.pdf)\n"
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
