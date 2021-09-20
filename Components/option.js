import React, { useState, useEffect } from 'react'
import Card from './option/card/card'
import Header from './option/Header/Header'
import Footer from './Footer/Footer'
import { useParams } from 'react-router-dom';
import Subheader from './Themes/SubHeader/subheader'
import axios from 'axios';





function option() {
    const { option } = useParams();

    const [state,setState] = useState([]);
    const [mydata,setMyData] = useState([]);

    useEffect(() => {
      const getThemesAndTypes = async () => {
      const resThemes = await axios.get('/allThemes');
      const resTypes = await axios.get('/allTypes');
      let allThemes = [];
      let allTypes = [];
      let finalThemes = [];
      let finalTypes = [];
      for(let i=0;i<resThemes.data.length;i++) {
        if(resThemes.data[i].data.trim() !== '') {
          allThemes.push(resThemes.data[i].data);
        }
      }
      for(let i=0;i<resTypes.data.length;i++) {
        if(resTypes.data[i].data.trim() !== '') {
          allTypes.push(resTypes.data[i].data);
        }
      }
      const uniThemesSet = new Set(allThemes);
      const uniTypesSet = new Set(allTypes);
      const onceThemes = Array.from(uniThemesSet);
      const onceTypes = Array.from(uniTypesSet);
      for(let i=0;i<onceThemes.length;i++) {
        for(let j=0;j<resThemes.data.length;j++) {
          if(onceThemes[i] === resThemes.data[j].data) {
            finalThemes.push(resThemes.data[j]);
            break;
          }
        }
      }
      for(let i=0;i<onceTypes.length;i++) {
        for(let j=0;j<resTypes.data.length;j++) {
          if(onceTypes[i] === resTypes.data[j].data) {
            finalTypes.push(resTypes.data[j]);
            break;
          }
        }
      }
      if(option === 'Themes') setState(finalThemes);
        else setState(finalTypes);
      }
      getThemesAndTypes();
    }, [option])

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
      var CardText = document.querySelector(".pac--ml");
      if(CardText!==null) {

      var data = pagination(state, alpha.page, alpha.rows);
      setMyData([]);
      setMyData(data.querySet);
      pageButtons(data.pages,pag);
      }
    }



        return (
            <div>
            <title>{option==="Destination Types"?"Destination":option}</title>
            <Header />
            <Subheader Packagename="Puri" pd={mydata.length} pn={state.length}/>
                <div className="row pac--ml" style={{ margin:"2rem 0"}}>
                <div className="pac--ul">
                    {
                        mydata.map(
                            (item,index)=><Card img={item.img===undefined|| item.img===""?"(-)":item.img} title={item.data} sub_title={item.data} price={item.price} visa={item.visa} dummy={item.dummy} key={index}/>
                        )
                    }
                </div>
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

export default option;