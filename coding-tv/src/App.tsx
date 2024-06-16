import './App.css'
import RemoteControl from './components/RemoteControl'

function App() {
  

  return (
    <>
    <RemoteControl/>
    <h3>Aluno: Miguel Amaral</h3>
    <h2>Instruções:</h2>
    <h3>Ligar tv</h3>
    <h3>Aumentar/diminuir volume (setas vol e setas Cima+baixo no display )</h3>
    <h3>Próximo/anterior canal (setas channel e setas Esquerda+direita no display )</h3>
    <h2>Canais:</h2>
    <ul>
    <li>1 - Globo</li>
    <li>2 - Record</li>
    <li>3 - Band</li>
  </ul>
    </>
  )
}

export default App
