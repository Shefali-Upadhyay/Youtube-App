let keyWordsearch = () => {
  gapi.client.setApiKey('AIzaSyAZQtXNZHLuR8DUIQibUmq4NOy6Uiivz7w');
  gapi.client.load('youtube', 'v3', () => {
    makeRequest();
  });
}
let makeRequest = () => {
  let q = document.getElementById('youtube_search').value;
  let request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet', 
    maxResults: 10
  });
  request.execute((response) => {     
    document.getElementById('result').style.display = 'block';                                    
    document.getElementById('videoDisplay').innerHTML = '';
    let srchItems = response.result.items;                
    $.each(srchItems, function(index, item) {
      let vidTitle = item.snippet.title;  
      let vidDescription =  item.snippet.description;
      let vidThumburl =  item.snippet.thumbnails.default.url;
      let vidID = item.id.videoId;  
      let channel = item.snippet.channelTitle;
      document.getElementById('videoDisplay').innerHTML += `<div class="border rounded border-dark p-3 mb-2 bg-white"><div class="row align-items-center"><div class="col-sm-6 col-md-4 col-lg-3 col-xl-3"><a href="#myModal" data-toggle="modal" data-target="#myModal"><img src="${vidThumburl}" alt="No  Image Available." style="width:204px;height:128px"></a><div class="modal" id="myModal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${vidTitle}</h5><button class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><iframe width="420" height="315" src="https://www.youtube.com/embed/${vidID}" frameborder="0" allowfullscreen></iframe></div><div class="modal-footer"><button class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></div><div class="col-sm-6 col-md-8 col-lg-9 col-xl-9"><h1 class="title">${vidTitle}</h1><h3>Owned By : ${channel}</h3><p>${vidDescription}</p></div></div></div>`;
    });  
  });  
}

document.getElementById('search').addEventListener('click', keyWordsearch);

document.getElementById('youtube_search').addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    keyWordsearch();
  }
});