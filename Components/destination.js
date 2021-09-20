import React, { useState, useEffect } from 'react'
import Card from './Type/Card/card'
import Header from './Type/Header/Header'
import Subheader from './Type/SubHeader/subheader'
import Footer from './Footer/Footer'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function theme() {
    const { typeName } = useParams();

    const [state, setState] = useState([]);
    const [mydata,setMyData] = useState([]);


    useEffect(() => {
        const getDestinations = async () => {
            const resDes = await axios.get('/allDestinations');
            let myDes = [];
            for(let i=0;i<resDes.data.length;i++) {
                if(resDes.data[i].type === typeName) {
                    myDes.push(resDes.data[i]);
                }
            }
            setState(myDes);
          }
          getDestinations();
    }, [typeName])


    useEffect(() => {
        buildPage();
      },[state])

      var alpha;
  
  
      if(window.screen.width<320)
      {
        alpha = {
          'page': 1,
          'rows': 4,
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
          'rows': 8,
          'window': 5,
        }
      }
      else if(window.screen.width>=900 && window.screen.width<1200)
      {
        alpha = {
          'page': 1,
          'rows': 9,
          'window': 6
        }
      }
      else{
        alpha = {
          'page': 1,
          'rows': 12,
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
        var CardText = document.querySelector(".pac--dl");
        if(CardText!==null) {
  
        var data = pagination(state, alpha.page, alpha.rows);
        setMyData([]);
        setMyData(data.querySet);
        pageButtons(data.pages,pag);
        }
      }




        return (
                <div>
                <title>{typeName}</title>
                <Header />
                <Subheader Packagename="Puri" pd={mydata.length} pn={state.length}/>
                <div className="container" style={{paddingTop:"20px",paddingBottom:"20px",transform:"none"}}>
                    <div className="row" style={{transform:"none"}}>
                        <div className="col-lg-12 nopadding" id="list_sidebar">
                        <div className="row pac--dl">
                        {
                            mydata.map(
                                (item,index) => (
                                                <div className="thm-col-md-3" key={index}>
                                                    <Card img={item.img===undefined || item.img=== ''?"(-)":item.img} title={item.name} subtitle={typeName} key={index}/>
                                                </div>
                                            )
                                        )
                        }
                        </div>
                        </div>
                    </div>
                </div>
                <div className="pagi-hd">
              <ul className="pagi"></ul>
            </div>
                <Footer />
            </div>
        )
}

export default theme;