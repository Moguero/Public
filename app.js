'use strict'

//Faire une fenêtre d'alerte au début pour indiquer le principe du site
// $('<p>Choose your favorite configuration</p>').insertAfter($('.blocImage:last'));
// $('<div><p>Ok, let\'s go !</p></div>').prependTo($('#conteneur')).attr('id', 'blocAccueil')
// $('#blocAccueil').css({'position':'absolute', 'display':'flex', 'justify-content':'center', 'align-items':'center', 'z-index':1});

var étatAccueil = true;

function accueil() {
  $('#blocAccueil').css('z-index', 1);
  $('#conteneur').css('filter', 'blur(2px)');
  $('#conteneur').css('opacity', '50%', );
  $('#blocInfosAccueil button').hover(function() {
    $(this).css('cursor', 'pointer');
  });
  $('#blocInfosAccueil button').click(function() {
    $('#blocAccueil').remove();
    $('#conteneur').css('transition', 'opacity 0.5s', );
    $('#conteneur').css('opacity', '100%', );
    $('#conteneur').css('filter', 'none');
    étatAccueil = false;
  })
}

function main() {
  console.log('exécution de main()');
  console.log(premiere_exécution_main);
  console.log(premiere_exécution_standby);
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
        //Augmentation de la taille du texte de saison lorsqu'il est survolé
        $(this).css('font-size', '90px'); //Attention : le this est ici $(this1).find('.blocTexte p') avec this1 le blocImage 
        $(this).css('cursor', 'pointer');
      },
      function() {
        //Diminution de la taille du texte de saison lorsqu'il n'est pas survolé
        $(this).css('font-size', '80px');
      }
    );

    //Changement de l'image au click sur la zone du texte de saison
    $(selecteurBlocImage).find('.blocTexte p').click(function() {
      console.log('click');
      var selecteurImage = $(selecteurBlocImage).find('img');
      changementImage(selecteurImage);
    });

    // // Agrandissement du bloc lorsqu'un mouvement de souris est détecté sur ce bloc :
    // // utile lorsque la souris est restée inactive dans un bloc et recommence à bouger
    // // car hover détecte seulement quand la souris rentre dans le bloc
    // if (premiere_exécution_main) {
    //   $(selecteurBlocImage).mousemove(function() {
    //     agrandissementBloc();
    //   });
    // }
  });
}

function animationBlocTexte() {

  $('.blocImage').each(function(){

    var selecteurBlocImage = this

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

//Si on n'a pas encore exécuté la fonction main(), premiere_exécution_main vaut false, et on lui attribue la valeur true après la première
//éxécution, en réinitialisant la variable première_exécution_standby à false
var premiere_exécution_main = true; 
var premiere_exécution_standby = false;

function détectionInactivité() {
    if (activité) {
      duréeInactivité = 0;
      activité = false; //remet à zéro l'activité toutes les "intervalle" secondes
      if (!premiere_exécution_main) {
        main(); //important : l'exécuter avant de redonner les valeurs aux 2 variables ci-dessous car premiere_exécution_main
                //est utilisée dans main()
        premiere_exécution_main = true;
        premiere_exécution_standby = false;
      }
    }
    else {
      duréeInactivité += intervalle;
      if (duréeInactivité >= 3000) {
        enStandby = true;
        if (!étatAccueil) { //ne permet pas l'exécution de standBy quand on est à l'accueil
          if (!premiere_exécution_standby) {
            standby();
            premiere_exécution_standby = true;
            premiere_exécution_main = false;
          }
        }
      }
    }
    setTimeout(détectionInactivité, intervalle);
};

function standby() {
  $('.blocImage').css('width', '25%');
  $('.blocTexte p').css('font-size', '60px');
  $('.blocTexteDates').hide();
  console.log('exécution de standBy');
  console.log(premiere_exécution_main);
  console.log(premiere_exécution_standby);
}

accueil()

main();

// animationBlocTexte();

détectionInactivité();

$(document).mousemove(function() {
  activité = true;
});

// A faire : problème car main() s'exécute chaque fois que la souris bouge mais on veut qu'elle s'exécute une seule fois au début de l'activité
//de la souris --> agir au niveau de la fonction détectionInactivité

//Pour le moment, on a créé une fonction animationBlocTexte, qui fait que le site est plus 'responsive' quand on clique sur les saisons
//(les images changent beaucoup plus rapidement) --> sûrement dû à ce qui est cité ci dessus
//Quand on aura réglé le problème ci-dessus, 'remettre' la fonction animationBlocTexte à sa place dans la fonction main()

//problème : tous les 3 standby, la fonctionnalité changement d'image au click ne fonctionne pas
//source problème : on exécute main() qui se rajoute sur le premier main() exécuté --> un click
//creuser du côté de clearTimeOut et setTimeOut