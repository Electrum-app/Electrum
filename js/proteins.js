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

// Static ID and name reference for query proteins
const protein_reference = {
  "ALDOA": {
    'uniprot_id': 'P04075',
    'name': 'Fructose-bisphosphate aldolase A'},
  "ALDOB": {
    'uniprot_id': 'P05062',
    'name': 'Fructose-bisphosphate aldolase B'},
  "ALDOC": {
    'uniprot_id': 'P09972',
    'name': 'Fructose-bisphosphate aldolase C'},
  "CS": {
    'uniprot_id': 'Citrate synthase, mitochondrial',
    'name': 'O75390'},
  "E1-PDH": {
    'uniprot_id': 'P08559',
    'name': 'Pyruvate dehydrogenase E1 component subunit alpha, somatic form, mitochondrial'},
  "E2-PDH": {
    'uniprot_id': 'P10515',
    'name': 'Dihydrolipoyllysine-residue acetyltransferase component of pyruvate dehydrogenase complex, mitochondrial'},
  "E3-PDH": {
    'uniprot_id': 'P09622',
    'name': 'Dihydrolipoyl dehydrogenase, mitochondrial'},
  "ENO1": {
    'uniprot_id': 'P06733',
    'name': 'Alpha-enolase'},
  "ENO2": {
    'uniprot_id': 'P09104',
    'name': 'Gamma-enolase'},
  "FBP1": {
    'uniprot_id': 'P09467',
    'name': 'Fructose-1,6-bisphosphatase 1'},
  "FBP2": {
    'uniprot_id': 'O00757',
    'name': 'Fructose-1,6-bisphosphatase isozyme 2'},
  "FH": {
    'uniprot_id': 'P07954',
    'name': 'Fumarate hydratase, mitochondrial'},
  "GAPDH": {
    'uniprot_id': 'P04406',
    'name': 'Glyceraldehyde-3-phosphate dehydrogenase'},
  "GCK": {
    'uniprot_id': 'P35557',
    'name': 'Hexokinase-4'},
  "GPI": {
    'uniprot_id': 'P06744',
    'name': 'Glucose-6-phosphate isomerase'},
  "IDH2": {
    'uniprot_id': 'P48735',
    'name': 'Isocitrate dehydrogenase [NADP], mitochondrial'},
  "IDH3a2bg": {
    'uniprot_id': 'P50213; O43837; P51553',
    'name': 'Isocitrate dehydrogenase [NAD] subunit alpha, mitochondrial; Isocitrate dehydrogenase [NAD] subunit beta, mitochondrial; Isocitrate dehydrogenase [NAD] subunit gamma, mitochondrial'},
  "IDH3ab": {
    'uniprot_id': 'P50213; O43837',
    'name': 'Isocitrate dehydrogenase [NAD] subunit alpha, mitochondrial; Isocitrate dehydrogenase [NAD] subunit beta, mitochondrial'},
  "IDH3ag": {
    'uniprot_id': 'P50213; P51553',
    'name': 'Isocitrate dehydrogenase [NAD] subunit alpha, mitochondrial; Isocitrate dehydrogenase [NAD] subunit gamma, mitochondrial'},
  "LDHA": {
    'uniprot_id': 'P00338',
    'name': 'L-lactate dehydrogenase A chain'},
  "LDHB": {
    'uniprot_id': 'P07195',
    'name': 'L-lactate dehydrogenase B chain'},
  "MDH2": {
    'uniprot_id': 'P40926',
    'name': 'Malate dehydrogenase, mitochondrial'},
  "PFKL": {
    'uniprot_id': 'P17858',
    'name': 'ATP-dependent 6-phosphofructokinase, liver type'},
  "PFKP": {
    'uniprot_id': 'Q01813',
    'name': 'ATP-dependent 6-phosphofructokinase, platelet type'},
  "PGAM1": {
    'uniprot_id': 'P18669',
    'name': 'Phosphoglycerate mutase 1'},
  "PGAM2": {
    'uniprot_id': 'P15259',
    'name': 'Phosphoglycerate mutase 2'},
  "PGK1": {
    'uniprot_id': 'P00558',
    'name': 'Phosphoglycerate kinase 1'},
  "PGK2": {
    'uniprot_id': 'P07205',
    'name': 'Phosphoglycerate kinase 2'},
  "PHGDH": {
    'uniprot_id': 'O43175',
    'name': 'D-3-phosphoglycerate dehydrogenase'},
  "PKLR": {
    'uniprot_id': 'P30613',
    'name': 'Pyruvate kinase PKLR'},
  "PKLR-2": {
    'uniprot_id': 'P30613',
    'name': 'Pyruvate kinase PKLR'},
  "PKM1": {
    'uniprot_id': 'P14618',
    'name': 'Pyruvate kinase PKM, Isoform M1'},
  "PKM2": {
    'uniprot_id': 'P14618',
    'name': 'Pyruvate kinase PKM, Isoform M2'},
  "PSAT1": {
    'uniprot_id': 'Q9Y617',
    'name': 'Phosphoserine aminotransferase'},
  "TPI1": {
    'uniprot_id': 'P60174',
    'name': 'Triosephosphate isomerase'},
}