
//saves the key details
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
  request.execute((response) => {                                         document.getElementById('videoDisplay').innerHTML = '';
      let srchItems = response.result.items;                
      $.each(srchItems, function(index, item) {
      let vidTitle = item.snippet.title;  
      let vidDescription =  item.snippet.description;
      let vidID = item.id.videoId;  
      let channel = item.snippet.channelTitle
      document.getElementById('videoDisplay').innerHTML += `<div class="border rounded border-dark p-3 mb-2 bg-white"><h1 class="text-center title">${vidTitle}</h1><h3>Owned By : ${channel}</h3></h3><p>${vidDescription}</p><div class="embed-responsive embed-responsive-21by9 rounded"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${vidID}"></iframe></div></div>`;
    });  
  });  
}

//user clicked on the add button
//if there is any text inside the task field, add the text to the todo list
document.getElementById('search').addEventListener('click', keyWordsearch);

//user pressed enter
//if there is any text inside the task field, add the text to the todo list
document.getElementById('youtube_search').addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    keyWordsearch();
  }
});