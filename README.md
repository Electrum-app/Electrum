![Metaboverse](https://raw.githubusercontent.com/Electrum-app/Electrum/main/Electrum/static/Electrum/images/electrum_banner.png)

[![Electrum preprint](https://img.shields.io/badge/Electrum%20preprint-https%3A%2F%2Fwww.overleaf.com%2Fread%2Fvkwhsfxfgqnd-%230273b3)](https://www.overleaf.com/read/vkwhsfxfgqnd)    
[![MIDAS bioRxiv preprint](https://img.shields.io/badge/MIDAS%20bioRxiv%20preprint-10.1101%2F2021.08.28.458030-%23ac2331)](https://www.biorxiv.org/content/10.1101/2021.08.28.458030)

## What does Electrum do?
Electrum is a visualization platform for exploring MIDAS protein-metabolite interaction data.

### Testing
- `python manage.py runserver`    
- In Chrome:    
- Navigate to: `http://127.0.0.1:8000/`    
- `Ctrl+F5` to clear cache    

### Deploy instructions
- `python electrum-utils.py buildSubstructureReference --output ..\..\data`
- `buildEntityDatabase` is a util for name mapping metabolites from MIDAS datasets 

### Licensing
- `Electrum` is available via a GPL-3.0 License
- `D3` is provided under an ISC License
- `d3-ForceEdgeBundling` is provided under a GPL-2.0 License
- `jQuery` is provided under an MIT License
- `saveSvgAsPng` is provided under an MIT License
- `streamsaver` is provided under an MIT License
