$(function(){
    const base_url = "https://api.themoviedb.org/3"

    const API_Key = "?api_key=b6bbfc9585c14f4716f56c5f385d23f9"
    
    
    //Search by movie name -- title, release year, language ###############################################################
    $("#tBtn").on("click", function(e){
        //location.reload()
        e.preventDefault();
        
        alert("Button click");
        var keyword = $("#titleIp").val();
        var url = "".concat(base_url + "/search/movie" + API_Key +"&query=" + keyword);

        $.ajax({
            url: url,
            type: 'GET',
        })
        .done(function(data) {

            const table = $('#movie-result');

            $.each(data.results, function(i, item){

                let row = $('<tr></tr>', {'id': item.id});

                let cell = $('<td></td>', { 'text': "Title" });
                row.append(cell);
                cell = $('<td></td>', { 'text': item.original_title });
                row.append(cell);

                let releaseYear = item.release_date.substring(0,4);
                let cell2 = $('<td></td>', { 'text': 'Release Year' });
                row.append(cell2);
                cell2 = $('<td></td>', { 'text': releaseYear });
                row.append(cell2);

                let cell3 = $('<td></td>', { 'text': "Language" });
                row.append(cell3);
                cell3 = $('<td></td>', { 'text': item.original_language });
                row.append(cell3);

                table.append(row);
                
                ModalInfo(row);
                

               
            });

            
        });
        

    });

    //Search by movie name AND year ########################################################################
    $("#tyBtn").on("click", function(e){
        e.preventDefault();
        
        //alert("Button click");
        var keyword = $("#tyTitleIp").val();
        var uReleaseYear = $("#tyYearIp").val();
        var url = "".concat(base_url + "/search/movie" + API_Key +"&query=" + keyword);
        //alert(url);

        $.ajax({
            url: url,
            type: 'GET',
        })
        .done(function(data) {
            alert("In Get");
            const table = $('#movie-result');

            $.each(data.results, function(i, item){
                let releaseYear = item.release_date.substring(0,4);
                if(releaseYear =! uReleaseYear){
                    return true;
                };

                let row = $('<tr></tr>');

                let cell = $('<td></td>', { 'text': "Title" });
                row.append(cell);
                cell = $('<td></td>', { 'text': item.original_title });
                row.append(cell);

                //let releaseYear = item.release_date.substring(0,4);
                let cell2 = $('<td></td>', { 'text': 'Release Year' });
                row.append(cell2);
                cell2 = $('<td></td>', { 'text': releaseYear });
                row.append(cell2);

                let cell3 = $('<td></td>', { 'text': "Language" });
                row.append(cell3);
                cell3 = $('<td></td>', { 'text': item.original_language });
                row.append(cell3);

                table.append(row);

                ModalInfo(row);

            });
        })
        .fail(function(){
            console.log("Alter not working");
        });
        
    });

    //Search by name of actor, director, etc.###########################################
    $("#nBtn").on("click", function(e){
        e.preventDefault();
        alert("Button click");
        var keyword = $("#nameIp").val();

        var url = "".concat(base_url + "/search/person" + API_Key +"&query=" + keyword);

        

        //alert(url);

        $.ajax({
            url: url,
            type: 'GET',
        })
        .done(function(data) {

            const table = $('#person-result');

            $.each(data.results, function(i, item){
                

                let row = $('<tr></tr>', { 'id': item.id });

                let cell = $('<td></td>', { 'text': "Name" });
                row.append(cell);
                cell = $('<td></td>', { 'text': item.name });
                row.append(cell);

                
                cell = $('<td></td>', { 'text': 'primary role' });
                row.append(cell);
                cell = $('<td></td>', { 'text': item.known_for_department });
                row.append(cell);


                table.append(row);

                ModalInfoPerson(row);

            });
        });
    });

    //clicking on a movie (modal) (make addeventlistener inside first two functions)
    
    var ModalInfo = (function(row){
        row.on("click", function() {
            //"get" using id from row
            var movieName = this.id;
            // https://api.themoviedb.org/3/movie/578?api_key=b6bbfc9585c14f4716f56c5f385d23f9 example url
            var url = "".concat(base_url + "/movie/" + movieName + API_Key );

            //9 rows :( help help help help help help help help help help help help help help help help()
                const table = $('#addMovieContent');

            $.ajax({
                url: url,
                type: 'GET',
            })
            .done(function(data) {
    
                //Title, release date, language, runtime, overview, link to the movie’s web page
                let row = $('<tr>General Info</tr>');
                let cell = $('<td></td>', { 'text': "Title" });
                row.append(cell);
                cell = $('<td></td>', { 'text': data.original_title });
                row.append(cell);

                cell = $('<td></td>', { 'text': "release date" });
                row.append(cell);
                cell = $('<td></td>', { 'text': data.release_date });
                row.append(cell);

                cell = $('<td></td>', { 'text': "Language" });
                row.append(cell);
                cell = $('<td></td>', { 'text': data.original_language });
                row.append(cell);

                cell = $('<td></td>', { 'text': "Runtime" });
                row.append(cell);
                cell = $('<td></td>', { 'text': data.runtime });
                row.append(cell);

                cell = $('<td></td>', { 'text': "Overview" });
                row.append(cell);
                cell = $('<td></td>', { 'text': data.overview });
                row.append(cell);

                cell = $('<td></td>', { 'text': "Link to movie web page" });
                row.append(cell);
                cell = $('<td></td>', { 'text': data.homepage });
                row.append(cell);

                table.append(row);
                //List of genres the movie belongs to
                row = $('<tr></tr>', { 'text': "List of Genres" });
                $.each(data.genres, function(i, item){
                    cell = $('<td></td>', { 'text': item.name });
                    row.append(cell);
                });
                table.append(row);
                //List of production companies involved in the making of the movie
                row = $('<tr></tr>', { 'text': "Production Companies" });
                $.each(data.production_companies, function(i, item){
                    cell = $('<td></td>', { 'text': item.name });
                    row.append(cell);
                });
                table.append(row);


                
    
    
            });

            //second get call for the cast and crew

            url = "".concat(base_url + "/movie/" +movieName +"/credits"+ API_Key );
            $.ajax({
                url: url,
                type: 'GET',
            })
            .done(function(data) {
                //List of actors. For each actor, his/her name and the name of their character will be shown
               let actorRow = $('<tr></tr>', { 'text': "Actors" });
                $.each(data.cast, function(i, item){
                    cell = $('<td></td>', { 'text': item.name });
                    actorRow.append(cell);
                    cell = $('<td></td>', { 'text': "as: ".concat(item.character) });
                    actorRow.append(cell);
                });
                table.append(actorRow);

                //List of directors
               let directorRow = $('<tr></tr>', { 'text': "Directors" });
               
               //List of script writers
               let scriptRow = $('<tr></tr>', { 'text': "Script writers" });

               //List of executive producers
               let executiveRow = $('<tr></tr>', { 'text': "Executive Producers" });

               //List of producers 
               let producerRow = $('<tr></tr>', { 'text': "Producers" });

               //List of music composers
               let musicRow = $('<tr></tr>', { 'text': "Music Composers" });

                $.each(data.crew, function(i, item){
                    switch(item.job) {
                        case "Original Music Composer":
                            cell = $('<td></td>', { 'text': item.name });
                            musicRow.append(cell);
                            break;
                        case "Director":
                            cell = $('<td></td>', { 'text': item.name });
                            directorRow.append(cell);
                            break;
                        case "Producer":
                            cell = $('<td></td>', { 'text': item.name });
                            producerRow.append(cell);
                            break;
                        case "Production Executive":
                            cell = $('<td></td>', { 'text': item.name });
                            executiveRow.append(cell);
                            break;
                        case "Writer":
                            cell = $('<td></td>', { 'text': item.name });
                            scriptRow.append(cell);
                            break;
                    }
                        
                });
                table.append(directorRow);
                table.append(scriptRow);
                table.append(executiveRow);
                table.append(producerRow);
                table.append(musicRow);
               

               

            });

            //open model
            $("#modal").css("display", "block");
        });
    });

    //clicking on a person (modal)(make addevent listener inside last 3rd function)
    var ModalInfoPerson = (function(row){
        row.on("click", function() {
            //"get" using id from row
            var personId = this.id;
            // https://api.themoviedb.org/3/person/3132025?api_key=b6bbfc9585c14f4716f56c5f385d23f9 example url
            var url = "".concat(base_url + "/person/" + personId + API_Key );

                const table = $('#addPersonContent');

            $.ajax({
                url: url,
                type: 'GET',
            })
            .done(function(data) {

                // "Name, main activity, birthday, birthplace, day of decease (only if the person is dead), biography, 
                //     link to the person’s website"
                let row = $('<tr></tr>', { 'text': "Actor General Info" });

                cell = $('<td></td>', { 'text': "Name" });
                row.append(cell);
                cell = $('<td></td>', { 'text': " : ".concat(data.name) });
                row.append(cell);

                cell = $('<td></td>', { 'text': "known_for_department" });
                row.append(cell);
                cell = $('<td></td>', { 'text': " : ".concat(data.known_for_department) });
                row.append(cell);
                if(data.birthday != null){
                    cell = $('<td></td>', { 'text': "birthday" });
                    row.append(cell);
                    cell = $('<td></td>', { 'text': " : ".concat(data.birthday) });
                    row.append(cell);
                }
                

                cell = $('<td></td>', { 'text': "Place of Birth" });
                row.append(cell);
                cell = $('<td></td>', { 'text': " : ".concat(data.place_of_birth) });
                row.append(cell);

                cell = $('<td></td>', { 'text': "Deathday" });
                row.append(cell);
                cell = $('<td></td>', { 'text': " : ".concat(data.deathday) });
                row.append(cell);

                cell = $('<td></td>', { 'text': "Biography" });
                row.append(cell);
                cell = $('<td></td>', { 'text': " : ".concat(data.biography) });
                row.append(cell);

                cell = $('<td></td>', { 'text': "Homepage" });
                row.append(cell);
                cell = $('<td></td>', { 'text': " : ".concat(data.homepage) });
                row.append(cell);
                
                table.append(row);
    
            });

            url = "".concat(base_url + "/person/" + personId + "/movie_credits" + API_Key );
            //example url: https://api.themoviedb.org/3/person/3132025/movie_credits?api_key=b6bbfc9585c14f4716f56c5f385d23f9
            $.ajax({
                url: url,
                type: 'GET',
            })
            .done(function(data) {
                // List of movies the person has worked in. For each movie, show the title, release year, and the 
                // role the person performed (e.g., actor, director, script writer…)
                let row = $('<tr></tr>', { 'text': "Associated Movies" });
            
                $.each(data.cast, function(i, item){
                    cell = $('<td></td>', { 'text': "Title" });
                    row.append(cell);
                    cell = $('<td></td>', { 'text': " : ".concat(item.title) });
                    row.append(cell);

                    cell = $('<td></td>', { 'text': "Release Date" });
                    row.append(cell);
                    cell = $('<td></td>', { 'text': " : ".concat(item.release_date) });
                    row.append(cell);

                    cell = $('<td></td>', { 'text': "Role" });
                    row.append(cell);
                    cell = $('<td></td>', { 'text': " : Actor" });
                    row.append(cell);

                    
                });
                table.append(row);
                $.each(data.crew, function(i, item){
                    cell = $('<td></td>', { 'text': "Title" });
                    row.append(cell);
                    cell = $('<td></td>', { 'text': " : ".concat(item.title) });
                    row.append(cell);

                    cell = $('<td></td>', { 'text': "release_date" });
                    row.append(cell);
                    cell = $('<td></td>', { 'text': " : ".concat(item.release_date) });
                    row.append(cell);

                    cell = $('<td></td>', { 'text': "Role" });
                    row.append(cell);
                    cell = $('<td></td>', { 'text': " : ".concat(item.job) });
                    row.append(cell);
                });
                table.append(row);
                
            });

            //open model
            $("#modal").css("display", "block");
        });
    });

    $("#modal").on("click", function(event){
        if (event.target == modal) {
            $("#modal").css("display", "none");
            
        }
    });
    
});















//Redundant code-----------------------------------------------------------------------------------------

  // //alert(url);
        // $.get(url, function(data){
        //     alert("get Json");
        //     $.each(data.results, function(i, item){
        //         var newTr = $("<tr>");
        //         var releaseYear = item.release_date.substring(0,3);
        //         //var title = $("<th>")
        //         //var releaseYear = $("<th>")
        //         //var Language = $("<th>")

        //         newTr.append("<th>${iem.title}</th>");
        //         newTr.append("<th>{releaseYear}</th>");
        //         newTr.append("<th>${iem.original_language}</th>");

        //         $("#movie-result").append(newTr);
        //     });
            
        // });

        // $.ajax({
        //     url: "".concat(base_url + "/search/movie" + API_Key +"&query=" + keyword),
        //     type: 'GET',
        // })
        // .done(function(data) {
        //     alert("get Json");
        //     $.each(data.results, function(i, item){
        //         var newTr = $("<tr>");
        //         var releaseYear = item.release_date.substring(0,3);
        //         //var title = $("<th>")
        //         //var releaseYear = $("<th>")
        //         //var Language = $("<th>")

        //         newTr.append("<th>${iem.title}</th>");
        //         newTr.append("<th>{releaseYear}</th>");
        //         newTr.append("<th>${iem.original_language}</th>");

        //         $("#movie-result").append(newTr);
        //     });
           
        // });

         // for(let property in item) {
                //     let row = $('<tr></tr>');
                    
                //     if(property == "original_title"){
                //         let cell = $('<td></td>', { 'text': "Title" });
                //         row.append(cell);
                //         cell = $('<td></td>', { 'text': item[property] });
                //         row.append(cell);
                //     }
                //     if(property == "release_date"){
                //         let releaseYear = item.release_date.substring(0,3);
                //         let cell = $('<td></td>', { 'text': 'Release Year' });
                //         row.append(cell);
                //         cell = $('<td></td>', { 'text': releaseYear });
                //         row.append(cell);
                //     }
                //     if(property == "original_language"){
                //         let cell = $('<td></td>', { 'text': "Language" });
                //         row.append(cell);
                //         cell = $('<td></td>', { 'text': item[property] });
                //         row.append(cell);
                //     }

                //     table.append(row);
                    
                // }


                // $.ajax({
                    //     url: url,
                    //     type: 'GET',
                    // })
                    // .done(function(data) {
            
                    //     const table = $('#movie-result');
            
                    //     $.each(data.results, function(i, item){
                    //         for(let property in item) {
                    //             let row = $('<tr></tr>');
                                
                    //             if(property == "original_title"){
                    //                 let cell = $('<td></td>', { 'text': "Title" });
                    //                 row.append(cell);
                    //                 cell = $('<td></td>', { 'text': item[property] });
                    //                 row.append(cell);
                    //             }
                    //             if(property == "release_date"){
                    //                 let releaseYear = item.release_date.substring(0,3);
                    //                 let cell = $('<td></td>', { 'text': 'Release Year' });
                    //                 row.append(cell);
                    //                 cell = $('<td></td>', { 'text': releaseYear });
                    //                 row.append(cell);
                    //             }
                    //             if(property == "original_language"){
                    //                 let cell = $('<td></td>', { 'text': "Language" });
                    //                 row.append(cell);
                    //                 cell = $('<td></td>', { 'text': item[property] });
                    //                 row.append(cell);
                    //             }
            
                    //             table.append(row);
                                
                    //         }
                    //     })
            
                        
                    // });


                    // $.get(url, function(data){
                    //     alert("get Json");
                    //     $.each(data.results, function(i, item){
                    //         var releaseYear = item.release_date.substring(0,3);
                    //         if (releaseYear == $("#tyYearIp")){
                    //             var newTr = $("<tr>");
            
                    //         newTr.append("<th>${iem.title}</th>");
                    //         newTr.append("<th>${iem.release_date}</th>");
                    //         newTr.append("<th>${iem.original_language}</th>");
            
                    //         $("#movie-result").append(newTr);
            
                    //         };
                            
                    //     });
                        
                    // });