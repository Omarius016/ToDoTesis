import { useState } from 'react';
import { useTodos } from './hooks/useTodos'; // Importamos la lógica
import { PrismaTodo } from './components/PrismaTodo'; // Importamos la UI de Tesis

type VisionMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';

function App() {
  const [visionMode, setVisionMode] = useState<VisionMode>('normal');
  
  // Iniciamos la lógica del To-Do
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    // Quitamos el margin y padding inline porque ya lo maneja el index.css
    <div className="app-container"> 
      <h1 style={{ marginBottom: '30px', fontSize: '2.5rem', color: '#333' }}>
        Versus: Validación de Tesis
      </h1>

      {/* CONTROLADOR DE VISIÓN */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        background: '#f8f9fa', /* Un gris muy clarito para diferenciar el panel */
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        textAlign: 'left' // El contenido del panel se ve mejor alineado a la izquierda
      }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
          Simulación de Vista:
        </label>
        <select 
          value={visionMode} 
          onChange={(e) => setVisionMode(e.target.value as VisionMode)}
          style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        >
          <option value="normal">👁 Visión Normal</option>
          <option value="protanopia">🔴 Protanopia (Sin Rojo)</option>
          <option value="deuteranopia">🟢 Deuteranopia (Sin Verde)</option>
          <option value="tritanopia">🔵 Tritanopia (Sin Azul)</option>
        </select>
      </div>

      {/* Tu componente Prisma */}
      <div style={{ textAlign: 'left' }}> {/* Alineamos el ToDo a la izquierda para que se vea natural */}
        <PrismaTodo 
          todos={todos}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onDelete={removeTodo}
          visionMode={visionMode}
        />
      </div>

    </div>
  );
}

export default App;