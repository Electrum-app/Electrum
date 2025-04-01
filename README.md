![Electrum](https://raw.githubusercontent.com/Electrum-app/Electrum/main/Electrum/static/Electrum/images/electrum_banner.png)

[![MIDAS publication](https://img.shields.io/badge/MIDAS%20publication-https%3A%2F%2Fwww.science.org%2Fdoi%2F10.1126%2Fscience.abm3452-informational)](https://www.science.org/doi/10.1126/science.abm3452)

## What does Electrum do?
Electrum is a visualization platform for exploring MIDAS protein-metabolite interaction data.

### Testing
- `python manage.py runserver`    
- In Chrome:    
- Navigate to: `http://127.0.0.1:8000/`    
- `Ctrl+F5` to clear cache    

### Deploy instructions
- Update latest MIDAS database and store at: `static/Electrum/data/MIDAS-latest.txt`
- `python electrum-utils.py buildSubstructureReference --output ..\..\data`
- `buildEntityDatabase` is a util for name mapping metabolites from MIDAS datasets 
- In `settings.py`, set `DEBUG = False` and `SECURE_SSL_REDIRECT = True`

- In virtual environment with Python installed and activated: 
- `conda create --name electron-deploy` 
- `conda activate electron-deploy` 
- `conda install python=3.8` 
- `pip install -r requirements.txt`


### Licensing
- `Electrum` is available via a GPL-3.0 License
- `D3` is provided under an ISC License
- `d3-ForceEdgeBundling` is provided under a GPL-2.0 License
- `jQuery` is provided under an MIT License
- `saveSvgAsPng` is provided under an MIT License
- `streamsaver` is provided under an MIT License



### Notes
- Copy `settings.py` to Electrum directory
- Change path to find config
- Run `/uufs/chpc.utah.edu/common/home/rutter-website/html/Electrum-django/electrum-deploy-env/bin/gunicorn Electrum-admin.wsgi:application`
