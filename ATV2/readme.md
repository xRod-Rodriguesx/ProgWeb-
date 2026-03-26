🛠 Como rodar o projeto:
### 1. Clonar projeto:
```bash 
git clone https://github.com/xRod-Rodriguesx/ProgWeb-/tree/main/ATV2/Todolist 
```

### 2. Entrar na pasta do projeto
``` bash
cd ATV2/Todolist
```

### 3. Configurar o Ambiente Virtual (Venv)
para Windows use:
``` bash
python -m venv venv
.\venv\Scripts\activate 
```

para Linux/Mac use:
```bash
python3 -m venv venv
source venv/bin/activate 
```

### 4. Instalar Dependências
```bash
pip install django djangorestframework django-cors-headers
```

### 5. update no pip, normalmente aparece o codigo acima em verde, caso não:
```bash
python -m pip install --upgrade pip  
```

### 6. Iniciar o Servidor
```bash
python manage.py runserver
```