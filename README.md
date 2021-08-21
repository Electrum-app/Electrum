# Electrum
Visualization platform for exploring MIDAS data

Testing:
`python manage.py runserver`

In Chrome:
`http://127.0.0.1:8000/`
`Ctrl+F5` to clear cache


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
