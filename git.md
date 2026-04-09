# Git - Comandos para Devocionales

## Estado del repositorio
```bash
git status
```

## Ver cambios
```bash
git diff
git diff devocionales.json
```

## Agregar cambios
```bash
git add .
git add devocionales.json
```

## Hacer commit (solo local)
```bash
git commit -m "Descripción del cambio"
```

## Ver historial
```bash
git log
```

## Push a GitHub
```bash
git push
```

## Pull de GitHub
```bash
git pull
```

---

## Flujo de trabajo

1. **Exportar** JSON desde Admin → guardar como `devocionales.json`
2. **Reemplazar** el archivo en el proyecto
3. **Commit local**:
   ```bash
   git add devocionales.json
   git commit -m "Nuevo devocional agregado"
   ```
4. **Push** (cuando quieras):
   ```bash
   git push
   ```

---

## Notas
- El branch actual es `main`
- Hay 1 commit pendiente de hacer push