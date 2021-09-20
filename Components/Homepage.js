import React,{ useState,useEffect }  from 'react';
import Header from './Homepage/Header/Header';
import Footer from './Footer/Footer';
import Part1 from './Homepage/package/part1';
import Part2 from './Homepage/package/part2';
import Destination from './Homepage/destination/destination';
import Theme from './Homepage/themes/theme';
import axios from 'axios';

function Homepage() {
  const [state,setState] = useState({});

  useEffect(() => {
    const getPopular = async () => {
        const resDes = await axios.get('/popular');
        setState(resDes.data);
      }
      getPopular();
  }, [])

  return (
    <div>
    <title>Homepage</title>
      <Header />
      <br /><br /><br />
      <div style={{textAlign: "center"}}>
        {state.popularTypes===undefined?"":state.popularTypes.length===0?"":<section id="Best Places">
          <Part1 heading="Best Places"/>
          <Part2 data={state.popularTypes}/>
          <br />
        </section>}
        {state.popularDestinations===undefined?"":state.popularDestinations.length===0?"":<section id="Popular Destination"  style={{marginTop:"1rem"}}>
          <Part1 heading="Popular Destinations"/>
          <br />
          <Destination data={state.popularDestinations}/>
          <br /><br />
        </section>}
        {state.popularThemes===undefined?"":state.popularThemes.length===0?"":<section id="theme">
          <Part1 heading="Popular Themes"/>
          <br />
          <Theme data={state.popularThemes}/>
        </section>}
      </div>
      <br /><br /><br />
      <Footer />
    </div>
  );
};

export default Homepage;