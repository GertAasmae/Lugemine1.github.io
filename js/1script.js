// SETTINGS
// SETTINGS
// SETTINGS
let WPM = 0
let TargetWPM = 150
let SpeedTransitionIncrement = 50
let Text = 'Pärnu lennujaam teenindas eelmisel aastal 2087 reisijat, mida on 800 reisija võrra vähem kui 2022. aastal. Lennujaama tulud eelmisel aastal kasvasid, kuid sellegipoolest majandab lennujaam end suuresti ära vaid riigi ja kohaliku omavalitsuse toel. Pärnu lennujaam teenindas eelmisel aastal Pärnu-Ruhnu ja suvel Helsingi-Pärnu liini, samuti eralende ja tellimuslende. Reisijaid oli 2023. aastal tunamullusega vähem. Seda peamiselt suvise Stockholmi-Pärnu lennuliini ärajäämise ja Helsingi liini vähese täitumuse tõttu. Lennujaama tulud olid eelmisel aastal ligi 1,7 miljonit eurot, millest otseselt lennundusega teenitud tulu oli 140,000 eurot. Ülejäänu moodustas riigi toetus ja sihtfinantseering ning kohaliku omavalitsuse toetus. Võrreldes 2022. aastaga kasvasid nii lennujaama kulud kui ka tulud. "Küll on vajanud hooldetehnika rohkem remonti, ametikohad on nüüd meil täidetud. Samas ka lennuvälja angaar toob meile tulu sisse rohkem ja ka päikesepargid toodavad," lausus Pärnu lennujaama käitusjuht Erki Teemägi. Teemägi sõnul kasvatati tulusid ka tellimuslendude ja eralendude arvelt. "Soomest ja Rootsist ka ajalooliste lennukitega, kuhu mahub rohkem reisijaid peale, mis lähevad tellimuslendude alla. Samas oli ka 2023. aastal varasemast palju aktiivsemalt floora ja fauna vaatluslendusid Pärnu lahe kohal," ütles Teemägi. "See oleks mõeldav, aga kindlasti on see väga kauge unistus, sest see eeldab vähemalt kahte liinilendu päevas korraliku 70-kohalise või 100-kohalise lennukiga," nentis Teemägi. Esmaspäeval tuli info, et eelmise aasta suvel Pärnu ettevõtjate toel töös hoitud Helsingi-Pärnu liini sel suvel ei avata, sest ettevõtjad seda ei rahasta.'
// i dont think this is gonna work out

// SCRIPT
// SCRIPT
// SCRIPT

let Playing = false
let index = 0

let formattedText = Text.split(" ");
var Length = formattedText.length

//console.log("Word count : " + Length)

let pause = document.getElementById("pause");
let play = document.getElementById("play");

let wordDisplay = document.getElementById("changetext"); // waa waaa, this isnt proper variable naming, waa waa 😭😭

wordDisplay.Content = ""

function UpdateButtonVisuals() {

    if (Playing === false) {
        pause.style.display = "none";
        play.style.display = "contents";
    } else {
        pause.style.display = "contents";
        play.style.display = "none";
    }
}
function clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
  }

function PlayPause(TryToStart) {
    console.log("Index: " + index)
    if (TryToStart === undefined || TryToStart === null) {
        TryToStart = true;
    }

    Playing = !Playing
    UpdateButtonVisuals()
    if (TryToStart && Playing) {
       if (index >= (Length-1)) {
        index = 0
       }
       WPM = 100
       function iterate() {

           if (index < Length && Playing) {

               let wordToDisplay = formattedText[index];
               let wordLength = wordToDisplay.length;

               // Calculate the number of characters to show on the left and right of the optimal recognition point
               let charactersToShow = Math.ceil(wordLength / 2);

               // Extract characters for left and right parts
               let leftPart = wordToDisplay.substring(0, charactersToShow);
               let rightPart = wordToDisplay.substring(charactersToShow + 1); // Exclude the character at the optimal recognition point

               // Extract the character at the optimal recognition point
               let recognitionPoint = wordToDisplay.charAt(charactersToShow);

               // Calculate the total width of the displayed word
               let wordWidth = leftPart.length + rightPart.length + 1; // Adding 1 for the highlighted character

               // Calculate padding for both sides of the highlighted character
               let padding = Math.floor((wordWidth - 1) / 2);

               // Combine left part, optimal recognition point, and right part with padding
               let formattedWord = 
                   "<span style='color: black;'>" + leftPart + "</span>" +
                   "<span style='color: red;'>" + recognitionPoint + "</span>" +
                   "<span style='color: black;'>" + rightPart + "</span>";

               // Apply padding for both sides of the formatted word
               formattedWord = formattedWord.padStart(formattedWord.length + padding, ' ');
               formattedWord = formattedWord.padEnd(formattedWord.length + padding, ' ');

               // Display the word
               wordDisplay.innerHTML = formattedWord;
               
               let OldWPM = WPM
               if (Math.abs(WPM-TargetWPM) > SpeedTransitionIncrement){
                   let Dir = clamp(TargetWPM-WPM,-1,1)
                   WPM = WPM + Dir*SpeedTransitionIncrement
               } else {
                   WPM = TargetWPM
               }
               if (OldWPM != WPM){
                   console.log(WPM)
               }
               
               let element = document.getElementById("progress")
               element.style.width = ((index/(Length-1))*100) + "%";

               // Calculate the duration to display the word based on the number of characters
               
             index++;
             if (index < Length && Playing) {
               setTimeout(iterate, (60/WPM)*1000 + wordLength*10);
             } else {
               if (Playing) {
                   //index = 0
                   PlayPause(false)
               }
           }
           } 
       }
       iterate()
    }
}
function ChangeSpeed(Speed) {
    var buttons = document.querySelectorAll('.button')
    let buttonNumber = (Speed-150)/100
    buttons.forEach(function(button, index) {
        if (index === buttonNumber) {
          button.classList.add('blue');
        } else {
          button.classList.remove('blue');
        }
      });
    
    TargetWPM = Speed
}
function OffsetIndex(Num) {
    index = clamp(index+Num,0,Length)

    let wordToDisplay = formattedText[index];
    let wordLength = wordToDisplay.length;

    // Calculate the number of characters to show on the left and right of the optimal recognition point
    let charactersToShow = Math.ceil(wordLength / 2);

    // Extract characters for left and right parts
    let leftPart = wordToDisplay.substring(0, charactersToShow);
    let rightPart = wordToDisplay.substring(charactersToShow + 1); // Exclude the character at the optimal recognition point

    // Extract the character at the optimal recognition point
    let recognitionPoint = wordToDisplay.charAt(charactersToShow);

    // Calculate the total width of the displayed word
    let wordWidth = leftPart.length + rightPart.length + 1; // Adding 1 for the highlighted character

    // Calculate padding for both sides of the highlighted character
    let padding = Math.floor((wordWidth - 1) / 2);

    // Combine left part, optimal recognition point, and right part with padding
    let formattedWord = 
        "<span style='color: black;'>" + leftPart + "</span>" +
        "<span style='color: red;'>" + recognitionPoint + "</span>" +
        "<span style='color: black;'>" + rightPart + "</span>";

    // Apply padding for both sides of the formatted word
    formattedWord = formattedWord.padStart(formattedWord.length + padding, ' ');
    formattedWord = formattedWord.padEnd(formattedWord.length + padding, ' ');

    // Display the word
    wordDisplay.innerHTML = formattedWord;
    
    let OldWPM = WPM
    if (Math.abs(WPM-TargetWPM) > SpeedTransitionIncrement){
        let Dir = clamp(TargetWPM-WPM,-1,1)
        WPM = WPM + Dir*SpeedTransitionIncrement
    } else {
        WPM = TargetWPM
    }
    if (OldWPM != WPM){
        console.log(WPM)
    }
    let element = document.getElementById("progress")
    element.style.width = ((index/(Length-1))*100) + "%";
}
ChangeSpeed(150);
UpdateButtonVisuals()