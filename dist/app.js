"use strict";

//saves the key details
var keyWordsearch = function keyWordsearch() {
  gapi.client.setApiKey('AIzaSyAZQtXNZHLuR8DUIQibUmq4NOy6Uiivz7w');
  gapi.client.load('youtube', 'v3', function () {
    makeRequest();
  });
};

var makeRequest = function makeRequest() {
  var q = document.getElementById('youtube_search').value;
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 10
  });
  request.execute(function (response) {
    document.getElementById('videoDisplay').innerHTML = '';
    var srchItems = response.result.items;
    $.each(srchItems, function (index, item) {
      var vidTitle = item.snippet.title;
      var vidDescription = item.snippet.description;
      var vidID = item.id.videoId;
      var channel = item.snippet.channelTitle;
      document.getElementById('videoDisplay').innerHTML += "<div class=\"border rounded border-dark p-3 mb-2 bg-white\"><h1 class=\"text-center title\">".concat(vidTitle, "</h1><h3>Owned By : ").concat(channel, "</h3></h3><p>").concat(vidDescription, "</p><div class=\"embed-responsive embed-responsive-21by9 rounded\"><iframe class=\"embed-responsive-item\" src=\"https://www.youtube.com/embed/").concat(vidID, "\"></iframe></div></div>");
    });
  });
}; //user clicked on the add button
//if there is any text inside the task field, add the text to the todo list


document.getElementById('search').addEventListener('click', keyWordsearch); //user pressed enter
//if there is any text inside the task field, add the text to the todo list

document.getElementById('youtube_search').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    keyWordsearch();
  }
});