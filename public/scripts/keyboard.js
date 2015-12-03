
window.onload = function(){

  $('.title-picker').on('click', function(evt) {
    var id = $(evt.target).data('id');
    console.log('clicked id: ', id)
    $.get( "/api/tales/id/" + id, function( data ) {
      console.log(data);
      var textContent = buffer +  data["text_content"];
      // window.var2 = JSON.parse(data);
      var stream = document.getElementById("textArea");
      formatContent(stream,textContent,cursorPos,adjustedCursorIndex,maxCharNum);
      enableSmartInput(stream,textContent,cursorPos,adjustedCursorIndex,maxCharNum,keyData,mostRecentMiss);
    });
  })

  var cursorPos = 0,
      maxCharNum = 50,
      adjustedCursorIndex = (maxCharNum / 2) - 1,
      keyData = {};
      mostRecentMiss = '';

  var buffer = (function(){var buf = '';for(var i=0; i< adjustedCursorIndex; i++){ buf+= ' '; } return buf})();

  // initialize first story
  $.get( "/api/tales/id/565f964447e3f6fd05b68d79", function( data ) {
    var textContent = buffer +  data["text_content"];
    // window.var2 = JSON.parse(data);
    var stream = document.getElementById("textArea");
    formatContent(stream,textContent,cursorPos,adjustedCursorIndex,maxCharNum);
    enableSmartInput(stream,textContent,cursorPos,adjustedCursorIndex,maxCharNum,keyData,mostRecentMiss);
    console.log(data);
  });
}


//does key listening and triggers formatting & updating
function enableSmartInput(textElement,story,cp,acp,maxchars,kd,mrm){
  document.body.onkeypress = function(evnt){
    var code = evnt.keyCode,
        typeIndex = cp+acp;
    var typedInt = story.charCodeAt(typeIndex),
        typedChar = String.fromCharCode(typedInt);
    kd[typedChar] = kd[typedChar] || 	{"key":typedChar,"seen":0,"missed":0};//initial char if not seen before
    if(typedInt === code){//checks if typed char is char at cursor position
      cp += 1;
      formatContent(textElement, story, cp, acp, maxchars);
      updateProgress(story, cp, acp);
      kd[typedChar]["seen"]+=1;
    }else{
      document.getElementById("white").style.backgroundColor = "gray";
      if(mrm !== typedChar){//No double-jeopardy for mis-typed chars
        kd[typedChar]["missed"]+=1;
        mrm = typedChar;
      }else{
        //REMOVE THIS !! ELSE
        console.log(kd,mrm);
      }
    }
  }
  document.body.onkeyup = function(){
    document.getElementById("white").style.backgroundColor = "rgb(223, 218, 255)";
  }
}

//updates the html progress element, called at every very key press
function updateProgress(story, cp, acp){
  var wordcount = story.match(/\S+/g).length;
  var wordsTyped = story.slice(0,cp+acp).match(/\S+/g) ? story.slice(0,cp+acp).match(/\S+/g).length : 0;
  // var percentCompleted = (wordsTyped/wordcount*100);
  // document.getElementById('completed').innerHTML = percentCompleted.toFixed(0) + "% Completed!";
  var wordsLeft = story.slice(cp+acp,story.length).match(/\S+/g) ? story.slice(cp+acp,story.length).match(/\S+/g).length : 0;
  document.getElementById('stats').textContent = wordsLeft;
  var prog = document.getElementById("progress");
  prog.value = wordsTyped;
  prog.max = wordcount;
}

//applies styling to side-scrolling story text
function formatContent(elem,story,cp, acp, max){
  elem.innerHTML = '', fade = 10;
  var fadeOut = story.slice(cp,cp+fade);
  for(var i=0; i < fade; i++){
    elem.innerHTML += "<span style='opacity:"+(i/(fade-1))+"'>"+ fadeOut.charAt(i) +"</span>";
  }
  elem.innerHTML += story.slice(cp+fade,cp+acp) + "<span id='white' style='background-color:rgb(223, 218, 255)'>" + story.charAt(cp+acp) +
      "</span>" + story.slice(cp+acp+1,cp+max-1-fade);
  fadeOut = story.slice(cp+max-1-fade,cp+max-1);
  for(var i=0; i < fade; i++){
    elem.innerHTML += "<span style='opacity:"+(1-i/(fade))+"'>"+ fadeOut.charAt(i) +"</span>";
  }
}
