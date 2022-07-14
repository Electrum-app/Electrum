"""License Information
electrum-utils
Back-end utils tool for Electrum
https://github.com/Electrum-app/Electrum/
alias: electrum-utils

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
"""
import pandas as pd 
import requests
import json 
import math
import re
import os


HMDB_URL = "https://hmdb.ca/system/downloads/current/hmdb_metabolites.zip"

METABOLITE_HEADER="metabolite"
PROTEIN_HEADER="query_protein"
METABOANALYST_URL = "http://api.xialab.ca/mapcompounds"
HEADERS = {
    'Content-Type': "application/json",
    'cache-control': "no-cache",
}
CUSTOM_NAMES = {
    "D-Glucose": "Glucose",
    "D-Fructose 6-phosphate": "G6P", 
    "D-Fructose 6-phosphate": "F6P",
    "D-Fructose 1,6-bisphosphate": "F1,6BP",
    "D-Glyceraldehyde 3-phosphate": "G3P",
    "Dihydroxyacetone phosphate": "DHAP",
    "D-3-Phosphoglyceric acid": "3PG",
    "Phosphoenolpyruvic acid": "PEP",
    "L-Serine": "Serine",
    "Citric acid": "Citrate",
    "Isocitric acid": "Isocitrate", 
    "O-Phospho-L-serine": "3-PS",
    "Acetyl coenzyme A": "Acetyl CoA",
    "Ketoglutaric acid": "α-ketoglutarate",
    "Succinyl coenzyme A": "Succinyl CoA",
    "Succinic acid": "Succinate",
    "L-Malic acid": "Malate",
    "Oxaloacetic acid": "Oxaloacetate"
}


"""Functions
"""
def parse_identifiers(
        database_url):

    db = pd.read_csv(
            database_url,
            sep="\t",
            index_col=False,
            header=0
        )
    unique_metabolites = db[METABOLITE_HEADER].unique().tolist()
    unique_proteins = db[PROTEIN_HEADER].unique().tolist()
    
    isoforms_reference = {}
    isoforms = db[METABOLITE_HEADER].loc[db[METABOLITE_HEADER].str.contains(";")].unique().tolist()
    for i in isoforms:
        isoform_list = i.split(";")
        for s in isoform_list:
            isoforms_reference[s] = isoform_list
    
    print("Identified", len(unique_metabolites), "unique metabolites and", len(unique_proteins), "unique proteins")

    return unique_metabolites, unique_proteins, isoforms_reference


def crossref_metaboanalyst(
        metabolites):
    
    print("Cross-referencing unique metabolites with MetaboAnalyst database...")
    
    # Send metabolites to MetaboAnalyst
    payload_string = ""
    for x in metabolites:
        payload_string = payload_string + x + ";"

    payload = "{\n\t\"queryList\": \"" + payload_string + "\",\n\t\"inputType\": \"name\"\n}"
    metaboanalyst_response = requests.request(
        "POST", 
        METABOANALYST_URL, 
        data=payload, 
        headers=HEADERS)

    metaboanalyst_df = pd.DataFrame.from_dict(
        json.loads(metaboanalyst_response.text),
        orient='index').transpose()

    # Construct metabolite synonym and ID dictionary from MetaboAnalyst output
    metaboanalyst_dict = {}
    for index, row in metaboanalyst_df.iterrows():

        name = row["Query"]
        display_name = name
        if display_name in CUSTOM_NAMES:
            display_name = CUSTOM_NAMES[display_name]
        alt_name = row["Match"]
        hmdb = row["HMDB"]
        chebi = row["ChEBI"]
        kegg = row["KEGG"]
        smiles = row["SMILES"]

        # Handle NAs
        if alt_name == "NA" or alt_name == None:
            alt_name = row["Query"]
        if hmdb == "NA" or hmdb == None:
            hmdb = ""
        if chebi == "NA" or chebi == None:
            chebi = ""
        if kegg == "NA" or kegg == None:
            kegg = ""
        if smiles == "NA" or smiles == None:
            smiles = ""

        metaboanalyst_dict[name] = {
            "name": display_name,
            "alt_name": alt_name,
            "hmdb_id": hmdb,
            "chebi_id": chebi,
            "kegg_id": kegg,
            "smiles": smiles
        }

        if alt_name != name:
            metaboanalyst_dict[alt_name] = {
                "name": display_name,
                "alt_name": alt_name,
                "hmdb_id": hmdb,
                "chebi_id": chebi,
                "kegg_id": kegg,
                "smiles": smiles
            }

        # Add flexible search names to dictionary
        name_label = re.sub(r'\W+', '', name)
        alt_name_label = re.sub(r'\W+', '', alt_name)
        
        if alt_name_label != "":
            metaboanalyst_dict[name_label.lower()] = {
                "name": display_name,
                "alt_name": alt_name,
                "hmdb_id": hmdb,
                "chebi_id": chebi,
                "kegg_id": kegg,
                "smiles": smiles
            }
            metaboanalyst_dict[alt_name_label.lower()] = {
                "name": display_name,
                "alt_name": alt_name,
                "hmdb_id": hmdb,
                "chebi_id": chebi,
                "kegg_id": kegg,
                "smiles": smiles
            }
        else:
            metaboanalyst_dict[name_label.lower()] = {
                "name": display_name,
                "alt_name": alt_name,
                "hmdb_id": hmdb,
                "chebi_id": chebi,
                "kegg_id": kegg,
                "smiles": smiles
            }

    return metaboanalyst_dict


def __main__(
        args_dict):
    """Generate required database references for MIDAS data visualization

    Excepted database format:

                              metabolite query_protein  log2_abundance  log2_abundance_corrected  met_mean    met_sd       p_value       q_value
        0               metabolite_name1 protein_name1       -3.145748                 -2.583616 -0.041294  0.134860  2.850000e-79  1.930000e-76
        1               metabolite_name2 protein_name1       -2.049392                 -1.224692 -0.038301  0.122482  3.450000e-22  5.740000e-20
        2               metabolite_name3 protein_name1       -2.324957                 -1.249463 -0.038824  0.163332  1.240000e-13  1.170000e-11
        3               metabolite_name4 protein_name1       -1.049454                 -0.622906  0.022553  0.089612  5.900000e-13  5.230000e-11

    - Input database file should be tab-delimited with the file suffix `.txt` or `.tsv`
    - Header naming must be strictly followed
    """

    if not os.path.isdir(args_dict["output"]):
        raise Exception("Provided output location cannot be found:", args_dict["output"])
    if not os.path.isfile(args_dict["database"]):
        raise Exception("Provided database file location cannot be found:", args_dict["database"])

    # Read database table and get unique metabolite and protein identifiers
    unique_metabolites, \
    unique_proteins, \
    isoforms = parse_identifiers(
        database_url=args_dict["database"])

    # Cross-reference database metabolites with MetaboAnalyst to build synonym/ID searcher
    metaboanalyst_output = crossref_metaboanalyst(
        metabolites=unique_metabolites)

    # Output reference file 
    with open(os.path.join(args_dict["output"], "metabolites.json"), "w") as fp:
        json.dump(metaboanalyst_output, fp, sort_keys=True, indent=2)
    print("\nProcessing complete.")