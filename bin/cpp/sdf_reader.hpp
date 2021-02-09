// sdf.h
#include "pystring/pystring.h"
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;


//
// SDF reader functions
//
#ifndef _sdf_reader_hpp_
#define _sdf_reader_hpp_

void readSDF(string file_name);

//
// SDF class stores all metadata and MOL data from SDF file
//
class SDF {
    public:
        // Static variables
        const string hmdb_key = "HMDB_ID";
        const string generic_name_key = "GENERIC_NAME";
        const string jchem_key = "JCHEM_IUPAC";
        const string synonym_key = "SYNONYMS";

        // Fill variables
        string hmdb_id;
        string generic_name;
        string jchem_iupac;
        std::vector <std::string> synonyms;
        string atoms;
        string bonds;

        //
        // Functions 
        //
        // Get HMDB identifier
        void getHmdb (fstream &_file, string _line) {
            if (_line.find(hmdb_key) != string::npos) {
                string _next_line;
                while (getline(_file, _next_line)) {
                    hmdb_id = _next_line;
                    break;
                }
            }
        };
        // Get generic name
        void getName (fstream &_file, string _line) {
            if (_line.find(generic_name_key) != string::npos) {
                string _next_line;
                while (getline(_file, _next_line)) {
                    generic_name = _next_line;
                    break;
                }
            }
        };
        // Get JCHEM IUPAC name
        void getJchem (fstream &_file, string _line) {
            if (_line.find(jchem_key) != string::npos) {
                string _next_line;
                while (getline(_file, _next_line)) {
                    jchem_iupac = _next_line;
                    break;
                }
            }
        };
        // Get synonyms for metabolite
        void getSynonyms(fstream &_file, string _line) {
            const string delimiter = "; ";
            if (_line.find(synonym_key) != string::npos) {
                string _next_line;
                while (getline(_file, _next_line)) {
                    cout << _next_line << endl;
                    std::vector<std::string> synonyms;
                    pystring::split(_next_line, synonyms, delimiter);
                    break;
                }
            }
        };
};

#endif