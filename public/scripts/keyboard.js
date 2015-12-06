
window.onload = function(){
  var storyID =  localStorage.getItem("currentStoryID") || '7';
  $('.menu').dropit();

  $('#graph-menu').click(function(){
    console.log("graph");
    location.href='stats';//+ cleanForURL(keyData);
  });

  $('.title-picker').on('click', function(evt) {
    var id = $(evt.target).data('id');
    localStorage.setItem("currentStoryID", String(id));
    console.log('clicked id: ', id)
    $.get("/api/tales/id/" + id, function( data ) {
      console.log(data);
      var textContent = buffer +  data[0]["text_content"];
      // window.var2 = JSON.parse(data);
      var stream = document.getElementById("textArea");
      localStorage.setItem("cursorPos",0);
      var cp = 0;//parseInt(localStorage.getItem("cursorPos"));
      formatContent(stream,textContent,cp,adjustedCursorIndex,maxCharNum);
      enableSmartInput(stream,textContent,cp,adjustedCursorIndex,maxCharNum,keyData,mostRecentMiss);
    });
  })

  var cursorPos = localStorage.getItem("cursorPos") || 0,
  maxCharNum = 50,
  adjustedCursorIndex = (maxCharNum / 2) - 1,
  keyData = {};//getStatData();
  mostRecentMiss = '';
  var buffer = (function(){var buf = '';for(var i=0; i< adjustedCursorIndex; i++){ buf+= ' '; } return buf})();

  // initialize first story
  $.get("/api/tales/id/" + storyID, function(data){
    var textContent = buffer +  data[0]["text_content"];
    // window.var2 = JSON.parse(data);
    document.getElementById("progress").value = '0';
    document.getElementById("stats").textContent = 'words left';

    var stream = document.getElementById("textArea");
    formatContent(stream,textContent,parseInt(cursorPos),adjustedCursorIndex,maxCharNum);
    enableSmartInput(stream,textContent,parseInt(cursorPos),adjustedCursorIndex,maxCharNum,keyData,mostRecentMiss);
    //console.log(data);
  });
}

//does key listening and triggers formatting & updating
function enableSmartInput(textElement,story,cp,acp,maxchars,kd,mrm){
  document.body.onkeypress = function(evnt){
    var code = evnt.keyCode,
    typeIndex = cp+acp;
    var typedInt = story.charCodeAt(typeIndex),
    typedChar = String.fromCharCode(typedInt);
    if(typedInt !== 32){//we don't care about space bar
    kd[typedChar] = kd[typedChar] || 	{"k":typedChar,"s":0,"m":0};//initial char if not seen before
  }
  if(typedInt === code){//checks if typed char is char at cursor position
    //cp += 1;
    localStorage.setItem("cursorPos",++cp);
    formatContent(textElement, story, cp, acp, maxchars);
    updateProgress(story, cp, acp);
    if(typedInt !== 32){
      kd[typedChar]["s"]+=1;
    }
  }else{
    document.getElementById("white").style.backgroundColor = "gray";
    if(mrm !== typedChar && typedInt !== 32){//No double-jeopardy for mis-typed chars
      kd[typedChar]["m"]+=1;
      mrm = typedChar;
    }
  }
  localStorage.setItem("stats",JSON.stringify(kd));
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

function getStatData(){
  if(localStorage.getItem('stats')){
    try{
      return parseData(JSON.parse(localStorage.getItem('stats')));
    }catch(err){
      console.log(err,"\nattempting alternate parsing...");
      try{
        return parseData(eval(localStorage.getItem('stats')));
      }catch(err2){
        return {};
      }
    }
  }else{
    return {};
  }
}

function parseData(data){
  var list = [];
  for(var ch in data){
    list.push(data[ch]);
  }
  return list;
}
