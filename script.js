var arrayOfWords, fileContents;
var countWord = {};

var file = document.querySelector('input[type="file"]');
file.addEventListener('change',loadTextFile);

var btn = document.getElementById('btn');
btn.addEventListener('click',loadText);

var sortBtn = document.getElementById('sort');
sortBtn.addEventListener('click',sortThingsOut);

/* ----- Load and Read from text file ---------- */
function loadTextFile(){
  var reader = new FileReader();
  reader.readAsText(file.files[0]);
  reader.onload = function () {
    fileContents = reader.result;
    // console.log(fileContents);
  }
}
/* --------------------------------------------- */

/* ----- Store count of each word in countWord object and render on screen ---------- */
function loadText(){
  countWord = {};
  arrayOfWords = fileContents.split(/[ ,:!.;?\n\t]/);
  arrayOfWords.map((ele) => {
    ele = ele.toLowerCase();
    if(countWord[ele] === undefined){
      countWord[ele] = 1;
    }
    else{
      countWord[ele] = countWord[ele] + 1;
    }
  });
  renderData();
}
/* --------------------------------------------------------------------------------- */

/* ------ render method to read from countWord obj and render on screen ------------ */
function renderData(){
  document.getElementById('list').innerHTML = "";
  for (var key in countWord) {
    if (countWord.hasOwnProperty(key)) {
      var li = document.createElement('li');
      var ul = document.getElementById('list');
      if(!key==" "){
        li.textContent = key + ": " + countWord[key];
        ul.appendChild(li);
      }

    }
  }
}
/* --------------------------------------------------------------------------------- */

/* -------------- Sort Method to sort object and re-render it ---------------------- */
function sortThingsOut(){
  var tempObj = {};
  var sortable = [];
  for (var words in countWord) {
    sortable.push([ words, countWord[words] ]);
  }
  sortable.sort(function(a, b) {
    return b[1] - a[1];
  });
  for(let i = 0; i < sortable.length; i++){
    tempObj[sortable[i][0]] = sortable[i][1];
  }
  countWord = tempObj;
  renderData();
}
/* --------------------------------------------------------------------------------- */
