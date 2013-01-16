

"use strict";



(function($) {

    var methods = {

        init : function(options) {

            return this.each(function() {

                var $this = $(this);

                var data = $this.data('ipRepositoryBuy');
                if (!data) {

                    $this.data('ipRepositoryBuy', {
                        accountId : '370291'
                    });



                    $this.find(".ipaSearchForm").bind('submit', $.proxy(methods._search, this));








                    //show a loading message when the search button is clicked
                    //$this.on("submit", ".ipaSearchForm", )




                    //when a user clicks on a thumbnail
                    //$("#results").on("click", "a", );




                }
            });
        },

        _search :   function (e){
            var $this = $(this);
            var page = 1;
            var accountId = $this.data('ipRepositoryBuy').accountId;


            var $content = $this.find(".ipaContent");
            $content.hide();



            $this.find('.ipaLoading').show();

            var val = val || {};

            var search_term = $(".search-query").val();


            var val = val || {};
            val.page = val.page || 1;
            var results = $("#results");

            //setup the paramaters for the JSONP request
            var params = {};
            if(val.category != "") params.category = val.category;
            params.q = val.q;
            params.page = val.page;

            $.getJSON("http://api.bigstockphoto.com/2/"+accountId+"/search/?callback=?", params, $.proxy(methods._searchResponse, this));


            e.preventDefault();
        },

        _searchResponse : function(data){
            var $this = $(this);

            $this.find('.ipaLoading').show();
            var $results = $this.find('.ipaResults');
            if(data && data.data && data.data.images) {
                $.each(data.data.images, function(i, v){
                    //console.log(v);
                    var $newItem = $this.find('.ipaSearchResultItemTemplate').clone().detach();
                    $newItem.show();
                    $newItem.find('img').attr("src",v.small_thumb.url);
                    $newItem.find("a").data('id', v.id);
                    $results.append($newItem);
                });
            } else {
                //results.append("<li id=\"oops\"><div class=\"alert alert-error\">OOOPS! We found no results. Please try another search.</div></li>");
            }

            //$this.find(".ipaContent").show();
        },

        _clickThumbnail : function(e){
            $.getJSON("http://api.bigstockphoto.com/2/"+account_id+"/image/"+$(this).attr("href").substring(1)+"/?callback=?", function(data){
                if(data && data.data && data.data.image) {
                    console.log(data);
                    $(".detail-template img").attr('src', data.data.image);
                    $(".detail-template").dialog();
                }
            });
        }







    };




    $.fn.ipRepositoryBuy = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.ipRepositoryRecent');
        }

    };

})(jQuery);











