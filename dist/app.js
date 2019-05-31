"use strict";

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
    document.getElementById('result').style.display = 'block';
    document.getElementById('videoDisplay').innerHTML = '';
    var srchItems = response.result.items;
    $.each(srchItems, function (index, item) {
      var vidTitle = item.snippet.title;
      var vidDescription = item.snippet.description;
      var vidThumburl = item.snippet.thumbnails["default"].url;
      var vidID = item.id.videoId;
      var channel = item.snippet.channelTitle;
      document.getElementById('videoDisplay').innerHTML += "<div class=\"border rounded border-dark p-3 mb-2 bg-white\"><div class=\"row align-items-center\"><div class=\"col-sm-6 col-md-4 col-lg-3 col-xl-3\"><a href=\"#myModal\" data-toggle=\"modal\" data-target=\"#myModal\"><img src=\"".concat(vidThumburl, "\" alt=\"No  Image Available.\" style=\"width:204px;height:128px\"></a><div class=\"modal\" id=\"myModal\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">").concat(vidTitle, "</h5><button class=\"close\" data-dismiss=\"modal\">&times;</button></div><div class=\"modal-body\"><iframe width=\"420\" height=\"315\" src=\"https://www.youtube.com/embed/").concat(vidID, "\" frameborder=\"0\" allowfullscreen></iframe></div><div class=\"modal-footer\"><button class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button></div></div></div></div></div><div class=\"col-sm-6 col-md-8 col-lg-9 col-xl-9\"><h1 class=\"title\">").concat(vidTitle, "</h1><h3>Owned By : ").concat(channel, "</h3><p>").concat(vidDescription, "</p></div></div></div>");
    });
  });
};

document.getElementById('search').addEventListener('click', keyWordsearch);
document.getElementById('youtube_search').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    keyWordsearch();
  }
});