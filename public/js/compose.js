$(document).ready(function() {

  marked.setOptions({
    gfm: true
  });

  var renderPreview = function(){
    var md = '# ' + $('#post_title').val() + "\n\n\n" + $('#post_body').val();
    marked(md, {}, function(err, content) {
      $('#preview').html(content);
    });
  };

  $('#post_body').bind('input propertychange', renderPreview);
  $('#post_title').bind('input propertychange', renderPreview);
});