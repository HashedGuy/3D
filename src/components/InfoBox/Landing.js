import { Html } from '@react-three/drei'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { clickedCBState, showActions } from '../globalState'
import MarsSound from  "../../assets/mars-sound.wav"

export function InfoBox() {
    const [activeObject, setObject] = useRecoilState(clickedCBState)
    const [showAction, setAction] = useRecoilState(showActions)
    const [activeButton, setButton] = useState(false)
    return(
        <Html wrapperClass="annotation" >
        <div className='infoBox'>
          <div className='infoBorders'>
          <h1>{
          activeObject === 'earth' ? 'Earth' 
          : activeObject === 'moon' ? 'Moon'
          : activeObject === 'mars' ? 'Mars'
          : activeObject === 'LEO' ? 'Low Earth Orbit'
          : 'Multiplanetary map'            }
          </h1>
          
          <h5>{
            activeObject === 'earth' ? 'Our current home' 
            : activeObject === 'moon' ? "Gateway to Mars! We've already been here but we're coming again soon."
            : activeObject === 'mars' ? "The planet we're colonizing next" 
            : activeObject === 'LEO' ? "This is the place where the most of the crew missions happening."
            : 'You can either double-click the cellestial body or press one of the below buttons to discover your next destination'}
          </h5>

          {activeObject === '' ? 
          <>
            <a className='home-btn' onClick={()=>setObject('earth')}>Earth</a>
            <a className='home-btn' onClick={()=>setObject('moon')}>Moon</a>
            <a className='home-btn' onClick={()=>setObject('mars')}>Mars</a>
          </>
          : ''}
          {activeObject === 'mars' && !activeButton ? <p>Let's to listen to Martian wind captured by <em>Perseverance Rover’s SuperCam</em>.</p> 
          : activeObject === 'moon' && !activeButton ? <p>Let's listen to the famous <em>We choose to go to the Moon</em> speech by John F. Kennedy and the launch of Appolo 11.</p>
          : activeObject === 'earth' && !activeButton ? <p>There're 7 billions of us here, and only few of us has left the ground and hanging out somewhere in <em>Low Earth Orbit (LEO)</em></p>
          : activeObject === 'LEO' && !activeButton ? <p>Let's listen to Chorus Radio Waves within Earth's Atmosphere</p>
          : ''          }
          {(activeObject === '') || (activeObject === 'earth') || (activeButton) ? '' : 
            <>
            <audio 
              controls 
              src={
                activeObject === 'mars' ? MarsSound : 
                activeObject === 'moon' ? "https://www.nasa.gov/mp3/590325main_ringtone_kennedy_WeChoose.mp3" :
                activeObject === 'LEO' ? 'https://www.nasa.gov/mp3/693857main_emfisis_chorus_1.mp3'  : ''}>
            </audio>
            <p className='credits'><em>Credit: NASA/JPL-Caltech/SwRI/Univ of Iowa</em></p>
            </>
          }
          {activeObject === 'earth' ? <a className='home-btn' onClick={()=>setObject('LEO')}>Discover Low Earth Orbit</a>
          : ''

          }

          {activeObject === 'LEO' ? 
          <div className='viewDiv'>
            <a className='home-btn inActive'>ISS view to the Earth</a>
            <a className='home-btn inActive'>View from Dragon capsule</a>
            <a className='home-btn' onClick={()=>setAction('launchpad')}>Show launch sites</a>
            <a className='home-btn' onClick={()=>setAction('')}>Hide launch sites</a>
          </div> : ''}
          </div>
          <div className='addInfo'>
            {activeObject === 'earth' ? <a className='home-btn'>Population: 7,762 billion<br/><em className='credits'>Credits: World Bank, 2020</em></a>
            : activeObject === 'moon' ? <a className={showAction===''?"home-btn" : "hidden-btn"} onClick={()=> setButton(!activeButton)}>Population: 12<br/><em className='credits'>Credit: NASA</em></a>
            : activeObject === 'mars' ? <a className='home-btn'>Population: 0</a>
            : ''}

            {(activeObject === 'moon') && (activeButton) ? 
            <div className='populationInfo'>
              {showAction === '' ? 
              <p>As part of the Apollo program by NASA, 24 astronauts have flown to the Moon during nine missions between December 1968 and December 1972. During six successful two-man landing missions, 12 men walked on the lunar surface.</p>
              :''}
              <ul>
                <li><a className={showAction==='apollo11'? "home-btn btn-selected": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo11')}>Apollo 11</a></li>
                <li><a className={showAction==='apollo12'? "home-btn btn-selected": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo12')}>Apollo 12</a></li>
                <li><a className={showAction==='apollo14'? "home-btn btn-selected": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo14')}>Apollo 14</a></li>
                <li><a className={showAction==='apollo15'? "home-btn btn-selected": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo15')}>Apollo 15</a></li>
                <li><a className={showAction==='apollo16'? "home-btn btn-selected": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo16')}>Apollo 16</a></li>
                <li><a className={showAction==='apollo17'? "home-btn btn-selected": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('apollo17')}>Apollo 17</a></li>
                <li><a className={showAction==='artemis'? "home-btn btn-selected": showAction===''?"home-btn":'hidden-btn'} onClick={()=>setAction('artemis')}>Artemis III</a></li>
              </ul>

              {showAction === 'apollo11' ? 
                <>
                <p>Apollo 11 (July 16–24, 1969) was the American spaceflight that first landed humans on the Moon. </p> 
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg" className='infoPic'/>
                <p>Commander Neil Armstrong and lunar module pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969, at 20:17 UTC, and Armstrong became the first person to step onto the Moon's surface six hours and 39 minutes later, on July 21 at 02:56 UTC. Aldrin joined him 19 minutes later, and they spent about two and a quarter hours together exploring the site they had named Tranquility Base upon landing.</p>
                
                </>
              : showAction === 'apollo12' ? <p></p>
              : showAction === 'apollo14' ? <p></p>
              : showAction === 'apollo15' ? <p></p>
              : showAction === 'apollo16' ? <p></p>
              : showAction === 'apollo17' ? <p></p>
              : ''}
            </div> : ''}
            <a className={showAction===''?"hidden-btn":'home-btn'} onClick={()=>setAction('')}>All missions</a>
            {activeObject === '' ? '' : 
              <a 
                className="home-btn" 
                onClick={()=>{
                  setAction('')
                  setObject('')}}
                  >Home</a>}
          </div>
        </div>
      </Html>
    )}