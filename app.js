'use strict'

//Faire une fenêtre d'alerte au début pour indiquer le principe du site
// $('<p>Choose your favorite configuration</p>').insertAfter($('.blocImage:last'));
// $('<div><p>Ok, let\'s go !</p></div>').prependTo($('#conteneur')).attr('id', 'blocAccueil')
// $('#blocAccueil').css({'position':'absolute', 'display':'flex', 'justify-content':'center', 'align-items':'center', 'z-index':1});

// $('blocAccueil').css({'position':'absolute', 'display':'flex'});

function main() {

  $('.blocImage').each(function(){

    var selecteurBlocImage = this;

    function agrandissementBloc() {
      //Agrandissement du blocImage sélectionné avec la souris
      $(selecteurBlocImage).css('width', '50%');
      //Agrandissement du texte du blocTexte du blocImage sélectionné avec la souris
      $(selecteurBlocImage).find('.blocTexte p').css('font-size', '80px');
      //Apparition des dates de début et de fin de la saison au dessus du bloc de texte de la saison
      $(selecteurBlocImage).find(':nth-child(2)').show();
      $(selecteurBlocImage).find(':nth-child(4)').show();
      //Augmentation progressive de l'opacité du texte de dates
      $(selecteurBlocImage).find('.blocTexteDates p').css('opacity', '90%');
    }

    function rétrécissementBloc() {
      //Rétrécissement du blocImage sélectionné avec la souris jusque sa taille normale
      $(selecteurBlocImage).css('width', '25%');
      //Rétrécissement du texte du blocTexte du blocImage sélectionné avec la souris
      $(selecteurBlocImage).find('.blocTexte p').css('font-size', '60px');
      //Disparition des dates de début et de fin de la saison
      $('.blocTexteDates').hide();
      //Réinitialisation de l'opacité du texte des dates
      $(selecteurBlocImage).find('.blocTexteDates p').css('opacity', '0%');
    }

    //Interactivité au survol d'un blocImage
    $(selecteurBlocImage).hover(agrandissementBloc, rétrécissementBloc);

    //Interactivité des blocTexte au survol de la souris
    $(selecteurBlocImage).find('.blocTexte p').hover(
      function() {
        //Augmentation la taille du texte de saison lorsqu'il est survolé
        $(this).css('font-size', '90px'); //Attention : le this est ici $(this1).find('.blocTexte p') avec this1 le blocImage 
        $(this).css('cursor', 'pointer');
      },
      function() {
        //Diminution la taille du texte de saison lorsqu'il n'est pas survolé
        $(this).css('font-size', '80px');
      }
    );

    //Changement de l'image au click sur la zone du texte de saison
    $(selecteurBlocImage).find('.blocTexte p').click(function() {
      var selecteurImage = $(selecteurBlocImage).find('img');
      changementImage(selecteurImage);
    });

    // Agrandissement du bloc lorsqu'un mouvement de souris est détecté sur ce bloc :
    // utile lorsque la souris est restée inactive dans un bloc et recommence à bouger
    // car hover détecte seulement quand la souris rentre dans le bloc
    if (enStandby) {
      $(selecteurBlocImage).mousemove(function() {
        agrandissementBloc();
        enStandby = false;
      });
    }
  });
}

//Permet de changer l'image de la saison correspondante
function changementImage(selecteurImage){
  var nomSaison = nomDeLaSaison(selecteurImage);
  switch($(selecteurImage).attr('src')) {
    case 'images/' + nomSaison + '/' + nomSaison + '1.jpeg':
      $(selecteurImage).attr('src','images/' + nomSaison + '/' + nomSaison + '2.jpeg');
      break;
    case 'images/' + nomSaison + '/' + nomSaison + '2.jpeg':
      $(selecteurImage).attr('src','images/' + nomSaison + '/' + nomSaison + '3.jpeg');
      break;
    case 'images/' + nomSaison + '/' + nomSaison + '3.jpeg':
      $(selecteurImage).attr('src','images/' + nomSaison + '/' + nomSaison + '1.jpeg');
      break;
    default :
      $(selecteurImage).attr('src','images/' + nomSaison + '/' + nomSaison + '1.jpeg');
  }
}

//Permet de récupérer le nom de la saison dans la fonction changementImage
function nomDeLaSaison(selecteurImage){
  var source = $(selecteurImage).attr('src');
  const decompositionSrc = source.split('/'); //on décompose la source en indiquant que / est le séparateur
  const nomSaison = decompositionSrc[1];
  return nomSaison
}

const intervalle = 100;
var duréeInactivité = 0;
var activité = false;
var enStandby = false;

function détectionInactivité() {
    if (activité) {
        duréeInactivité = 0;
        activité = false; //remet à zéro l'activité toutes les "intervalle" secondes
        main();
    }
    else {
        duréeInactivité += intervalle;
        if (duréeInactivité >= 3000) {
            standby();
            enStandby = true;
        }
    }
    setTimeout(détectionInactivité, intervalle);
};

function standby() {
  $('.blocImage').css('width', '25%');
  $('.blocTexte p').css('font-size', '60px');
  $('.blocTexteDates').hide();
}

main();

détectionInactivité();

$(document).mousemove(function() {
  activité = true;
});

// A faire : dans le main, la ligne 46 n'est pas exécutée apparemment à cause de la ligne 20 de agrandissement Bloc