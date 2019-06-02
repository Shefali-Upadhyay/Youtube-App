"use strict";

var keywordInput = document.getElementById('youtube_search');
var videoList = document.getElementById('vid');
var pageToken = '';
gapi.load("client", loadClient);

function loadClient() {
  gapi.client.setApiKey("AIzaSyAZQtXNZHLuR8DUIQibUmq4NOy6Uiivz7w");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(function () {
    console.log("GAPI client loaded for API");
  }, function (err) {
    console.error("Error loading GAPI client for API", err);
  });
}

document.getElementById('search').addEventListener('click', execute);
document.getElementById('youtube_search').addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    execute();
  }
});

function paginate(e, obj) {
  e.preventDefault();
  pageToken = obj.getAttribute('data-id');
  execute();
}

function execute() {
  var searchString = keywordInput.value;
  var arr_search = {
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    q: searchString
  };

  if (pageToken != '') {
    arr_search.pageToken = pageToken;
  }

  return gapi.client.youtube.search.list(arr_search).then(function (response) {
    var listItems = response.result.items;

    if (listItems) {
      var output = '<h1 class="titlename text-center">Search Results</h1>';
      listItems.forEach(function (item) {
        var vidTitle = item.snippet.title;
        var vidDescription = item.snippet.description;
        var vidThumburl = item.snippet.thumbnails["default"].url;
        var vidId = item.id.videoId;
        var channel = item.snippet.channelTitle;
        output += "<div class=\"border rounded border-dark p-3 mb-2 bg-white\"><div class=\"row align-items-center\"><div class=\"col-sm-6 col-md-4 col-lg-3 col-xl-3\"><a href=\"#myModal\" data-toggle=\"modal\" data-target=\"#myModal".concat(vidId, "\"><img src=\"").concat(vidThumburl, "\" alt=\"No  Image Available.\" style=\"width:204px;height:128px\"></a><div class=\"modal\" id=\"myModal").concat(vidId, "\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">").concat(vidTitle, "</h5><button class=\"close\" data-dismiss=\"modal\">&times;</button></div><div class=\"modal-body\"><iframe width=\"420\" height=\"315\" src=\"https://www.youtube.com/embed/").concat(vidId, "\" frameborder=\"0\" allowfullscreen></iframe></div><div class=\"modal-footer\"><button class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button></div></div></div></div></div><div class=\"col-sm-6 col-md-8 col-lg-9 col-xl-9\"><h1 class=\"title\">").concat(vidTitle, "</h1><h3>Owned By : ").concat(channel, "</h3><p>").concat(vidDescription, "</p></div></div></div>");
      });

      if (response.result.prevPageToken) {
        output += "<br><button type=\"button\" class=\"btn btn-primary\" data-id=\"".concat(response.result.prevPageToken, "\" onclick=\"paginate(event, this)\">Prev</button>");
      }

      if (response.result.nextPageToken) {
        output += "&nbsp<button type=\"button\" class=\"btn btn-primary\" data-id=\"".concat(response.result.nextPageToken, "\" onclick=\"paginate(event, this)\">Next</button>");
      }

      videoList.innerHTML = output;
    }
  }, function (err) {
    console.error("Execute error", err);
  });
}