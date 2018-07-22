urlp=[];u=location.search.replace("?","").split("&").forEach(function(d){e=d.split("=");urlp[e[0]]=e[1];});

$.post(`https://jasper-velociraptor.glitch.me/v/${urlp['hash']}`, (data) => {
    $('#content').html(data);
});

