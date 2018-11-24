import React from 'react'

const Statistiikka = ({ propsstore }) => {
  
    const feedbacks = () => {
      const state = propsstore.getState()
      return (state.good + state.ok + state.bad )
    } 

    const palautteita = feedbacks()

    const mean = () => {
        const state = propsstore.getState()
        const kaikki = feedbacks()
        if (kaikki === 0) {
          return 0.0
        }
        const ka = (state.good + state.bad*(-1))/kaikki
        return ka.toFixed(1)
    }

    if (palautteita === 0) {
      return (
        <div>
          <h2>stataistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
        </div>
      )
    }
  
    return (
      <div>
        <h2>statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä</td>
              <td>{propsstore.getState().good}</td>
            </tr>
            <tr>
              <td>neutraali</td>
              <td>{propsstore.getState().ok}</td>
            </tr>
            <tr>
              <td>huono</td>
              <td>{propsstore.getState().bad}</td>
            </tr>
            <tr>
              <td>keskiarvo</td>
              <td>{mean()}</td>
            </tr>
            <tr>
              <td>positiivisia</td>
              <td>{(propsstore.getState().good/feedbacks())*100} %</td>
            </tr>
          </tbody>
        </table>
  
        <button onClick={e => propsstore.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
      </div >
    )
  }

  export default Statistiikka