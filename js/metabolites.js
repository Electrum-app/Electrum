/* Electrum
Dynamic exploration of MIDAS protein-metabolite interaction data
https://github.com/j-berg/Electrum/
alias: electrum

Copyright (C) 2020-2021 Jordan A. Berg
Email: jordan<dot>berg<at>biochem<dot>utah<dot>edu

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with
this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// Static ID and name reference for metabolites
const metabolites_reference = {
  "13diaminopropane": {
    "chebi_id": "15725",
    "hmdb_id": "HMDB0000002",
    "kegg_id": "C00986",
    "name": "1,3-Diaminopropane",
    "smiles": "NCCCN"
  },
  "1methylhistamine": {
    "chebi_id": "29009",
    "hmdb_id": "HMDB0000898",
    "kegg_id": "C05127",
    "name": "1-Methylhistamine",
    "smiles": "CN1C=NC(CCN)=C1"
  },
  "1methylhistidine": {
    "chebi_id": "50599",
    "hmdb_id": "HMDB0000001",
    "kegg_id": "C01152",
    "name": "1-Methylhistidine",
    "smiles": "CN1C=NC(C[C@H](N)C(O)=O)=C1"
  },
  "1methyllhistidine": {
    "chebi_id": "50599",
    "hmdb_id": "HMDB0000001",
    "kegg_id": "C01152",
    "name": "1-Methylhistidine",
    "smiles": "CN1C=NC(C[C@H](N)C(O)=O)=C1"
  },
  "1methylnicotinamide": {
    "chebi_id": "16797",
    "hmdb_id": "HMDB0000699",
    "kegg_id": "C02918",
    "name": "1-Methylnicotinamide",
    "smiles": "C[N+]1=CC=CC(=C1)C(N)=O"
  },
  "23dihydroxypropanoicacid": {
    "chebi_id": "32398",
    "hmdb_id": "HMDB0000139",
    "kegg_id": "C00258",
    "name": "Glyceric acid",
    "smiles": "OC[C@@H](O)C(O)=O"
  },
  "23dihydroxypropylhexopyranoside": {
    "chebi_id": "15754",
    "hmdb_id": "HMDB0006790",
    "kegg_id": "C05401",
    "name": "Galactosylglycerol",
    "smiles": "C([C@@H]1[C@@H]([C@@H]([C@H]([C@@H](O1)OCC(CO)O)O)O)O)O"
  },
  "23diphosphodglycericacid": {
    "chebi_id": "17720",
    "hmdb_id": "HMDB0001294",
    "kegg_id": "C01159",
    "name": "2,3-Diphosphoglyceric acid",
    "smiles": "OC(=O)[C@@H](COP(O)(O)=O)OP(O)(O)=O"
  },
  "23diphosphoglycericacid": {
    "chebi_id": "17720",
    "hmdb_id": "HMDB0001294",
    "kegg_id": "C01159",
    "name": "2,3-Diphosphoglyceric acid",
    "smiles": "OC(=O)[C@@H](COP(O)(O)=O)OP(O)(O)=O"
  },
  "23pyridinedicarboxylicacid": {
    "chebi_id": "16675",
    "hmdb_id": "HMDB0000232",
    "kegg_id": "C03722",
    "name": "Quinolinic acid",
    "smiles": "OC(=O)C1=CC=CN=C1C(O)=O"
  },
  "25dihydroxybenzaldehyde": {
    "chebi_id": "28508",
    "hmdb_id": "HMDB0004062",
    "kegg_id": "C05585",
    "name": "Gentisate aldehyde",
    "smiles": "OC1=CC(C=O)=C(O)C=C1"
  },
  "25dihydroxybenzoicacid": {
    "chebi_id": "17189",
    "hmdb_id": "HMDB0000152",
    "kegg_id": "C00628",
    "name": "Gentisic acid",
    "smiles": "OC(=O)C1=C(O)C=CC(O)=C1"
  },
  "2amino3methoxybenzoicacid": {
    "chebi_id": "",
    "hmdb_id": "HMDB60374",
    "kegg_id": "C05831",
    "name": "3-Methoxyanthranilate",
    "smiles": "COC1=CC=CC(C(O)=O)=C1N"
  },
  "2amino3phosphonopropionicacid": {
    "chebi_id": "28388",
    "hmdb_id": "HMDB0000370",
    "kegg_id": "C05672",
    "name": "2-Amino-3-phosphonopropionic acid",
    "smiles": "NC(CP(O)(O)=O)C(O)=O"
  },
  "2aminoadipicacid": {
    "chebi_id": "37024",
    "hmdb_id": "HMDB0000510",
    "kegg_id": "C00956",
    "name": "Aminoadipic acid",
    "smiles": "NC(CCCC(=O)O)C(=O)O"
  },
  "2aminobenzoicacid": {
    "chebi_id": "30754",
    "hmdb_id": "HMDB0001123",
    "kegg_id": "C00108",
    "name": "2-Aminobenzoic acid",
    "smiles": "NC1=CC=CC=C1C(O)=O"
  },
  "2deoxy5cytidylicacid": {
    "chebi_id": "15918",
    "hmdb_id": "HMDB0001202",
    "kegg_id": "C00239",
    "name": "dCMP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](COP(O)(O)=O)O1"
  },
  "2deoxyadenosine": {
    "chebi_id": "17256",
    "hmdb_id": "HMDB0000101",
    "kegg_id": "C00559",
    "name": "Deoxyadenosine",
    "smiles": "NC1=C2N=CN([C@H]3C[C@H](O)[C@@H](CO)O3)C2=NC=N1"
  },
  "2deoxyadenosine5triphosphate": {
    "chebi_id": "16284",
    "hmdb_id": "HMDB0001532",
    "kegg_id": "C00131",
    "name": "Deoxyadenosine triphosphate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@H]1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O1"
  },
  "2deoxycytidine": {
    "chebi_id": "15698",
    "hmdb_id": "HMDB0000014",
    "kegg_id": "C00881",
    "name": "Deoxycytidine",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](CO)O1"
  },
  "2deoxycytidine5diphosphate": {
    "chebi_id": "28846",
    "hmdb_id": "HMDB0001245",
    "kegg_id": "C00705",
    "name": "dCDP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(O)=O)O1"
  },
  "2deoxycytidine5monophosphate": {
    "chebi_id": "15918",
    "hmdb_id": "HMDB0001202",
    "kegg_id": "C00239",
    "name": "dCMP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](COP(O)(O)=O)O1"
  },
  "2deoxydribonicacid": {
    "chebi_id": "86350",
    "hmdb_id": "HMDB0000366",
    "kegg_id": "",
    "name": "2-Deoxyribonic acid",
    "smiles": "O=C(O)C(O)(O)CO"
  },
  "2deoxydribose": {
    "chebi_id": "28816",
    "hmdb_id": "HMDB0003224",
    "kegg_id": "C01801",
    "name": "Deoxyribose",
    "smiles": "OC[C@@H]1O[C@H](O)C[C@H]1O"
  },
  "2deoxyguanosine": {
    "chebi_id": "17172",
    "hmdb_id": "HMDB0000085",
    "kegg_id": "C00330",
    "name": "Deoxyguanosine",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](CO)O2)C(=O)N1"
  },
  "2deoxyguanosine5diphosphate": {
    "chebi_id": "28862",
    "hmdb_id": "HMDB0000960",
    "kegg_id": "C00361",
    "name": "dGDP",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](COP(O)(=O)OP(O)(O)=O)O2)C(=O)N1"
  },
  "2deoxyguanosine5monophosphate": {
    "chebi_id": "16192",
    "hmdb_id": "HMDB0001044",
    "kegg_id": "C00362",
    "name": "2'-Deoxyguanosine 5'-monophosphate",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](COP(O)(O)=O)O2)C(=O)N1"
  },
  "2deoxyguanosine5triphosphate": {
    "chebi_id": "16497",
    "hmdb_id": "HMDB0001440",
    "kegg_id": "C00286",
    "name": "dGTP",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O2)C(=O)N1"
  },
  "2deoxyinosine": {
    "chebi_id": "28997",
    "hmdb_id": "HMDB0000071",
    "kegg_id": "C05512",
    "name": "Deoxyinosine",
    "smiles": "OC[C@H]1O[C@H](C[C@@H]1O)N1C=NC2=C1N=CNC2=O"
  },
  "2deoxyribonicacid": {
    "chebi_id": "86350",
    "hmdb_id": "HMDB0000366",
    "kegg_id": "",
    "name": "2-Deoxyribonic acid",
    "smiles": "O=C(O)C(O)(O)CO"
  },
  "2deoxyribose5phosphate": {
    "chebi_id": "16132",
    "hmdb_id": "HMDB0001031",
    "kegg_id": "C00673",
    "name": "Deoxyribose 5-phosphate",
    "smiles": "O[C@H]1C[C@H](O)[C@@H](COP(O)(O)=O)O1"
  },
  "2deoxyuridine": {
    "chebi_id": "16450",
    "hmdb_id": "HMDB0000012",
    "kegg_id": "C00526",
    "name": "Deoxyuridine",
    "smiles": "OC[C@H]1O[C@H](C[C@@H]1O)N1C=CC(=O)NC1=O"
  },
  "2deoxyuridine5monophosphate": {
    "chebi_id": "17622",
    "hmdb_id": "HMDB0001409",
    "kegg_id": "C00365",
    "name": "dUMP",
    "smiles": "O[C@H]1C[C@@H](O[C@@H]1COP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "2ethylhydracrylicacid": {
    "chebi_id": "741550",
    "hmdb_id": "HMDB0000396",
    "kegg_id": "",
    "name": "2-Ethylhydracrylic acid",
    "smiles": "CCC(CO)C(=O)O"
  },
  "2furoylglycine": {
    "chebi_id": "82912",
    "hmdb_id": "HMDB0000439",
    "kegg_id": "",
    "name": "2-Furoylglycine",
    "smiles": "OC(=O)CNC(=O)C1=CC=CO1"
  },
  "2hydroxy3methylpentanoicacid": {
    "chebi_id": "89228",
    "hmdb_id": "HMDB0000317",
    "kegg_id": "",
    "name": "2-Hydroxy-3-methylpentanoic acid",
    "smiles": "CC[C@@H](C)[C@H](C(=O)O)O"
  },
  "2hydroxybutanoicacid": {
    "chebi_id": "1148",
    "hmdb_id": "HMDB0000008",
    "kegg_id": "C05984",
    "name": "2-Hydroxybutyric acid",
    "smiles": "CCC(O)C(=O)O"
  },
  "2hydroxybutyricacid": {
    "chebi_id": "1148",
    "hmdb_id": "HMDB0000008",
    "kegg_id": "C05984",
    "name": "2-Hydroxybutyric acid",
    "smiles": "CCC(O)C(=O)O"
  },
  "2hydroxymethylbutanoicacid": {
    "chebi_id": "741550",
    "hmdb_id": "HMDB0000396",
    "kegg_id": "",
    "name": "2-Ethylhydracrylic acid",
    "smiles": "CCC(CO)C(=O)O"
  },
  "2hydroxyphenylaceticacid": {
    "chebi_id": "28478",
    "hmdb_id": "HMDB0000669",
    "kegg_id": "C05852",
    "name": "Ortho-Hydroxyphenylacetic acid",
    "smiles": "OC(=O)CC1=C(O)C=CC=C1"
  },
  "2ketobutyricacid": {
    "chebi_id": "30831",
    "hmdb_id": "HMDB0000005",
    "kegg_id": "C00109",
    "name": "2-Ketobutyric acid",
    "smiles": "CCC(=O)C(O)=O"
  },
  "2methylbutyrylglycine": {
    "chebi_id": "86366",
    "hmdb_id": "HMDB0000339",
    "kegg_id": "",
    "name": "2-Methylbutyrylglycine",
    "smiles": "CCC(C)C(=O)NCC(O)=O"
  },
  "2methylglutaricacid": {
    "chebi_id": "68567",
    "hmdb_id": "HMDB0000422",
    "kegg_id": "",
    "name": "2-Methylglutaric acid",
    "smiles": "CC(CCC(=O)O)C(=O)O"
  },
  "2oxo4methylthiobutanoicacid": {
    "chebi_id": "33574",
    "hmdb_id": "HMDB0001553",
    "kegg_id": "C01180",
    "name": "2-Oxo-4-methylthiobutanoic acid",
    "smiles": "CSCCC(=O)C(=O)O"
  },
  "2oxoadipicacid": {
    "chebi_id": "15753",
    "hmdb_id": "HMDB0000225",
    "kegg_id": "C00322",
    "name": "Oxoadipic acid",
    "smiles": "O=C(O)CCCC(=O)C(=O)O"
  },
  "2r2hydroxy3phosphonatooxypropanoate": {
    "chebi_id": "",
    "hmdb_id": "HMDB60180",
    "kegg_id": "C00197",
    "name": "(2R)-2-Hydroxy-3-(phosphonatooxy)propanoate",
    "smiles": "O[C@H](COP(O)(O)=O)C(O)=O"
  },
  "33dimethylacrylicacid": {
    "chebi_id": "37127",
    "hmdb_id": "HMDB0000509",
    "kegg_id": "",
    "name": "Senecioic acid",
    "smiles": "CC(=CC(=O)O)C"
  },
  "34dihydroxybenzeneaceticacid": {
    "chebi_id": "41941",
    "hmdb_id": "HMDB0001336",
    "kegg_id": "C01161",
    "name": "3,4-Dihydroxybenzeneacetic acid",
    "smiles": "OC(=O)CC1=CC(O)=C(O)C=C1"
  },
  "34dihydroxymandelicacid": {
    "chebi_id": "27637",
    "hmdb_id": "HMDB0001866",
    "kegg_id": "C05580",
    "name": "3,4-Dihydroxymandelic acid",
    "smiles": "OC(C(O)=O)C1=CC=C(O)C(O)=C1"
  },
  "34dihydroxyphenylaceticacid": {
    "chebi_id": "41941",
    "hmdb_id": "HMDB0001336",
    "kegg_id": "C01161",
    "name": "3,4-Dihydroxybenzeneacetic acid",
    "smiles": "OC(=O)CC1=CC(O)=C(O)C=C1"
  },
  "34dihydroxyphenylglycol": {
    "chebi_id": "1387",
    "hmdb_id": "HMDB0000318",
    "kegg_id": "C05576",
    "name": "3,4-Dihydroxyphenylglycol",
    "smiles": "OCC(O)C1=CC(O)=C(O)C=C1"
  },
  "35diiodoltyrosine": {
    "chebi_id": "15768",
    "hmdb_id": "HMDB0003474",
    "kegg_id": "C01060",
    "name": "3,5-Diiodo-L-tyrosine",
    "smiles": "[H][C@](N)(CC1=CC(I)=C(O)C(I)=C1)C(O)=O"
  },
  "3amino2piperidone": {
    "chebi_id": "76341",
    "hmdb_id": "HMDB0000323",
    "kegg_id": "",
    "name": "3-Amino-2-piperidone",
    "smiles": "NC1CCCNC1=O"
  },
  "3aminoisobutanoicacid": {
    "chebi_id": "27389",
    "hmdb_id": "HMDB0003911",
    "kegg_id": "C05145",
    "name": "3-Aminoisobutanoic acid",
    "smiles": "CC(CN)C(=O)O"
  },
  "3aminoisobutyricacid": {
    "chebi_id": "27389",
    "hmdb_id": "HMDB0003911",
    "kegg_id": "C05145",
    "name": "3-Aminoisobutanoic acid",
    "smiles": "CC(CN)C(=O)O"
  },
  "3aminopiperidin2one": {
    "chebi_id": "76341",
    "hmdb_id": "HMDB0000323",
    "kegg_id": "",
    "name": "3-Amino-2-piperidone",
    "smiles": "NC1CCCNC1=O"
  },
  "3furoicacid": {
    "chebi_id": "30846",
    "hmdb_id": "HMDB0000444",
    "kegg_id": "",
    "name": "3-Furoic acid",
    "smiles": "OC(=O)C1=COC=C1"
  },
  "3hexenedioicacid": {
    "chebi_id": "86952",
    "hmdb_id": "HMDB0000393",
    "kegg_id": "",
    "name": "3-Hexenedioic acid",
    "smiles": "C(/C=C/CC(=O)O)C(=O)O"
  },
  "3hydroxy3methylglutaricacid": {
    "chebi_id": "16831",
    "hmdb_id": "HMDB0000355",
    "kegg_id": "C03761",
    "name": "3-Hydroxymethylglutaric acid",
    "smiles": "CC(CC(=O)O)(CC(=O)O)O"
  },
  "3hydroxy3methylglutarylcoa": {
    "chebi_id": "15467",
    "hmdb_id": "HMDB0001375",
    "kegg_id": "C00356",
    "name": "3-Hydroxy-3-methylglutaryl-CoA",
    "smiles": "C[C@](CC(=O)O)(CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O)O"
  },
  "3hydroxy3methylglutarylcoenzymea": {
    "chebi_id": "15467",
    "hmdb_id": "HMDB0001375",
    "kegg_id": "C00356",
    "name": "3-Hydroxy-3-methylglutaryl-CoA",
    "smiles": "C[C@](CC(=O)O)(CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O)O"
  },
  "3hydroxyanthranilicacid": {
    "chebi_id": "15793",
    "hmdb_id": "HMDB0001476",
    "kegg_id": "C00632",
    "name": "3-Hydroxyanthranilic acid",
    "smiles": "NC1=C(O)C=CC=C1C(O)=O"
  },
  "3hydroxybutyrylcoa": {
    "chebi_id": "15452",
    "hmdb_id": "HMDB0001166",
    "kegg_id": "C03561",
    "name": "3-Hydroxybutyryl-CoA",
    "smiles": "C[C@H](CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O)O"
  },
  "3hydroxybutyrylcoenzymea": {
    "chebi_id": "15452",
    "hmdb_id": "HMDB0001166",
    "kegg_id": "C03561",
    "name": "3-Hydroxybutyryl-CoA",
    "smiles": "C[C@H](CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O)O"
  },
  "3hydroxydlkynurenine": {
    "chebi_id": "1547",
    "hmdb_id": "HMDB0000732",
    "kegg_id": "C02794",
    "name": "Hydroxykynurenine",
    "smiles": "NC(CC(=O)C1=C(N)C(O)=CC=C1)C(O)=O"
  },
  "3hydroxyglutaricacid": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000428",
    "kegg_id": "",
    "name": "3-Hydroxyglutaric acid",
    "smiles": "OC(CC(O)=O)CC(O)=O"
  },
  "3hydroxymethylglutaricacid": {
    "chebi_id": "16831",
    "hmdb_id": "HMDB0000355",
    "kegg_id": "C03761",
    "name": "3-Hydroxymethylglutaric acid",
    "smiles": "CC(CC(=O)O)(CC(=O)O)O"
  },
  "3hydroxypentanedioicacid": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000428",
    "kegg_id": "",
    "name": "3-Hydroxyglutaric acid",
    "smiles": "OC(CC(O)=O)CC(O)=O"
  },
  "3hydroxypropionicacid": {
    "chebi_id": "33404",
    "hmdb_id": "HMDB0000700",
    "kegg_id": "C01013",
    "name": "Hydroxypropionic acid",
    "smiles": "OCCC(O)=O"
  },
  "3iodoltyrosine": {
    "chebi_id": "27847",
    "hmdb_id": "HMDB0000021",
    "kegg_id": "C02515",
    "name": "Iodotyrosine",
    "smiles": "N[C@@H](CC1=CC=C(O)C(I)=C1)C(O)=O"
  },
  "3methoxyanthranilate": {
    "chebi_id": "",
    "hmdb_id": "HMDB60374",
    "kegg_id": "C05831",
    "name": "3-Methoxyanthranilate",
    "smiles": "COC1=CC=CC(C(O)=O)=C1N"
  },
  "3methoxytyramine": {
    "chebi_id": "742324",
    "hmdb_id": "HMDB0000022",
    "kegg_id": "C05587",
    "name": "3-Methoxytyramine",
    "smiles": "COC1=C(O)C=CC(CCN)=C1"
  },
  "3methyl2oxobutyrate": {
    "chebi_id": "16530",
    "hmdb_id": "HMDB0000019",
    "kegg_id": "C00141",
    "name": "Alpha-ketoisovaleric acid",
    "smiles": "CC(C)C(=O)C(=O)O"
  },
  "3methyl2oxovalericacid": {
    "chebi_id": "35932",
    "hmdb_id": "HMDB0000491",
    "kegg_id": "C03465",
    "name": "3-Methyl-2-oxovaleric acid",
    "smiles": "CCC(C)C(=O)C(O)=O"
  },
  "3methylglutaconicacid": {
    "chebi_id": "37245",
    "hmdb_id": "HMDB0000522",
    "kegg_id": "",
    "name": "3-Methylglutaconic acid",
    "smiles": "C/C(=C\\C(=O)O)/CC(=O)O"
  },
  "3methylglutaricacid": {
    "chebi_id": "68566",
    "hmdb_id": "HMDB0000752",
    "kegg_id": "",
    "name": "Methylglutaric acid",
    "smiles": "CC(CC(=O)O)CC(=O)O"
  },
  "3phosphoadenosine5phosphosulfate": {
    "chebi_id": "17980",
    "hmdb_id": "HMDB0001134",
    "kegg_id": "C00053",
    "name": "Phosphoadenosine phosphosulfate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OS(O)(=O)=O)[C@@H](OP(O)(O)=O)[C@H]1O"
  },
  "3sulfopyruvicacid": {
    "chebi_id": "16894",
    "hmdb_id": "HMDB0004045",
    "kegg_id": "C05528",
    "name": "3-Sulfopyruvic acid",
    "smiles": "OC(=O)C(=O)CS(O)(=O)=O"
  },
  "3ureidopropionicacid": {
    "chebi_id": "18261",
    "hmdb_id": "HMDB0000026",
    "kegg_id": "C02642",
    "name": "Ureidopropionic acid",
    "smiles": "NC(=O)NCCC(O)=O"
  },
  "45dihydrooroticacid": {
    "chebi_id": "30865",
    "hmdb_id": "HMDB0000528",
    "kegg_id": "C00337",
    "name": "4,5-Dihydroorotic acid",
    "smiles": "OC(=O)C1CC(=O)NC(=O)N1"
  },
  "46dioxoheptanoicacid": {
    "chebi_id": "87897",
    "hmdb_id": "HMDB0000635",
    "kegg_id": "",
    "name": "Succinylacetone",
    "smiles": "CC(=O)CC(=O)CCC(O)=O"
  },
  "4aminobutanoate": {
    "chebi_id": "16865",
    "hmdb_id": "HMDB0000112",
    "kegg_id": "C00334",
    "name": "Gamma-Aminobutyric acid",
    "smiles": "NCCCC(=O)O"
  },
  "4guanidinobutanoicacid": {
    "chebi_id": "15728",
    "hmdb_id": "HMDB0003464",
    "kegg_id": "C01035",
    "name": "4-Guanidinobutanoic acid",
    "smiles": "NC(=N)NCCCC(O)=O"
  },
  "4guanidinobutyricacid": {
    "chebi_id": "15728",
    "hmdb_id": "HMDB0003464",
    "kegg_id": "C01035",
    "name": "4-Guanidinobutanoic acid",
    "smiles": "NC(=N)NCCCC(O)=O"
  },
  "4hydroxybenzoicacid": {
    "chebi_id": "30763",
    "hmdb_id": "HMDB0000500",
    "kegg_id": "C00156",
    "name": "4-Hydroxybenzoic acid",
    "smiles": "OC(=O)C1=CC=C(O)C=C1"
  },
  "4hydroxyphenylaceticacid": {
    "chebi_id": "18101",
    "hmdb_id": "HMDB0000020",
    "kegg_id": "C00642",
    "name": "p-Hydroxyphenylacetic acid",
    "smiles": "OC(=O)CC1=CC=C(O)C=C1"
  },
  "4hydroxyphenylacetylglycine": {
    "chebi_id": "28595",
    "hmdb_id": "HMDB0000735",
    "kegg_id": "C05596",
    "name": "Hydroxyphenylacetylglycine",
    "smiles": "OC(=O)CNC(=O)CC1=CC=C(O)C=C1"
  },
  "4hydroxyphenylpyruvicacid": {
    "chebi_id": "15999",
    "hmdb_id": "HMDB0000707",
    "kegg_id": "C01179",
    "name": "4-Hydroxyphenylpyruvic acid",
    "smiles": "OC(=O)C(=O)CC1=CC=C(O)C=C1"
  },
  "4hydroxyproline": {
    "chebi_id": "18095",
    "hmdb_id": "HMDB0000725",
    "kegg_id": "C01157",
    "name": "4-Hydroxyproline",
    "smiles": "O[C@H]1CN[C@@H](C1)C(O)=O"
  },
  "4imidazoleaceticacid": {
    "chebi_id": "16974",
    "hmdb_id": "HMDB0002024",
    "kegg_id": "C02835",
    "name": "Imidazoleacetic acid",
    "smiles": "OC(=O)CC1=CN=CN1"
  },
  "4imidazoleacrylicacid": {
    "chebi_id": "30817",
    "hmdb_id": "HMDB0000301",
    "kegg_id": "C00785",
    "name": "Urocanic acid",
    "smiles": "OC(=O)\\C=C\\C1=CNC=N1"
  },
  "4methyl2oxovalericacid": {
    "chebi_id": "48430",
    "hmdb_id": "HMDB0000695",
    "kegg_id": "C00233",
    "name": "Ketoleucine",
    "smiles": "CC(C)CC(=O)C(O)=O"
  },
  "4methylthio2oxobutanoicacid": {
    "chebi_id": "33574",
    "hmdb_id": "HMDB0001553",
    "kegg_id": "C01180",
    "name": "2-Oxo-4-methylthiobutanoic acid",
    "smiles": "CSCCC(=O)C(=O)O"
  },
  "4phenylbutanoicacid": {
    "chebi_id": "41500",
    "hmdb_id": "HMDB0000543",
    "kegg_id": "",
    "name": "Benzenebutanoic acid",
    "smiles": "OC(=O)CCCC1=CC=CC=C1"
  },
  "4pyridoxicacid": {
    "chebi_id": "17405",
    "hmdb_id": "HMDB0000017",
    "kegg_id": "C00847",
    "name": "4-Pyridoxic acid",
    "smiles": "CC1=NC=C(CO)C(C(O)=O)=C1O"
  },
  "4r4hydroxylglutamicacid": {
    "chebi_id": "21285",
    "hmdb_id": "HMDB0002273",
    "kegg_id": "C03079",
    "name": "4-Hydroxy-L-glutamic acid",
    "smiles": "N[C@@H](C[C@@H](O)C(O)=O)C(O)=O"
  },
  "5hydroxyltryptophan": {
    "chebi_id": "17780",
    "hmdb_id": "HMDB0015571",
    "kegg_id": "C00643",
    "name": "Oxitriptan",
    "smiles": "C1=CC2=C(C=C1O)C(=CN2)C[C@@H](C(=O)O)N"
  },
  "5hydroxylysine": {
    "chebi_id": "18040",
    "hmdb_id": "HMDB0000450",
    "kegg_id": "C16741",
    "name": "5-Hydroxylysine",
    "smiles": "NC[C@H](O)CC[C@H](N)C(O)=O"
  },
  "5methoxy3indoleaceticacid": {
    "chebi_id": "28281",
    "hmdb_id": "HMDB0004096",
    "kegg_id": "C05660",
    "name": "5-Methoxyindoleacetate",
    "smiles": "COC1=CC2=C(NC=C2CC(O)=O)C=C1"
  },
  "5methoxyindoleacetate": {
    "chebi_id": "28281",
    "hmdb_id": "HMDB0004096",
    "kegg_id": "C05660",
    "name": "5-Methoxyindoleacetate",
    "smiles": "COC1=CC2=C(NC=C2CC(O)=O)C=C1"
  },
  "5methoxytryptamine": {
    "chebi_id": "2089",
    "hmdb_id": "HMDB0004095",
    "kegg_id": "C05659",
    "name": "5-Methoxytryptamine",
    "smiles": "COC1=CC2=C(NC=C2CCN)C=C1"
  },
  "5methyltetrahydrofolicacid": {
    "chebi_id": "15641",
    "hmdb_id": "HMDB0001396",
    "kegg_id": "C00440",
    "name": "5-Methyltetrahydrofolic acid",
    "smiles": "CN1C(CNC2=CC=C(C=C2)C(=O)N[C@H](CCC(O)=O)C(O)=O)CNC2=C1C(=O)NC(N)=N2"
  },
  "5methyluridine": {
    "chebi_id": "45996",
    "hmdb_id": "HMDB0000884",
    "kegg_id": "",
    "name": "Ribothymidine",
    "smiles": "CC1=CN([C@@H]2O[C@H](CO)[C@@H](O)[C@H]2O)C(=O)NC1=O"
  },
  "5phosphodribose1diphosphate": {
    "chebi_id": "17111",
    "hmdb_id": "HMDB0000280",
    "kegg_id": "C00119",
    "name": "Phosphoribosyl pyrophosphate",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](OP(O)(=O)OP(O)(O)=O)O[C@@H]1COP(O)(O)=O"
  },
  "5thymidylicacid": {
    "chebi_id": "17013",
    "hmdb_id": "HMDB0001227",
    "kegg_id": "C00364",
    "name": "5-Thymidylic acid",
    "smiles": "CC1=CN([C@H]2C[C@H](O)[C@@H](COP(O)(O)=O)O2)C(=O)NC1=O"
  },
  "6deoxylgalactonicacid": {
    "chebi_id": "",
    "hmdb_id": NaN,
    "kegg_id": "C01720",
    "name": "6-Deoxy-L-galactonic acid",
    "smiles": "C[C@@H]([C@H]([C@H]([C@@H](C(=O)O)O)O)O)O"
  },
  "6dimethylaminopurine": {
    "chebi_id": "60281",
    "hmdb_id": "HMDB0000473",
    "kegg_id": "",
    "name": "6-Dimethylaminopurine",
    "smiles": "CN(C)C1=NC=NC2=C1NC=N2"
  },
  "6phosphogluconicacid": {
    "chebi_id": "48928",
    "hmdb_id": "HMDB0001316",
    "kegg_id": "C00345",
    "name": "6-Phosphogluconic acid",
    "smiles": "O[C@H](COP(O)(O)=O)[C@@H](O)[C@H](O)[C@@H](O)C(O)=O"
  },
  "acetoacetate": {
    "chebi_id": "15344",
    "hmdb_id": "HMDB0000060",
    "kegg_id": "C00164",
    "name": "Acetoacetic acid",
    "smiles": "CC(=O)CC(=O)O"
  },
  "acetoaceticacid": {
    "chebi_id": "15344",
    "hmdb_id": "HMDB0000060",
    "kegg_id": "C00164",
    "name": "Acetoacetic acid",
    "smiles": "CC(=O)CC(=O)O"
  },
  "acetylaminoaceticacid": {
    "chebi_id": "40410",
    "hmdb_id": "HMDB0000532",
    "kegg_id": "",
    "name": "Acetylglycine",
    "smiles": "CC(=O)NCC(O)=O"
  },
  "acetylcholine": {
    "chebi_id": "15355",
    "hmdb_id": "HMDB0000895",
    "kegg_id": "C01996",
    "name": "Acetylcholine ",
    "smiles": "CC(=O)OCC[N+](C)(C)C"
  },
  "acetylcoa": {
    "chebi_id": "15351",
    "hmdb_id": "HMDB0001206",
    "kegg_id": "C00024",
    "name": "Acetyl-CoA",
    "smiles": "CC(=O)SCCNC(=O)CCNC(=O)[C@@H](C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "acetylcoenzymea": {
    "chebi_id": "15351",
    "hmdb_id": "HMDB0001206",
    "kegg_id": "C00024",
    "name": "Acetyl-CoA",
    "smiles": "CC(=O)SCCNC(=O)CCNC(=O)[C@@H](C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "acetylglycine": {
    "chebi_id": "40410",
    "hmdb_id": "HMDB0000532",
    "kegg_id": "",
    "name": "Acetylglycine",
    "smiles": "CC(=O)NCC(O)=O"
  },
  "adenine": {
    "chebi_id": "16708",
    "hmdb_id": "HMDB0000034",
    "kegg_id": "C00147",
    "name": "Adenine",
    "smiles": "NC1=C2NC=NC2=NC=N1"
  },
  "adenosine": {
    "chebi_id": "16335",
    "hmdb_id": "HMDB0000050",
    "kegg_id": "C00212",
    "name": "Adenosine",
    "smiles": "NC1=C2N=CN([C@@H]3O[C@H](CO)[C@@H](O)[C@H]3O)C2=NC=N1"
  },
  "adenosine35diphosphate": {
    "chebi_id": "17985",
    "hmdb_id": "HMDB0000061",
    "kegg_id": "C00054",
    "name": "Adenosine 3',5'-diphosphate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(O)=O)[C@@H](OP(O)(O)=O)[C@H]1O"
  },
  "adenosine5phosphosulfate": {
    "chebi_id": "17709",
    "hmdb_id": "HMDB0001003",
    "kegg_id": "C00224",
    "name": "Adenosine phosphosulfate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OS(O)(=O)=O)[C@@H](O)[C@H]1O"
  },
  "adenosinediphosphate": {
    "chebi_id": "16761",
    "hmdb_id": "HMDB0001341",
    "kegg_id": "C00008",
    "name": "ADP",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "adenosinemonophosphate": {
    "chebi_id": "16027",
    "hmdb_id": "HMDB0000045",
    "kegg_id": "C00020",
    "name": "Adenosine monophosphate",
    "smiles": "NC1=C2N=CN([C@@H]3O[C@H](COP(O)(O)=O)[C@@H](O)[C@H]3O)C2=NC=N1"
  },
  "adenosinephosphosulfate": {
    "chebi_id": "17709",
    "hmdb_id": "HMDB0001003",
    "kegg_id": "C00224",
    "name": "Adenosine phosphosulfate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OS(O)(=O)=O)[C@@H](O)[C@H]1O"
  },
  "adenosinetriphosphate": {
    "chebi_id": "15422",
    "hmdb_id": "HMDB0000538",
    "kegg_id": "C00002",
    "name": "Adenosine triphosphate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "adenylosuccinicacid": {
    "chebi_id": "15919",
    "hmdb_id": "HMDB0000536",
    "kegg_id": "C03794",
    "name": "Adenylsuccinic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1N=CN=C2NC(CC(O)=O)C(O)=O"
  },
  "adenylsuccinicacid": {
    "chebi_id": "15919",
    "hmdb_id": "HMDB0000536",
    "kegg_id": "C03794",
    "name": "Adenylsuccinic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1N=CN=C2NC(CC(O)=O)C(O)=O"
  },
  "adp": {
    "chebi_id": "16761",
    "hmdb_id": "HMDB0001341",
    "kegg_id": "C00008",
    "name": "ADP",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "agmatine": {
    "chebi_id": "17431",
    "hmdb_id": "HMDB0001432",
    "kegg_id": "C00179",
    "name": "Agmatine",
    "smiles": "NCCCCNC(N)=N"
  },
  "aicar": {
    "chebi_id": "18406",
    "hmdb_id": "HMDB0001517",
    "kegg_id": "C04677",
    "name": "AICAR",
    "smiles": "NC(=O)C1=C(N)N(C=N1)[C@@H]1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "alphadglucose16bisphosphate": {
    "chebi_id": "18148",
    "hmdb_id": "HMDB0003514",
    "kegg_id": "C01231",
    "name": "Alpha-D-Glucose 1,6-bisphosphate",
    "smiles": "O[C@H]1[C@H](O)[C@@H](COP(O)(O)=O)O[C@H](OP(O)(O)=O)[C@@H]1O"
  },
  "alphaketoisovalericacid": {
    "chebi_id": "16530",
    "hmdb_id": "HMDB0000019",
    "kegg_id": "C00141",
    "name": "Alpha-ketoisovaleric acid",
    "smiles": "CC(C)C(=O)C(=O)O"
  },
  "alphalactose": {
    "chebi_id": "36219",
    "hmdb_id": "HMDB0000186",
    "kegg_id": "C00243",
    "name": "Alpha-Lactose",
    "smiles": "OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](O)[C@@H](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@H]1O"
  },
  "amethylbutyrylglycine": {
    "chebi_id": "86366",
    "hmdb_id": "HMDB0000339",
    "kegg_id": "",
    "name": "2-Methylbutyrylglycine",
    "smiles": "CCC(C)C(=O)NCC(O)=O"
  },
  "aminoadipicacid": {
    "chebi_id": "37024",
    "hmdb_id": "HMDB0000510",
    "kegg_id": "C00956",
    "name": "Aminoadipic acid",
    "smiles": "NC(CCCC(=O)O)C(=O)O"
  },
  "anserine": {
    "chebi_id": "18323",
    "hmdb_id": "HMDB0000194",
    "kegg_id": "C01262",
    "name": "Anserine",
    "smiles": "CN1C=NC=C1C[C@H](NC(=O)CCN)C(O)=O"
  },
  "anthranilate": {
    "chebi_id": "30754",
    "hmdb_id": "HMDB0001123",
    "kegg_id": "C00108",
    "name": "2-Aminobenzoic acid",
    "smiles": "NC1=CC=CC=C1C(O)=O"
  },
  "arabinonicacid": {
    "chebi_id": "20912",
    "hmdb_id": "HMDB0000539",
    "kegg_id": "C00878",
    "name": "Arabinonic acid",
    "smiles": "OC[C@@H](O)[C@@H](O)[C@H](O)C(O)=O"
  },
  "ascorbate": {
    "chebi_id": "29073",
    "hmdb_id": "HMDB0000044",
    "kegg_id": "C01041",
    "name": "Ascorbic acid",
    "smiles": "[H][C@@]1(OC(=O)C(O)=C1O)[C@@H](O)CO"
  },
  "ascorbicacid": {
    "chebi_id": "29073",
    "hmdb_id": "HMDB0000044",
    "kegg_id": "C01041",
    "name": "Ascorbic acid",
    "smiles": "[H][C@@]1(OC(=O)C(O)=C1O)[C@@H](O)CO"
  },
  "aspartylphenylalanine": {
    "chebi_id": "73830",
    "hmdb_id": "HMDB0000706",
    "kegg_id": "",
    "name": "Aspartylphenylalanine",
    "smiles": "N[C@@H](CC(O)=O)C(=O)N[C@@H](CC1=CC=CC=C1)C(O)=O"
  },
  "benzenebutanoicacid": {
    "chebi_id": "41500",
    "hmdb_id": "HMDB0000543",
    "kegg_id": "",
    "name": "Benzenebutanoic acid",
    "smiles": "OC(=O)CCCC1=CC=CC=C1"
  },
  "benzoate": {
    "chebi_id": "30746",
    "hmdb_id": "HMDB0001870",
    "kegg_id": "C00539",
    "name": "Benzoic acid",
    "smiles": "OC(=O)C1=CC=CC=C1"
  },
  "benzoicacid": {
    "chebi_id": "30746",
    "hmdb_id": "HMDB0001870",
    "kegg_id": "C00539",
    "name": "Benzoic acid",
    "smiles": "OC(=O)C1=CC=CC=C1"
  },
  "betaalanine": {
    "chebi_id": "16958",
    "hmdb_id": "HMDB0000056",
    "kegg_id": "C00099",
    "name": "Beta-Alanine",
    "smiles": "NCCC(O)=O"
  },
  "betadfructose16bisphosphate": {
    "chebi_id": "16905",
    "hmdb_id": "HMDB0060444",
    "kegg_id": "C00354",
    "name": "beta-D-Fructose 1,6-bisphosphate",
    "smiles": "O[C@H]1[C@H](O)[C@](O)(COP(O)(O)=O)O[C@@H]1COP(O)(O)=O"
  },
  "betaine": {
    "chebi_id": "17750",
    "hmdb_id": "HMDB0000043",
    "kegg_id": "C00719",
    "name": "Betaine",
    "smiles": "C[N+](C)(C)CC([O-])=O"
  },
  "betainealdehyde": {
    "chebi_id": "15710",
    "hmdb_id": "HMDB0001252",
    "kegg_id": "C00576",
    "name": "Betaine aldehyde",
    "smiles": "C[N+](C)(C)CC=O"
  },
  "betainealdehydehydrate": {
    "chebi_id": "",
    "hmdb_id": "",
    "kegg_id": "",
    "name": "Betaine aldehyde hydrate",
    "smiles": ""
  },
  "biocytin": {
    "chebi_id": "27870",
    "hmdb_id": "HMDB0003134",
    "kegg_id": "C05552",
    "name": "Biocytin",
    "smiles": "[H][C@]12CS[C@@H](CCCCC(=O)NCCCC[C@H](N)C(O)=O)[C@@]1([H])NC(=O)N2"
  },
  "biotin": {
    "chebi_id": "15956",
    "hmdb_id": "HMDB0000030",
    "kegg_id": "C00120",
    "name": "Biotin",
    "smiles": "[H][C@]12CS[C@@H](CCCCC(O)=O)[C@@]1([H])NC(=O)N2"
  },
  "butyrylcoa": {
    "chebi_id": "57371",
    "hmdb_id": "HMDB0001088",
    "kegg_id": "C00136",
    "name": "Butyryl-CoA",
    "smiles": "CCCC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "butyrylcoenzymea": {
    "chebi_id": "57371",
    "hmdb_id": "HMDB0001088",
    "kegg_id": "C00136",
    "name": "Butyryl-CoA",
    "smiles": "CCCC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "cadaverine": {
    "chebi_id": "18127",
    "hmdb_id": "HMDB0002322",
    "kegg_id": "C01672",
    "name": "Cadaverine",
    "smiles": "NCCCCCN"
  },
  "capricacid": {
    "chebi_id": "30813",
    "hmdb_id": "HMDB0000511",
    "kegg_id": "C01571",
    "name": "Capric acid",
    "smiles": "CCCCCCCCCC(=O)O"
  },
  "caprylicacid": {
    "chebi_id": "28837",
    "hmdb_id": "HMDB0000482",
    "kegg_id": "C06423",
    "name": "Caprylic acid",
    "smiles": "CCCCCCCC(=O)O"
  },
  "carnitine": {
    "chebi_id": "16347",
    "hmdb_id": "HMDB0000062",
    "kegg_id": "C00318",
    "name": "L-Carnitine",
    "smiles": "C[N+](C)(C)C[C@H](O)CC([O-])=O"
  },
  "carnosine": {
    "chebi_id": "15727",
    "hmdb_id": "HMDB0000033",
    "kegg_id": "C00386",
    "name": "Carnosine",
    "smiles": "NCCC(=O)N[C@@H](CC1=CN=CN1)C(O)=O"
  },
  "cdp": {
    "chebi_id": "17239",
    "hmdb_id": "HMDB0001546",
    "kegg_id": "C00112",
    "name": "CDP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@@H]1O[C@H](COP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "cdpethanolamine": {
    "chebi_id": "16732",
    "hmdb_id": "HMDB0001564",
    "kegg_id": "C00570",
    "name": "CDP-Ethanolamine",
    "smiles": "NCCOP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(N)=NC1=O"
  },
  "cdpglycerol": {
    "chebi_id": "17885",
    "hmdb_id": "HMDB0059599",
    "kegg_id": "C00513",
    "name": "CDP-glycerol",
    "smiles": "OCC(O)COP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(=N)N=C1O"
  },
  "cellobiose": {
    "chebi_id": "36217",
    "hmdb_id": "HMDB0000055",
    "kegg_id": "C06422",
    "name": "Cellobiose",
    "smiles": "OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](O)[C@H](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "chitobiose": {
    "chebi_id": "",
    "hmdb_id": "HMDB0003556",
    "kegg_id": "C01674",
    "name": "Chitobiose",
    "smiles": "CC(=O)N[C@H]1[C@H](O)O[C@H](CO)[C@@H](O[C@@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2NC(O)=O)[C@@H]1O"
  },
  "choline": {
    "chebi_id": "15354",
    "hmdb_id": "HMDB0000097",
    "kegg_id": "C00114",
    "name": "Choline",
    "smiles": "C[N+](C)(C)CCO"
  },
  "cholineglycerophosphate": {
    "chebi_id": "16870",
    "hmdb_id": "HMDB0000086",
    "kegg_id": "C00670",
    "name": "Glycerophosphocholine",
    "smiles": "C[N+](C)(C)CCOP(=O)([O-])OC[C@H](CO)O"
  },
  "cis4hydroxydproline": {
    "chebi_id": "16231",
    "hmdb_id": "HMDB0060460",
    "kegg_id": "C03440",
    "name": "cis-4-Hydroxy-D-proline",
    "smiles": "O[C@H]1CN[C@H](C1)C(O)=O"
  },
  "cisaconiticacid": {
    "chebi_id": "32805",
    "hmdb_id": "HMDB0000072",
    "kegg_id": "C00417",
    "name": "cis-Aconitic acid",
    "smiles": "OC(=O)C\\C(=C\\C(O)=O)C(O)=O"
  },
  "citicoline": {
    "chebi_id": "16436",
    "hmdb_id": "HMDB0001413",
    "kegg_id": "C00307",
    "name": "Citicoline",
    "smiles": "C[N+](C)(C)CCOP([O-])(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(N)=NC1=O"
  },
  "citraconicacid": {
    "chebi_id": "17626",
    "hmdb_id": "HMDB0000634",
    "kegg_id": "C02226",
    "name": "Citraconic acid",
    "smiles": "C/C(=C/C(=O)O)/C(=O)O"
  },
  "citramalate": {
    "chebi_id": "15584",
    "hmdb_id": "HMDB0000426",
    "kegg_id": "C00815",
    "name": "Citramalic acid",
    "smiles": "CC(CC(=O)O)(C(=O)O)O"
  },
  "citramalicacid": {
    "chebi_id": "15584",
    "hmdb_id": "HMDB0000426",
    "kegg_id": "C00815",
    "name": "Citramalic acid",
    "smiles": "CC(CC(=O)O)(C(=O)O)O"
  },
  "citricacid": {
    "chebi_id": "30769",
    "hmdb_id": "HMDB0000094",
    "kegg_id": "C00158",
    "name": "Citric acid",
    "smiles": "OC(=O)CC(O)(CC(O)=O)C(O)=O"
  },
  "citrulline": {
    "chebi_id": "16349",
    "hmdb_id": "HMDB0000904",
    "kegg_id": "C00327",
    "name": "Citrulline",
    "smiles": "N[C@@H](CCCNC(N)=O)C(O)=O"
  },
  "coenzymea": {
    "chebi_id": "15346",
    "hmdb_id": "HMDB0001423",
    "kegg_id": "C00010",
    "name": "Coenzyme A",
    "smiles": "CC(C)(COP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1OP(O)(O)=O)N1C=NC2=C1N=CN=C2N)[C@@H](O)C(=O)NCCC(=O)NCCS"
  },
  "creatine": {
    "chebi_id": "16919",
    "hmdb_id": "HMDB0000064",
    "kegg_id": "C00300",
    "name": "Creatine",
    "smiles": "CN(CC(O)=O)C(N)=N"
  },
  "crotonoylcoa": {
    "chebi_id": "15473",
    "hmdb_id": "HMDB0002009",
    "kegg_id": "C00877",
    "name": "Crotonoyl-CoA",
    "smiles": "C/C=C/C(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "crotonoylcoenzymea": {
    "chebi_id": "15473",
    "hmdb_id": "HMDB0002009",
    "kegg_id": "C00877",
    "name": "Crotonoyl-CoA",
    "smiles": "C/C=C/C(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "cyclicamp": {
    "chebi_id": "17489",
    "hmdb_id": "HMDB0000058",
    "kegg_id": "C00575",
    "name": "Cyclic AMP",
    "smiles": "[H][C@@]12COP(O)(=O)O[C@@]1([H])[C@@H](O)[C@@H](O2)N1C=NC2=C1N=CN=C2N"
  },
  "cyclicgmp": {
    "chebi_id": "16356",
    "hmdb_id": "HMDB0001314",
    "kegg_id": "C00942",
    "name": "Cyclic GMP",
    "smiles": "NC1=NC2=C(N=CN2[C@@H]2O[C@@H]3COP(O)(=O)O[C@H]3[C@H]2O)C(=O)N1"
  },
  "cysteamine": {
    "chebi_id": "17141",
    "hmdb_id": "HMDB0002991",
    "kegg_id": "C01678",
    "name": "Cysteamine",
    "smiles": "NCCS"
  },
  "cysteicacid": {
    "chebi_id": "21260",
    "hmdb_id": "HMDB0002757",
    "kegg_id": "C00506",
    "name": "Cysteic acid",
    "smiles": "NC(CS(O)(=O)=O)C(O)=O"
  },
  "cytidine": {
    "chebi_id": "17562",
    "hmdb_id": "HMDB0000089",
    "kegg_id": "C02961",
    "name": "Cytidine",
    "smiles": "NC1=NC(=O)N(C=C1)[C@@H]1O[C@H](CO)[C@@H](O)[C@H]1O"
  },
  "cytidine5diphosphate": {
    "chebi_id": "17239",
    "hmdb_id": "HMDB0001546",
    "kegg_id": "C00112",
    "name": "CDP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@@H]1O[C@H](COP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "cytidine5diphosphocholine": {
    "chebi_id": "16436",
    "hmdb_id": "HMDB0001413",
    "kegg_id": "C00307",
    "name": "Citicoline",
    "smiles": "C[N+](C)(C)CCOP([O-])(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(N)=NC1=O"
  },
  "cytidine5monophosphonacetylneuraminicacid": {
    "chebi_id": "16556",
    "hmdb_id": "HMDB0001176",
    "kegg_id": "C00128",
    "name": "Cytidine monophosphate N-acetylneuraminic acid",
    "smiles": "[H][C@]1(O[C@](C[C@H](O)[C@H]1NC(C)=O)(OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(N)=NC1=O)C(O)=O)[C@H](O)[C@H](O)CO"
  },
  "cytidine5triphosphate": {
    "chebi_id": "17677",
    "hmdb_id": "HMDB0000082",
    "kegg_id": "C00063",
    "name": "Cytidine triphosphate",
    "smiles": "NC1=NC(=O)N(C=C1)[C@@H]1O[C@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "cytidinemonophosphate": {
    "chebi_id": "17361",
    "hmdb_id": "HMDB0000095",
    "kegg_id": "C00055",
    "name": "Cytidine monophosphate",
    "smiles": "NC1=NC(=O)N(C=C1)[C@@H]1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "cytidinemonophosphatenacetylneuraminicacid": {
    "chebi_id": "16556",
    "hmdb_id": "HMDB0001176",
    "kegg_id": "C00128",
    "name": "Cytidine monophosphate N-acetylneuraminic acid",
    "smiles": "[H][C@]1(O[C@](C[C@H](O)[C@H]1NC(C)=O)(OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(N)=NC1=O)C(O)=O)[C@H](O)[C@H](O)CO"
  },
  "cytidinetriphosphate": {
    "chebi_id": "17677",
    "hmdb_id": "HMDB0000082",
    "kegg_id": "C00063",
    "name": "Cytidine triphosphate",
    "smiles": "NC1=NC(=O)N(C=C1)[C@@H]1O[C@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "d2hydroxyglutaricacid": {
    "chebi_id": "32796",
    "hmdb_id": "HMDB0000606",
    "kegg_id": "C01087",
    "name": "D-2-Hydroxyglutaric acid",
    "smiles": "O[C@H](CCC(O)=O)C(O)=O"
  },
  "d3phosphoglycericacid": {
    "chebi_id": "",
    "hmdb_id": "HMDB60180",
    "kegg_id": "C00197",
    "name": "(2R)-2-Hydroxy-3-(phosphonatooxy)propanoate",
    "smiles": "O[C@H](COP(O)(O)=O)C(O)=O"
  },
  "dadp": {
    "chebi_id": "16174",
    "hmdb_id": "HMDB0001508",
    "kegg_id": "C00206",
    "name": "dADP",
    "smiles": "NC1=NC=NC2=C1N=CN2C1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(O)=O)O1"
  },
  "darabinonicacid": {
    "chebi_id": "20912",
    "hmdb_id": "HMDB0000539",
    "kegg_id": "C00878",
    "name": "Arabinonic acid",
    "smiles": "OC[C@@H](O)[C@@H](O)[C@H](O)C(O)=O"
  },
  "darabitol": {
    "chebi_id": "18333",
    "hmdb_id": "HMDB0000568",
    "kegg_id": "C01904",
    "name": "D-Arabitol",
    "smiles": "OC[C@@H](O)C(O)[C@H](O)CO"
  },
  "daspartate": {
    "chebi_id": "17364",
    "hmdb_id": "HMDB0006483",
    "kegg_id": "C00402",
    "name": "D-Aspartic acid",
    "smiles": "N[C@H](CC(O)=O)C(O)=O"
  },
  "dasparticacid": {
    "chebi_id": "17364",
    "hmdb_id": "HMDB0006483",
    "kegg_id": "C00402",
    "name": "D-Aspartic acid",
    "smiles": "N[C@H](CC(O)=O)C(O)=O"
  },
  "dcdp": {
    "chebi_id": "28846",
    "hmdb_id": "HMDB0001245",
    "kegg_id": "C00705",
    "name": "dCDP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(O)=O)O1"
  },
  "dcellobiose": {
    "chebi_id": "36217",
    "hmdb_id": "HMDB0000055",
    "kegg_id": "C06422",
    "name": "Cellobiose",
    "smiles": "OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](O)[C@H](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "dcmp": {
    "chebi_id": "15918",
    "hmdb_id": "HMDB0001202",
    "kegg_id": "C00239",
    "name": "dCMP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](COP(O)(O)=O)O1"
  },
  "dctp": {
    "chebi_id": "16311",
    "hmdb_id": "HMDB0000998",
    "kegg_id": "C00458",
    "name": "dCTP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O1"
  },
  "decanoicacid": {
    "chebi_id": "30813",
    "hmdb_id": "HMDB0000511",
    "kegg_id": "C01571",
    "name": "Capric acid",
    "smiles": "CCCCCCCCCC(=O)O"
  },
  "dehydroascorbicacid": {
    "chebi_id": "27956",
    "hmdb_id": "HMDB0001264",
    "kegg_id": "C05422",
    "name": "Dehydroascorbic acid",
    "smiles": "[H][C@@]1(OC(=O)C(=O)C1=O)[C@@H](O)CO"
  },
  "deoxyadenosine": {
    "chebi_id": "17256",
    "hmdb_id": "HMDB0000101",
    "kegg_id": "C00559",
    "name": "Deoxyadenosine",
    "smiles": "NC1=C2N=CN([C@H]3C[C@H](O)[C@@H](CO)O3)C2=NC=N1"
  },
  "deoxyadenosinediphosphate": {
    "chebi_id": "16174",
    "hmdb_id": "HMDB0001508",
    "kegg_id": "C00206",
    "name": "dADP",
    "smiles": "NC1=NC=NC2=C1N=CN2C1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(O)=O)O1"
  },
  "deoxyadenosinemonophosphate": {
    "chebi_id": "17713",
    "hmdb_id": "HMDB0000905",
    "kegg_id": "C00360",
    "name": "Deoxyadenosine monophosphate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@H]1C[C@H](O)[C@@H](COP(O)(O)=O)O1"
  },
  "deoxyadenosinetriphosphate": {
    "chebi_id": "16284",
    "hmdb_id": "HMDB0001532",
    "kegg_id": "C00131",
    "name": "Deoxyadenosine triphosphate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@H]1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O1"
  },
  "deoxycytidine": {
    "chebi_id": "15698",
    "hmdb_id": "HMDB0000014",
    "kegg_id": "C00881",
    "name": "Deoxycytidine",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](CO)O1"
  },
  "deoxycytidinetriphosphate": {
    "chebi_id": "16311",
    "hmdb_id": "HMDB0000998",
    "kegg_id": "C00458",
    "name": "dCTP",
    "smiles": "NC1=NC(=O)N(C=C1)[C@H]1C[C@H](O)[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O1"
  },
  "deoxyguanosine": {
    "chebi_id": "17172",
    "hmdb_id": "HMDB0000085",
    "kegg_id": "C00330",
    "name": "Deoxyguanosine",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](CO)O2)C(=O)N1"
  },
  "deoxyguanylate": {
    "chebi_id": "16192",
    "hmdb_id": "HMDB0001044",
    "kegg_id": "C00362",
    "name": "2'-Deoxyguanosine 5'-monophosphate",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](COP(O)(O)=O)O2)C(=O)N1"
  },
  "deoxyinosine": {
    "chebi_id": "28997",
    "hmdb_id": "HMDB0000071",
    "kegg_id": "C05512",
    "name": "Deoxyinosine",
    "smiles": "OC[C@H]1O[C@H](C[C@@H]1O)N1C=NC2=C1N=CNC2=O"
  },
  "deoxyribose": {
    "chebi_id": "28816",
    "hmdb_id": "HMDB0003224",
    "kegg_id": "C01801",
    "name": "Deoxyribose",
    "smiles": "OC[C@@H]1O[C@H](O)C[C@H]1O"
  },
  "deoxyribose5phosphate": {
    "chebi_id": "16132",
    "hmdb_id": "HMDB0001031",
    "kegg_id": "C00673",
    "name": "Deoxyribose 5-phosphate",
    "smiles": "O[C@H]1C[C@H](O)[C@@H](COP(O)(O)=O)O1"
  },
  "deoxyuridine": {
    "chebi_id": "16450",
    "hmdb_id": "HMDB0000012",
    "kegg_id": "C00526",
    "name": "Deoxyuridine",
    "smiles": "OC[C@H]1O[C@H](C[C@@H]1O)N1C=CC(=O)NC1=O"
  },
  "deoxyuridinetriphosphate": {
    "chebi_id": "17625",
    "hmdb_id": "HMDB0001191",
    "kegg_id": "C00460",
    "name": "Deoxyuridine triphosphate",
    "smiles": "O[C@H]1C[C@@H](O[C@@H]1COP(O)(=O)OP(O)(=O)OP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "dephosphocoa": {
    "chebi_id": "15468",
    "hmdb_id": "HMDB0001373",
    "kegg_id": "C00882",
    "name": "Dephospho-CoA",
    "smiles": "CC(C)(COP(=O)(O)OP(=O)(O)OC1O(n2cnc3c(N)ncnc32)(O)1O)C(O)C(=O)NCCC(=O)NCCS"
  },
  "dephosphocoenzymea": {
    "chebi_id": "15468",
    "hmdb_id": "HMDB0001373",
    "kegg_id": "C00882",
    "name": "Dephospho-CoA",
    "smiles": "CC(C)(COP(=O)(O)OP(=O)(O)OC1O(n2cnc3c(N)ncnc32)(O)1O)C(O)C(=O)NCCC(=O)NCCS"
  },
  "derythrono14lactone": {
    "chebi_id": "87625",
    "hmdb_id": "HMDB0000349",
    "kegg_id": "",
    "name": "Erythrono-1,4-lactone",
    "smiles": "O[C@@H]1COC(=O)[C@@H]1O"
  },
  "dfructose": {
    "chebi_id": "28645",
    "hmdb_id": "HMDB0000660",
    "kegg_id": "C02336",
    "name": "D-Fructose",
    "smiles": "OC[C@H]1O[C@](O)(CO)[C@@H](O)[C@@H]1O"
  },
  "dfructose16bisphosphate": {
    "chebi_id": "16905",
    "hmdb_id": "HMDB0060444",
    "kegg_id": "C00354",
    "name": "beta-D-Fructose 1,6-bisphosphate",
    "smiles": "O[C@H]1[C@H](O)[C@](O)(COP(O)(O)=O)O[C@@H]1COP(O)(O)=O"
  },
  "dfructose6phosphate": {
    "chebi_id": "15946",
    "hmdb_id": "HMDB0000124",
    "kegg_id": "C00085",
    "name": "Fructose 6-phosphate",
    "smiles": "OCC(=O)[C@@H](O)[C@H](O)[C@H](O)COP(O)(O)=O"
  },
  "dgalactaricacid": {
    "chebi_id": "30852",
    "hmdb_id": "HMDB0000639",
    "kegg_id": "C00879",
    "name": "Galactaric acid",
    "smiles": "O=C(O)(O)(O)(O)(O)C(=O)O"
  },
  "dgalactose": {
    "chebi_id": "28061",
    "hmdb_id": "HMDB0000143",
    "kegg_id": "C00984",
    "name": "D-Galactose",
    "smiles": "OC[C@H]1O[C@H](O)[C@H](O)[C@@H](O)[C@H]1O"
  },
  "dgalactose1phosphate": {
    "chebi_id": "17973",
    "hmdb_id": "HMDB0000645",
    "kegg_id": "C00446",
    "name": "Galactose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@H](O)[C@@H](O)[C@H]1O"
  },
  "dgdp": {
    "chebi_id": "28862",
    "hmdb_id": "HMDB0000960",
    "kegg_id": "C00361",
    "name": "dGDP",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](COP(O)(=O)OP(O)(O)=O)O2)C(=O)N1"
  },
  "dgluconicacid": {
    "chebi_id": "33198",
    "hmdb_id": "HMDB0000625",
    "kegg_id": "C00257",
    "name": "Gluconic acid",
    "smiles": "OC[C@@H](O)[C@@H](O)[C@H](O)[C@@H](O)C(O)=O"
  },
  "dglucosamine": {
    "chebi_id": "47977",
    "hmdb_id": "HMDB0001514",
    "kegg_id": "C00329",
    "name": "Glucosamine",
    "smiles": "N[C@H]1C(O)O[C@H](CO)[C@@H](O)[C@@H]1O"
  },
  "dglucosamine6phosphate": {
    "chebi_id": "15873",
    "hmdb_id": "HMDB0001254",
    "kegg_id": "C00352",
    "name": "Glucosamine 6-phosphate",
    "smiles": "N[C@H]1[C@@H](O)O[C@H](COP(O)(O)=O)[C@@H](O)[C@@H]1O"
  },
  "dglucose": {
    "chebi_id": "4167",
    "hmdb_id": "HMDB0000122",
    "kegg_id": "C00221",
    "name": "D-Glucose",
    "smiles": "OC[C@H]1O[C@@H](O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "dglucose16bisphosphate": {
    "chebi_id": "18148",
    "hmdb_id": "HMDB0003514",
    "kegg_id": "C01231",
    "name": "Alpha-D-Glucose 1,6-bisphosphate",
    "smiles": "O[C@H]1[C@H](O)[C@@H](COP(O)(O)=O)O[C@H](OP(O)(O)=O)[C@@H]1O"
  },
  "dglucose1phosphate": {
    "chebi_id": "29042",
    "hmdb_id": "HMDB0001586",
    "kegg_id": "C00103",
    "name": "Glucose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "dglucose6phosphate": {
    "chebi_id": "4170",
    "hmdb_id": "HMDB0001401",
    "kegg_id": "C00092",
    "name": "Glucose 6-phosphate",
    "smiles": "OC1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H](O)[C@H]1O"
  },
  "dglucuronicacid": {
    "chebi_id": "18268",
    "hmdb_id": "HMDB0006355",
    "kegg_id": "C02670",
    "name": "D-Glucuronic acid",
    "smiles": "O[C@@H]1O[C@@H]2[C@@H](O)C(=O)O[C@@H]2[C@H]1O"
  },
  "dglucurono63lactone": {
    "chebi_id": "",
    "hmdb_id": "HMDB06355",
    "kegg_id": "C02670",
    "name": "D-Glucurono-6,3-lactone",
    "smiles": "O[C@@H]1O[C@@H]2[C@@H](O)C(=O)O[C@@H]2[C@H]1O"
  },
  "dglutamicacid": {
    "chebi_id": "15966",
    "hmdb_id": "HMDB0003339",
    "kegg_id": "C00217",
    "name": "D-Glutamic acid",
    "smiles": "N[C@H](CCC(O)=O)C(O)=O"
  },
  "dglutamine": {
    "chebi_id": "17061",
    "hmdb_id": "HMDB0003423",
    "kegg_id": "C00819",
    "name": "D-Glutamine",
    "smiles": "N[C@H](CCC(N)=O)C(O)=O"
  },
  "dglyceraldehyde": {
    "chebi_id": "5445",
    "hmdb_id": "HMDB0001051",
    "kegg_id": "C02154",
    "name": "Glyceraldehyde",
    "smiles": "OCC(O)C=O"
  },
  "dglyceraldehyde3phosphate": {
    "chebi_id": "29052",
    "hmdb_id": "HMDB0001112",
    "kegg_id": "C00118",
    "name": "D-Glyceraldehyde 3-phosphate",
    "smiles": "O[C@H](COP(O)(O)=O)C=O"
  },
  "dglycerol1phosphate": {
    "chebi_id": "15978",
    "hmdb_id": "HMDB0000126",
    "kegg_id": "C00093",
    "name": "Glycerol 3-phosphate",
    "smiles": "C([C@H](COP(=O)(O)O)O)O"
  },
  "dgtp": {
    "chebi_id": "16497",
    "hmdb_id": "HMDB0001440",
    "kegg_id": "C00286",
    "name": "dGTP",
    "smiles": "NC1=NC2=C(N=CN2[C@H]2C[C@H](O)[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O2)C(=O)N1"
  },
  "dhydroxyglutaricacid": {
    "chebi_id": "32796",
    "hmdb_id": "HMDB0000606",
    "kegg_id": "C01087",
    "name": "D-2-Hydroxyglutaric acid",
    "smiles": "O[C@H](CCC(O)=O)C(O)=O"
  },
  "diadenosinetriphosphate": {
    "chebi_id": "27775",
    "hmdb_id": "HMDB0001155",
    "kegg_id": "C06197",
    "name": "Diadenosine triphosphate",
    "smiles": "NC1=C2N=CN([C@H]3O[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(=O)OC[C@H]4O[C@H]([C@H](O)[C@@H]4O)N4C=NC5=C(N)N=CN=C45)[C@H](O)[C@@H]3O)C2=NC=N1"
  },
  "dihydrothymine": {
    "chebi_id": "27468",
    "hmdb_id": "HMDB0000079",
    "kegg_id": "C00906",
    "name": "Dihydrothymine",
    "smiles": "CC1CNC(=O)NC1=O"
  },
  "dihydrouracil": {
    "chebi_id": "15901",
    "hmdb_id": "HMDB0000076",
    "kegg_id": "C00429",
    "name": "Dihydrouracil",
    "smiles": "O=C1CCNC(=O)N1"
  },
  "dihydroxyacetonephosphate": {
    "chebi_id": "16108",
    "hmdb_id": "HMDB0001473",
    "kegg_id": "C00111",
    "name": "Dihydroxyacetone phosphate",
    "smiles": "OCC(=O)COP(O)(O)=O"
  },
  "dimethylaminopurine": {
    "chebi_id": "60281",
    "hmdb_id": "HMDB0000473",
    "kegg_id": "",
    "name": "6-Dimethylaminopurine",
    "smiles": "CN(C)C1=NC=NC2=C1NC=N2"
  },
  "dimethylglycine": {
    "chebi_id": "17724",
    "hmdb_id": "HMDB0000092",
    "kegg_id": "C01026",
    "name": "Dimethylglycine",
    "smiles": "CN(C)CC(O)=O"
  },
  "dl2amino3phosphonopropionicacid": {
    "chebi_id": "28388",
    "hmdb_id": "HMDB0000370",
    "kegg_id": "C05672",
    "name": "2-Amino-3-phosphonopropionic acid",
    "smiles": "NC(CP(O)(O)=O)C(O)=O"
  },
  "dl34dihydroxymandelicacid": {
    "chebi_id": "27637",
    "hmdb_id": "HMDB0001866",
    "kegg_id": "C05580",
    "name": "3,4-Dihydroxymandelic acid",
    "smiles": "OC(C(O)=O)C1=CC=C(O)C(O)=C1"
  },
  "dl34dihydroxyphenylglycol": {
    "chebi_id": "1387",
    "hmdb_id": "HMDB0000318",
    "kegg_id": "C05576",
    "name": "3,4-Dihydroxyphenylglycol",
    "smiles": "OCC(O)C1=CC(O)=C(O)C=C1"
  },
  "dl3ureidoisobutyricacid": {
    "chebi_id": "1670",
    "hmdb_id": "HMDB0002031",
    "kegg_id": "C05100",
    "name": "Ureidoisobutyric acid",
    "smiles": "C[C@@H](CNC(N)=O)C(O)=O"
  },
  "dl4hydroxy3methoxymandelicacid": {
    "chebi_id": "1127735",
    "hmdb_id": "HMDB0000291",
    "kegg_id": "C05584",
    "name": "Vanillylmandelic acid",
    "smiles": "COC1=C(O)C=CC(=C1)[C@H](O)C(O)=O"
  },
  "dl5hydroxylysine": {
    "chebi_id": "18040",
    "hmdb_id": "HMDB0000450",
    "kegg_id": "C16741",
    "name": "5-Hydroxylysine",
    "smiles": "NC[C@H](O)CC[C@H](N)C(O)=O"
  },
  "dlactaldehyde": {
    "chebi_id": "17167",
    "hmdb_id": "HMDB0006458",
    "kegg_id": "C00937",
    "name": "D-Lactaldehyde",
    "smiles": "C[C@@H](O)C=O"
  },
  "dlactose": {
    "chebi_id": "36219",
    "hmdb_id": "HMDB0000186",
    "kegg_id": "C00243",
    "name": "Alpha-Lactose",
    "smiles": "OC[C@H]1O[C@@H](O[C@H]2[C@H](O)[C@@H](O)[C@@H](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@H]1O"
  },
  "dleucicacid": {
    "chebi_id": "59783",
    "hmdb_id": "HMDB0000665",
    "kegg_id": "",
    "name": "Leucinic acid",
    "smiles": "CC(C)CC(C(=O)O)O"
  },
  "dlhomocysteine": {
    "chebi_id": "17588",
    "hmdb_id": "HMDB0000742",
    "kegg_id": "C00155",
    "name": "Homocysteine",
    "smiles": "N[C@@H](CCS)C(O)=O"
  },
  "dlhomocystine": {
    "chebi_id": "17485",
    "hmdb_id": "HMDB0000575",
    "kegg_id": "C01817",
    "name": "DL-Homocystine",
    "smiles": "NC(CCSSCCC(N)C(O)=O)C(O)=O"
  },
  "dlisocitricacid": {
    "chebi_id": "30887",
    "hmdb_id": "HMDB0000193",
    "kegg_id": "C00311",
    "name": "Isocitric acid",
    "smiles": "OC(C(CC(O)=O)C(O)=O)C(O)=O"
  },
  "dlmandelicacid": {
    "chebi_id": "32800",
    "hmdb_id": "HMDB0000703",
    "kegg_id": "C01984",
    "name": "Mandelic acid",
    "smiles": "O[C@H](C(O)=O)C1=CC=CC=C1"
  },
  "dmaltose": {
    "chebi_id": "47937",
    "hmdb_id": "HMDB0000163",
    "kegg_id": "C00208",
    "name": "D-Maltose",
    "smiles": "OC[C@H]1O[C@H](O[C@H]2[C@H](O)[C@H](O)[C@@H](O)O[C@@H]2CO)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "dmannose": {
    "chebi_id": "4208",
    "hmdb_id": "HMDB0000169",
    "kegg_id": "C00936",
    "name": "D-Mannose",
    "smiles": "OC[C@H]1O[C@H](O)[C@@H](O)[C@@H](O)[C@@H]1O"
  },
  "dmannose1phosphate": {
    "chebi_id": "18205",
    "hmdb_id": "HMDB0006330",
    "kegg_id": "C00636",
    "name": "D-Mannose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@@H](O)[C@@H](O)[C@@H]1O"
  },
  "dmannose6phosphate": {
    "chebi_id": "49728",
    "hmdb_id": "HMDB0001078",
    "kegg_id": "C00275",
    "name": "Mannose 6-phosphate",
    "smiles": "O[C@@H]1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H](O)[C@@H]1O"
  },
  "dmyoinositol145triphosphate": {
    "chebi_id": "16595",
    "hmdb_id": "HMDB0001498",
    "kegg_id": "C01245",
    "name": "Inositol 1,4,5-trisphosphate",
    "smiles": "O[C@@H]1[C@H](O)[C@@H](OP(O)(O)=O)[C@H](OP(O)(O)=O)[C@@H](O)[C@@H]1OP(O)(O)=O"
  },
  "dodecanedioicacid": {
    "chebi_id": "4676",
    "hmdb_id": "HMDB0000623",
    "kegg_id": "C02678",
    "name": "Dodecanedioic acid",
    "smiles": "C(CCCCCC(=O)O)CCCCC(=O)O"
  },
  "dproline": {
    "chebi_id": "16313",
    "hmdb_id": "HMDB0003411",
    "kegg_id": "C00763",
    "name": "D-Proline",
    "smiles": "OC(=O)[C@H]1CCCN1"
  },
  "dpyroglutamicacid": {
    "chebi_id": "16924",
    "hmdb_id": "HMDB0000805",
    "kegg_id": "C02237",
    "name": "Pyrrolidonecarboxylic acid",
    "smiles": "OC(=O)C1CCC(=O)N1"
  },
  "draffinose": {
    "chebi_id": "16634",
    "hmdb_id": "HMDB0003213",
    "kegg_id": "C00492",
    "name": "Raffinose",
    "smiles": "OC[C@H]1O[C@@](CO)(O[C@H]2O[C@H](CO[C@H]3O[C@H](CO)[C@H](O)[C@H](O)[C@H]3O)[C@@H](O)[C@H](O)[C@H]2O)[C@@H](O)[C@@H]1O"
  },
  "dribose": {
    "chebi_id": "47013",
    "hmdb_id": "HMDB0000283",
    "kegg_id": "C00121",
    "name": "D-Ribose",
    "smiles": "OC[C@H]1OC(O)[C@H](O)[C@@H]1O"
  },
  "dribose1phosphate": {
    "chebi_id": "16300",
    "hmdb_id": "HMDB0001489",
    "kegg_id": "C00620",
    "name": "Ribose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@H](O)[C@@H]1O"
  },
  "dribose5phosphate": {
    "chebi_id": "52742",
    "hmdb_id": "HMDB0001548",
    "kegg_id": "C03736",
    "name": "D-Ribose 5-phosphate",
    "smiles": "O[C@H]1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "dsaccharicacid": {
    "chebi_id": "16002",
    "hmdb_id": "HMDB0000663",
    "kegg_id": "C00818",
    "name": "Glucaric acid",
    "smiles": "O=C(O)(O)(O)(O)(O)C(=O)O"
  },
  "dsedoheptulose7phosphate": {
    "chebi_id": "133983",
    "hmdb_id": "HMDB0001068",
    "kegg_id": "C05382",
    "name": "D-Sedoheptulose 7-phosphate",
    "smiles": "OC[C@]1(O)O[C@H](COP(O)(O)=O)[C@@H](O)[C@@H](O)[C@@H]1O"
  },
  "dserine": {
    "chebi_id": "16523",
    "hmdb_id": "HMDB0003406",
    "kegg_id": "C00740",
    "name": "D-Serine",
    "smiles": "N[C@H](CO)C(O)=O"
  },
  "dsorbitol": {
    "chebi_id": "17924",
    "hmdb_id": "HMDB0000247",
    "kegg_id": "C00794",
    "name": "Sorbitol",
    "smiles": "OC[C@H](O)[C@@H](O)[C@H](O)[C@H](O)CO"
  },
  "dtagatose6phosphate": {
    "chebi_id": "4251",
    "hmdb_id": "HMDB0006873",
    "kegg_id": "C01097",
    "name": "D-Tagatose 6-phosphate",
    "smiles": "OCC1(O)O[C@H](COP(O)(O)=O)[C@H](O)[C@@H]1O"
  },
  "dtrehalose": {
    "chebi_id": "16551",
    "hmdb_id": "HMDB0000975",
    "kegg_id": "C01083",
    "name": "Trehalose",
    "smiles": "OC[C@H]1O[C@H](O[C@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "dulcitol": {
    "chebi_id": "16813",
    "hmdb_id": "HMDB0000107",
    "kegg_id": "C01697",
    "name": "Galactitol",
    "smiles": "OC[C@H](O)[C@@H](O)[C@@H](O)[C@H](O)CO"
  },
  "dump": {
    "chebi_id": "17622",
    "hmdb_id": "HMDB0001409",
    "kegg_id": "C00365",
    "name": "dUMP",
    "smiles": "O[C@H]1C[C@@H](O[C@@H]1COP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "dutp": {
    "chebi_id": "17625",
    "hmdb_id": "HMDB0001191",
    "kegg_id": "C00460",
    "name": "Deoxyuridine triphosphate",
    "smiles": "O[C@H]1C[C@@H](O[C@@H]1COP(O)(=O)OP(O)(=O)OP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "dxylose": {
    "chebi_id": "53455",
    "hmdb_id": "HMDB0000098",
    "kegg_id": "C00181",
    "name": "D-Xylose",
    "smiles": "O[C@@H]1COC(O)[C@H](O)[C@H]1O"
  },
  "dxylulose": {
    "chebi_id": "17140",
    "hmdb_id": "HMDB0001644",
    "kegg_id": "C00310",
    "name": "D-Xylulose",
    "smiles": "OC[C@@]1(O)OC[C@@H](O)[C@@H]1O"
  },
  "dxylulose5phosphate": {
    "chebi_id": "16332",
    "hmdb_id": "HMDB0000868",
    "kegg_id": "C00231",
    "name": "Xylulose 5-phosphate",
    "smiles": "OCC(=O)[C@@H](O)[C@H](O)COP(O)(O)=O"
  },
  "epinephrine": {
    "chebi_id": "28918",
    "hmdb_id": "HMDB0000068",
    "kegg_id": "C00788",
    "name": "Epinephrine",
    "smiles": "CNC[C@H](O)C1=CC(O)=C(O)C=C1"
  },
  "erythrono14lactone": {
    "chebi_id": "87625",
    "hmdb_id": "HMDB0000349",
    "kegg_id": "",
    "name": "Erythrono-1,4-lactone",
    "smiles": "O[C@@H]1COC(=O)[C@@H]1O"
  },
  "ethylmalonicacid": {
    "chebi_id": "741548",
    "hmdb_id": "HMDB0000622",
    "kegg_id": "",
    "name": "Ethylmalonic acid",
    "smiles": "CCC(C(=O)O)C(=O)O"
  },
  "fad": {
    "chebi_id": "16238",
    "hmdb_id": "HMDB0001248",
    "kegg_id": "C00016",
    "name": "FAD",
    "smiles": "CC1=CC2=C(C=C1C)N(C[C@H](O)[C@H](O)[C@H](O)COP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC3=C1N=CN=C3N)C1=NC(=O)NC(=O)C1=N2"
  },
  "flavinadeninedinucleotide": {
    "chebi_id": "16238",
    "hmdb_id": "HMDB0001248",
    "kegg_id": "C00016",
    "name": "FAD",
    "smiles": "CC1=CC2=C(C=C1C)N(C[C@H](O)[C@H](O)[C@H](O)COP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC3=C1N=CN=C3N)C1=NC(=O)NC(=O)C1=N2"
  },
  "flavinmononucleotide": {
    "chebi_id": "17621",
    "hmdb_id": "HMDB0001520",
    "kegg_id": "C00061",
    "name": "Flavin Mononucleotide",
    "smiles": "CC1=CC2=C(C=C1C)N(C[C@H](O)[C@H](O)[C@H](O)COP(O)(O)=O)C1=NC(=O)NC(=O)C1=N2"
  },
  "folicacid": {
    "chebi_id": "27470",
    "hmdb_id": "HMDB0000121",
    "kegg_id": "C00504",
    "name": "Folic acid",
    "smiles": "NC1=NC(=O)C2=NC(CNC3=CC=C(C=C3)C(=O)N[C@@H](CCC(O)=O)C(O)=O)=CN=C2N1"
  },
  "folinicacid": {
    "chebi_id": "209153",
    "hmdb_id": "HMDB01562",
    "kegg_id": "C03479",
    "name": "N5-Formyl-THF",
    "smiles": "C1C(N(C2=C(N1)NC(=NC2=O)N)C=O)CNC3=CC=C(C=C3)C(=O)NC(CCC(=O)O)C(=O)O"
  },
  "formylanthranilicacid": {
    "chebi_id": "36575",
    "hmdb_id": "HMDB0004089",
    "kegg_id": "C05653",
    "name": "Formylanthranilic acid",
    "smiles": "OC(=O)C1=CC=CC=C1NC=O"
  },
  "fructose6phosphate": {
    "chebi_id": "15946",
    "hmdb_id": "HMDB0000124",
    "kegg_id": "C00085",
    "name": "Fructose 6-phosphate",
    "smiles": "OCC(=O)[C@@H](O)[C@H](O)[C@H](O)COP(O)(O)=O"
  },
  "fucose1phosphate": {
    "chebi_id": "28319",
    "hmdb_id": "HMDB0001265",
    "kegg_id": "C02985",
    "name": "Fucose 1-phosphate",
    "smiles": "C[C@@H]1OC(OP(O)(O)=O)[C@@H](O)[C@H](O)[C@@H]1O"
  },
  "galactaricacid": {
    "chebi_id": "30852",
    "hmdb_id": "HMDB0000639",
    "kegg_id": "C00879",
    "name": "Galactaric acid",
    "smiles": "O=C(O)(O)(O)(O)(O)C(=O)O"
  },
  "galactinol": {
    "chebi_id": "17505",
    "hmdb_id": "HMDB0005826",
    "kegg_id": "C01235",
    "name": "Galactinol",
    "smiles": "[H][C@]1(O[C@H]2[C@@H](O)[C@@H](O)[C@H](O)[C@@H](O)[C@@H]2O)O[C@H](CO)[C@H](O)[C@H](O)[C@H]1O"
  },
  "galactitol": {
    "chebi_id": "16813",
    "hmdb_id": "HMDB0000107",
    "kegg_id": "C01697",
    "name": "Galactitol",
    "smiles": "OC[C@H](O)[C@@H](O)[C@@H](O)[C@H](O)CO"
  },
  "galactose1phosphate": {
    "chebi_id": "17973",
    "hmdb_id": "HMDB0000645",
    "kegg_id": "C00446",
    "name": "Galactose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@H](O)[C@@H](O)[C@H]1O"
  },
  "galactosylglycerol": {
    "chebi_id": "15754",
    "hmdb_id": "HMDB0006790",
    "kegg_id": "C05401",
    "name": "Galactosylglycerol",
    "smiles": "C([C@@H]1[C@@H]([C@@H]([C@H]([C@@H](O1)OCC(CO)O)O)O)O)O"
  },
  "gammaaminobutyricacid": {
    "chebi_id": "16865",
    "hmdb_id": "HMDB0000112",
    "kegg_id": "C00334",
    "name": "Gamma-Aminobutyric acid",
    "smiles": "NCCCC(=O)O"
  },
  "gammaglucys": {
    "chebi_id": "17515",
    "hmdb_id": "HMDB0001049",
    "kegg_id": "C00669",
    "name": "Gamma-Glutamylcysteine",
    "smiles": "N[C@@H](CCC(=O)N[C@@H](CS)C(O)=O)C(O)=O"
  },
  "gammaglutamylcysteine": {
    "chebi_id": "17515",
    "hmdb_id": "HMDB0001049",
    "kegg_id": "C00669",
    "name": "Gamma-Glutamylcysteine",
    "smiles": "N[C@@H](CCC(=O)N[C@@H](CS)C(O)=O)C(O)=O"
  },
  "gentisatealdehyde": {
    "chebi_id": "28508",
    "hmdb_id": "HMDB0004062",
    "kegg_id": "C05585",
    "name": "Gentisate aldehyde",
    "smiles": "OC1=CC(C=O)=C(O)C=C1"
  },
  "gentisicacid": {
    "chebi_id": "17189",
    "hmdb_id": "HMDB0000152",
    "kegg_id": "C00628",
    "name": "Gentisic acid",
    "smiles": "OC(=O)C1=C(O)C=CC(O)=C1"
  },
  "glucaricacid": {
    "chebi_id": "16002",
    "hmdb_id": "HMDB0000663",
    "kegg_id": "C00818",
    "name": "Glucaric acid",
    "smiles": "O=C(O)(O)(O)(O)(O)C(=O)O"
  },
  "gluconicacid": {
    "chebi_id": "33198",
    "hmdb_id": "HMDB0000625",
    "kegg_id": "C00257",
    "name": "Gluconic acid",
    "smiles": "OC[C@@H](O)[C@@H](O)[C@H](O)[C@@H](O)C(O)=O"
  },
  "gluconodeltalactone": {
    "chebi_id": "16217",
    "hmdb_id": "HMDB0000150",
    "kegg_id": "C00198",
    "name": "Gluconolactone",
    "smiles": "OC[C@H]1OC(=O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "gluconolactone": {
    "chebi_id": "16217",
    "hmdb_id": "HMDB0000150",
    "kegg_id": "C00198",
    "name": "Gluconolactone",
    "smiles": "OC[C@H]1OC(=O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "glucosamine": {
    "chebi_id": "47977",
    "hmdb_id": "HMDB0001514",
    "kegg_id": "C00329",
    "name": "Glucosamine",
    "smiles": "N[C@H]1C(O)O[C@H](CO)[C@@H](O)[C@@H]1O"
  },
  "glucosamine6phosphate": {
    "chebi_id": "15873",
    "hmdb_id": "HMDB0001254",
    "kegg_id": "C00352",
    "name": "Glucosamine 6-phosphate",
    "smiles": "N[C@H]1[C@@H](O)O[C@H](COP(O)(O)=O)[C@@H](O)[C@@H]1O"
  },
  "glucose1phosphate": {
    "chebi_id": "29042",
    "hmdb_id": "HMDB0001586",
    "kegg_id": "C00103",
    "name": "Glucose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "glucose6phosphate": {
    "chebi_id": "4170",
    "hmdb_id": "HMDB0001401",
    "kegg_id": "C00092",
    "name": "Glucose 6-phosphate",
    "smiles": "OC1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H](O)[C@H]1O"
  },
  "glutaconicacid": {
    "chebi_id": "15670",
    "hmdb_id": "HMDB0000620",
    "kegg_id": "C02214",
    "name": "Glutaconic acid",
    "smiles": "O=C(O)/C=C/CC(=O)O"
  },
  "glutaricacid": {
    "chebi_id": "17859",
    "hmdb_id": "HMDB0000661",
    "kegg_id": "C00489",
    "name": "Glutaric acid",
    "smiles": "OC(=O)CCCC(O)=O"
  },
  "glutathionedisulfide": {
    "chebi_id": "17858",
    "hmdb_id": "HMDB0003337",
    "kegg_id": "C00127",
    "name": "Oxidized glutathione",
    "smiles": "N[C@@H](CCC(=O)N[C@@H](CSSC[C@H](NC(=O)CC[C@H](N)C(O)=O)C(=O)NCC(O)=O)C(=O)NCC(O)=O)C(O)=O"
  },
  "glyceraldehyde": {
    "chebi_id": "5445",
    "hmdb_id": "HMDB0001051",
    "kegg_id": "C02154",
    "name": "Glyceraldehyde",
    "smiles": "OCC(O)C=O"
  },
  "glycericacid": {
    "chebi_id": "32398",
    "hmdb_id": "HMDB0000139",
    "kegg_id": "C00258",
    "name": "Glyceric acid",
    "smiles": "OC[C@@H](O)C(O)=O"
  },
  "glycerol3phosphate": {
    "chebi_id": "15978",
    "hmdb_id": "HMDB0000126",
    "kegg_id": "C00093",
    "name": "Glycerol 3-phosphate",
    "smiles": "C([C@H](COP(=O)(O)O)O)O"
  },
  "glyceronephosphate": {
    "chebi_id": "16108",
    "hmdb_id": "HMDB0001473",
    "kegg_id": "C00111",
    "name": "Dihydroxyacetone phosphate",
    "smiles": "OCC(=O)COP(O)(O)=O"
  },
  "glycerophosphocholine": {
    "chebi_id": "16870",
    "hmdb_id": "HMDB0000086",
    "kegg_id": "C00670",
    "name": "Glycerophosphocholine",
    "smiles": "C[N+](C)(C)CCOP(=O)([O-])OC[C@H](CO)O"
  },
  "glycolicacid": {
    "chebi_id": "17497",
    "hmdb_id": "HMDB0000115",
    "kegg_id": "C03547",
    "name": "Glycolic acid",
    "smiles": "OCC(O)=O"
  },
  "glyoxylate": {
    "chebi_id": "16891",
    "hmdb_id": "HMDB0000119",
    "kegg_id": "C00048",
    "name": "Glyoxylic acid",
    "smiles": "OC(=O)C=O"
  },
  "glyoxylicacid": {
    "chebi_id": "16891",
    "hmdb_id": "HMDB0000119",
    "kegg_id": "C00048",
    "name": "Glyoxylic acid",
    "smiles": "OC(=O)C=O"
  },
  "guanidineaceticacid": {
    "chebi_id": "16344",
    "hmdb_id": "HMDB0000128",
    "kegg_id": "C00581",
    "name": "Guanidoacetic acid",
    "smiles": "NC(=N)NCC(O)=O"
  },
  "guanidoaceticacid": {
    "chebi_id": "16344",
    "hmdb_id": "HMDB0000128",
    "kegg_id": "C00581",
    "name": "Guanidoacetic acid",
    "smiles": "NC(=N)NCC(O)=O"
  },
  "guanine": {
    "chebi_id": "16235",
    "hmdb_id": "HMDB0000132",
    "kegg_id": "C00242",
    "name": "Guanine",
    "smiles": "NC1=NC(=O)C2=C(N1)N=CN2"
  },
  "guanosine": {
    "chebi_id": "16750",
    "hmdb_id": "HMDB0000133",
    "kegg_id": "C00387",
    "name": "Guanosine",
    "smiles": "NC1=NC2=C(N=CN2[C@@H]2O[C@H](CO)[C@@H](O)[C@H]2O)C(=O)N1"
  },
  "guanosine5diphosphate": {
    "chebi_id": "17552",
    "hmdb_id": "HMDB0001201",
    "kegg_id": "C00035",
    "name": "Guanosine diphosphate",
    "smiles": "NC1=NC(=O)C2=C(N1)N(C=N2)[C@@H]1O[C@H](COP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "guanosine5monophosphate": {
    "chebi_id": "17345",
    "hmdb_id": "HMDB0001397",
    "kegg_id": "C00144",
    "name": "Guanosine monophosphate",
    "smiles": "NC1=NC2=C(N=CN2[C@@H]2O[C@H](COP(O)(O)=O)[C@@H](O)[C@H]2O)C(=O)N1"
  },
  "guanosine5triphosphate": {
    "chebi_id": "15996",
    "hmdb_id": "HMDB0001273",
    "kegg_id": "C00044",
    "name": "Guanosine triphosphate",
    "smiles": "NC1=NC2=C(N=CN2[C@@H]2O[C@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]2O)C(=O)N1"
  },
  "guanosinediphosphate": {
    "chebi_id": "17552",
    "hmdb_id": "HMDB0001201",
    "kegg_id": "C00035",
    "name": "Guanosine diphosphate",
    "smiles": "NC1=NC(=O)C2=C(N1)N(C=N2)[C@@H]1O[C@H](COP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]1O"
  },
  "guanosinediphosphatemannose": {
    "chebi_id": "15820",
    "hmdb_id": "HMDB0001163",
    "kegg_id": "C00096",
    "name": "Guanosine diphosphate mannose",
    "smiles": "NC1=NC2=C(N=CN2[C@@H]2O[C@H](COP(O)(=O)OP(O)(=O)O[C@H]3O[C@H](CO)[C@@H](O)[C@H](O)[C@@H]3O)[C@@H](O)[C@H]2O)C(=O)N1"
  },
  "guanosinemonophosphate": {
    "chebi_id": "17345",
    "hmdb_id": "HMDB0001397",
    "kegg_id": "C00144",
    "name": "Guanosine monophosphate",
    "smiles": "NC1=NC2=C(N=CN2[C@@H]2O[C@H](COP(O)(O)=O)[C@@H](O)[C@H]2O)C(=O)N1"
  },
  "guanosinetriphosphate": {
    "chebi_id": "15996",
    "hmdb_id": "HMDB0001273",
    "kegg_id": "C00044",
    "name": "Guanosine triphosphate",
    "smiles": "NC1=NC2=C(N=CN2[C@@H]2O[C@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)[C@@H](O)[C@H]2O)C(=O)N1"
  },
  "hexanoylglycine": {
    "chebi_id": "64390",
    "hmdb_id": "HMDB0000701",
    "kegg_id": "",
    "name": "Hexanoylglycine",
    "smiles": "CCCCCC(=O)NCC(O)=O"
  },
  "hippuricacid": {
    "chebi_id": "18089",
    "hmdb_id": "HMDB0000714",
    "kegg_id": "C01586",
    "name": "Hippuric acid",
    "smiles": "OC(=O)CNC(=O)C1=CC=CC=C1"
  },
  "histamine": {
    "chebi_id": "18295",
    "hmdb_id": "HMDB0000870",
    "kegg_id": "C00388",
    "name": "Histamine",
    "smiles": "NCCC1=CNC=N1"
  },
  "homocitrulline": {
    "chebi_id": "17443",
    "hmdb_id": "HMDB0000679",
    "kegg_id": "C02427",
    "name": "Homocitrulline",
    "smiles": "N[C@@H](CCCCNC(N)=O)C(O)=O"
  },
  "homocysteine": {
    "chebi_id": "17588",
    "hmdb_id": "HMDB0000742",
    "kegg_id": "C00155",
    "name": "Homocysteine",
    "smiles": "N[C@@H](CCS)C(O)=O"
  },
  "homovanillicacid": {
    "chebi_id": "545959",
    "hmdb_id": "HMDB0000118",
    "kegg_id": "C05582",
    "name": "Homovanillic acid",
    "smiles": "COC1=CC(CC(O)=O)=CC=C1O"
  },
  "hydroxykynurenine": {
    "chebi_id": "1547",
    "hmdb_id": "HMDB0000732",
    "kegg_id": "C02794",
    "name": "Hydroxykynurenine",
    "smiles": "NC(CC(=O)C1=C(N)C(O)=CC=C1)C(O)=O"
  },
  "hydroxypropionicacid": {
    "chebi_id": "33404",
    "hmdb_id": "HMDB0000700",
    "kegg_id": "C01013",
    "name": "Hydroxypropionic acid",
    "smiles": "OCCC(O)=O"
  },
  "hydroxypyruvate": {
    "chebi_id": "30841",
    "hmdb_id": "HMDB0001352",
    "kegg_id": "C00168",
    "name": "Hydroxypyruvic acid",
    "smiles": "OCC(=O)C(O)=O"
  },
  "hydroxypyruvicacid": {
    "chebi_id": "30841",
    "hmdb_id": "HMDB0001352",
    "kegg_id": "C00168",
    "name": "Hydroxypyruvic acid",
    "smiles": "OCC(=O)C(O)=O"
  },
  "hypotaurine": {
    "chebi_id": "16668",
    "hmdb_id": "HMDB0000965",
    "kegg_id": "C00519",
    "name": "Hypotaurine",
    "smiles": "NCCS(O)=O"
  },
  "hypoxanthine": {
    "chebi_id": "17368",
    "hmdb_id": "HMDB0000157",
    "kegg_id": "C00262",
    "name": "Hypoxanthine",
    "smiles": "OC1=NC=NC2=C1NC=N2"
  },
  "imidazoleaceticacid": {
    "chebi_id": "16974",
    "hmdb_id": "HMDB0002024",
    "kegg_id": "C02835",
    "name": "Imidazoleacetic acid",
    "smiles": "OC(=O)CC1=CN=CN1"
  },
  "indole3aceticacid": {
    "chebi_id": "16411",
    "hmdb_id": "HMDB0000197",
    "kegg_id": "C00954",
    "name": "Indoleacetic acid",
    "smiles": "OC(=O)CC1=CNC2=C1C=CC=C2"
  },
  "indole3pyruvicacid": {
    "chebi_id": "29750",
    "hmdb_id": "HMDB0060484",
    "kegg_id": "C00331",
    "name": "Indolepyruvate",
    "smiles": "OC(=O)C(=O)CC1=CNC2=CC=CC=C12"
  },
  "indoleaceticacid": {
    "chebi_id": "16411",
    "hmdb_id": "HMDB0000197",
    "kegg_id": "C00954",
    "name": "Indoleacetic acid",
    "smiles": "OC(=O)CC1=CNC2=C1C=CC=C2"
  },
  "indolepyruvate": {
    "chebi_id": "29750",
    "hmdb_id": "HMDB0060484",
    "kegg_id": "C00331",
    "name": "Indolepyruvate",
    "smiles": "OC(=O)C(=O)CC1=CNC2=CC=CC=C12"
  },
  "inosine": {
    "chebi_id": "17596",
    "hmdb_id": "HMDB0000195",
    "kegg_id": "C00294",
    "name": "Inosine",
    "smiles": "OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC2=C(O)N=CN=C12"
  },
  "inosine5monophosphate": {
    "chebi_id": "17202",
    "hmdb_id": "HMDB0000175",
    "kegg_id": "C00130",
    "name": "Inosinic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1N=CNC2=O"
  },
  "inosine5triphosphate": {
    "chebi_id": "16039",
    "hmdb_id": "HMDB0000189",
    "kegg_id": "C00081",
    "name": "Inosine triphosphate",
    "smiles": "O[C@@H]1[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1N=CN=C2O"
  },
  "inosinetriphosphate": {
    "chebi_id": "16039",
    "hmdb_id": "HMDB0000189",
    "kegg_id": "C00081",
    "name": "Inosine triphosphate",
    "smiles": "O[C@@H]1[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1N=CN=C2O"
  },
  "inosinicacid": {
    "chebi_id": "17202",
    "hmdb_id": "HMDB0000175",
    "kegg_id": "C00130",
    "name": "Inosinic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1N=CNC2=O"
  },
  "inositol145trisphosphate": {
    "chebi_id": "16595",
    "hmdb_id": "HMDB0001498",
    "kegg_id": "C01245",
    "name": "Inositol 1,4,5-trisphosphate",
    "smiles": "O[C@@H]1[C@H](O)[C@@H](OP(O)(O)=O)[C@H](OP(O)(O)=O)[C@@H](O)[C@@H]1OP(O)(O)=O"
  },
  "iodotyrosine": {
    "chebi_id": "27847",
    "hmdb_id": "HMDB0000021",
    "kegg_id": "C02515",
    "name": "Iodotyrosine",
    "smiles": "N[C@@H](CC1=CC=C(O)C(I)=C1)C(O)=O"
  },
  "isobutyrylglycine": {
    "chebi_id": "70979",
    "hmdb_id": "HMDB0000730",
    "kegg_id": "",
    "name": "Isobutyrylglycine",
    "smiles": "CC(C)C(=O)NCC(O)=O"
  },
  "isocitricacid": {
    "chebi_id": "30887",
    "hmdb_id": "HMDB0000193",
    "kegg_id": "C00311",
    "name": "Isocitric acid",
    "smiles": "OC(C(CC(O)=O)C(O)=O)C(O)=O"
  },
  "isomaltose": {
    "chebi_id": "4808",
    "hmdb_id": "HMDB0002923",
    "kegg_id": "C05400",
    "name": "Isomaltose",
    "smiles": "OC[C@H]1O[C@H](OC[C@H]2O[C@@H](O)[C@H](O)[C@@H](O)[C@@H]2O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "isovalericacid": {
    "chebi_id": "28484",
    "hmdb_id": "HMDB0000718",
    "kegg_id": "C08262",
    "name": "Isovaleric acid",
    "smiles": "CC(C)CC(=O)O"
  },
  "isovalerylcoa": {
    "chebi_id": "15487",
    "hmdb_id": "HMDB0001113",
    "kegg_id": "C02939",
    "name": "Isovaleryl-CoA",
    "smiles": "CC(C)CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "isovalerylcoenzymea": {
    "chebi_id": "15487",
    "hmdb_id": "HMDB0001113",
    "kegg_id": "C02939",
    "name": "Isovaleryl-CoA",
    "smiles": "CC(C)CC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "isovalerylglycine": {
    "chebi_id": "70984",
    "hmdb_id": "HMDB0000678",
    "kegg_id": "",
    "name": "Isovalerylglycine",
    "smiles": "CC(C)CC(=O)NCC(O)=O"
  },
  "ketoglutaricacid": {
    "chebi_id": "30915",
    "hmdb_id": "HMDB0000208",
    "kegg_id": "C00026",
    "name": "Oxoglutaric acid",
    "smiles": "OC(=O)CCC(=O)C(O)=O"
  },
  "ketoleucine": {
    "chebi_id": "48430",
    "hmdb_id": "HMDB0000695",
    "kegg_id": "C00233",
    "name": "Ketoleucine",
    "smiles": "CC(C)CC(=O)C(O)=O"
  },
  "l2aminobutyricacid": {
    "chebi_id": "35619",
    "hmdb_id": "HMDB0000452",
    "kegg_id": "C02356",
    "name": "L-Alpha-aminobutyric acid",
    "smiles": "CC[C@@H](C(=O)O)N"
  },
  "l2hydroxyglutaricacid": {
    "chebi_id": "32797",
    "hmdb_id": "HMDB0000694",
    "kegg_id": "C03196",
    "name": "L-2-Hydroxyglutaric acid",
    "smiles": "O[C@@H](CCC(O)=O)C(O)=O"
  },
  "laaspartyllphenylalanine": {
    "chebi_id": "73830",
    "hmdb_id": "HMDB0000706",
    "kegg_id": "",
    "name": "Aspartylphenylalanine",
    "smiles": "N[C@@H](CC(O)=O)C(=O)N[C@@H](CC1=CC=CC=C1)C(O)=O"
  },
  "lacetylcarnitine": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000201",
    "kegg_id": "C02571",
    "name": "L-Acetylcarnitine",
    "smiles": "CC(=O)OC(CC(=O)[O-])C[N+](C)(C)C"
  },
  "lalanine": {
    "chebi_id": "16977",
    "hmdb_id": "HMDB0000161",
    "kegg_id": "C00041",
    "name": "L-Alanine",
    "smiles": "C[C@H](N)C(O)=O"
  },
  "lalloisoleucine": {
    "chebi_id": "43433",
    "hmdb_id": "HMDB0000557",
    "kegg_id": "",
    "name": "L-Alloisoleucine",
    "smiles": "CC[C@@H](C)[C@H](N)C(O)=O"
  },
  "lalphaaminobutyricacid": {
    "chebi_id": "35619",
    "hmdb_id": "HMDB0000452",
    "kegg_id": "C02356",
    "name": "L-Alpha-aminobutyric acid",
    "smiles": "CC[C@@H](C(=O)O)N"
  },
  "lalphaglycerophosphorylcholine": {
    "chebi_id": "16870",
    "hmdb_id": "HMDB0000086",
    "kegg_id": "C00670",
    "name": "Glycerophosphocholine",
    "smiles": "C[N+](C)(C)CCOP([O-])(=O)OC[C@H](O)CO"
  },
  "larabinose": {
    "chebi_id": "17535",
    "hmdb_id": "HMDB0000646",
    "kegg_id": "C00259",
    "name": "L-Arabinose",
    "smiles": "O[C@H]1COC(O)[C@H](O)[C@H]1O"
  },
  "larabitol": {
    "chebi_id": "18403",
    "hmdb_id": "HMDB0001851",
    "kegg_id": "C00532",
    "name": "L-Arabitol",
    "smiles": "OC[C@H](O)C(O)[C@@H](O)CO"
  },
  "larginine": {
    "chebi_id": "16467",
    "hmdb_id": "HMDB0000517",
    "kegg_id": "C00062",
    "name": "L-Arginine",
    "smiles": "N[C@@H](CCCNC(N)=N)C(O)=O"
  },
  "lasparagine": {
    "chebi_id": "17196",
    "hmdb_id": "HMDB0000168",
    "kegg_id": "C00152",
    "name": "L-Asparagine",
    "smiles": "N[C@@H](CC(N)=O)C(O)=O"
  },
  "laspartate": {
    "chebi_id": "17053",
    "hmdb_id": "HMDB0000191",
    "kegg_id": "C00049",
    "name": "L-Aspartic acid",
    "smiles": "N[C@@H](CC(O)=O)C(O)=O"
  },
  "lasparticacid": {
    "chebi_id": "17053",
    "hmdb_id": "HMDB0000191",
    "kegg_id": "C00049",
    "name": "L-Aspartic acid",
    "smiles": "N[C@@H](CC(O)=O)C(O)=O"
  },
  "lcarnitine": {
    "chebi_id": "16347",
    "hmdb_id": "HMDB0000062",
    "kegg_id": "C00318",
    "name": "L-Carnitine",
    "smiles": "C[N+](C)(C)C[C@H](O)CC([O-])=O"
  },
  "lcarnosine": {
    "chebi_id": "15727",
    "hmdb_id": "HMDB0000033",
    "kegg_id": "C00386",
    "name": "Carnosine",
    "smiles": "NCCC(=O)N[C@@H](CC1=CN=CN1)C(O)=O"
  },
  "lcitrulline": {
    "chebi_id": "16349",
    "hmdb_id": "HMDB0000904",
    "kegg_id": "C00327",
    "name": "Citrulline",
    "smiles": "N[C@@H](CCCNC(N)=O)C(O)=O"
  },
  "lcystathionine": {
    "chebi_id": "17482",
    "hmdb_id": "HMDB0000099",
    "kegg_id": "C02291",
    "name": "L-Cystathionine",
    "smiles": "N[C@@H](CCSC[C@H](N)C(O)=O)C(O)=O"
  },
  "lcysteicacid": {
    "chebi_id": "21260",
    "hmdb_id": "HMDB0002757",
    "kegg_id": "C00506",
    "name": "Cysteic acid",
    "smiles": "NC(CS(O)(=O)=O)C(O)=O"
  },
  "lcysteine": {
    "chebi_id": "17561",
    "hmdb_id": "HMDB0000574",
    "kegg_id": "C00097",
    "name": "L-Cysteine",
    "smiles": "N[C@@H](CS)C(O)=O"
  },
  "lcystine": {
    "chebi_id": "16283",
    "hmdb_id": "HMDB0000192",
    "kegg_id": "C00491",
    "name": "L-Cystine",
    "smiles": "N[C@@H](CSSC[C@H](N)C(O)=O)C(O)=O"
  },
  "ldihydrooroticacid": {
    "chebi_id": "30865",
    "hmdb_id": "HMDB0000528",
    "kegg_id": "C00337",
    "name": "4,5-Dihydroorotic acid",
    "smiles": "OC(=O)C1CC(=O)NC(=O)N1"
  },
  "leucinicacid": {
    "chebi_id": "59783",
    "hmdb_id": "HMDB0000665",
    "kegg_id": "",
    "name": "Leucinic acid",
    "smiles": "CC(C)CC(C(=O)O)O"
  },
  "lfucose": {
    "chebi_id": "62346",
    "hmdb_id": "HMDB0000174",
    "kegg_id": "C01019",
    "name": "L-Fucose",
    "smiles": "C[C@H]1[C@H]([C@H]([C@@H](C(O1)O)O)O)O"
  },
  "lfucose1phosphate": {
    "chebi_id": "28319",
    "hmdb_id": "HMDB0001265",
    "kegg_id": "C02985",
    "name": "Fucose 1-phosphate",
    "smiles": "C[C@@H]1OC(OP(O)(O)=O)[C@@H](O)[C@H](O)[C@@H]1O"
  },
  "lglutamicacid": {
    "chebi_id": "16015",
    "hmdb_id": "HMDB0000148",
    "kegg_id": "C00025",
    "name": "L-Glutamic acid",
    "smiles": "N[C@@H](CCC(O)=O)C(O)=O"
  },
  "lglutamine": {
    "chebi_id": "18050",
    "hmdb_id": "HMDB0000641",
    "kegg_id": "C00064",
    "name": "L-Glutamine",
    "smiles": "N[C@@H](CCC(N)=O)C(O)=O"
  },
  "lgulonicacidgammalactone": {
    "chebi_id": "17587",
    "hmdb_id": "HMDB0003466",
    "kegg_id": "C01040",
    "name": "L-Gulonolactone",
    "smiles": "[H][C@@]1(OC(=O)[C@@H](O)[C@H]1O)[C@@H](O)CO"
  },
  "lgulonolactone": {
    "chebi_id": "17587",
    "hmdb_id": "HMDB0003466",
    "kegg_id": "C01040",
    "name": "L-Gulonolactone",
    "smiles": "[H][C@@]1(OC(=O)[C@@H](O)[C@H]1O)[C@@H](O)CO"
  },
  "lhistidine": {
    "chebi_id": "15971",
    "hmdb_id": "HMDB0000177",
    "kegg_id": "C00135",
    "name": "L-Histidine",
    "smiles": "N[C@@H](CC1=CN=CN1)C(O)=O"
  },
  "lhydroxyglutaricacid": {
    "chebi_id": "32797",
    "hmdb_id": "HMDB0000694",
    "kegg_id": "C03196",
    "name": "L-2-Hydroxyglutaric acid",
    "smiles": "O[C@@H](CCC(O)=O)C(O)=O"
  },
  "lisoleucine": {
    "chebi_id": "17191",
    "hmdb_id": "HMDB0000172",
    "kegg_id": "C00407",
    "name": "L-Isoleucine",
    "smiles": "CC[C@H](C)[C@@H](C(=O)O)N"
  },
  "lkynurenine": {
    "chebi_id": "16946",
    "hmdb_id": "HMDB0000684",
    "kegg_id": "C00328",
    "name": "L-Kynurenine",
    "smiles": "N[C@@H](CC(=O)C1=CC=CC=C1N)C(O)=O"
  },
  "llacticacid": {
    "chebi_id": "422",
    "hmdb_id": "HMDB0000190",
    "kegg_id": "C00186",
    "name": "L-Lactic acid",
    "smiles": "C[C@H](O)C(O)=O"
  },
  "lleucine": {
    "chebi_id": "15603",
    "hmdb_id": "HMDB0000687",
    "kegg_id": "C00123",
    "name": "L-Leucine",
    "smiles": "CC(C)C[C@H](N)C(O)=O"
  },
  "llysine": {
    "chebi_id": "18019",
    "hmdb_id": "HMDB0000182",
    "kegg_id": "C00047",
    "name": "L-Lysine",
    "smiles": "NCCCC[C@H](N)C(O)=O"
  },
  "lmalicacid": {
    "chebi_id": "30797",
    "hmdb_id": "HMDB0000156",
    "kegg_id": "C00149",
    "name": "L-Malic acid",
    "smiles": "O[C@@H](CC(O)=O)C(O)=O"
  },
  "lmethionine": {
    "chebi_id": "16643",
    "hmdb_id": "HMDB0000696",
    "kegg_id": "C00073",
    "name": "L-Methionine",
    "smiles": "CSCC[C@H](N)C(O)=O"
  },
  "lornithine": {
    "chebi_id": "15729",
    "hmdb_id": "HMDB0000214",
    "kegg_id": "C00077",
    "name": "Ornithine",
    "smiles": "NCCC[C@H](N)C(O)=O"
  },
  "lphenylalanine": {
    "chebi_id": "17295",
    "hmdb_id": "HMDB0000159",
    "kegg_id": "C00079",
    "name": "L-Phenylalanine",
    "smiles": "N[C@@H](CC1=CC=CC=C1)C(O)=O"
  },
  "lpipecolicacid": {
    "chebi_id": "30913",
    "hmdb_id": "HMDB0000716",
    "kegg_id": "C00408",
    "name": "L-Pipecolic acid",
    "smiles": "OC(=O)[C@@H]1CCCCN1"
  },
  "lproline": {
    "chebi_id": "17203",
    "hmdb_id": "HMDB0000162",
    "kegg_id": "C00148",
    "name": "L-Proline",
    "smiles": "OC(=O)[C@@H]1CCCN1"
  },
  "lpyroglutamicacid": {
    "chebi_id": "18183",
    "hmdb_id": "HMDB0000267",
    "kegg_id": "C01879",
    "name": "Pyroglutamic acid",
    "smiles": "OC(=O)[C@@H]1CCC(=O)N1"
  },
  "lribulose": {
    "chebi_id": "16880",
    "hmdb_id": "HMDB0003371",
    "kegg_id": "C00508",
    "name": "L-Ribulose",
    "smiles": "OC[C@]1(O)OC[C@H](O)[C@@H]1O"
  },
  "lsaccharopine": {
    "chebi_id": "16927",
    "hmdb_id": "HMDB0000279",
    "kegg_id": "C00449",
    "name": "Saccharopine",
    "smiles": "N[C@@H](CCCCN[C@@H](CCC(O)=O)C(O)=O)C(O)=O"
  },
  "lserine": {
    "chebi_id": "17115",
    "hmdb_id": "HMDB0000187",
    "kegg_id": "C00065",
    "name": "L-Serine",
    "smiles": "N[C@@H](CO)C(O)=O"
  },
  "lthreonine": {
    "chebi_id": "16857",
    "hmdb_id": "HMDB0000167",
    "kegg_id": "C00188",
    "name": "L-Threonine",
    "smiles": "C[C@@H](O)[C@H](N)C(O)=O"
  },
  "ltryptophan": {
    "chebi_id": "16828",
    "hmdb_id": "HMDB0000929",
    "kegg_id": "C00078",
    "name": "L-Tryptophan",
    "smiles": "N[C@@H](CC1=CNC2=C1C=CC=C2)C(O)=O"
  },
  "ltyrosine": {
    "chebi_id": "17895",
    "hmdb_id": "HMDB0000158",
    "kegg_id": "C00082",
    "name": "L-Tyrosine",
    "smiles": "N[C@@H](CC1=CC=C(O)C=C1)C(O)=O"
  },
  "lvaline": {
    "chebi_id": "16414",
    "hmdb_id": "HMDB0000883",
    "kegg_id": "C00183",
    "name": "L-Valine",
    "smiles": "CC(C)[C@H](N)C(O)=O"
  },
  "maleicacid": {
    "chebi_id": "18300",
    "hmdb_id": "HMDB0000176",
    "kegg_id": "C01384",
    "name": "Maleic acid",
    "smiles": "OC(=O)\\C=C/C(O)=O"
  },
  "malonylcoa": {
    "chebi_id": "15531",
    "hmdb_id": "HMDB0001175",
    "kegg_id": "C00083",
    "name": "Malonyl-CoA",
    "smiles": "CC(C)(COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)C(C(=O)NCCC(=O)NCCSC(=O)CC(=O)O)O"
  },
  "malonylcoenzymea": {
    "chebi_id": "15531",
    "hmdb_id": "HMDB0001175",
    "kegg_id": "C00083",
    "name": "Malonyl-CoA",
    "smiles": "CC(C)(COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)C(C(=O)NCCC(=O)NCCSC(=O)CC(=O)O)O"
  },
  "mandelicacid": {
    "chebi_id": "32800",
    "hmdb_id": "HMDB0000703",
    "kegg_id": "C01984",
    "name": "Mandelic acid",
    "smiles": "O[C@H](C(O)=O)C1=CC=CC=C1"
  },
  "mannose1phosphate": {
    "chebi_id": "18205",
    "hmdb_id": "HMDB0006330",
    "kegg_id": "C00636",
    "name": "D-Mannose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@@H](O)[C@@H](O)[C@@H]1O"
  },
  "mannose6phosphate": {
    "chebi_id": "49728",
    "hmdb_id": "HMDB0001078",
    "kegg_id": "C00275",
    "name": "Mannose 6-phosphate",
    "smiles": "O[C@@H]1O[C@H](COP(O)(O)=O)[C@@H](O)[C@H](O)[C@@H]1O"
  },
  "melibiose": {
    "chebi_id": "4808",
    "hmdb_id": "HMDB0000048",
    "kegg_id": "C05402",
    "name": "Melibiose",
    "smiles": "OC[C@H]1O[C@H](OC[C@H]2O[C@H](O)[C@H](O)[C@@H](O)[C@H]2O)[C@@H](O)[C@@H](O)[C@@H]1O"
  },
  "metanephrine": {
    "chebi_id": "144365",
    "hmdb_id": "HMDB0004063",
    "kegg_id": "C05588",
    "name": "Metanephrine",
    "smiles": "CNCC(O)C1=CC(OC)=C(O)C=C1"
  },
  "methylglutaricacid": {
    "chebi_id": "68566",
    "hmdb_id": "HMDB0000752",
    "kegg_id": "",
    "name": "Methylglutaric acid",
    "smiles": "CC(CC(=O)O)CC(=O)O"
  },
  "methylmalonicacid": {
    "chebi_id": "30860",
    "hmdb_id": "HMDB0000202",
    "kegg_id": "C02170",
    "name": "Methylmalonic acid",
    "smiles": "CC(C(=O)O)C(=O)O"
  },
  "myoinositol": {
    "chebi_id": "17268",
    "hmdb_id": "HMDB0000211",
    "kegg_id": "C00137",
    "name": "Myoinositol",
    "smiles": "O[C@H]1[C@H](O)[C@@H](O)[C@H](O)[C@H](O)[C@@H]1O"
  },
  "n2acetylllysine": {
    "chebi_id": "35704",
    "hmdb_id": "HMDB0000446",
    "kegg_id": "C12989",
    "name": "N-alpha-Acetyl-L-lysine",
    "smiles": "CC(=O)N[C@@H](CCCCN)C(O)=O"
  },
  "n2furoylglycine": {
    "chebi_id": "82912",
    "hmdb_id": "HMDB0000439",
    "kegg_id": "",
    "name": "2-Furoylglycine",
    "smiles": "OC(=O)CNC(=O)C1=CC=CO1"
  },
  "n5formylthf": {
    "chebi_id": "209153",
    "hmdb_id": "HMDB01562",
    "kegg_id": "C03479",
    "name": "N5-Formyl-THF",
    "smiles": "C1C(N(C2=C(N1)NC(=NC2=O)N)C=O)CNC3=CC=C(C=C3)C(=O)NC(CCC(=O)O)C(=O)O"
  },
  "n6acetylllysine": {
    "chebi_id": "17752",
    "hmdb_id": "HMDB0000206",
    "kegg_id": "C02727",
    "name": "N6-Acetyl-L-lysine",
    "smiles": "CC(=O)NCCCC[C@H](N)C(O)=O"
  },
  "naacetyllornithine": {
    "chebi_id": "16543",
    "hmdb_id": "HMDB0003357",
    "kegg_id": "C00437",
    "name": "N-Acetylornithine",
    "smiles": "CC(=O)N[C@@H](CCCN)C(O)=O"
  },
  "nacetyl5hydroxytryptamine": {
    "chebi_id": "17697",
    "hmdb_id": "HMDB0001238",
    "kegg_id": "C00978",
    "name": "N-Acetylserotonin",
    "smiles": "CC(=O)NCCC1=CNC2=C1C=C(O)C=C2"
  },
  "nacetylaspartylglutamicacid": {
    "chebi_id": "73688",
    "hmdb_id": "HMDB0001067",
    "kegg_id": "C12270",
    "name": "N-Acetylaspartylglutamic acid",
    "smiles": "CC(=O)N[C@@H](CC(O)=O)C(=O)N[C@@H](CCC(O)=O)C(O)=O"
  },
  "nacetylaspglu": {
    "chebi_id": "73688",
    "hmdb_id": "HMDB0001067",
    "kegg_id": "C12270",
    "name": "N-Acetylaspartylglutamic acid",
    "smiles": "CC(=O)N[C@@H](CC(O)=O)C(=O)N[C@@H](CCC(O)=O)C(O)=O"
  },
  "nacetyldgalactosamine": {
    "chebi_id": "40356",
    "hmdb_id": "HMDB0000212",
    "kegg_id": "C01074",
    "name": "N-Acetylgalactosamine",
    "smiles": "CC(=O)N[C@H]1[C@@H](O)O[C@H](CO)[C@H](O)[C@@H]1O"
  },
  "nacetyldglucosamine": {
    "chebi_id": "506227",
    "hmdb_id": "HMDB0000215",
    "kegg_id": "C00140",
    "name": "N-Acetyl-D-glucosamine",
    "smiles": "CC(=O)N[C@H]1C(O)O[C@H](CO)[C@@H](O)[C@@H]1O"
  },
  "nacetyldglucosamine1phosphate": {
    "chebi_id": "7125",
    "hmdb_id": "HMDB0001367",
    "kegg_id": "C04501",
    "name": "N-Acetyl-glucosamine 1-phosphate",
    "smiles": "CC(=O)N[C@@H]1[C@H]([C@@H]([C@H](OC1OP(=O)(O)O)CO)O)O"
  },
  "nacetyldglucosamine6phosphate": {
    "chebi_id": "15784",
    "hmdb_id": "HMDB0001062",
    "kegg_id": "C00357",
    "name": "N-Acetyl-D-Glucosamine 6-Phosphate",
    "smiles": "CC(=O)N[C@H]1C(O)O[C@H](COP(O)(O)=O)[C@@H](O)[C@@H]1O"
  },
  "nacetyldmannosamine": {
    "chebi_id": "63154",
    "hmdb_id": "HMDB0001129",
    "kegg_id": "C00645",
    "name": "N-Acetylmannosamine",
    "smiles": "CC(=O)N[C@@H]1[C@H](O)O[C@H](CO)[C@@H](O)[C@@H]1O"
  },
  "nacetylgalactosamine": {
    "chebi_id": "40356",
    "hmdb_id": "HMDB0000212",
    "kegg_id": "C01074",
    "name": "N-Acetylgalactosamine",
    "smiles": "CC(=O)N[C@H]1[C@@H](O)O[C@H](CO)[C@H](O)[C@@H]1O"
  },
  "nacetylglucosamine1phosphate": {
    "chebi_id": "7125",
    "hmdb_id": "HMDB0001367",
    "kegg_id": "C04501",
    "name": "N-Acetyl-glucosamine 1-phosphate",
    "smiles": "CC(=O)N[C@@H]1[C@H]([C@@H]([C@H](OC1OP(=O)(O)O)CO)O)O"
  },
  "nacetylglutamicacid": {
    "chebi_id": "17533",
    "hmdb_id": "HMDB0001138",
    "kegg_id": "C00624",
    "name": "N-Acetylglutamic acid",
    "smiles": "CC(=O)N[C@@H](CCC(O)=O)C(O)=O"
  },
  "nacetyllalanine": {
    "chebi_id": "40992",
    "hmdb_id": "HMDB0000766",
    "kegg_id": "",
    "name": "N-Acetyl-L-alanine",
    "smiles": "C[C@H](NC(C)=O)C(O)=O"
  },
  "nacetyllaspartate": {
    "chebi_id": "21547",
    "hmdb_id": "HMDB0000812",
    "kegg_id": "C01042",
    "name": "N-Acetyl-L-aspartic acid",
    "smiles": "CC(=O)N[C@@H](CC(O)=O)C(O)=O"
  },
  "nacetyllasparticacid": {
    "chebi_id": "21547",
    "hmdb_id": "HMDB0000812",
    "kegg_id": "C01042",
    "name": "N-Acetyl-L-aspartic acid",
    "smiles": "CC(=O)N[C@@H](CC(O)=O)C(O)=O"
  },
  "nacetyllglutamicacid": {
    "chebi_id": "17533",
    "hmdb_id": "HMDB0001138",
    "kegg_id": "C00624",
    "name": "N-Acetylglutamic acid",
    "smiles": "CC(=O)N[C@@H](CCC(O)=O)C(O)=O"
  },
  "nacetylmannosamine": {
    "chebi_id": "63154",
    "hmdb_id": "HMDB0001129",
    "kegg_id": "C00645",
    "name": "N-Acetylmannosamine",
    "smiles": "CC(=O)N[C@@H]1[C@H](O)O[C@H](CO)[C@@H](O)[C@@H]1O"
  },
  "nacetylmuramate": {
    "chebi_id": "21615",
    "hmdb_id": "HMDB0060493",
    "kegg_id": "C02713",
    "name": "N-Acetylmuramate",
    "smiles": "[H][C@](C)(O[C@@]1([H])[C@]([H])(O)[C@@]([H])(CO)OC([H])(O)[C@]1([H])N=C(C)O)C(O)=O"
  },
  "nacetylmuramicacid": {
    "chebi_id": "21615",
    "hmdb_id": "HMDB0060493",
    "kegg_id": "C02713",
    "name": "N-Acetylmuramate",
    "smiles": "[H][C@](C)(O[C@@]1([H])[C@]([H])(O)[C@@]([H])(CO)OC([H])(O)[C@]1([H])N=C(C)O)C(O)=O"
  },
  "nacetylneuraminicacid": {
    "chebi_id": "45744",
    "hmdb_id": "HMDB0000230",
    "kegg_id": "C19910",
    "name": "N-Acetylneuraminic acid",
    "smiles": "[H][C@]1(O[C@@](O)(C[C@H](O)[C@H]1NC(C)=O)C(O)=O)[C@H](O)[C@H](O)CO"
  },
  "nacetylornithine": {
    "chebi_id": "16543",
    "hmdb_id": "HMDB0003357",
    "kegg_id": "C00437",
    "name": "N-Acetylornithine",
    "smiles": "CC(=O)N[C@@H](CCCN)C(O)=O"
  },
  "nacetylputrescine": {
    "chebi_id": "17768",
    "hmdb_id": "HMDB0002064",
    "kegg_id": "C02714",
    "name": "N-Acetylputrescine",
    "smiles": "CC(=O)NCCCCN"
  },
  "nacetylserotonin": {
    "chebi_id": "17697",
    "hmdb_id": "HMDB0001238",
    "kegg_id": "C00978",
    "name": "N-Acetylserotonin",
    "smiles": "CC(=O)NCCC1=CNC2=C1C=C(O)C=C2"
  },
  "nad": {
    "chebi_id": "16908",
    "hmdb_id": "HMDB0001487",
    "kegg_id": "C00004",
    "name": "NAD",
    "smiles": "NC(=O)C1=CN(C=CC1)[C@@H]1O[C@H](CO[P@](O)(=O)O[P@](O)(=O)OC[C@H]2O[C@H]([C@H](O)[C@@H]2O)N2C=NC3=C(N)N=CN=C23)[C@@H](O)[C@H]1O"
  },
  "nadh": {
    "chebi_id": "44215",
    "hmdb_id": "HMDB0000902",
    "kegg_id": "C00003",
    "name": "NADH",
    "smiles": "NC(=O)C1=C[N+](=CC=C1)[C@@H]1O[C@H](COP([O-])(=O)OP(O)(=O)OC[C@H]2O[C@H]([C@H](O)[C@@H]2O)N2C=NC3=C2N=CN=C3N)[C@@H](O)[C@H]1O"
  },
  "nadp": {
    "chebi_id": "44409",
    "hmdb_id": "HMDB0000217",
    "kegg_id": "C00006",
    "name": "NADP",
    "smiles": "NC(=O)C1=C[N+](=CC=C1)[C@@H]1O[C@H](COP([O-])(=O)OP(O)(=O)OC[C@H]2O[C@H]([C@H](OP(O)(O)=O)[C@@H]2O)N2C=NC3=C2N=CN=C3N)[C@@H](O)[C@H]1O"
  },
  "nadph": {
    "chebi_id": "44409",
    "hmdb_id": "HMDB0000217",
    "kegg_id": "C00006",
    "name": "NADPH",
    "smiles": "NC(=O)C1=C[N+](=CC=C1)[C@@H]1O[C@H](COP([O-])(=O)OP(O)(=O)OC[C@H]2O[C@H]([C@H](OP(O)(O)=O)[C@@H]2O)N2C=NC3=C2N=CN=C3N)[C@@H](O)[C@H]1O"
  },
  "nalphaacetylllysine": {
    "chebi_id": "35704",
    "hmdb_id": "HMDB0000446",
    "kegg_id": "C12989",
    "name": "N-Alpha-acetyllysine",
    "smiles": "CC(=O)NC(CCCCN)C(=O)O"
  },
  "nalphaacetyllysine": {
    "chebi_id": "35704",
    "hmdb_id": "HMDB0000446",
    "kegg_id": "C12989",
    "name": "N-Alpha-acetyllysine",
    "smiles": "CC(=O)NC(CCCCN)C(=O)O"
  },
  "neacetyllysine": {
    "chebi_id": "17752",
    "hmdb_id": "HMDB0000206",
    "kegg_id": "C02727",
    "name": "N6-Acetyl-L-lysine",
    "smiles": "CC(=O)NCCCC[C@H](N)C(O)=O"
  },
  "nformylanthranilicacid": {
    "chebi_id": "36575",
    "hmdb_id": "HMDB0004089",
    "kegg_id": "C05653",
    "name": "Formylanthranilic acid",
    "smiles": "OC(=O)C1=CC=CC=C1NC=O"
  },
  "nglycolylneuraminicacid": {
    "chebi_id": "62084",
    "hmdb_id": "HMDB0000833",
    "kegg_id": "C03410",
    "name": "N-Glycolylneuraminic acid",
    "smiles": "OC[C@@H](O)[C@@H](O)[C@@H]1O[C@@](O)(C[C@H](O)[C@H]1NC(=O)CO)C(O)=O"
  },
  "nhd": {
    "chebi_id": "",
    "hmdb_id": "",
    "kegg_id": "C04423",
    "name": "NHD",
    "smiles": "c1cc(c[n+](c1)[C@H]2[C@@H]([C@@H]([C@H](O2)COP(=O)(O)OP(=O)(O)OC[C@@H]3[C@H]([C@H]([C@@H](O3)n4cnc5c4[nH]cnc5=O)O)O)O)O)C(=O)N"
  },
  "nhexanoylglycine": {
    "chebi_id": "64390",
    "hmdb_id": "HMDB0000701",
    "kegg_id": "",
    "name": "Hexanoylglycine",
    "smiles": "CCCCCC(=O)NCC(O)=O"
  },
  "niacinamide": {
    "chebi_id": "17154",
    "hmdb_id": "HMDB0001406",
    "kegg_id": "C00153",
    "name": "Niacinamide",
    "smiles": "NC(=O)C1=CC=CN=C1"
  },
  "nicotinamide": {
    "chebi_id": "17154",
    "hmdb_id": "HMDB0001406",
    "kegg_id": "C00153",
    "name": "Niacinamide",
    "smiles": "NC(=O)C1=CC=CN=C1"
  },
  "nicotinamideadeninedinucleotide": {
    "chebi_id": "16908",
    "hmdb_id": "HMDB0001487",
    "kegg_id": "C00004",
    "name": "NAD",
    "smiles": "NC(=O)C1=CN(C=CC1)[C@@H]1O[C@H](CO[P@](O)(=O)O[P@](O)(=O)OC[C@H]2O[C@H]([C@H](O)[C@@H]2O)N2C=NC3=C(N)N=CN=C23)[C@@H](O)[C@H]1O"
  },
  "nicotinamidehypoxanthinedinucleotide": {
    "chebi_id": "",
    "hmdb_id": "",
    "kegg_id": "C04423",
    "name": "NHD",
    "smiles": "c1cc(c[n+](c1)[C@H]2[C@@H]([C@@H]([C@H](O2)COP(=O)(O)OP(=O)(O)OC[C@@H]3[C@H]([C@H]([C@@H](O3)n4cnc5c4[nH]cnc5=O)O)O)O)O)C(=O)N"
  },
  "nicotinamideribotide": {
    "chebi_id": "16171",
    "hmdb_id": "HMDB0000229",
    "kegg_id": "C00455",
    "name": "Nicotinamide ribotide",
    "smiles": "NC(=O)C1=CC=C[N+](=C1)[C@@H]1O[C@H](COP(O)([O-])=O)[C@@H](O)[C@H]1O"
  },
  "nicotinicacid": {
    "chebi_id": "15940",
    "hmdb_id": "HMDB0001488",
    "kegg_id": "C00253",
    "name": "Nicotinic acid",
    "smiles": "OC(=O)C1=CN=CC=C1"
  },
  "nisovalerylglycine": {
    "chebi_id": "70984",
    "hmdb_id": "HMDB0000678",
    "kegg_id": "",
    "name": "Isovalerylglycine",
    "smiles": "CC(C)CC(=O)NCC(O)=O"
  },
  "nmethyl4pyridone3carboxamide": {
    "chebi_id": "27838",
    "hmdb_id": "HMDB0004194",
    "kegg_id": "C05843",
    "name": "N1-Methyl-4-pyridone-3-carboxamide",
    "smiles": "CN1C=CC(=O)C(=C1)C(N)=O"
  },
  "nndiacetylchitobiose": {
    "chebi_id": "",
    "hmdb_id": "HMDB0003556",
    "kegg_id": "C01674",
    "name": "Chitobiose",
    "smiles": "CC(=O)N[C@H]1[C@H](O)O[C@H](CO)[C@@H](O[C@@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2NC(O)=O)[C@@H]1O"
  },
  "nndimethylglycine": {
    "chebi_id": "17724",
    "hmdb_id": "HMDB0000092",
    "kegg_id": "C01026",
    "name": "Dimethylglycine",
    "smiles": "CN(C)CC(O)=O"
  },
  "norepinephrine": {
    "chebi_id": "18357",
    "hmdb_id": "HMDB0000216",
    "kegg_id": "C00547",
    "name": "Norepinephrine",
    "smiles": "NC[C@H](O)C1=CC(O)=C(O)C=C1"
  },
  "oacetyllcarnitine": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000201",
    "kegg_id": "C02571",
    "name": "L-Acetylcarnitine",
    "smiles": "CC(=O)OC(CC(=O)[O-])C[N+](C)(C)C"
  },
  "octanoicacid": {
    "chebi_id": "28837",
    "hmdb_id": "HMDB0000482",
    "kegg_id": "C06423",
    "name": "Caprylic acid",
    "smiles": "CCCCCCCC(=O)O"
  },
  "octanoylcoa": {
    "chebi_id": "15533",
    "hmdb_id": "HMDB0001070",
    "kegg_id": "C01944",
    "name": "Octanoyl-CoA",
    "smiles": "CCCCCCCC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "octanoylcoenzymea": {
    "chebi_id": "15533",
    "hmdb_id": "HMDB0001070",
    "kegg_id": "C01944",
    "name": "Octanoyl-CoA",
    "smiles": "CCCCCCCC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OCC1C(C(C(O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "ophosphoethanolamine": {
    "chebi_id": "17553",
    "hmdb_id": "HMDB0000224",
    "kegg_id": "C00346",
    "name": "O-Phosphoethanolamine",
    "smiles": "NCCOP(O)(O)=O"
  },
  "ophospholserine": {
    "chebi_id": "15811",
    "hmdb_id": "HMDB0000272",
    "kegg_id": "C01005",
    "name": "Phosphoserine",
    "smiles": "N[C@@H](COP(O)(O)=O)C(O)=O"
  },
  "ophosphorylethanolamine": {
    "chebi_id": "17553",
    "hmdb_id": "HMDB0000224",
    "kegg_id": "C00346",
    "name": "O-Phosphoethanolamine",
    "smiles": "NCCOP(O)(O)=O"
  },
  "oroticacid": {
    "chebi_id": "16742",
    "hmdb_id": "HMDB0000226",
    "kegg_id": "C00295",
    "name": "Orotic acid",
    "smiles": "OC(=O)C1=CC(=O)NC(=O)N1"
  },
  "orotidine5monophosphate": {
    "chebi_id": "15842",
    "hmdb_id": "HMDB0000218",
    "kegg_id": "C01103",
    "name": "Orotidylic acid",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](O[C@@H]1COP(O)(O)=O)N1C(=O)NC(=O)C=C1C(O)=O"
  },
  "orotidylicacid": {
    "chebi_id": "15842",
    "hmdb_id": "HMDB0000218",
    "kegg_id": "C01103",
    "name": "Orotidylic acid",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](O[C@@H]1COP(O)(O)=O)N1C(=O)NC(=O)C=C1C(O)=O"
  },
  "orthohydroxyphenylaceticacid": {
    "chebi_id": "28478",
    "hmdb_id": "HMDB0000669",
    "kegg_id": "C05852",
    "name": "Ortho-Hydroxyphenylacetic acid",
    "smiles": "OC(=O)CC1=C(O)C=CC=C1"
  },
  "oxalaceticacid": {
    "chebi_id": "30744",
    "hmdb_id": "HMDB0000223",
    "kegg_id": "C00036",
    "name": "Oxalacetic acid",
    "smiles": "O=C(O)CC(=O)C(=O)O"
  },
  "oxaloaceticacid": {
    "chebi_id": "30744",
    "hmdb_id": "HMDB0000223",
    "kegg_id": "C00036",
    "name": "Oxalacetic acid",
    "smiles": "O=C(O)CC(=O)C(=O)O"
  },
  "oxidizedglutathione": {
    "chebi_id": "17858",
    "hmdb_id": "HMDB0003337",
    "kegg_id": "C00127",
    "name": "Oxidized glutathione",
    "smiles": "N[C@@H](CCC(=O)N[C@@H](CSSC[C@H](NC(=O)CC[C@H](N)C(O)=O)C(=O)NCC(O)=O)C(=O)NCC(O)=O)C(O)=O"
  },
  "oxitriptan": {
    "chebi_id": "17780",
    "hmdb_id": "HMDB0015571",
    "kegg_id": "C00643",
    "name": "Oxitriptan",
    "smiles": "C1=CC2=C(C=C1O)C(=CN2)C[C@@H](C(=O)O)N"
  },
  "oxoadipicacid": {
    "chebi_id": "15753",
    "hmdb_id": "HMDB0000225",
    "kegg_id": "C00322",
    "name": "Oxoadipic acid",
    "smiles": "O=C(O)CCCC(=O)C(=O)O"
  },
  "oxoglutaricacid": {
    "chebi_id": "30915",
    "hmdb_id": "HMDB0000208",
    "kegg_id": "C00026",
    "name": "Oxoglutaric acid",
    "smiles": "OC(=O)CCC(=O)C(O)=O"
  },
  "pantothenicacid": {
    "chebi_id": "46905",
    "hmdb_id": "HMDB0000210",
    "kegg_id": "C00864",
    "name": "Pantothenic acid",
    "smiles": "CC(C)(CO)[C@@H](O)C(=O)NCCC(O)=O"
  },
  "phenethylamine": {
    "chebi_id": "18397",
    "hmdb_id": "HMDB0012275",
    "kegg_id": "C05332",
    "name": "Phenylethylamine",
    "smiles": "NCCC1=CC=CC=C1"
  },
  "phenylethylamine": {
    "chebi_id": "18397",
    "hmdb_id": "HMDB0012275",
    "kegg_id": "C05332",
    "name": "Phenylethylamine",
    "smiles": "NCCC1=CC=CC=C1"
  },
  "phenylpyruvate": {
    "chebi_id": "30851",
    "hmdb_id": "HMDB0000205",
    "kegg_id": "C00166",
    "name": "Phenylpyruvic acid",
    "smiles": "OC(=O)C(=O)CC1=CC=CC=C1"
  },
  "phosphatidicacid": {
    "chebi_id": "",
    "hmdb_id": "",
    "kegg_id": "C00350",
    "name": "Phosphatidic acid",
    "smiles": "O=P(O)(OC[C@H](OC(=O)CCCCC)COC(=O)CCCCC)O"
  },
  "phosphatidylcholine": {
    "chebi_id": "",
    "hmdb_id": NaN,
    "kegg_id": "C00157",
    "name": "Phosphatidylcholine",
    "smiles": "O=C(OCC(OC(=O)CC)COP([O-])(=O)OCC[N+](C)(C)C)CC"
  },
  "phosphatidylethanolamine": {
    "chebi_id": "47767",
    "hmdb_id": "HMDB0060501",
    "kegg_id": "C00416",
    "name": "Phosphatidylethanolamine",
    "smiles": "[H][C@](COC(=O)CCCCCCCCCCCCCCCCC)(COP(O)(=O)OCCN)OC(=O)CCCCCCCCCCCCCCCCC"
  },
  "phosphatidylglycerol": {
    "chebi_id": "17517",
    "hmdb_id": "METPA0033",
    "kegg_id": "C00344",
    "name": "Phosphatidylglycerol",
    "smiles": "CCCCCC(=O)OC[C@H](COP(=O)([O-])OCC(CO)O)OC(=O)CCCCC"
  },
  "phosphatidylinositol345trisphosphate": {
    "chebi_id": "16618",
    "hmdb_id": "HMDB0004249",
    "kegg_id": "C05981",
    "name": "Phosphatidylinositol-3,4,5-trisphosphate",
    "smiles": "CC(=O)OC(COP(O)(=O)O[C@@H]1[C@H](O)[C@H](OP(O)(O)=O)[C@@H](OP(O)(O)=O)[C@H](OP(O)(O)=O)[C@H]1O)OC(C)=O"
  },
  "phosphatidylserine": {
    "chebi_id": "84523",
    "hmdb_id": "HMDB0000614",
    "kegg_id": "C02737",
    "name": "PS(16:0/16:0)",
    "smiles": "CCCCCCCCCCCCCCCC(=O)OCC(COP(=O)(O)OC[C@@H](C(=O)O)N)OC(=O)CCCCCCCCCCCCCCC"
  },
  "phosphoadenosinephosphosulfate": {
    "chebi_id": "17980",
    "hmdb_id": "HMDB0001134",
    "kegg_id": "C00053",
    "name": "Phosphoadenosine phosphosulfate",
    "smiles": "NC1=NC=NC2=C1N=CN2[C@@H]1O[C@H](COP(O)(=O)OS(O)(=O)=O)[C@@H](OP(O)(O)=O)[C@H]1O"
  },
  "phosphocholine": {
    "chebi_id": "18132",
    "hmdb_id": "HMDB0001565",
    "kegg_id": "C00588",
    "name": "Phosphorylcholine",
    "smiles": "C[N+](C)(C)CCOP(O)(O)=O"
  },
  "phosphocreatine": {
    "chebi_id": "17287",
    "hmdb_id": "HMDB0001511",
    "kegg_id": "C02305",
    "name": "Phosphocreatine",
    "smiles": "CN(CC(O)=O)C(=N)NP(O)(O)=O"
  },
  "phosphoenolpyruvicacid": {
    "chebi_id": "44897",
    "hmdb_id": "HMDB0000263",
    "kegg_id": "C00074",
    "name": "Phosphoenolpyruvic acid",
    "smiles": "OC(=O)C(=C)OP(O)(O)=O"
  },
  "phosphoribosylpyrophosphate": {
    "chebi_id": "17111",
    "hmdb_id": "HMDB0000280",
    "kegg_id": "C00119",
    "name": "Phosphoribosyl pyrophosphate",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](OP(O)(=O)OP(O)(O)=O)O[C@@H]1COP(O)(O)=O"
  },
  "phosphorylcholine": {
    "chebi_id": "18132",
    "hmdb_id": "HMDB0001565",
    "kegg_id": "C00588",
    "name": "Phosphorylcholine",
    "smiles": "C[N+](C)(C)CCOP(O)(O)=O"
  },
  "phosphoserine": {
    "chebi_id": "15811",
    "hmdb_id": "HMDB0000272",
    "kegg_id": "C01005",
    "name": "Phosphoserine",
    "smiles": "N[C@@H](COP(O)(O)=O)C(O)=O"
  },
  "phydroxyphenylaceticacid": {
    "chebi_id": "18101",
    "hmdb_id": "HMDB0000020",
    "kegg_id": "C00642",
    "name": "p-Hydroxyphenylacetic acid",
    "smiles": "OC(=O)CC1=CC=C(O)C=C1"
  },
  "pip2": {
    "chebi_id": "",
    "hmdb_id": NaN,
    "kegg_id": "C04637",
    "name": "PIP2",
    "smiles": "CCCCCC(OC[C@H](COP(O[C@@H]1[C@H](O)[C@H](O)[C@@H](OP([O-])(O)=O)[C@H](OP([O])(O)=O)[C@H]1O)([O-])=O)OC(CCCCC)=O)=O"
  },
  "pip3": {
    "chebi_id": "16618",
    "hmdb_id": "HMDB0004249",
    "kegg_id": "C05981",
    "name": "Phosphatidylinositol-3,4,5-trisphosphate",
    "smiles": "CC(=O)OC(COP(O)(=O)O[C@@H]1[C@H](O)[C@H](OP(O)(O)=O)[C@@H](OP(O)(O)=O)[C@H](OP(O)(O)=O)[C@H]1O)OC(C)=O"
  },
  "porphobilinogen": {
    "chebi_id": "17381",
    "hmdb_id": "HMDB0000245",
    "kegg_id": "C00931",
    "name": "Porphobilinogen",
    "smiles": "NCC1=C(CC(O)=O)C(CCC(O)=O)=CN1"
  },
  "propionylcoa": {
    "chebi_id": "15539",
    "hmdb_id": "HMDB0001275",
    "kegg_id": "C00100",
    "name": "Propionyl-CoA",
    "smiles": "CCC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "propionylcoenzymea": {
    "chebi_id": "15539",
    "hmdb_id": "HMDB0001275",
    "kegg_id": "C00100",
    "name": "Propionyl-CoA",
    "smiles": "CCC(=O)SCCNC(=O)CCNC(=O)C(C(C)(C)COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)O"
  },
  "propionylglycine": {
    "chebi_id": "89836",
    "hmdb_id": "HMDB0000783",
    "kegg_id": "",
    "name": "Propionylglycine",
    "smiles": "CCC(=O)NCC(O)=O"
  },
  "prostaglandind2": {
    "chebi_id": "15555",
    "hmdb_id": "HMDB0001403",
    "kegg_id": "C00696",
    "name": "Prostaglandin D2",
    "smiles": "CCCCC[C@@H](/C=C/[C@@H]1[C@H]([C@H](CC1=O)O)C/C=C\\CCCC(=O)O)O"
  },
  "prostaglandine2": {
    "chebi_id": "15551",
    "hmdb_id": "HMDB0001220",
    "kegg_id": "C00584",
    "name": "Prostaglandin E2",
    "smiles": "CCCCC[C@@H](/C=C/[C@H]1[C@@H](CC(=O)[C@@H]1C/C=C\\CCCC(=O)O)O)O"
  },
  "prostaglandini2": {
    "chebi_id": "15552",
    "hmdb_id": "HMDB0001335",
    "kegg_id": "C01312",
    "name": "Prostaglandin I2",
    "smiles": "CCCCC[C@@H](/C=C/[C@H]1[C@@H](C[C@H]2[C@@H]1C/C(=C/CCCC(=O)O)/O2)O)O"
  },
  "ps160160": {
    "chebi_id": "84523",
    "hmdb_id": "HMDB0000614",
    "kegg_id": "C02737",
    "name": "PS(16:0/16:0)",
    "smiles": "CCCCCCCCCCCCCCCC(=O)OCC(COP(=O)(O)OC[C@@H](C(=O)O)N)OC(=O)CCCCCCCCCCCCCCC"
  },
  "putrescine": {
    "chebi_id": "17148",
    "hmdb_id": "HMDB0001414",
    "kegg_id": "C00134",
    "name": "Putrescine",
    "smiles": "NCCCCN"
  },
  "pyridoxal": {
    "chebi_id": "17310",
    "hmdb_id": "HMDB0001545",
    "kegg_id": "C00250",
    "name": "Pyridoxal",
    "smiles": "CC1=NC=C(CO)C(C=O)=C1O"
  },
  "pyridoxal5phosphate": {
    "chebi_id": "18405",
    "hmdb_id": "HMDB0001491",
    "kegg_id": "C00018",
    "name": "Pyridoxal 5'-phosphate",
    "smiles": "CC1=NC=C(COP(O)(O)=O)C(C=O)=C1O"
  },
  "pyridoxamine": {
    "chebi_id": "16410",
    "hmdb_id": "HMDB0001431",
    "kegg_id": "C00534",
    "name": "Pyridoxamine",
    "smiles": "CC1=C(O)C(CN)=C(CO)C=N1"
  },
  "pyridoxamine5phosphate": {
    "chebi_id": "18335",
    "hmdb_id": "HMDB0001555",
    "kegg_id": "C00647",
    "name": "Pyridoxamine 5'-phosphate",
    "smiles": "CC1=NC=C(COP(O)(O)=O)C(CN)=C1O"
  },
  "pyridoxine": {
    "chebi_id": "16709",
    "hmdb_id": "HMDB0000239",
    "kegg_id": "C00314",
    "name": "Pyridoxine",
    "smiles": "CC1=C(O)C(CO)=C(CO)C=N1"
  },
  "pyroglutamicacid": {
    "chebi_id": "18183",
    "hmdb_id": "HMDB0000267",
    "kegg_id": "C01879",
    "name": "Pyroglutamic acid",
    "smiles": "OC(=O)[C@@H]1CCC(=O)N1"
  },
  "pyrrolidonecarboxylicacid": {
    "chebi_id": "16924",
    "hmdb_id": "HMDB0000805",
    "kegg_id": "C02237",
    "name": "Pyrrolidonecarboxylic acid",
    "smiles": "OC(=O)C1CCC(=O)N1"
  },
  "pyruvate": {
    "chebi_id": "32816",
    "hmdb_id": "HMDB0000243",
    "kegg_id": "C00022",
    "name": "Pyruvic acid",
    "smiles": "CC(=O)C(=O)O"
  },
  "pyruvicacid": {
    "chebi_id": "32816",
    "hmdb_id": "HMDB0000243",
    "kegg_id": "C00022",
    "name": "Pyruvic acid",
    "smiles": "CC(=O)C(=O)O"
  },
  "quinolinicacid": {
    "chebi_id": "16675",
    "hmdb_id": "HMDB0000232",
    "kegg_id": "C03722",
    "name": "Quinolinic acid",
    "smiles": "OC(=O)C1=CC=CN=C1C(O)=O"
  },
  "r3hydroxybutyricacid": {
    "chebi_id": "17066",
    "hmdb_id": "HMDB0000011",
    "kegg_id": "C01089",
    "name": "(R)-3-Hydroxybutyric acid",
    "smiles": "C[C@@H](O)CC(O)=O"
  },
  "r3hydroxyisobutyricacid": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000336",
    "kegg_id": "",
    "name": "(R)-3-Hydroxyisobutyric acid",
    "smiles": "C[C@H](CO)C(O)=O"
  },
  "raffinose": {
    "chebi_id": "16634",
    "hmdb_id": "HMDB0003213",
    "kegg_id": "C00492",
    "name": "Raffinose",
    "smiles": "OC[C@H]1O[C@@](CO)(O[C@H]2O[C@H](CO[C@H]3O[C@H](CO)[C@H](O)[C@H](O)[C@H]3O)[C@@H](O)[C@H](O)[C@H]2O)[C@@H](O)[C@@H]1O"
  },
  "rhydroxyisobutyrate": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000336",
    "kegg_id": "",
    "name": "(R)-3-Hydroxyisobutyric acid",
    "smiles": "C[C@H](CO)C(O)=O"
  },
  "riboflavin": {
    "chebi_id": "17015",
    "hmdb_id": "HMDB0000244",
    "kegg_id": "C00255",
    "name": "Riboflavin",
    "smiles": "CC1=C(C)C=C2N(C[C@H](O)[C@H](O)[C@H](O)CO)C3=NC(=O)NC(=O)C3=NC2=C1"
  },
  "riboflavin5monophosphate": {
    "chebi_id": "17621",
    "hmdb_id": "HMDB0001520",
    "kegg_id": "C00061",
    "name": "Flavin Mononucleotide",
    "smiles": "CC1=CC2=C(C=C1C)N(C[C@H](O)[C@H](O)[C@H](O)COP(O)(O)=O)C1=NC(=O)NC(=O)C1=N2"
  },
  "ribose1phosphate": {
    "chebi_id": "16300",
    "hmdb_id": "HMDB0001489",
    "kegg_id": "C00620",
    "name": "Ribose 1-phosphate",
    "smiles": "OC[C@H]1O[C@H](OP(O)(O)=O)[C@H](O)[C@@H]1O"
  },
  "ribothymidine": {
    "chebi_id": "45996",
    "hmdb_id": "HMDB0000884",
    "kegg_id": "",
    "name": "Ribothymidine",
    "smiles": "CC1=CN([C@@H]2O[C@H](CO)[C@@H](O)[C@H]2O)C(=O)NC1=O"
  },
  "s3hydroxybutyricacid": {
    "chebi_id": "17290",
    "hmdb_id": "HMDB0000442",
    "kegg_id": "C03197",
    "name": "(S)-3-Hydroxybutyric acid",
    "smiles": "C[C@@H](CC(=O)O)O"
  },
  "s3hydroxyisobutyricacid": {
    "chebi_id": "37373",
    "hmdb_id": "HMDB0000023",
    "kegg_id": "C06001",
    "name": "(S)-3-Hydroxyisobutyric acid",
    "smiles": "C[C@@H](CO)C(O)=O"
  },
  "s5adenosyllhomocysteine": {
    "chebi_id": "16680",
    "hmdb_id": "HMDB0000939",
    "kegg_id": "C00021",
    "name": "S-Adenosylhomocysteine",
    "smiles": "N[C@@H](CCSC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC2=C1N=CN=C2N)C(O)=O"
  },
  "s5adenosyllmethionine": {
    "chebi_id": "15414",
    "hmdb_id": "HMDB0001185",
    "kegg_id": "C00019",
    "name": "S-Adenosylmethionine",
    "smiles": "C[S+](CC[C@H](N)C(O)=O)C[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC2=C1N=CN=C2N"
  },
  "saccharopine": {
    "chebi_id": "16927",
    "hmdb_id": "HMDB0000279",
    "kegg_id": "C00449",
    "name": "Saccharopine",
    "smiles": "N[C@@H](CCCCN[C@@H](CCC(O)=O)C(O)=O)C(O)=O"
  },
  "sadenosylhomocysteine": {
    "chebi_id": "16680",
    "hmdb_id": "HMDB0000939",
    "kegg_id": "C00021",
    "name": "S-Adenosylhomocysteine",
    "smiles": "N[C@@H](CCSC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC2=C1N=CN=C2N)C(O)=O"
  },
  "sadenosylmethionine": {
    "chebi_id": "15414",
    "hmdb_id": "HMDB0001185",
    "kegg_id": "C00019",
    "name": "S-Adenosylmethionine",
    "smiles": "C[S+](CC[C@H](N)C(O)=O)C[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC2=C1N=CN=C2N"
  },
  "sarcosine": {
    "chebi_id": "15611",
    "hmdb_id": "HMDB0000271",
    "kegg_id": "C00213",
    "name": "Sarcosine",
    "smiles": "CNCC(O)=O"
  },
  "senecioicacid": {
    "chebi_id": "37127",
    "hmdb_id": "HMDB0000509",
    "kegg_id": "",
    "name": "Senecioic acid",
    "smiles": "CC(=CC(=O)O)C"
  },
  "shydroxyisobutyrate": {
    "chebi_id": "37373",
    "hmdb_id": "HMDB0000023",
    "kegg_id": "C06001",
    "name": "(S)-3-Hydroxyisobutyric acid",
    "smiles": "C[C@@H](CO)C(O)=O"
  },
  "slactoylglutathione": {
    "chebi_id": "15694",
    "hmdb_id": "HMDB0001066",
    "kegg_id": "C03451",
    "name": "S-Lactoylglutathione",
    "smiles": "C[C@@H](O)C(=O)SC[C@H](NC(=O)CC[C@H](N)C(O)=O)C(=O)NCC(O)=O"
  },
  "stachyose": {
    "chebi_id": "17164",
    "hmdb_id": "HMDB0003553",
    "kegg_id": "C01613",
    "name": "Stachyose",
    "smiles": "OC[C@H]1O[C@@](CO)(O[C@H]2O[C@H](CO[C@H]3O[C@H](CO[C@H]4O[C@H](CO)[C@H](O)[C@H](O)[C@H]4O)[C@H](O)[C@H](O)[C@H]3O)[C@@H](O)[C@H](O)[C@H]2O)[C@@H](O)[C@@H]1O"
  },
  "succinicacid": {
    "chebi_id": "15741",
    "hmdb_id": "HMDB0000254",
    "kegg_id": "C00042",
    "name": "Succinic acid",
    "smiles": "O=C(O)CCC(=O)O"
  },
  "succinylacetone": {
    "chebi_id": "87897",
    "hmdb_id": "HMDB0000635",
    "kegg_id": "",
    "name": "Succinylacetone",
    "smiles": "CC(=O)CC(=O)CCC(O)=O"
  },
  "succinylcoa": {
    "chebi_id": "15380",
    "hmdb_id": "HMDB0001022",
    "kegg_id": "C00091",
    "name": "Succinyl-CoA",
    "smiles": "CC(C)(COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)C(C(=O)NCCC(=O)NCCSC(=O)CCC(=O)O)O"
  },
  "succinylcoenzymea": {
    "chebi_id": "15380",
    "hmdb_id": "HMDB0001022",
    "kegg_id": "C00091",
    "name": "Succinyl-CoA",
    "smiles": "CC(C)(COP(=O)(O)OP(=O)(O)OC[C@@H]1[C@H]([C@H]([C@@H](O1)N2C=NC3=C2N=CN=C3N)O)OP(=O)(O)O)C(C(=O)NCCC(=O)NCCSC(=O)CCC(=O)O)O"
  },
  "sucrose": {
    "chebi_id": "17992",
    "hmdb_id": "HMDB0000258",
    "kegg_id": "C00089",
    "name": "Sucrose",
    "smiles": "OC[C@H]1O[C@@](CO)(O[C@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O)[C@@H](O)[C@@H]1O"
  },
  "taurine": {
    "chebi_id": "15891",
    "hmdb_id": "HMDB0000251",
    "kegg_id": "C00245",
    "name": "Taurine",
    "smiles": "NCCS(O)(=O)=O"
  },
  "thiamine": {
    "chebi_id": "18385",
    "hmdb_id": "HMDB0000235",
    "kegg_id": "C00378",
    "name": "Thiamine",
    "smiles": "CC1=C(CCO)SC=[N+]1CC1=CN=C(C)N=C1N"
  },
  "thiaminemonophosphate": {
    "chebi_id": "37574",
    "hmdb_id": "HMDB0002666",
    "kegg_id": "C01081",
    "name": "Thiamine monophosphate",
    "smiles": "CC1=C(CCOP(O)([O-])=O)SC=[N+]1CC1=CN=C(C)N=C1N"
  },
  "thiaminepyrophosphate": {
    "chebi_id": "9532",
    "hmdb_id": "HMDB0001372",
    "kegg_id": "C00068",
    "name": "Thiamine pyrophosphate",
    "smiles": "CC1=C(CCOP(O)(=O)OP(O)(O)=O)SC=[N+]1CC1=CN=C(C)N=C1N"
  },
  "thymidine": {
    "chebi_id": "17748",
    "hmdb_id": "HMDB0000273",
    "kegg_id": "C00214",
    "name": "Thymidine",
    "smiles": "CC1=CN([C@H]2C[C@H](O)[C@@H](CO)O2)C(=O)NC1=O"
  },
  "thymidine5triphosphate": {
    "chebi_id": "18077",
    "hmdb_id": "HMDB0001342",
    "kegg_id": "C00459",
    "name": "Thymidine 5'-triphosphate",
    "smiles": "CC1=CN([C@H]2C[C@H](O)[C@@H](COP(O)(=O)OP(O)(=O)OP(O)(O)=O)O2)C(=O)NC1=O"
  },
  "thymidinemonophosphate": {
    "chebi_id": "17013",
    "hmdb_id": "HMDB0001227",
    "kegg_id": "C00364",
    "name": "5-Thymidylic acid",
    "smiles": "CC1=CN([C@H]2C[C@H](O)[C@@H](COP(O)(O)=O)O2)C(=O)NC1=O"
  },
  "thymine": {
    "chebi_id": "17821",
    "hmdb_id": "HMDB0000262",
    "kegg_id": "C00178",
    "name": "Thymine",
    "smiles": "CC1=CNC(=O)NC1=O"
  },
  "trans4hydroxylproline": {
    "chebi_id": "18095",
    "hmdb_id": "HMDB0000725",
    "kegg_id": "C01157",
    "name": "4-Hydroxyproline",
    "smiles": "O[C@H]1CN[C@@H](C1)C(O)=O"
  },
  "transbetahydromuconicacid": {
    "chebi_id": "86952",
    "hmdb_id": "HMDB0000393",
    "kegg_id": "",
    "name": "3-Hexenedioic acid",
    "smiles": "C(/C=C/CC(=O)O)C(=O)O"
  },
  "trehalose": {
    "chebi_id": "16551",
    "hmdb_id": "HMDB0000975",
    "kegg_id": "C01083",
    "name": "Trehalose",
    "smiles": "OC[C@H]1O[C@H](O[C@H]2O[C@H](CO)[C@@H](O)[C@H](O)[C@H]2O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "tyramine": {
    "chebi_id": "15760",
    "hmdb_id": "HMDB0000306",
    "kegg_id": "C00483",
    "name": "Tyramine",
    "smiles": "NCCC1=CC=C(O)C=C1"
  },
  "udpglcnac": {
    "chebi_id": "16264",
    "hmdb_id": "HMDB0000290",
    "kegg_id": "C00043",
    "name": "Uridine diphosphate-N-acetylglucosamine",
    "smiles": "CC(=O)N[C@@H]1[C@@H](O)[C@H](O)[C@@H](CO)O[C@@H]1OP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(=O)NC1=O"
  },
  "udpglucuronate": {
    "chebi_id": "17200",
    "hmdb_id": "HMDB0000935",
    "kegg_id": "C00167",
    "name": "Uridine diphosphate glucuronic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(=O)OP(O)(=O)O[C@H]2O[C@@H]([C@@H](O)[C@H](O)[C@H]2O)C(O)=O)O[C@H]([C@@H]1O)N1C=CC(=O)NC1=O"
  },
  "uracil": {
    "chebi_id": "17568",
    "hmdb_id": "HMDB0000300",
    "kegg_id": "C00106",
    "name": "Dihydrouracil",
    "smiles": "O=C1NC=CC(=O)N1"
  },
  "urea": {
    "chebi_id": "16199",
    "hmdb_id": "HMDB0000294",
    "kegg_id": "C00086",
    "name": "Urea",
    "smiles": "NC(N)=O"
  },
  "ureidoisobutyricacid": {
    "chebi_id": "1670",
    "hmdb_id": "HMDB0002031",
    "kegg_id": "C05100",
    "name": "Ureidoisobutyric acid",
    "smiles": "C[C@@H](CNC(N)=O)C(O)=O"
  },
  "ureidopropionicacid": {
    "chebi_id": "18261",
    "hmdb_id": "HMDB0000026",
    "kegg_id": "C02642",
    "name": "Ureidopropionic acid",
    "smiles": "NC(=O)NCCC(O)=O"
  },
  "uricacid": {
    "chebi_id": "17775",
    "hmdb_id": "HMDB0000289",
    "kegg_id": "C00366",
    "name": "Uric acid",
    "smiles": "O=C1NC2=C(N1)C(=O)NC(=O)N2"
  },
  "uridine": {
    "chebi_id": "16704",
    "hmdb_id": "HMDB0000296",
    "kegg_id": "C00299",
    "name": "Uridine",
    "smiles": "OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(=O)NC1=O"
  },
  "uridine5diphosphate": {
    "chebi_id": "17659",
    "hmdb_id": "HMDB0000295",
    "kegg_id": "C00015",
    "name": "Uridine 5'-diphosphate",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](O[C@@H]1COP(O)(=O)OP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "uridine5diphosphogalactose": {
    "chebi_id": "67119",
    "hmdb_id": "HMDB0000302",
    "kegg_id": "C00052",
    "name": "Uridine diphosphategalactose",
    "smiles": "OC[C@H]1O[C@H](O[P@@](O)(=O)O[P@@](O)(=O)OC[C@H]2O[C@H]([C@H](O)[C@@H]2O)N2C=CC(=O)NC2=O)[C@H](O)[C@@H](O)[C@H]1O"
  },
  "uridine5diphosphoglucose": {
    "chebi_id": "46229",
    "hmdb_id": "HMDB0000286",
    "kegg_id": "C00029",
    "name": "Uridine diphosphate glucose",
    "smiles": "OC[C@H]1O[C@H](OP(O)(=O)OP(O)(=O)OC[C@H]2O[C@H]([C@H](O)[C@@H]2O)N2C=CC(=O)NC2=O)[C@H](O)[C@@H](O)[C@@H]1O"
  },
  "uridine5diphosphonacetylgalactosamine": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000304",
    "kegg_id": "C00203",
    "name": "Uridine diphosphate-N-acetylgalactosamine",
    "smiles": "CC(O)=NC1C(OP(O)(=O)OP(O)(=O)OCC2OC(C(O)C2O)N2C=CC(O)=NC2=O)OC(CO)C(O)C1O"
  },
  "uridine5monophosphate": {
    "chebi_id": "16695",
    "hmdb_id": "HMDB0000288",
    "kegg_id": "C00105",
    "name": "Uridine 5'-monophosphate",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](O[C@@H]1COP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "uridine5triphosphate": {
    "chebi_id": "15713",
    "hmdb_id": "HMDB0000285",
    "kegg_id": "C00075",
    "name": "Uridine triphosphate",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](O[C@@H]1COP(O)(=O)OP(O)(=O)OP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "uridinediphosphategalactose": {
    "chebi_id": "67119",
    "hmdb_id": "HMDB0000302",
    "kegg_id": "C00052",
    "name": "Uridine diphosphategalactose",
    "smiles": "OC[C@H]1O[C@H](O[P@@](O)(=O)O[P@@](O)(=O)OC[C@H]2O[C@H]([C@H](O)[C@@H]2O)N2C=CC(=O)NC2=O)[C@H](O)[C@@H](O)[C@H]1O"
  },
  "uridinediphosphateglucuronicacid": {
    "chebi_id": "17200",
    "hmdb_id": "HMDB0000935",
    "kegg_id": "C00167",
    "name": "Uridine diphosphate glucuronic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(=O)OP(O)(=O)O[C@H]2O[C@@H]([C@@H](O)[C@H](O)[C@H]2O)C(O)=O)O[C@H]([C@@H]1O)N1C=CC(=O)NC1=O"
  },
  "uridinediphosphatenacetylgalactosamine": {
    "chebi_id": "",
    "hmdb_id": "HMDB0000304",
    "kegg_id": "C00203",
    "name": "Uridine diphosphate-N-acetylgalactosamine",
    "smiles": "CC(O)=NC1C(OP(O)(=O)OP(O)(=O)OCC2OC(C(O)C2O)N2C=CC(O)=NC2=O)OC(CO)C(O)C1O"
  },
  "uridinediphosphatenacetylglucosamine": {
    "chebi_id": "16264",
    "hmdb_id": "HMDB0000290",
    "kegg_id": "C00043",
    "name": "Uridine diphosphate-N-acetylglucosamine",
    "smiles": "CC(=O)N[C@@H]1[C@@H](O)[C@H](O)[C@@H](CO)O[C@@H]1OP(O)(=O)OP(O)(=O)OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=CC(=O)NC1=O"
  },
  "uridinemonophosphate": {
    "chebi_id": "16695",
    "hmdb_id": "HMDB0000288",
    "kegg_id": "C00105",
    "name": "Uridine 5'-monophosphate",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](O[C@@H]1COP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "uridinetriphosphate": {
    "chebi_id": "15713",
    "hmdb_id": "HMDB0000285",
    "kegg_id": "C00075",
    "name": "Uridine triphosphate",
    "smiles": "O[C@H]1[C@@H](O)[C@@H](O[C@@H]1COP(O)(=O)OP(O)(=O)OP(O)(O)=O)N1C=CC(=O)NC1=O"
  },
  "urocanicacid": {
    "chebi_id": "30817",
    "hmdb_id": "HMDB0000301",
    "kegg_id": "C00785",
    "name": "Urocanic acid",
    "smiles": "OC(=O)\\C=C\\C1=CNC=N1"
  },
  "vanillylmandelicacid": {
    "chebi_id": "1127735",
    "hmdb_id": "HMDB0000291",
    "kegg_id": "C05584",
    "name": "Vanillylmandelic acid",
    "smiles": "COC1=C(O)C=CC(=C1)[C@H](O)C(O)=O"
  },
  "xanthine": {
    "chebi_id": "17712",
    "hmdb_id": "HMDB0000292",
    "kegg_id": "C00385",
    "name": "Xanthine",
    "smiles": "O=C1NC2=C(NC=N2)C(=O)N1"
  },
  "xanthosine": {
    "chebi_id": "18107",
    "hmdb_id": "HMDB0000299",
    "kegg_id": "C01762",
    "name": "Xanthosine",
    "smiles": "OC[C@H]1O[C@H]([C@H](O)[C@@H]1O)N1C=NC2=C1N=C(O)N=C2O"
  },
  "xanthosine5monophosphate": {
    "chebi_id": "15652",
    "hmdb_id": "HMDB0001554",
    "kegg_id": "C00655",
    "name": "Xanthylic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1NC(=O)NC2=O"
  },
  "xanthurenicacid": {
    "chebi_id": "10072",
    "hmdb_id": "HMDB0000881",
    "kegg_id": "C02470",
    "name": "Xanthurenic acid",
    "smiles": "OC(=O)C1=NC2=C(O)C=CC=C2C(O)=C1"
  },
  "xanthylicacid": {
    "chebi_id": "15652",
    "hmdb_id": "HMDB0001554",
    "kegg_id": "C00655",
    "name": "Xanthylic acid",
    "smiles": "O[C@@H]1[C@@H](COP(O)(O)=O)O[C@H]([C@@H]1O)N1C=NC2=C1NC(=O)NC2=O"
  },
  "xylulose5phosphate": {
    "chebi_id": "16332",
    "hmdb_id": "HMDB0000868",
    "kegg_id": "C00231",
    "name": "Xylulose 5-phosphate",
    "smiles": "OCC(=O)[C@@H](O)[C@H](O)COP(O)(O)=O"
  }
}