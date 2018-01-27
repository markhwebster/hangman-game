//collapsible Instructions, thanks to: https://css-tricks.com/using-css-transitions-auto-dimensions/
// and here: https://gomakethings.com/listening-to-multiple-events-in-vanilla-js/
  document.querySelector('.dropmenu a').addEventListener('click', toggleMenu);// for mobile
  //document.querySelector('.dropmenu a').addEventListener('mouseover', toggleMenu, false);//for computers
  function toggleMenu(){
    //e.preventDefault;//fixes safari ios bug
    document.querySelector('.leveltwo').classList.toggle('fold');
    //document.querySelector('.boxMinus').style.visibility = 'visible';
    document.querySelector('.boxMinus').classList.toggle('boxHide');
    document.querySelector('.boxPlus').classList.toggle('boxHide');
  }



//create variables from svg id elements
  var skyBlue = document.getElementById('skyBlue');
  var niteSky = document.getElementById('niteSky');

  var base1 = document.getElementById('base1');
  var base2 = document.getElementById('base2');
  var base3 = document.getElementById('base3');
  var base4 = document.getElementById('base4');
  var base5 = document.getElementById('base5');//mans face
  var base6 = document.getElementById('base6');//mans spine
  var base7 = document.getElementById('base7');
  var base8 = document.getElementById('base8');
  var base9 = document.getElementById('base9');
  var base10 = document.getElementById('base10');
  var man = document.getElementById('man');//group of the entire hanging man
  var happy = document.getElementById('happy');// hidden group of the happy dancing man
  /*make an array from the svg parts variables so they can be called numerically via hangman[0], hangman[1], etc
   hangman[0] = base1 ; hangman[9] = base10 ; hangman.length = 10*/
  var hangman = [base1, base2, base3, base4, base5, base6, base7, base8, base9, base10];
  //console.log(hangman);
  /*******************
    below = create variables from each keyPadButton
  *****************/
  var k1 = document.getElementById('k1');
  var k2 = document.getElementById('k2');
  var k3 = document.getElementById('k3');
  var k4 = document.getElementById('k4');
  var k5 = document.getElementById('k5');
  var k6 = document.getElementById('k6');
  var k7 = document.getElementById('k7');
  var k8 = document.getElementById('k8');
  var k9 = document.getElementById('k9');
  var k0 = document.getElementById('k0');
  var backUp = document.getElementById('backUp');
  /***** begin number pad function ******/
  var keyPad = [k1, k2, k3, k4, k5, k6, k7, k8, k9, k0]//make keyPad array from keyPad buttons
/************* create eventListeners for each keyPad button that fire the keyPadPress function **************/
  for (var kp = 0; kp < keyPad.length; kp++){
    keyPad[kp].addEventListener('click', keyPadPress);
  }
  /**************capture number on button and put it into guessField******/
  function keyPadPress(mw) {
   //console.log('button pressed');
    mw.preventDefault();
   guessField.innerHTML += this.textContent;//permits multiple digit numbers using = what it what plus what was added
   var guessFieldLength = guessField.innerHTML.length;
   //console.log('total characters in guess field is: ' + guessFieldLength);
  }
  backUp.addEventListener('click', backUpCursor);
  function backUpCursor(bw){
    //console.log ('backup cursor function fired');tag.innerText.length
    bw.preventDefault();
    let totalNumbers = guessField.innerText.length;
    //console.log('length of guess field during backup  is ' + totalNumbers);
    guessField.innerHTML = guessField.innerHTML.substring(0,totalNumbers-1);//strips off last number
  }
/**********end number pad function***********/
  var randomNumber = Math.floor(Math.random() * 100) +1;

  var guesses = document.querySelector('.guesses');
  var guessesRemaining = document.querySelector('.guessesRemaining');
  var lastResult = document.querySelector('.lastResult');
  var lowOrHi = document.querySelector('.lowOrHi');
  var theArrowUp= document.querySelector('.theArrowUp');
  var theArrowDown= document.querySelector('.theArrowDown');
  var guessSubmitButton = document.querySelector('#guessSubmitButton');//the submit button
  //var guessField = document.querySelector('.guessField');//the div  where they enter guesses
  //console.log(hangman[9]);//reads base10
  var guessCount = 1;
    //console.log("guessCount before game is = " + guessCount);
  var resetButton;//creates empty variable
  var guessesRemainingCount = 11;

  //button eventListeners:
  guessSubmitButton.addEventListener('click', checkGuess);//if they click submit button, run the checkGuess()
  //document eventListeners:
  window.addEventListener('keydown', enterKey);//has to be keydown!!!!!!! https://www.kirupa.com/html5/keyboard_events_in_javascript.htm
  function enterKey(e){
    e.preventDefault();
      if (e.which === 13) { // if they pressed a key...which one? 13 is enter key
          checkGuess();//fire the checkGuess function
         //console.log("enter key fired checkguess");
        }
  }


  function checkGuess(){
    var userGuess = Number(guessField.innerText);//captures what ever they guess into userGuess, makes sure it's a number
    if (guessCount === 1){//is it their first guess? this is true at the point they click it first time
      guesses.textContent = 'Guesses: ';//this text only gets written once.
    }
    guesses.textContent += userGuess + ', ';//add latest userGuess to list of guesses.
    //console.log('non enter key fired checkguess')
    if (userGuess === randomNumber) {//they nailed it!
      lastResult.textContent = 'Correct!';
      lastResult.style.backgroundColor = 'green';
      for(let i = 0; i < hangman.length; i++ ) {//loops 10 times
        hangman[i].style.visibility = "hidden";//hides each
      }
      skyBlue.style.visibility = 'visible';
      happy.style.visibility = 'visible';

      happy.classList.add('happyBounce');
      //lowOrHi.textContent = '';//empty out Previous 'you are too low!'
      setGameOver();
    } else if (guessCount === 11) {//they played it 11 times...we counted each time
      lastResult.textContent = 'GAME OVER! ' + guessCount + ' guesses.' ;
      man.classList.add('manBounce');
      guessesRemaining.textContent = '0 guesses left.';
      setGameOver();
    } else {//****************** they guessed wrong
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      lowOrHi.style.backgroundColor = 'rgb(2, 120, 157)';
      if (userGuess < randomNumber) {//guess was low, down arrow should light up red

        lowOrHi.textContent = 'Too Low';

      } else if (userGuess > randomNumber){// guess was high, up arrow should turn red


        lowOrHi.textContent = 'Too High';
      }
      //console.log("guessCount during game before incrementing = " + (guessCount));
      guessesRemainingCount--;//incrementing down remaining guesses
      guessesRemaining.textContent =  'Guesses left: ' + guessesRemainingCount;
      guessCount++;//incrementing up the times they guessed

      hangman[guessCount-2].style.visibility = 'visible';//turns on hangman artwork parts incrementally
      //console.log(hangman[guessCount-2]);
      guessField.innerHTML = '';
      //guessField.focus();//returns blinking cursor to guessField
    }//end if(userGuess ===)
  }


  console.log(randomNumber);


  function setGameOver(){//gray out functionality so they can't keep playing
    //guessSubmitButton.removeEventListener('click', checkGuess);
    guessField.style.visibility = 'hidden';
    document.querySelector('.guessSubmitButton a').style.visibility = 'hidden';
    //guessField.disabled = true;
    /******** below may not workvc!******/
//console.log ('set game over is running');
    //guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    //resetButton.classList.add('guessSubmit');
    document.querySelector('.guessSubmitButton').appendChild(resetButton);
    resetButton.classList.add('playAgain');
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame(){//put game back to starting condition
    guessCount = 1;
    guessesRemainingCount = 11;
    if(man.classList.contains('manBounce')){//check to see if man is bouncing, if so  remove the manBounce class.Note, he may not be bouncing if they won before 10 guesses
      man.classList.remove('manBounce');
    }
    if(happy.classList.contains('happyBounce')){
      happy.classList.remove('happyBounce');
    }

    for(let i = 0; i < hangman.length; i++ ) {//loops 10 times
      hangman[i].style.visibility = 'hidden';//hides each
    }
    happy.style.visibility = 'hidden';
    var resetParas = document.querySelectorAll('.resultParas p');//creates an array from the 3 <p>s

    for (var i = 0; i < resetParas.length ; i++){//for f3 loops, go thru th p's [i] and empty them
      resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);//son tells the parent to remove the son, himself
    skyBlue.style.visibility = 'hidden';
    guessField.style.visibility = 'visible';
      guessSubmitButton.style.visibility = 'visible';
    //guessSubmitButton.addEventListener('click', checkGuess);
    guessField.innerHTML = '';
    //guessField.focus();
    lowOrHi.style.backgroundColor = 'rgba(116, 118, 119, 0)';//make it invisible
    lastResult.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    randomNumber = Math.floor(Math.random() * 100) +1;
    console.log('New reset random number: ' + randomNumber);
  }
