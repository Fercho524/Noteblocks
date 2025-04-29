import React, { useState, useEffect } from 'react';

import { Sidebar } from 'primereact/sidebar';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';


export default function RepoManager({ visible, setVisible,setTabs }) {
  const [repos, setRepos] = useState([])
  const [selectedRepo, setSelectedRepo] = useState(null)


  // Carga inicial de configuración
  useEffect(() => {
    window.api.getConfig().then(config => {
      const list = config.state.repositories || [];
      setRepos(list);
      setSelectedRepo(config.state.selectedRepo || null);
    });
  }, []);


  // Seleccionar repositorio
  const handleSelect = async (repo) => {
    setSelectedRepo(repo);
    console.log(repos)
    await window.api.changeRepo(repo);
    window.dispatchEvent(new CustomEvent('directory-changed'));
    setTabs([])
  };


  // Eliminar repositorio
  const handleRemove = async (repo) => {
    const filtered = repos.filter(r => r !== repo);
    setRepos(filtered);

    // Actualizamos configuración sin el repo eliminado
    await window.api.updateConfig({
      state: {
        ... (await window.api.getConfig()).state,
        repositories: filtered,
        // Si borramos el seleccionado, reseteamos selección
        selectedRepo: selectedRepo === repo ? filtered[0] || '' : selectedRepo,
        currentDir: selectedRepo === repo ? filtered[0] || '' : (await window.api.getConfig()).state.currentDir
      }
    });
  };


  // Agregar nuevo repositorio
  const handleAdd = async () => {
    const newDir = await window.api.openDirectoryDialog();
    if (newDir) {
      const updated = [...repos, newDir];
      setRepos(updated);
      setSelectedRepo(newDir);
      await window.api.updateConfig({
        state: {
          ... (await window.api.getConfig()).state,
          repositories: updated,
          selectedRepo: newDir,
          currentDir: newDir
        }
      });
      window.dispatchEvent(new CustomEvent('directory-changed'));
    }
  };

  // Plantilla de cada ítem en la lista
  const repoTemplate = (repo) => (
    <div className="flex align-items-center justify-content-between">
      <span>{repo}</span>
      <i
        className="pi pi-times"
        style={{ cursor: 'pointer', color: '#c00' }}
        onClick={(e) => {
          e.stopPropagation();
          handleRemove(repo);
        }}
      />
    </div>
  );

  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)} position="right" className="p-sidebar-md">
      <h3 className="mb-3">Repositorios</h3>
      <ListBox
        value={selectedRepo}
        options={repos}
        onChange={(e) => handleSelect(e.value)}
        itemTemplate={repoTemplate}
        listStyle={{ maxHeight: '300px' }}
      />

      <Divider className="my-4" />

      <div className="flex justify-content-center">
        <Button
          icon="pi pi-plus"
          label="Agregar repositorio"
          className="p-button-sm"
          onClick={handleAdd}
        />
      </div>
    </Sidebar>
  );
}
