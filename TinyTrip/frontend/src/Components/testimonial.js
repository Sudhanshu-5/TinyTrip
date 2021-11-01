import React, { useState, useEffect } from 'react'
import Card from './testimonials/horizontal/card';
import Header from './testimonials/Header/Header'
import Part1 from './Homepage/package/part1';
import Footer from './Footer/Footer';
import axios from 'axios';

function testimonial() {
    const [state,setState] = useState([]);
    const [mydata,setMyData] = useState([]);

    useEffect(() => {
        const getTestimonials = async () => {
          const res = await axios.get('/editTestimonials');
          setState(res.data);
        }

        getTestimonials();
      }, [])


      useEffect(() => {
        buildPage();
      },[state])

      var alpha;

      if(window.screen.width<320)
      {
        alpha = {
          'page': 1,
          'rows': 3,
          'window': 2,
        }
      }
      else if(window.screen.width>320 && window.screen.width<400){
        alpha = {
          'page': 1,
          'rows': 4,
          'window': 3,
        }
      }
      else if(window.screen.width>=400 && window.screen.width<600)
      {
        alpha = {
          'page': 1,
          'rows': 4,
          'window': 4,
        }
      }
      else if(window.screen.width>=600 && window.screen.width<900)
      {
        alpha = {
          'page': 1,
          'rows': 6,
          'window': 5,
        }
      }
      else if(window.screen.width>=900 && window.screen.width<1200)
      {
        alpha = {
          'page': 1,
          'rows': 8,
          'window': 6
        }
      }
      else{
        alpha = {
          'page': 1,
          'rows': 10,
          'window': 7,
        }
      }


      function pagination(querySet, page, rows) {

        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows
        var trimmedData = querySet.slice(trimStart, trimEnd)
        var pages = Math.ceil(querySet.length / rows);

        return {
            'querySet': trimmedData,
            'pages': pages,
        }
      }


      function pageButtons(pages,pag) {

        var wrapper = document.querySelector('.pagi')
        if(wrapper!==null){
          wrapper.innerHTML = ``
  
        var maxLeft = (alpha.page - Math.floor(alpha.window / 2))
        var maxRight = (alpha.page + Math.floor(alpha.window / 2))
  
        if (maxLeft < 1) {
            maxLeft = 1
            maxRight = alpha.window
        }
  
        if (maxRight > pages) {
            maxLeft = pages - (alpha.window - 1)
  
            if (maxLeft < 1){
              maxLeft = 1
            }
            maxRight = pages
        }
  
  
  
  
        if(pages>1){
  
        for (var page = maxLeft; page <= maxRight; page++) {
          var raw;
          if(page===pag)
            raw = `<li class="pageNumber active"><a title=${page} id=${"pag"+page} class="page">${page}</a></li>`;
          else
            raw = `<li class="pageNumber"><a title=${page} id=${"pag"+page} class="page">${page}</a></li>`;
          wrapper.innerHTML+=raw
        }
  
        if (alpha.page !== 1) {
            wrapper.innerHTML = `<li><a title=${1} class="page prev">${window.screen.width<500?"First":"< First"}</a></li>` + wrapper.innerHTML
        }
  
        if (alpha.page !== pages) {
            wrapper.innerHTML += `<li><a title=${pages} class="page next">${window.screen.width<500?"Last":"Last >"}</a></li>`
        }
        document.querySelector(".pagi-hd").style.display="flex";
      }
      else
      {
        document.querySelector(".pagi-hd").style.display="none";
      }
  
          document.querySelectorAll(".page").forEach(
            (item)=>{
              item.addEventListener("click",(e)=>{
                alpha.page = Number(e.target.getAttribute("title"))
                buildPage(alpha.page)
              })
            }
          )
        }
      }
  
  
  
      function buildPage(pag=1) {
  
        var data = pagination(state, alpha.page, alpha.rows);
        setMyData([]);
        setMyData(data.querySet);
        pageButtons(data.pages,pag);
      }


        return (
            <div id="testimonials">
                <Header />
                <title>Testimonials</title>
                <div style={{marginTop:"3rem"}}>
                    <Part1 heading="What people say about us"/>
                    <br /><br /><br /><br />
                    {
                        mydata.map(
                            (item,index)=><Card img={item.img===""?"(-)":"/"+item.img} data={item.msg} name={item.name} position={item.info} index={index} key={index}></Card>
                        )
                    }
                </div>
                <div className="container ">
                  <div id="pagination-wrapper"></div>
                </div>
<div className="pagi-hd">
              <ul className="pagi"></ul>
            </div>
                <Footer />
            </div>
        )
}

export default testimonial;