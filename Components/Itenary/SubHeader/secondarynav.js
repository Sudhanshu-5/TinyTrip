import React from 'react'

function Magic(event)
{
    var element = document.querySelector("."+event.target.classList[0]);
   if(document.querySelector(".ht-it")!==null)
    document.querySelector(".ht-it").classList.remove("active");
   if(document.querySelector(".ht-ht")!==null)
    document.querySelector(".ht-ht").classList.remove("active");
   if(document.querySelector(".ht-inc")!==null)
    document.querySelector(".ht-inc").classList.remove("active");
   if(document.querySelector(".ht-img")!==null)
    document.querySelector(".ht-img").classList.remove("active");
   if(document.querySelector(".ht-en")!==null)
    document.querySelector(".ht-en").classList.remove("active");

    if(event.target.classList[0]==="ht-inc")
    {
        let a = document.querySelector("#inc").offsetTop;
        let c = a +document.querySelector("#inc").offsetHeight;
        window.scrollTo(0,c);
    }
    else if(event.target.classList[0]==="ht-it")
    {
        let a = document.querySelector("#itinerary").offsetTop;
        let c = a +400;
        window.scrollTo(0,c);
    }
    else if(event.target.classList[0]==="ht-ht")
    {
        let a = document.querySelector("#hotels").offsetTop;
        let c = a +document.getElementById("hotels").offsetHeight;
        window.scrollTo(0,c);
    }
    else if(event.target.classList[0]==="ht-en")
    {
        let a = document.querySelector("#en-form").offsetTop;
        let c = a-150;
        window.scrollTo(0,c);
    }
    else
    {
        let a = document.querySelector("#img").offsetTop;
        let c = a-190;
        window.scrollTo(0,c);
    }


    element.classList.add("active");
}

function secondarynav(props) {


    if(document.querySelector(".secondary_nav")!==null){
    window.onscroll = function() {myFunction()};


var navbar = document.querySelector(".secondary_nav");

var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky && window.pageYOffset>=491) {
    navbar.classList.add("sticky");

    if(document.querySelector(".sticky")!==null)
    {
        document.querySelector(".sticky").style.top=document.querySelector(".navbar").offsetHeight+"px";
        // document.querySelector(".sticky").style.height=document.querySelector(".secondary_nav").offsetHeight+"px";
    }
  } else {
    if(document.querySelector(".sticky")!==null)
        document.querySelector(".sticky").style.top="0px";
    navbar.classList.remove("sticky");
  }
}}

    var propshotel = typeof(props.hotel)===undefined?"":props.hotel;
    let hotelvisible;
    if(typeof(propshotel)!==undefined)
    {
        if(propshotel[0].trim().split("!@")[1]!=="undefined" && propshotel[1].trim().split("!@")[1]!=="undefined" && propshotel[2].trim().split("!@")[1]!=="undefined" && propshotel[3].trim().split("!@")[1]!=="undefined")
        {
            if(propshotel[0].trim().split("!@")[1]!=="" || propshotel[1].trim().split("!@")[1]!=="" || propshotel[2].trim().split("!@")[1]!=="" || propshotel[3].trim().split("!@")[1]!=="")
            {
                hotelvisible=true;
            }
            else
                hotelvisible=false;
        }
    }


    var propsinc = typeof(props.inc)==="undefined"?"":props.inc;
    let incvisible;
    if(typeof(propsinc)!=="undefined")
    {

           if(propsinc[0].trim().split("!@")[1]!=="undefined" && propsinc[1].trim().split("!@")[1]!=="undefined" && propsinc[2].trim().split("!@")[1]!=="undefined")
            {
                if(propsinc[0].trim().split("!@")[1]!=="" || propsinc[1].trim().split("!@")[1]!=="" || propsinc[2].trim().split("!@")[1]!=="")
                {
                    incvisible=true;
                }
                else
                incvisible=false;
            }
    }


        return (
            <nav className="navbar secondary_nav sticky_horizontal is_stuck" >
                    <ul id="li-ul-it">
                        {props.itenerary.length === 0?"":<li className="ht-li"><a  id="sec-nd" onClick={Magic} className="ht-it active">Itinerary</a></li>}
                        {
                            hotelvisible===false?"":
                            hotelvisible===true?<li className="ht-li"><a  id="sec-nd" className="ht-ht" onClick={Magic}>Hotels</a></li>:""
                        }
                        {
                            incvisible===false?"":
                            incvisible===true?<li className="ht-li"><a  id="sec-nd" className="ht-inc" onClick={Magic}>Inc & Exc</a></li>:""
                        }
                        {props.img.length === 0?"":<li className="ht-li"><a  id="sec-nd" className="ht-img" onClick={Magic}>Image gallery</a></li>}
                        <li className="ht-li"><a  id="sec-nd" className="ht-en" onClick={Magic}>Enquiry Form</a></li>
                    </ul>
            </nav>
        )

}

export default secondarynav;