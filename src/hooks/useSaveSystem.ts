import { useState } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';

export function useSaveSystem() {
  const [saved, setSaved] = useState(false);
  const saveSystem = useBuilderStore((s) => s.saveSystem);

  function handleSave() {
    saveSystem();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return { saved, handleSave };
}
