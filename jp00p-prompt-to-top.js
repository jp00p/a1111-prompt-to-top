const css = `
.button-wrapper {
  display:flex;
  flex:1 !important;
  width:auto;
  justify-content:flex-end;
  align-items:center;
}

#notes-button {
  padding:1em;
  border-radius:8px;
  background: #680747;
  border:none;
  outline:none;
  font-weight:bold;
  color:#fff;
  text-shadow:1px 1px #000;
  transition:all 0.2s ease-in;
  align-self:center !important;
}
#notes-button:hover {
  background:#c3195d;
}
#notes-button:focus, #notes-button:active {
  outline:none;
  border:none;
}

#prompt-note {
  padding:1.25em;
  font-weight:bold;
  background: #680747;
  box-shadow:inset 0px -5px 15px rgba(0,0,0,0.5);
  color:#fff;
  font-size:16px;
  line-height:24px;
  text-shadow:1px 1px 0px #000;
  font-family:"Consolas", "Courier New";
}
`;

let styleAdded = false;

window.onload = (function(){

  onUiUpdate(function() {

    let quicksettings = gradioApp().querySelector('#quicksettings');
    
    if (gradioApp().querySelector("#notes-button") === null) {
      
      let nw = createButtonWrapper();
      let nb = createNotesButton();
      nw.appendChild(nb)

      nb.addEventListener("click", (e) => {
        let prompt = gradioApp().querySelector(".tabitem:not([style*='display: none;']) textarea[placeholder^='Prompt']");
        let old_note = gradioApp().querySelector("#prompt-note")

        if(old_note){
          old_note.remove();
        }

        if(prompt.value != ""){
          note = createNote(prompt.value);
          gradioApp().prepend(note);
        }

      });

      quicksettings.appendChild(nw);

    }

    if(!styleAdded){

      // Add style to dom
      let notestyle = document.createElement('style');
      notestyle.appendChild(document.createTextNode(css));
      gradioApp().appendChild(notestyle);
      styleAdded = true;

    }

 
  });

  function createNote(prompt){
    let note = document.createElement("div");
    note.setAttribute("id", "prompt-note")
    let notecontent = document.createTextNode(prompt);
    let notecontent_wrap = document.createElement("p");
    notecontent_wrap.appendChild(notecontent);
    note.appendChild(notecontent_wrap);
    return note;
  }

  function createButtonWrapper(){
    let wrap = document.createElement("div")
    wrap.setAttribute("class", "button-wrapper");
    return wrap;
  }
  
  
  function createNotesButton() {
    let button = document.createElement("button");
    let buttontext = document.createTextNode("Add prompt to top of screen")
    button.appendChild(buttontext);
    button.setAttribute('id', 'notes-button');  
    return button;
  }

});