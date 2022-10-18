var jx;
var imgNum = 0;

function uploadImage(){
    imgNum++;
    $('#formContainer').hide();
    $('#imgCard').prepend(`
    
        <div class="col-12 py-3 bg-dark bg-opacity-10 border rounded mb-3" id="imgCard`+imgNum+`">
            <span id="gifLoading"><img src="img/loading-load.gif" width="30px">&nbsp; Uploading..</span>
        </div>
    
    `)
    var file = document.getElementById('formFile');
    var form = new FormData();
    form.append("image", file.files[0])
    var settings = {
    "url": "https://api.imgbb.com/1/upload?key=7134b8ef30e98b50005f9354161eeb75",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": form
    };
    $.ajax(settings).done(function (response) {
        $('#formContainer').show();
        console.log(response);
        jx = JSON.parse(response);
        $('#gifLoading').remove();
        $('#imgCard'+imgNum).prepend(`
        
            <div class="col-12" id="imgView">
                <p>`+jx.data.image.filename+`</p>
                <div class="float-end">
                    <button class="btn btn-danger" onclick="deleteImage('`+jx.data.delete_url+`')"><i class="fa fa-trash"></i></button>
                    <button class="btn btn-primary" onclick="copyLink('`+jx.data.url_viewer+`')"><i class="fa-solid fa-link"></i> Copy Link</button>
                </div>
                <img id="myImg" src="`+jx.data.display_url+`" class="w-100 rounded mt-3">
            </div>
        
        `)
    });
}

function deleteImage(url){
    window.open(url, '_blank').focus();
}
function copyLink(url){
    navigator.clipboard.writeText(url);
    $.alert({
        title: 'Copied to Clipboard',
        boxWidth: '500px',
        content: url
    }
    );
}
