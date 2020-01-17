import React, { Component } from "react";
import MovieDataLoader from './loader/MovieDataLoader';
import "./Menu.css"

class Menu2 extends Component {
  static arrBoxofficeData = null;

  constructor(props)
  {
    super(props);
    this.ldrMovieData = new MovieDataLoader();
  }

  drawBoxOfficeList(arrBoxOfficeData)
  {
    let nFirst = 0;
    let divTest = document.getElementById("test");
    
    if(arrBoxOfficeData != null)
    {
      for(nFirst = 0; nFirst < arrBoxOfficeData.length; nFirst++)
      {
        let divMovie = document.createElement("div");
        let objBOData = arrBoxOfficeData[nFirst];

        // image
        let divImage = document.createElement("div");
        let imgPoster = new Image();
        imgPoster.className = "movie_image";
        imgPoster.src = objBOData.poster_url;

        let divInfo = document.createElement("div");
        // movie title
        let divTitle = document.createElement("div");
        divTitle.className = "title_div";
        divTitle.innerHTML = '<' + objBOData.movie_title + '>';
        // movie actor
        let divActor = document.createElement("div");
        divActor.className = "actor_div";
        divActor.innerHTML = objBOData.open_year.replace(/-/gi, '.');
        // review
        let divReview1 = document.createElement("div");
        divReview1.className = "review_div";
        divReview1.innerHTML = '"리뷰1 한국인의 어쩌고 저쩌고"';
        let divReview2 = document.createElement("div");
        divReview2.className = "review_div";
        divReview2.innerHTML = '"리뷰2 한반도 어쩌고 저쩌고"';

        divImage.appendChild(imgPoster);
        divMovie.appendChild(divImage);

        divInfo.appendChild(divTitle);
        divInfo.appendChild(divActor);
        divInfo.appendChild(divReview1);
        divInfo.appendChild(divReview2);
        divMovie.appendChild(divInfo);

        divMovie.id = "rdiv";
        divImage.id = "Ldiv";
        divInfo.id = "Rdiv";
        
        divTest.appendChild(divMovie);
      }

      /*var mm5 = window.matchMedia('(max-width: 500px)');
      var mm9 = window.matchMedia('(min-width: 900px)');
      var Rdiv = document.getElementById("Rdiv");
      mm5.addListener(function(e){
        if(e.matches) {
          console.log("500");
          for (var i=0; i<arrBoxOfficeData.length; i++) {
            let title = document.getElementById("title_div_" + i);
            title.className = "title_div500";
            console.log(document.defaultView.getComputedStyle(title, null).getPropertyValue("font-size"));
          }
        }
      });
      mm9.addListener(function(e) {
        if(e.matches) {
          console.log("900");
          for (var i=0; i<arrBoxOfficeData.length; i++) {
            let title = document.getElementById("title_div_" + i);
            title.className = "title_div900";
            console.log(document.defaultView.getComputedStyle(title, null).getPropertyValue("font-size"));
          }
          
          for (var i=0; i<Rdiv.length; i++) {
            Rdiv[i].style.marginTop = "4px";
          }
        }
      });

      /*var mm5 = window.matchMedia('(max-width: 500px)');
      var mm9 = window.matchMedia('(min-width: 900px)');
      var title = document.getElementsByClassName("title_div");
      var Rdiv = document.getElementById("Rdiv");
      mm5.addListener(function(e){
        if(e.matches) {
          for (var i=0; i<title.length; i++) {
            title[i].style.fontSize = "20px";
          }
        }
      });
      mm9.addListener(function(e) {
        if(e.matches) {
          for (var i=0; i<Rdiv.length; i++) {
            Rdiv[i].style.marginTop = "4px";
          }
        }
      });*/
      
      window.onresize = function()
      {
        let title = document.getElementById("title_div_0");
        console.log(document.defaultView.getComputedStyle(title, null).getPropertyValue("font-size"));
      }

    }
  }

  getBoxofficeList(bDaily)
  {
    let objThis = this;

    this.ldrMovieData.search_condition.item_per_page = 5;
    this.ldrMovieData.search_condition.is_daily = bDaily;
    this.ldrMovieData.search_condition.nation_section = this.ldrMovieData.ALL;
    //this.ldrMovieData.search_condition.product_year = "2017";
    //this.ldrMovieData.search_condition.movie_title = "백두산";

    this.ldrMovieData.getBoxOfficeListWithPoster().then(
        function(arrBOData)
        {
          if(arrBOData != null)
          {
            console.log("리스트 목록 길이 : " + arrBOData.length);
            objThis.drawBoxOfficeList(arrBOData);
          }
        }
    ).catch(function(e)
        {
          console.log("Error Massage : " + e);
        }
    );
  }

  componentDidMount() {
    this.getBoxofficeList(true);
  }

  render() {
    return (
      <div id="test">
      </div>
    );
  }
}

export default Menu2;
