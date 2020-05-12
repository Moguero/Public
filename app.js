'use strict'

$('.blocTexteDates').hide();

//Faire une fenêtre d'alerte au début pour indiquer le principe du site
// $('<p>Choose your favorite configuration</p>').insertAfter($('.blocImage:last'));
// $('<div><p>Ok, let\'s go !</p></div>').prependTo($('#conteneur')).attr('id', 'blocAccueil')
// $('#blocAccueil').css({'position':'absolute', 'display':'flex', 'justify-content':'center', 'align-items':'center', 'z-index':0});


$('.blocImage').each(function(){

  //Interactivité au survol d'un blocImage
  $(this).hover(
    function() {
      //Agrandissement du blocImage sélectionné avec la souris
      $(this).css('width', '50%');
      //Agrandissement du texte du blocTexte du blocImage sélectionné avec la souris
      $(this).find('.blocTexte p').css('font-size', '80px');
      //Apparition des dates de début et de fin de la saison au dessus du bloc de texte de la saison
      $(this).find(':nth-child(2)').show();
      $(this).find(':nth-child(4)').show();
      //Augmentation progressive de l'opacité du texte de dates
      $(this).find('.blocTexteDates p').css('opacity', '90%');
    },
    function() {
      //Rétrécissement du blocImage sélectionné avec la souris jusque sa taille normale
      $(this).css('width', '25%');
      //Rétrécissement du texte du blocTexte du blocImage sélectionné avec la souris
      $(this).find('.blocTexte p').css('font-size', '60px');
      //Disparition des dates de début et de fin de la saison
      $('.blocTexteDates').hide();
      //Réinitialisation de l'opacité du texte des dates
      $(this).find('.blocTexteDates p').css('opacity', '0%');
    }
  );

  //Interactivité des blocTexte au survol de la souris
  $(this).find('.blocTexte p').hover(function() {
    //Augmentation la taille du texte de saison lorsqu'il est survolé
    $(this).css('font-size', '90px'); //Attention : le this est ici $(this1).find('.blocTexte p') avec this1 le blocImage 
    $(this).css('cursor', 'pointer');
  },
  function() {
    //Diminution la taille du texte de saison lorsqu'il n'est pas survolé
    $(this).css('font-size', '80px')
  });

  //Changement de l'image au click sur la zone du texte de saison
  const selecteurBlocImage = this;
  $(selecteurBlocImage).find('.blocTexte p').click(function() {
    var selecteurImage = $(selecteurBlocImage).find('img');
    changementImage(selecteurImage);
  });

  //Reinitialisation du bloc image après une période d'inactivité

  
});

//Permet de changer l'image de la saison correspondante
function changementImage(selecteurImage){
  const nomSaison = nomDeLaSaison(selecteurImage);
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