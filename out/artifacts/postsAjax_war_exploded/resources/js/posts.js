$(function () {
    $("#send").click(getPosts);

    $(document).on('click', '.show-comment', function (e) {
        let postId = $(this).attr('data-postId');
        getComments(postId);
    })
});

function getPosts() {
    let userId = $("#userid").val();
    $.ajax("https://jsonplaceholder.typicode.com/posts", {
        "type": "get",
        data: {
            userId: userId
        },
    }).done(displayPosts);
}

function displayPosts(data) {
    // prepare posts dom
    let postList = "<div>";
    data.forEach(function (item) {
        postList += "<div id='post-" + item.id + "'>ID: " +
            item.id + "<br/>" +
            "<strong>Title: " + item.title + "</strong>" + "<br/>"
            + "Body: " + item.body + "<br/>"
            + "<button class='show-comment' type='submit' data-postId='" + item.id + "'  > Show Comments </button><br/>" +
            "</div>";
    });
    postList += "<div>";
    $("#postList").html(postList);

    // clean up input fields
    $("#userid").val('');
}

function getComments(postId) {
    $.ajax("https://jsonplaceholder.typicode.com/comments", {
        "type": "get",
        data: {
            postId: postId
        },
    }).done(displayComments);
}

function displayComments(data) {
    // prepare comment dom
    let postComments = "<div>";
    data.forEach(function (item) {
        postComments += "<p>ID: " +
            item.id + "<br/>" +
            "<strong>Name: " + item.name + "</strong>" + "<br/>" +
            "Email: " + item.email + "<br/>"
            + "Comment: " + item.body + "<br/>" +
            "</p>";
    });
    postComments += "<div>";
    let postId = data ? data[0].postId : '';
    let post = $("#postList #post-" + postId).html();
    $("#postList").html(post);
    $("#postList").append(postComments);
}
