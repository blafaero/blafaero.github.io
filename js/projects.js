async function loadGithubMarkdown(readmeURL , repo, previewURL) {
    // Source: https://javascript.info/fetch
    let response = await fetch(readmeURL);
    if (response.ok) {
        let text = await response.text();

        // Update Source Metadata Information
        n = new Date();
        source = "Retrieved from " + '<a href="' + repo + '">Github</a>' + " on " + n.toDateString() + " at " + n.toTimeString();  

        updatePage(text, source, previewURL);
    } else {
        alert("HTTP Error: " + response.status);
    }
}

function updateNonReadme(text, repo) {
    source = "Find associated code at " + '<a href="' + repo + '">Github</a>'; 
    updatePage(text, source, '');
}

function updatePage(text, source, previewURL) {
    // Get all HTML elements being modified
    let post = document.getElementById("SelectedPost");
    let meta = document.getElementById("SelectedPostMetadata");
    let preview = document.getElementById("SelectedPostPreview");
    
    // Turn off previews in case the new selection is not using one
    preview.style.width = "0";
    preview.style.height = "0";

    // Update Post
    if (post.innerHTML == '') {
        post.innerHTML = text;
    }
    post.mdContent = text;

    // Update Source
    meta.innerHTML = source;
    
    //Update Preview
    if (previewURL != '') {
        preview.src = "https://htmlpreview.github.io/?" + previewURL;
        preview.style.width = "100%";
        preview.style.height = "20em";
    }
}