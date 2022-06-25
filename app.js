var addBtn=document.getElementById('addBtn');
showNotes();
addBtn.addEventListener('click',function(){
  var addTxt=document.getElementById('addTxt');
  var addTitle=document.getElementById('addTitle');
  var notes=localStorage.getItem('notes');
  if(notes==null){
    notesArr=[];
  }
  else{
    notesArr=JSON.parse(notes);
  }
  if(addTxt.value!=""){
    if(addTitle.value==""){
      addTitle.value=addTxt.value.slice(0,7);
    }
    noteObj={
      title:addTitle.value,
      text:addTxt.value
    }
      notesArr.push(noteObj);
      localStorage.setItem('notes',JSON.stringify(notesArr));
      addTxt.value="";
      addTitle.value="";
  }
  // console.log(notesArr);
  showNotes();
});

function showNotes(){
  var notes=localStorage.getItem("notes");
  if(notes==null){
    notesArr=[];
  }
  else{
    notesArr=JSON.parse(notes);
  }

  let htmlInsert="";
  notesArr.forEach((element,index) => {
    htmlInsert+=`
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id) ">Delete</button>
      </div>
    </div>`
  });
  var elem=document.getElementById('notes');
  if(notesArr!=0){
    elem.innerHTML=htmlInsert;
  }
  else{
    elem.innerHTML='<p>No notes added yet</p>';
  }
}


function deleteNote(index){
  var notes=localStorage.getItem('notes');
  if(notes==null){
    notesArr=[];
  }
  else{
    notesArr=JSON.parse(notes);
  }
  notesArr.splice(index,1);
  localStorage.setItem('notes',JSON.stringify(notesArr));
  showNotes();
}

var searchTxt=document.getElementById('searchTxt');

searchTxt.addEventListener('input',function(){
  var data=searchTxt.value.toLowerCase();
  var noteCards=document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element){
    var cardData=element.getElementsByTagName('p')[0].innerText;
    cardData=cardData.toLowerCase()
    if(cardData.includes(data)){
      element.style.display="block";
    }
    else{
      element.style.display="none";
    }
  })
})

var clearbtn=document.getElementById('clearbtn');

clearbtn.addEventListener('click',function(){
  if(confirm("Are you sure, you want to delete the notes!")){
    localStorage.clear();
    location.reload();
  }
})
