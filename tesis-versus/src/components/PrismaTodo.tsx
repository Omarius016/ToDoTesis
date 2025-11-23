import { useState } from 'react';
import { Button, Input, Checkbox, Alert } from 'neo-ram-prisma';
import type { Todo } from '../hooks/useTodos';

interface Props {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  visionMode: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

export const PrismaTodo = ({ todos, onAdd, onToggle, onDelete, visionMode }: Props) => {
  const [inputValue, setInputValue] = useState('');
  
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Variable de bloqueo
  const isAlertOpen = taskToDelete !== null;

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue(''); 
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      onDelete(taskToDelete);
      setTaskToDelete(null); 
    }
  };

  // NUEVA FUNCIÓN: Manejar el Enter
  const handleKeyDown = (e: any) => {
    // Si es Enter y NO está bloqueada la pantalla por una alerta
    if (e.key === 'Enter' && !isAlertOpen) {
      handleAdd();
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #eee', borderRadius: '10px', background: '#fff' }}>
      
      {/* SECCION DE ALERTA */}
      {isAlertOpen && (
        <div style={{ marginBottom: '20px' }}>
          <Alert
            variant="warning"
            title="¿Eliminar tarea?"
            colorVision={visionMode}
          >
            <div style={{ marginTop: '10px' }}>
              <p style={{ margin: '0 0 10px 0' }}>Esta acción no se puede deshacer.</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setTaskToDelete(null)}
                  colorVision={visionMode}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={confirmDelete}
                  colorVision={visionMode}
                  style={{ minWidth: '80px' }}
                >
                  Sí, Borrar
                </Button>
              </div>
            </div>
          </Alert>
        </div>
      )}

      <h3 style={{ marginTop: 0, marginBottom: '20px' }}>✨ Versión Prisma (Accesible)</h3>
      
      {/* FORMULARIO DE AGREGAR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <Input
            placeholder="Nueva tarea accesible..."
            value={inputValue}
            onChange={(e: any) => setInputValue(e.target ? e.target.value : e)} 
            // CAMBIO AQUÍ: Agregamos el detector de teclas
            onKeyDown={handleKeyDown}
            colorVision={visionMode}
            variant="primary"
            disabled={isAlertOpen}
          />
        </div>
        <Button 
          variant="primary" 
          onClick={handleAdd}
          colorVision={visionMode}
          disabled={!inputValue.trim() || isAlertOpen}
        >
          Agregar
        </Button>
      </div>

      {/* LISTA DE TAREAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {todos.map((todo) => (
          <div 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '1px', 
              borderBottom: '1px solid #eee',
              backgroundColor: '#fdfdfd'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Checkbox 
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                colorVision={visionMode}
                variant="success"
                label="" 
              />
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : 'inherit'
              }}>
                {todo.text}
              </span>
            </div>

            <Button 
              variant="danger" 
              onClick={() => setTaskToDelete(todo.id)}
              colorVision={visionMode}
              disabled={isAlertOpen}
            >
              Eliminar
            </Button>
          </div>
        ))}
        
        {todos.length === 0 && <p style={{color: '#888', textAlign: 'center', margin: '20px 0'}}>No hay tareas pendientes.</p>}
      </div>
    </div>
  );
};