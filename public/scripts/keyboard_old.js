//handles key presses

window.onload = function(){
  var myth = {
    "THE UGLY DUCKLING" : "A duck made her nest under some leaves. She sat on the eggs to keep them warm. At last the eggs broke, one after the other. Little ducks came out. Only one egg was left. It was a very large one. At last it broke, and out came a big, ugly duckling. What a big duckling! said the old duck. He does not look like us. Can he be a turkey?--We will see. If he does not like the water, he is not a duck. The next day the mother duck took her ducklings to the pond. Splash! Splash! The mother duck was in the water. Then she called the ducklings to come in. They all jumped in and began to swim. The big, ugly duckling swam, too. The mother duck said, He is not a turkey. He is my own little duck. He will not be so ugly when he is bigger. Then she said to the ducklings, Come with me. I want you to see the other ducks. Stay by me and look out for the cat. They all went into the duck yard. What a noise the ducks made! While the mother duck was eating a big bug, an old duck bit the ugly duckling. Let him alone, said the mother duck. He did not hurt you. I know that, said the duck, but he is so ugly, I bit him. The next duck they met, said, You have lovely ducklings. They are all pretty but one. He is very ugly. The mother duck said, I know he is not pretty. But he is very good. Then she said to the ducklings, Now, my dears, have a good time. But the poor, big, ugly duckling did not have a good time. The hens all bit him. The big ducks walked on him. The poor duckling was very sad. He did not want to be so ugly. But he could not help it. He ran to hide under some bushes. The little birds in the bushes were afraid and flew away. It is all because I am so ugly, said the duckling. So he ran away. At night he came to an old house. The house looked as if it would fall down. It was so old. But the wind blew so hard that the duckling went into the house. An old woman lived there with her cat and her hen. The old woman said, I will keep the duck. I will have some eggs. The next day, the cat saw the duckling and began to growl. The hen said, Can you lay eggs? The duckling said, No. Then keep still, said the hen. The cat said, Can you growl? No, said the duckling. Then keep still, said the cat. And the duckling hid in a corner. The next day he went for a walk. He saw a big pond. He said, I will have a good swim. But all of the animals made fun of him. He was so ugly. The summer went by. Then the leaves fell and it was very cold. The poor duckling had a hard time. It is too sad to tell what he did all winter. At last it was spring. The birds sang. The ugly duckling was big now. One day he flew far away. Soon he saw three white swans on the lake. He said, I am going to see those birds. I am afraid they will kill me, for I am so ugly. He put his head down to the water. What did he see? He saw himself in the water. But he was not an ugly duck. He was a white swan. The other swans came to see him. The children said, Oh, see the lovely swans. The one that came last is the best. And they gave him bread and cake. It was a happy time for the ugly duckling."
  }
  var buffer = "                         ";
  var test = buffer + "A duck made her nest under some leaves. She sat on the eggs to keep them warm."

  window.textContent = buffer + document.getElementById("textcontent").children[0].textContent;//buffer + r.story_text;

  var textContent = window.textContent;
  window.cursorPos = 0;
  var stream = document.getElementById("textArea");
  formatContent(stream,textContent,0);
  enableSmartInput(stream,textContent);
}

function enableSmartInput(textElement,story){
  document.body.onkeypress = function(evnt){
    var code = evnt.keyCode;
    if(story.charCodeAt(window.cursorPos+39) === code){
      var wcp = ++window.cursorPos;
      formatContent(textElement,story,wcp);
      updateProgress(story,wcp);
    }
  }
}

function updateProgress(story, cp){
  var wordcount = story.match(/\S+/g).length;
  var wordsTyped = story.slice(0,cp+39).match(/\S+/g) ? story.slice(0,cp+39).match(/\S+/g).length : 0;
  var wordsLeft = story.slice(cp+39,story.length).match(/\S+/g) ? story.slice(cp+39,story.length).match(/\S+/g).length : 0;
  document.getElementById("to-go").innerHTML = wordsTyped + " words typed. " + wordsLeft + " to go."
}

function formatContent(elem,story,cp){
  var colors = window.fadeColors;
  elem.innerHTML = '', fade = 15;
  var fadeOut = story.slice(cp,cp+fade);
  for(var i=0; i < fade; i++){
    elem.innerHTML += "<span style='opacity:"+(i/(fade-1))+"'>"+ fadeOut.charAt(i) +"</span>";
  }
  elem.innerHTML += story.slice(cp+fade,cp+39) + "<span id='white' style='background-color:white'>" + story.charAt(cp+39) +
  "</span>" + story.slice(cp+40,cp+79-fade);
  fadeOut = story.slice(cp+79-fade,cp+79);
  for(var i=0; i < fade; i++){
    elem.innerHTML += "<span style='opacity:"+(1-i/(fade))+"'>"+ fadeOut.charAt(i) +"</span>";
  }
}
